/*
 * create multi protocol socket server.
 */
global.MULTI_PROTOCOL_SOCKET_SERVER = MULTI_PROTOCOL_SOCKET_SERVER = METHOD({

	run : function(ports, connectionListener) {'use strict';
		//REQUIRED: ports
		//REQUIRED: ports.socketServerPort
		//REQUIRED: ports.webSocketServerPort
		//OPTIONAL: ports.webSocketFixServerPort
		//REQUIRED: connectionListener

		var
		// socket server port
		socketServerPort = ports.socketServerPort,

		// web socket server port
		webSocketServerPort = ports.webSocketServerPort,

		// web socket fix server port
		webSocketFixServerPort = ports.webSocketFixServerPort;

		// create socket server.
		SOCKET_SERVER(socketServerPort, connectionListener);

		// create web socket server.
		WEB_SOCKET_SERVER({
			port : webSocketServerPort,
			fixServerPort : webSocketFixServerPort
		}, connectionListener);
	}
});
