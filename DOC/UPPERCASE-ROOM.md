# UPPERCASE-ROOM
통신 처리를 룸 방식으로 처리하는 모듈입니다. 서버에서 룸을 만들고, 특정 룸에 접속한 사람들에게만 메시지를 전달할 수 있습니다. 따라서 특징에 맞는 여러 룸을 만들어 각각에 접속한 유저들에게 필요한 메시지를 전달하는 프로젝트 구조를 설계할 수 있습니다.

## NODE API
* `LAUNCH_ROOM_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:})` 룸 서버를 실행하는 클래스입니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
* `ROOM(name, connectionListener)` 룸을 생성합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
```javascript
TestBox.ROOM('testRoom', function(clientInfo, on, off) {
	
	on(methodName, function(data, ret) {
	
		// ignore undefined data attack.
		if (data !== undefined) {
			
			...
			// ret(..); is necessary.
			ret(resultData);
		}
	});
	
	off(methodName);
});
```
* `BROADCAST({roomName:, methodName:, data:})` 특정 룸에 접속한 사람들에게 메시지를 전송합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
* `CONNECT_TO_ROOM_SERVER({host:, port:}, function(on, off, send) {...})` `CONNECT_TO_ROOM_SERVER({name:, host:, port:}, function(on, off, send) {...})` 룸 서버에 접속합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/ROOM/NODE/CONNECT/CONNECT_TO_ROOM_SERVER.js)
* `CLIENT_ROOM(name)` `CLIENT_ROOM({roomServerName:, name:})` 룸에 접속합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/ROOM/NODE/CLIENT_ROOM.js)
```javascript
room = TestBox.CLIENT_ROOM('testRoom');
room.on(methodName, function(data) {...})
room.off(methodName)
room.send(methodName, function(data) {...})
room.exit()
```

`CONNECT_TO_ROOM_SERVER`의 `name`을 지정하면, 여러 룸 서버에 접속할 수 있습니다. `CLIENT_ROOM`의 `roomServerName` 설정으로 룸이 연결될 룸 서버를 선택할 수 있습니다.

### 룸 서버의 접속사 수 가져오기 예제
```javascript
TestBox.ConnectionRoom = OBJECT({
	
	init : function() {
		'use strict';
		
		var
		// connection db
		connectionDB = TestBox.SHARED_DB('connectionDB');
		
		// 초기화
		connectionDB.save({
			id : 'connectionCountInfo',
			data : {
				count : 0
			}
		});
		
		// 룸 생성
		TestBox.ROOM('connectionRoom', function(clientInfo, on, off) {
			
			// 새로운 유저 접속 시 count를 1 올림
			connectionDB.update({
				id : 'connectionCountInfo',
				data : {
					$inc : {
						count : 1
					}
				}
			});
			
			// 새 유저가 접속했음을 클라이언트에 알림
			TestBox.BROADCAST({
				roomName : 'connectionRoom',
				methodName : 'newUser'
			});
			
			// 접속이 끊어질 경우
			on('__DISCONNECTED', function() {
				
				// count를 1 내림
				connectionDB.update({
					id : 'connectionCountInfo',
					data : {
						$inc : {
							count : -1
						}
					}
				});
				
				// 유저가 접속을 끊었음을 클라이언트에 알림
				HanulWiki.BROADCAST({
					roomName : 'connectionRoom',
					methodName : 'leaveUser'
				});
			});
			
			// 접속자 수 전송
			on('getConnectionCount', function(notUsing, ret) {
				ret(connectionDB.get('connectionCountInfo').count);
			});
		});
	}
});
```

### 주의사항
`on`으로 클라이언트에서 넘어온 값을 다룰 때, `undefined`가 넘어올 수 있음을 유의하시기 바랍니다. 따라서 값이 반드시 필요한 로직을 구성할 때에는 다음과 같이 `undefined`를 무시하는 코드를 작성합니다.

```javascript
on(methodName, function(data, ret) {

	// ignore undefined data attack.
	if (data !== undefined) {
		...
	}
});
```

## BROWSER API
* `CONNECT_TO_ROOM_SERVER({port:}, function(on, off, send) {...})` `CONNECT_TO_ROOM_SERVER({host:, port:}, function(on, off, send) {...})` `CONNECT_TO_ROOM_SERVER({name:, host:, port:}, function(on, off, send) {...})` 룸 서버에 접속합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/ROOM/BROWSER/CONNECT/CONNECT_TO_ROOM_SERVER.js)
* `ROOM(name)` `ROOM({roomServerName:, name:})` 룸에 접속합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/ROOM/CLIENT/ROOM.js)
```javascript
room = TestBox.ROOM('testRoom');
room.on(methodName, function(data) {...})
room.off(methodName)
room.send(methodName, function(data) {...})
room.exit()
```

`CONNECT_TO_ROOM_SERVER`의 `name`을 지정하면, 여러 룸 서버에 접속할 수 있습니다. `ROOM`의 `roomServerName` 설정으로 룸이 연결될 룸 서버를 선택할 수 있습니다.


## UPPERCASE-ROOM 단독 사용
`UPPERCASE-ROOM`은 `UPPERCASE`에 포함되어 있으나, 단독으로 사용할 수도 있습니다.

### 의존 모듈
`UPPERCASE-ROOM`은 아래 모듈들에 의존성을 가지므로, 단독으로 사용할 경우 `UPPERCASE-ROOM` 폴더와 함께 아래 모듈들을 복사해서 사용하시기 바랍니다.
* UPPERCASE-TRANSPORT
* UPPERCASE.JS-COMMON.js
* UPPERCASE.JS-NODE.js
* UPPERCASE.JS-BROWSER.js
* UPPERCASE.JS-BROWSER-FIX

## 사용 방법
### 룸 서버와 룸 생성
```javascript
// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE-TRANSPORT.
require('../../../UPPERCASE-TRANSPORT/NODE.js');

// load UPPERCASE-ROOM.
require('../../../UPPERCASE-ROOM/NODE.js');

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

## 룸 서버 접속 및 룸 접속
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

<!-- import UPPERCASE-TRANSPORT -->
<script src="UPPERCASE-TRANSPORT/BROWSER.js"></script>

<!-- import UPPERCASE-ROOM -->
<script src="UPPERCASE-ROOM/BROWSER.js"></script>

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
