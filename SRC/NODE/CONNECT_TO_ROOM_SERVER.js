/*
 * 룸 서버에 접속합니다.
 */
global.CONNECT_TO_ROOM_SERVER = METHOD((m) => {

	const DEFAULT_ROOM_SERVER_NAME = '__';

	let enterRoomNameMap = {};
	let onInfoMap = {};
	let waitingSendInfoMap = {};
	let isConnecteds = {};
	let innerOns = {};
	let innerOffs = {};
	let innerSends = {};

	let checkIsConnected = m.checkIsConnected = (roomServerName) => {
		//OPTIONAL: roomServerName

		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		if (isConnecteds[roomServerName] === undefined) {
			isConnecteds[roomServerName] = false;
		}

		return isConnecteds[roomServerName];
	};

	let enterRoom = m.enterRoom = (params) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.roomName

		let roomServerName = params.roomServerName;
		let roomName = params.roomName;

		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		let enterRoomNames = enterRoomNameMap[roomServerName];

		if (enterRoomNames === undefined) {
			enterRoomNames = enterRoomNameMap[roomServerName] = [];
		}

		enterRoomNames.push(roomName);

		if (innerSends[roomServerName] !== undefined) {
			innerSends[roomServerName]({
				methodName: '__ENTER_ROOM',
				data: roomName
			});
		}
	};

	let on = m.on = (params, method) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//REQUIRED: method

		let roomServerName = params.roomServerName;
		let methodName = params.methodName;

		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		let onInfos = onInfoMap[roomServerName];

		if (onInfos === undefined) {
			onInfos = onInfoMap[roomServerName] = [];
		}

		onInfos.push({
			methodName: methodName,
			method: method
		});

		if (innerOns[roomServerName] !== undefined) {
			innerOns[roomServerName](methodName, method);
		}
	};

	let off = m.off = (params, method) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//OPTIONAL: method

		let roomServerName = params.roomServerName;
		let methodName = params.methodName;

		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		let onInfos = onInfoMap[roomServerName];

		if (innerOffs[roomServerName] !== undefined) {
			innerOffs[roomServerName](methodName, method);
		}

		if (onInfos !== undefined) {

			if (method !== undefined) {

				REMOVE(onInfos, (onInfo) => {
					return onInfo.methodName === methodName && onInfo.method === method;
				});

			} else {

				REMOVE(onInfos, (onInfo) => {
					return onInfo.methodName === methodName;
				});
			}

			if (onInfos.length === 0) {
				delete onInfoMap[roomServerName];
			}
		}
	};

	let send = m.send = (params, callback) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//REQUIRED: params.data
		//OPTIONAL: callback

		let roomServerName = params.roomServerName;
		let methodName = params.methodName;
		let data = params.data;

		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		if (innerSends[roomServerName] === undefined) {

			let waitingSendInfos = waitingSendInfoMap[roomServerName];

			if (waitingSendInfos === undefined) {
				waitingSendInfos = waitingSendInfoMap[roomServerName] = [];
			}

			waitingSendInfos.push({
				params: {
					methodName: methodName,
					data: data
				},
				callback: callback
			});

		} else {

			innerSends[roomServerName]({
				methodName: methodName,
				data: data
			}, callback);
		}
	};

	let exitRoom = m.exitRoom = (params) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.roomName

		let roomServerName = params.roomServerName;
		let roomName = params.roomName;

		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		let enterRoomNames = enterRoomNameMap[roomServerName];

		if (enterRoomNames === undefined) {
			enterRoomNames = enterRoomNameMap[roomServerName] = [];
		}

		if (innerSends[roomServerName] !== undefined) {
			innerSends[roomServerName]({
				methodName: '__EXIT_ROOM',
				data: roomName
			});
		}

		EACH(enterRoomNames, (enterRoomName, key) => {

			if (enterRoomName === roomName) {

				REMOVE({
					array: enterRoomNames,
					key: key
				});

				return false;
			}
		});
	};

	return {

		run: (params, connectionListenerOrListeners) => {
			//REQUIRED: params
			//OPTIONAL: params.roomServerName
			//REQUIRED: params.host
			//REQUIRED: params.port
			//OPTIONAL: connectionListenerOrListeners
			//OPTIONAL: connectionListenerOrListeners.success
			//OPTIONAL: connectionListenerOrListeners.error

			let roomServerName = params.roomServerName;

			let connectionListener;
			let errorListener;

			if (roomServerName === undefined) {
				roomServerName = DEFAULT_ROOM_SERVER_NAME;
			}

			if (connectionListenerOrListeners !== undefined) {
				if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
					connectionListener = connectionListenerOrListeners;
				} else {
					connectionListener = connectionListenerOrListeners.success;
					errorListener = connectionListenerOrListeners.error;
				}
			}

			CONNECT_TO_SOCKET_SERVER({
				host: params.host,
				port: params.port
			}, {

				error: errorListener,

				success: (on, off, send) => {

					let enterRoomNames = enterRoomNameMap[roomServerName];
					let onInfos = onInfoMap[roomServerName];
					let waitingSendInfos = waitingSendInfoMap[roomServerName];

					innerOns[roomServerName] = on;
					innerOffs[roomServerName] = off;
					innerSends[roomServerName] = send;

					if (enterRoomNames !== undefined) {
						EACH(enterRoomNames, (roomName) => {
							send({
								methodName: '__ENTER_ROOM',
								data: roomName
							});
						});
					}

					if (onInfos !== undefined) {
						EACH(onInfos, (onInfo) => {
							on(onInfo.methodName, onInfo.method);
						});
					}

					if (waitingSendInfos !== undefined) {
						EACH(waitingSendInfos, (sendInfo) => {
							send(sendInfo.params, sendInfo.callback);
						});
					}
					delete waitingSendInfoMap[roomServerName];

					if (connectionListener !== undefined) {
						connectionListener(on, off, send);
					}

					isConnecteds[roomServerName] = true;

					// when disconnected, rewait.
					on('__DISCONNECTED', () => {

						delete innerOns[roomServerName];
						delete innerOffs[roomServerName];
						delete innerSends[roomServerName];

						isConnecteds[roomServerName] = false;
					});
				}
			});
		}
	};
});
