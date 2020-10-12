/*
 * TCP 소켓 및 웹소켓 서버를 통합하여 생성합니다.
 */
global.MULTI_PROTOCOL_SOCKET_SERVER = CLASS({

	init: (inner, self, params, connectionListener) => {
		//REQUIRED: params
		//OPTIONAL: params.socketServerPort
		//OPTIONAL: params.webServer
		//REQUIRED: connectionListener

		let socketServerPort = params.socketServerPort;
		let webServer = params.webServer;

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
