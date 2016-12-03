/*
 * 룸 서버에 접속합니다.
 */
global.CONNECT_TO_ROOM_SERVER = METHOD(function(m) {
	'use strict';

	var
	// DEFAULT_ROOM_SERVER_NAME
	DEFAULT_ROOM_SERVER_NAME = '__',
	
	// enter room name map
	enterRoomNameMap = {},

	// on info map
	onInfoMap = {},

	// waiting send info map
	waitingSendInfoMap = {},

	// is connecteds
	isConnecteds = {},

	// inner ons
	innerOns = {},

	// inner offs
	innerOffs = {},

	// inner sends
	innerSends = {},
	
	// check is connected.
	checkIsConnected,

	// enter room.
	enterRoom,

	// on.
	on,

	// off.
	off,

	// send.
	send,

	// exit room.
	exitRoom;
	
	m.checkIsConnected = checkIsConnected = function(roomServerName) {
		//OPTIONAL: roomServerName
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		if (isConnecteds[roomServerName] === undefined) {
			isConnecteds[roomServerName] = false;
		}
		
		return isConnecteds[roomServerName];
	};

	m.enterRoom = enterRoom = function(params) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.roomName
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// room name
		roomName = params.roomName,
		
		// enter room names
		enterRoomNames;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		enterRoomNames = enterRoomNameMap[roomServerName];
		
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

	m.on = on = function(params, method) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//REQUIRED: method
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// method name
		methodName = params.methodName,
		
		// on infos
		onInfos;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		onInfos = onInfoMap[roomServerName];
		
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

	m.off = off = function(params, method) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//OPTIONAL: method
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// method name
		methodName = params.methodName,
		
		// on infos
		onInfos;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		onInfos = onInfoMap[roomServerName];
		
		if (innerOffs[roomServerName] !== undefined) {
			innerOffs[roomServerName](methodName, method);
		}
		
		if (onInfos !== undefined) {

			if (method !== undefined) {
	
				REMOVE(onInfos, function(onInfo) {
					return onInfo.methodName === methodName && onInfo.method === method;
				});
	
			} else {
	
				REMOVE(onInfos, function(onInfo) {
					return onInfo.methodName === methodName;
				});
			}
			
			if (onInfos.length === 0) {
				delete onInfoMap[roomServerName];
			}
		}
	};

	m.send = send = function(params, callback) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//REQUIRED: params.data
		//OPTIONAL: callback
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// method name
		methodName = params.methodName,
		
		// data
		data = params.data,
		
		// waiting send infos
		waitingSendInfos;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		if (innerSends[roomServerName] === undefined) {
			
			waitingSendInfos = waitingSendInfoMap[roomServerName];
		
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

	m.exitRoom = exitRoom = function(params) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.roomName
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// room name
		roomName = params.roomName,
		
		// enter room names
		enterRoomNames;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		enterRoomNames = enterRoomNameMap[roomServerName];
		
		if (enterRoomNames === undefined) {
			enterRoomNames = enterRoomNameMap[roomServerName] = [];
		}

		if (innerSends[roomServerName] !== undefined) {
			innerSends[roomServerName]({
				methodName : '__EXIT_ROOM',
				data : roomName
			});
		}
		
		EACH(enterRoomNames, function(enterRoomName, key) {

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

		run : function(params, connectionListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.name
			//OPTIONAL: params.isSecure
			//OPTIONAL: params.host
			//REQUIRED: params.port
			//OPTIONAL: connectionListenerOrListeners
			//OPTIONAL: connectionListenerOrListeners.success
			//OPTIONAL: connectionListenerOrListeners.error

			var
			// name
			name = params.name,
			
			// connection listener
			connectionListener,

			// error listener
			errorListener;
			
			if (name === undefined) {
				name = DEFAULT_ROOM_SERVER_NAME;
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

				success : function(on, off, send) {
					
					var
					// enter room names
					enterRoomNames = enterRoomNameMap[name],
					
					// on infos
					onInfos = onInfoMap[name],
					
					// waiting send infos
					waitingSendInfos = waitingSendInfoMap[name];

					innerOns[name] = on;
					innerOffs[name] = off;
					innerSends[name] = send;

					if (enterRoomNames !== undefined) {
						EACH(enterRoomNames, function(roomName) {
							send({
								methodName : '__ENTER_ROOM',
								data : roomName
							});
						});
					}

					if (onInfos !== undefined) {
						EACH(onInfos, function(onInfo) {
							on(onInfo.methodName, onInfo.method);
						});
					}
					
					if (waitingSendInfos !== undefined) {
						EACH(waitingSendInfos, function(sendInfo) {
							send(sendInfo.params, sendInfo.callback);
						});
					}
					delete waitingSendInfoMap[name];

					if (connectionListener !== undefined) {
						connectionListener(on, off, send);
					}
					
					isConnecteds[name] = true;

					// when disconnected, rewait.
					on('__DISCONNECTED', function() {

						delete innerOns[name];
						delete innerOffs[name];
						delete innerSends[name];
						
						isConnecteds[name] = false;
					});
				}
			});
		}
	};
});
