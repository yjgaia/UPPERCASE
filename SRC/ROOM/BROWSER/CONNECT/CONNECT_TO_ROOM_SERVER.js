/*
 * connect to room server.
 */
global.CONNECT_TO_ROOM_SERVER = CONNECT_TO_ROOM_SERVER = METHOD(function(m) {
	'use strict';

	var
	// enter room names
	enterRoomNames = [],

	// waiting on infos
	waitingOnInfos = [],

	// waiting send infos
	waitingSendInfos = [],

	// is connected
	isConnected,

	// inner on.
	innerOn,

	// inner off.
	innerOff,

	// inner send.
	innerSend,

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

	m.enterRoom = enterRoom = function(roomName) {
		//REQUIRED: roomName

		enterRoomNames.push(roomName);

		if (innerSend !== undefined) {
			innerSend({
				methodName : '__ENTER_ROOM',
				data : roomName
			});
		}
	};

	m.on = on = function(methodName, method) {

		if (innerOn === undefined) {

			waitingOnInfos.push({
				methodName : methodName,
				method : method
			});

		} else {

			innerOn(methodName, method);
		}
	};

	m.off = off = function(methodName, method) {

		if (waitingOnInfos !== undefined) {

			if (method !== undefined) {

				REMOVE(waitingOnInfos, function(waitingOnInfo) {
					return waitingOnInfo.methodName === methodName && waitingOnInfo.method === method;
				});

			} else {

				REMOVE(waitingOnInfos, function(waitingOnInfo) {
					return waitingOnInfo.methodName === methodName;
				});
			}

		} else {

			innerOff(methodName, method);
		}
	};

	m.send = send = function(params, _callback) {
		//REQUIRED: params
		//REQUIRED: params.methodName
		//REQUIRED: params.data
		//REQUIRED: params.isNotUsingLoadingBar
		//OPTIONAL: _callback

		var
		// is not using loading bar
		isNotUsingLoadingBar = params.isNotUsingLoadingBar,

		// loading bar
		loadingBar,

		// callback
		callback = function(result) {

			if (_callback !== undefined) {
				_callback(result);
			}

			if (loadingBar !== undefined) {
				loadingBar.done();
			}
		};

		if (isNotUsingLoadingBar !== true) {
			loadingBar = LOADING_BAR();
		}

		if (innerSend === undefined) {

			waitingSendInfos.push({
				params : params,
				callback : callback
			});

		} else {

			innerSend(params, callback);
		}
	};

	m.exitRoom = exitRoom = function(roomName) {

		if (innerSend !== undefined) {
			innerSend({
				methodName : '__EXIT_ROOM',
				data : roomName
			});
		}

		REMOVE({
			array : enterRoomNames,
			value : roomName
		});
	};

	return {

		run : function(params, connectionListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.host
			//REQUIRED: params.port
			//OPTIONAL: params.fixRequestURI
			//REQUIRED: connectionListenerOrListeners

			var
			// connection listener
			connectionListener,

			// error listener
			errorListener;

			if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
				connectionListener = connectionListenerOrListeners;
			} else {
				connectionListener = connectionListenerOrListeners.success;
				errorListener = connectionListenerOrListeners.error;
			}

			CONNECT_TO_WEB_SOCKET_SERVER(params, {

				error : errorListener,

				success : function(on, off, send) {

					innerOn = on;
					innerOff = off;
					innerSend = send;

					EACH(enterRoomNames, function(roomName) {

						innerSend({
							methodName : '__ENTER_ROOM',
							data : roomName
						});
					});

					EACH(waitingOnInfos, function(onInfo) {
						innerOn(onInfo.methodName, onInfo.method);
					});

					waitingOnInfos = undefined;

					EACH(waitingSendInfos, function(sendInfo) {
						innerSend(sendInfo.params, sendInfo.callback);
					});

					waitingSendInfos = undefined;

					if (connectionListener !== undefined) {
						connectionListener(on, off, send);
					}

					// when disconnected, rewait.
					on('__DISCONNECTED', function() {

						innerOn = undefined;
						innerOff = undefined;
						innerSend = undefined;

						waitingOnInfos = [];
						waitingSendInfos = [];
					});
				}
			});
		}
	};
});
