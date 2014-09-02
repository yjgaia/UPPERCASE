/*
 * connect to UPPERCASE.IO server.
 */
global.CONNECT_TO_IO_SERVER = CONNECT_TO_IO_SERVER = METHOD({

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
			uri : '__WEB_SOCKET_SERVER_HOST',
			paramStr : 'defaultHost=' + global.location.hostname
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
