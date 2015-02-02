/*
 * connect to UPPERCASE.IO server.
 */
global.CONNECT_TO_IO_SERVER = METHOD({

	run : function(connectionListenerOrListeners) {
		'use strict';
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

		GET({
			port : CONFIG.webServerPort,
			uri : '__WEB_SOCKET_SERVER_HOST',
			paramStr : 'defaultHost=' + BROWSER_CONFIG.host
		}, {
			error : errorListener,
			success : function(host) {

				CONNECT_TO_ROOM_SERVER({
					host : host,
					port : CONFIG.webServerPort,
					fixRequestURI : '__WEB_SOCKET_FIX'
				}, connectionListener);
			}
		});
	}
});
