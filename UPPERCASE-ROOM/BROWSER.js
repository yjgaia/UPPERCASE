/*

Welcome to UPPERCASE-ROOM! (http://uppercase.io)

*/

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
				methodName : '__ENTER_ROOM',
				data : roomName
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
			methodName : methodName,
			method : method
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
				params : {
					methodName : methodName,
					data : data
				},
				callback : callback
			});

		} else {

			innerSends[roomServerName]({
				methodName : methodName,
				data : data
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
				methodName : '__EXIT_ROOM',
				data : roomName
			});
		}
		
		EACH(enterRoomNames, (enterRoomName, key) => {

			if (enterRoomName === roomName) {

				REMOVE({
					array : enterRoomNames,
					key : key
				});
				
				return false;
			}
		});
	};

	return {

		run : (params, connectionListenerOrListeners) => {
			//REQUIRED: params
			//OPTIONAL: params.roomServerName
			//OPTIONAL: params.isSecure
			//OPTIONAL: params.host
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

			CONNECT_TO_WEB_SOCKET_SERVER({
				isSecure : params.isSecure,
				host : params.host,
				port : params.port
			}, {

				error : errorListener,

				success : (on, off, send) => {
					
					let enterRoomNames = enterRoomNameMap[roomServerName];
					let onInfos = onInfoMap[roomServerName];
					let waitingSendInfos = waitingSendInfoMap[roomServerName];

					innerOns[roomServerName] = on;
					innerOffs[roomServerName] = off;
					innerSends[roomServerName] = send;

					if (enterRoomNames !== undefined) {
						EACH(enterRoomNames, (roomName) => {
							send({
								methodName : '__ENTER_ROOM',
								data : roomName
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

FOR_BOX((box) => {

	/*
	 * 서버에 생성된 룸과 통신을 주고받는 ROOM 클래스
	 */
	box.ROOM = CLASS({

		init : (inner, self, nameOrParams) => {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.roomServerName
			//REQUIRED: nameOrParams.name

			let roomServerName;
			let roomName;

			let methodMap = {};

			let isExited;
			
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				roomName = box.boxName + '/' + nameOrParams;
			} else {
				roomServerName = nameOrParams.roomServerName;
				roomName = box.boxName + '/' + nameOrParams.name;
			}

			CONNECT_TO_ROOM_SERVER.enterRoom({
				roomServerName : roomServerName,
				roomName : roomName
			});

			let getRoomName = inner.getRoomName = () => {
				return roomName;
			};

			let checkIsExited = inner.checkIsExited = () => {
				return isExited;
			};

			let on = self.on = (methodName, method) => {
				//REQUIRED: methodName
				//REQUIRED: method

				let methods = methodMap[methodName];

				CONNECT_TO_ROOM_SERVER.on({
					roomServerName : roomServerName,
					methodName : roomName + '/' + methodName
				}, method);

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			};

			let off = self.off = (methodName, method) => {
				//REQUIRED: methodName
				//OPTIONAL: method

				let methods = methodMap[methodName];

				if (methods !== undefined) {

					if (method !== undefined) {

						CONNECT_TO_ROOM_SERVER.off({
							roomServerName : roomServerName,
							methodName : roomName + '/' + methodName
						}, method);

						REMOVE({
							array : methods,
							value : method
						});

						if (methods.length === 0) {
							delete methodMap[methodName];
						}

					} else {

						EACH(methods, (method) => {
							CONNECT_TO_ROOM_SERVER.off({
								roomServerName : roomServerName,
								methodName : roomName + '/' + methodName
							}, method);
						});
						delete methodMap[methodName];
					}
				}
			};

			let send = self.send = (methodNameOrParams, callback) => {
				//REQUIRED: methodNameOrParams
				//REQUIRED: methodNameOrParams.methodName
				//OPTIONAL: methodNameOrParams.data
				//OPTIONAL: callback
				
				let methodName;
				let data;
				
				if (CHECK_IS_DATA(methodNameOrParams) !== true) {
					methodName = methodNameOrParams;
				} else {
					methodName = methodNameOrParams.methodName;
					data = methodNameOrParams.data;
				}

				if (isExited !== true) {

					CONNECT_TO_ROOM_SERVER.send({
						roomServerName : roomServerName,
						methodName : roomName + '/' + methodName,
						data : data
					}, callback);

				} else {
					SHOW_ERROR(box.boxName + '.' + roomName + 'Room.send', '이미 룸에서 나갔습니다.');
				}
			};

			let exit = self.exit = () => {

				if (isExited !== true) {

					CONNECT_TO_ROOM_SERVER.exitRoom({
						roomServerName : roomServerName,
						roomName : roomName
					});

					EACH(methodMap, (methods, methodName) => {
						off(methodName);
					});

					// free method map.
					methodMap = undefined;

					isExited = true;
				}
			};
		}
	});
});
