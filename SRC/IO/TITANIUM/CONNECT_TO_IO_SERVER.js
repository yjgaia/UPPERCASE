/*
 * connect to UPPERCASE.IO server.
 */
global.CONNECT_TO_IO_SERVER = CONNECT_TO_IO_SERVER = METHOD({

	run : function(params, connectionListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.doorServerHost
		//REQUIRED: params.webServerPort
		//REQUIRED: params.socketServerPort
		//REQUIRED: connectionListenerOrListeners

		var
		// door server host
		doorServerHost = params.doorServerHost,

		// web server port
		webServerPort = params.webServerPort,

		// socket server port
		socketServerPort = params.socketServerPort,

		// connection listener
		connectionListener,

		// error listener
		errorListener,

		// host callback name
		hostCallbackName,

		// host callback.
		hostCallback = function(host) {

			CONNECT_TO_ROOM_SERVER({
				host : host,
				socketServerPort : socketServerPort,
				webSocketServerPort : webServerPort
			}, {
				error : errorListener,
				success : connectionListener
			});
		};

		if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
			connectionListener = connectionListenerOrListeners;
		} else {
			connectionListener = connectionListenerOrListeners.success;
			errorListener = connectionListenerOrListeners.error;
		}

		// when mobile web
		if (Ti.Platform.name === 'mobileweb') {

			window[ hostCallbackName = 'F' + RANDOM_STR(20)] = hostCallback;

			LOAD({
				host : doorServerHost,
				port : webServerPort,
				uri : '__WEB_SOCKET_SERVER_HOST',
				paramStr : 'defaultHost=' + doorServerHost + '&callback=' + hostCallbackName,
				isNoCache : true
			});

		} else {

			GET({
				host : doorServerHost,
				port : webServerPort,
				uri : '__WEB_SOCKET_SERVER_HOST',
				paramStr : 'defaultHost=' + doorServerHost
			}, {
				error : errorListener,
				success : hostCallback
			});
		}
	}
});
