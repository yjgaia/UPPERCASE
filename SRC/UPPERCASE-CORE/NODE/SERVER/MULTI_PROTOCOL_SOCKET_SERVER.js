/*
 * TCP 소켓 및 웹 소켓 서버를 통합하여 생성합니다.
 */
global.MULTI_PROTOCOL_SOCKET_SERVER = CLASS({

	init : function(inner, self, params, connectionListener) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.socketServerPort
		//OPTIONAL: params.webServer
		//REQUIRED: connectionListener

		var
		// socket server port
		socketServerPort = params.socketServerPort,
		
		// web server
		webServer = params.webServer;

		if (socketServerPort !== undefined) {

			// create socket server.
			SOCKET_SERVER(socketServerPort, connectionListener);
		}

		if (webServer !== undefined) {

			// create web socket server.
			WEB_SOCKET_SERVER(webServer, connectionListener);
		}
	}
});
