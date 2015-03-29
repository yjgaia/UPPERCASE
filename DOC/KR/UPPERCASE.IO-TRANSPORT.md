
###### 통신 관련
* `WEB_SOCKET_SERVER(portOrWebServer, connectionListener)` create web socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `WEB_SOCKET_FIX_REQUEST_MANAGER(connectionListener)` create web socket fix request handler. (using jsonp long-polling) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `MULTI_PROTOCOL_SOCKET_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:}, connectionListener)` 소켓 서버와 웹 소켓 서버를 결합한 다중 프로토콜 소켓 서버를 실행합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/MULTI_PROTOCOL_SOCKET_SERVER.js)
* `CONNECT_TO_WEB_SOCKET_SERVER({host:, port:, fixRequestURI:}, {error:, success:})` connect to web socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/BROWSER/CONNECT_TO_WEB_SOCKET_SERVER.js)
