# UPPERCASE.IO-TRANSPORT
TCP/UDP 소켓 서버 및 웹 서버, 리소스 서버를 제공하는 [UPPERCASE.JS 서버 구현체들](https://github.com/Hanul/UPPERCASE.JS/blob/master/DOC/KR/UPPERCASE.JS-NODE.md#각종-서버-구현체들)에 더하여, 웹 소켓 서버 및 웹 소켓을 지원하지 않는 브라우저에서도 웹 소켓과 같은 형태로 통신을 가능하게 해주는 서버 구현체를 포함하고 있습니다.

또한 TCP 소켓과 웹 소켓 프로토콜을 통합하여 제공하는 멀티 프로토콜 소켓 서버 구현체가 포함되어 있습니다.

*※ UPPERCASE.IO 기반 프로젝트는 이 모듈이 자동으로 포함됩니다. 이하 내용들은 이 모듈을 따로 사용할 때 필요한 내용입니다.*

## 파일 구성
* UPPERCASE.IO-TRANSPORT 폴더
* UPPERCASE.JS-COMMON.js
* UPPERCASE.JS-NODE.js
* UPPERCASE.JS-BROWSER.js
* UPPERCASE.JS-BROWSER-FIX 폴더

## 멀티 프로토콜 서버 생성 방법
`UPPERCASE.IO-TRANSPORT`는 `UPPERCASE.JS`를 기반으로 합니다. `on`, `off` 및 `send` 등의 기본적인 사용법은 [UPPERCASE.JS의 SOCKET_SERVER](https://github.com/Hanul/UPPERCASE.JS/blob/master/DOC/KR/UPPERCASE.JS-NODE.md#각종-서버-구현체들)와 같습니다.

```javascript
// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-TRANSPORT.
require('../../../../UPPERCASE.IO-TRANSPORT/NODE.js');

var
// web server
webServer,

// socket server
socketServer,

// web socket fix request
webSocketFixRequest;

webServer = WEB_SERVER(8125, function(requestInfo, response, onDisconnected) {

	// serve web socket fix request
	if (requestInfo.uri === '__WEB_SOCKET_FIX') {

		webSocketFixRequest(requestInfo, {
			response : response,
			onDisconnected : onDisconnected
		});
	}
});

socketServer = MULTI_PROTOCOL_SOCKET_SERVER({
	socketServerPort : 8124,
	webServer : webServer,
	isCreateWebSocketFixRequestManager : true
}, function(clientInfo, on, off, send) {
	// now we support TCP socket and WebSocket. (and WebSocket Fix)
	...
});

webSocketFixRequest = socketServer.getWebSocketFixRequest();

...

// init all singleton classes.
INIT_OBJECTS();
```

## 웹소켓 서버에 접속 방법
`UPPERCASE.IO-TRANSPORT`는 `UPPERCASE.JS`를 기반으로 합니다. `on`, `off` 및 `send` 등의 기본적인 사용법은 [UPPERCASE.JS의  CONNECT_TO_SOCKET_SERVER](https://github.com/Hanul/UPPERCASE.JS/blob/master/DOC/KR/UPPERCASE.JS-NODE.md#각종-서버-구현체들)와 같습니다.

```html
<script>
	global = window;
</script>

<!-- import UPPERCASE.JS -->
<script src="UPPERCASE.JS-COMMON.js"></script>
<script src="UPPERCASE.JS-BROWSER.js"></script>
<script>
	BROWSER_CONFIG.fixScriptsFolderPath = 'UPPERCASE.JS-BROWSER-FIX';
	LOAD('UPPERCASE.JS-BROWSER-FIX/FIX.js');
</script>

<!-- import UPPERCASE.IO-TRANSPORT -->
<script src="UPPERCASE.IO-TRANSPORT/BROWSER.js"></script>

<script>
	READY(function() {

	    // init all singleton classes.
		INIT_OBJECTS();
		
		CONNECT_TO_WEB_SOCKET_SERVER({
        	port : 8125,
        	fixRequestURI : '__WEB_SOCKET_FIX'
        }, {
        	error : function(error) {
        		...
        	},
        	success : function(on, off, send, disconnect) {
        	    // now connected.
        	    ...
        	}
        });
	});
</script>
```

## NODE API
* `WEB_SOCKET_SERVER(portOrWebServer, connectionListener)` 웹소켓 서버를 만듭니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `WEB_SOCKET_FIX_REQUEST_MANAGER(connectionListener)` JSONP Long-polling을 사용하여 웹소켓을 지원하지 않는 브라우저에서도 웹소켓을 사용하는 것과 같은 효과를 만들 수 있습니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `MULTI_PROTOCOL_SOCKET_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:}, connectionListener)` 소켓 서버와 웹 소켓 서버를 결합한 다중 프로토콜 소켓 서버를 실행합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/MULTI_PROTOCOL_SOCKET_SERVER.js)


## BROWSER API
* `CONNECT_TO_WEB_SOCKET_SERVER({host:, port:, fixRequestURI:}, {error:, success:})` 웹소켓 서버에 접속합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/BROWSER/CONNECT_TO_WEB_SOCKET_SERVER.js)