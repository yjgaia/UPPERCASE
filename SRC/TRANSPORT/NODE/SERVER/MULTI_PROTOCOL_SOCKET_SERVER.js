/*
 * create multi protocol socket server.
 */
global.MULTI_PROTOCOL_SOCKET_SERVER = MULTI_PROTOCOL_SOCKET_SERVER = CLASS({

	init : function(inner, self, params, connectionListener) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.socketServerPort
		//OPTIONAL: params.webSocketServerPort
		//OPTIONAL: params.webServer
		//OPTIONAL: params.isCreateWebSocketFixRequestManager
		//REQUIRED: connectionListener

		var
		// socket server port
		socketServerPort = params.socketServerPort,

		// web socket server port
		webSocketServerPort = params.webSocketServerPort,

		// is create web socket fix request manager
		isCreateWebSocketFixRequestManager = params.isCreateWebSocketFixRequestManager,

		// web server
		webServer = params.webServer,

		// web socket fix request manager
		webSocketFixRequestManager,

		// get web socket fix request.
		getWebSocketFixRequest;

		if (socketServerPort !== undefined) {

			// create socket server.
			SOCKET_SERVER(socketServerPort, connectionListener);
		}

		if (webSocketServerPort !== undefined || webServer !== undefined) {

			// create web socket server.
			WEB_SOCKET_SERVER(webSocketServerPort !== undefined ? webSocketServerPort : webServer, connectionListener);
		}

		if (isCreateWebSocketFixRequestManager === true) {

			webSocketFixRequestManager = WEB_SOCKET_FIX_REQUEST_MANAGER(connectionListener);
		}

		self.getWebSocketFixRequest = getWebSocketFixRequest = function() {
			return webSocketFixRequestManager.request;
		};
	}
});
