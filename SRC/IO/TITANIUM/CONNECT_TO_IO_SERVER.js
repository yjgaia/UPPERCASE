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
		errorListener;

		if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
			connectionListener = connectionListenerOrListeners;
		} else {
			connectionListener = connectionListenerOrListeners.success;
			errorListener = connectionListenerOrListeners.error;
		}

		GET({
			host : doorServerHost,
			port : webServerPort,
			uri : Ti.Platform.name === 'mobileweb' ? '__WEB_SOCKET_SERVER_HOST' : '__SOCKET_SERVER_HOST',
			paramStr : 'defaultHost=' + doorServerHost
		}, {
			error : errorListener,
			success : function(host) {

				CONNECT_TO_ROOM_SERVER({
					host : host,
					socketServerPort : socketServerPort,
					webSocketServerPort : webServerPort
				}, {
					error : errorListener,
					success : connectionListener
				});
			}
		});
	}
});
