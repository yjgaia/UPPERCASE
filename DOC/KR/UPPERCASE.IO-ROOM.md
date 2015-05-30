# UPPERCASE.IO-ROOM
통신 처리를 룸 방식으로 처리하는 모듈입니다. 서버에서 룸을 만들고, 특정 룸에 접속한 사람들에게만 메시지를 전달할 수 있습니다. 따라서 특징에 맞는 여러 룸을 만들어 각각에 접속한 유저들에게 필요한 메시지를 전달하는 프로젝트 구조를 설계할 수 있습니다.

## 룸 서버와 룸 생성 방법
`UPPERCASE.IO-ROOM`은 `UPPERCASE.JS`와 `UPPERCASE.IO-TRANSPORT`를 기반으로 합니다.

```javascript
// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-TRANSPORT.
require('../../../UPPERCASE.IO-TRANSPORT/NODE.js');

// load UPPERCASE.IO-ROOM.
require('../../../UPPERCASE.IO-ROOM/NODE.js');

var
// web socket fix request
webSocketFixRequest,

// web server
webServer = WEB_SERVER(9127, function(requestInfo, response, onDisconnected) {

	// serve web socket fix request
	if (requestInfo.uri === '__WEB_SOCKET_FIX') {

		webSocketFixRequest(requestInfo, {
			response : response,
			onDisconnected : onDisconnected
		});
	}
});

LAUNCH_ROOM_SERVER({
	socketServerPort : 9126,
	webServer : webServer,
	isCreateWebSocketFixRequestManager : true
});

BOX('TestBox');

TestBox.ROOM('testRoom', function(clientInfo, on, off) {

	on('msg', function(data, ret) {

		console.log(data);
		
		// ignore undefined data attack.
		if (data !== undefined) {

			TestBox.BROADCAST({
				roomName : 'testRoom',
				methodName : 'msg',
				data : {
					result : 'good!',
					test : new Date()
				}
			});

			ret({
				result : 'good!'
			});
		}
	});
});

// init all singleton classes.
INIT_OBJECTS();
```

## 룸 서버와 룸에 접속하는 방법
`UPPERCASE.IO-ROOM`은 `UPPERCASE.JS`와 `UPPERCASE.IO-TRANSPORT`를 기반으로 합니다.

```html
<!-- import UPPERCASE.JS -->
<script src="UPPERCASE.JS-COMMON.js"></script>
<script src="UPPERCASE.JS-BROWSER.js"></script>
<script>
	BROWSER_CONFIG.fixScriptsFolderPath = 'UPPERCASE.JS-BROWSER-FIX';
	LOAD('UPPERCASE.JS-BROWSER-FIX/FIX.js');
</script>

<!-- import UPPERCASE.IO-TRANSPORT -->
<script src="UPPERCASE.IO-TRANSPORT/BROWSER.js"></script>

<!-- import UPPERCASE.IO-ROOM -->
<script src="UPPERCASE.IO-ROOM/BROWSER.js"></script>

<script>
	READY(function() {
	
    	// init all singleton classes.
		INIT_OBJECTS();
		
		BOX('TestBox');

		CONNECT_TO_ROOM_SERVER({
    		port : 9127,
    		fixRequestURI : '__WEB_SOCKET_FIX'
    	}, function() {
    
    		var
    		// room
    		room = TestBox.ROOM('testRoom');
    		
    		room.on('msg', function(data) {
    			console.log(data);
    		});
    
    		DELAY(1, function() {
    		
    			room.send({
    				methodName : 'msg',
    				data : {
    					test2 : 'Hello, Test!',
    					date : new Date()
    				}
    			}, function(result) {
    				console.log(result);
    			});
    		});
    	});
	});
</script>
```

## NODE API
* `LAUNCH_ROOM_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:})` 룸 서버를 실행하는 클래스입니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
* `ROOM(name, connectionListener)` 룸을 생성합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
```javascript
TestBox.ROOM('testRoom', function(clientInfo, on, off) {
    on(methodName, function(data, ret) {
    	...
    	// ret(..); is necessary.
        ret(resultData);
    });
    off(methodName);
});
```
* `BROADCAST({roomName:, methodName:, data:})` 특정 룸에 접속한 사람들에게 메시지를 전송합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)

## BROWSER API
* `CONNECT_TO_ROOM_SERVER({methodName:, data:})` * `CONNECT_TO_ROOM_SERVER({methodName:, data:}, function(on, off, send) {...})` 룸 서버에 접속합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/BROWSER/CONNECT/CONNECT_TO_ROOM_SERVER.js)
* `ROOM(name)` 룸에 접속합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/CLIENT/ROOM.js)
```javascript
room = TestBox.ROOM('testRoom');
room.on(methodName, function(data) {...})
room.off(methodName)
room.send(methodName, function(data) {...})
room.exit()
```
