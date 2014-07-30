/*
 * create multi protocol socket server.
 */
global.MULTI_PROTOCOL_SOCKET_SERVER = MULTI_PROTOCOL_SOCKET_SERVER = METHOD({

	run : function(params, connectionListener) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.socketServerPort
		//OPTIONAL: params.webSocketServerPort
		//OPTIONAL: params.webServer
		//REQUIRED: connectionListener

		var
		// socket server port
		socketServerPort = params.socketServerPort,

		// web socket server port
		webSocketServerPort = params.webSocketServerPort,

		// web server
		webServer = params.webServer;

		if (socketServerPort !== undefined) {

			// create socket server.
			SOCKET_SERVER(socketServerPort, connectionListener);
		}

		if (webSocketServerPort !== undefined || webServer !== undefined) {

			// create web socket server.
			WEB_SOCKET_SERVER(webSocketServerPort !== undefined ? webSocketServerPort : webServer, connectionListener);
		}
	}
});
