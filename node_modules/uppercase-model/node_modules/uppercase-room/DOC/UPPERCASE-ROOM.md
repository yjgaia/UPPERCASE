# UPPERCASE-ROOM
UPPERCASE-ROOM은 [UPPERCASE-CORE](UPPERCASE-CORE.md)에서 지원하는 통신 시스템을 확장하여, 룸이라는 개념으로 모든 통신이 이루어질 수 있도록 만든 모듈입니다.

서버에서 룸을 만들고 특정 룸에 접속한 사람들에게만 메시지를 전달할 수 있습니다. 따라서 상황에 맞는 여러 룸들을 만들어, 룸에 접속한 유저들에게만 필요한 메시지를 전달하는 구조를 쉽게 구현할 수 있습니다.

구동을 위해 [UPPERCASE-COMMON-NODE](UPPERCASE-COMMON-NODE.md)와 [UPPERCASE-COMMON-BROWSER](UPPERCASE-COMMON-BROWSER.md)가 필요합니다.
* [API 문서](../../API/UPPERCASE-ROOM/README.md)

## 목차
* [사용방법](#사용방법)
* [`LAUNCH_ROOM_SERVER`](#launch_room_server)
* [`CONNECT_TO_ROOM_SERVER`](#connect_to_room_server)
* [`Box.ROOM`](#boxroom)
* [`Box.CLIENT_ROOM`](#boxCLIENT_ROOM)
* [`Box.BROADCAST`](#boxBROADCAST)

## 사용방법
UPPERCASE 프로젝트 내 `UPPERCASE-ROOM` 폴더를 복사하여 사용하거나, `npm`으로 설치하여 사용합니다.

### `UPPERCASE-ROOM` 폴더를 복사하는 경우
```javascript
require('./UPPERCASE-CORE/NODE.js');
require('./UPPERCASE-ROOM/NODE.js');
```

### `npm`을 사용하는 경우
[![npm](https://img.shields.io/npm/v/uppercase-room.svg)](https://www.npmjs.com/package/uppercase-room)
```
npm install uppercase-room
```
```javascript
require('uppercase-room');
```

## `LAUNCH_ROOM_SERVER`
룸 서버를 생성하는 클래스

Node.js 환경에서만 사용할 수 있습니다.

```javascript
let webServer = WEB_SERVER(9127);

LAUNCH_ROOM_SERVER({
	socketServerPort : 9126,
	webServer : webServer
});
```

`LAUNCH_ROOM_SERVER`에 사용 가능한 파라미터 목록은 다음과 같습니다.
* `socketServerPort` TCP 소켓 기반으로 룸 서버를 생성하기 위한 포트 번호
* `webServer` 웹소켓 기반으로 룸 서버를 생성하기 위한 웹 서버

## `CONNECT_TO_ROOM_SERVER`
룸 서버에 접속합니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

```javascript
CONNECT_TO_ROOM_SERVER({
	host : '127.0.0.1',
	port : 9127
}, () => {
	console.log('룸 서버에 접속되었습니다.');
});
```

여러 룸 서버에 접속하는 경우, `roomServerName`을 지정합니다.
```javascript
CONNECT_TO_ROOM_SERVER({
	roomServerName : 'ROOM_SERVER_1',
	host : '111.111.111.111',
	port : 9127
}, () => {
	console.log('첫번째 룸 서버에 접속되었습니다.');
});

CONNECT_TO_ROOM_SERVER({
	roomServerName : 'ROOM_SERVER_2',
	host : '222.222.222.222',
	port : 9128
}, () => {
	console.log('두번째 룸 서버에 접속되었습니다.');
});
```

`CONNECT_TO_ROOM_SERVER`에 사용 가능한 파라미터 목록은 다음과 같습니다.
* `roomServerName` 접속할 룸 서버의 이름. 여러 룸 서버 접속이 필요한 경우 임의로 지정합니다.
* `isSecure` 웹 브라우저 환경에서만 사용되는 파라미터로, 룸 서버에 WSS 프로토콜을 사용하여 접속할지 여부
* `host` 접속할 룸 서버의 호스트
* `port` 접속할 룸 서버의 포트. Node.js 환경에서는 `socketServerPort`로 설정한 소켓 서버의 포트 번호, 웹 브라우저 환경에서는 웹 서버의 포트 번호에 해당합니다.

## `Box.ROOM`
`ROOM`은 Node.js와 웹 브라우저 환경에서의 사용법이 각각 다릅니다.

### Node.js 환경
* `Box.ROOM(name, () => {})`

룸을 생성합니다.

```javascript
// 서버에 룸을 생성합니다.
TestBox.ROOM('testRoom', (clientInfo, on, off, send, broadcastExceptMe) => {
	// clientInfo는 클라이언트의 정보를 가지고 있습니다.
	// send는 현재 접속한 클라이언트에게 데이터를 전송합니다.
	// broadcastExceptMe는 현재 접속한 클라이언트를 제외하고 해당 룸에 접속한 모든 클라이언트들에게 데이터를 전송합니다. - broadcastExceptMe({methodName:, data:})
	
	// 특정 method name으로 클라이언트에서 데이터를 보내게 되면, 여기에서 받게 됩니다.
	on(methodName, (data, ret) => {
	
		// data가 undefined인 경우에는 무시합니다.
		if (data !== undefined) {
			
			...
			// 클라이언트에 응답합니다.
			ret(resultData);
		}
	});
	
	// 더 이상 데이터를 받지 않습니다.
	off(methodName);
	
	// 연결이 끊어졌을 때
	on('__DISCONNECTED', () => {
		...
	});
});
```

#### 주의사항
`on`으로 클라이언트에서 받은 데이터를 다룰 때, 데이터가 `undefined`일 수도 있음을 유의하시기 바랍니다. 따라서 데이터가 반드시 필요한 로직을 구성할 때에는 다음과 같이 `undefined`를 무시하는 코드를 작성해야 합니다.

```javascript
on(methodName, (data, ret) => {

	// data가 undefined인 경우에는 무시합니다.
	if (data !== undefined) {
		...
	}
});
```

### 웹 브라우저 환경
* `Box.ROOM(name)`
* `Box.ROOM({roomServerName:, name:})`

서버에 생성된 룸과 통신을 주고받는 `ROOM` 클래스

```javascript
// 룸에 접속합니다.
let room = TestBox.ROOM('testRoom');

// 특정 method name으로 서버측 룸에서 데이터를 보내게 되면, 여기에서 받게 됩니다.
room.on(methodName, (data) => {
	...
});

// 더 이상 데이터를 받지 않습니다.
room.off(methodName);

// 서버측 룸에 데이터를 전송하고, 서버측 룸으로부터 응답을 받아옵니다.
room.send({methodName:, data:}, (data) => {
	...
});

// 룸에서 나옵니다. 이 이후에는 해당 룸에서 더 이상 데이터를 주고받을 수 없습니다.
room.exit();
```

여러 룸 서버에 접속하는 경우, `roomServerName`를 지정하여 연결할 룸 서버를 선택합니다.

```javascript
let room1 = TestBox.ROOM({
	roomServerName : 'ROOM_SERVER_1',
	name : 'testRoom'
});

let room2 = TestBox.ROOM({
	roomServerName : 'ROOM_SERVER_2',
	name : 'testRoom'
});
```

## `Box.CLIENT_ROOM`
* `Box.CLIENT_ROOM(name)`
* `Box.CLIENT_ROOM({roomServerName:, name:})`

Node.js 환경에서도 룸 서버와 통신을 주고받을 수 있도록 만들어진 `CLIENT_ROOM` 클래스 입니다. 사용 방법은 웹 브라우저 환경에서의 `ROOM` 클래스와 동일합니다.

```javascript
let room = TestBox.CLIENT_ROOM('testRoom');
```

## `Box.BROADCAST`
* `Box.BROADCAST({roomName:, methodName:, data:})`

이름이 `roomName`인 룸에 접속한 모든 클라이언트에게 데이터를 전송합니다.

Node.js 환경에서만 사용할 수 있습니다.

```javascript
TestBox.BROADCAST({
	roomName : 'testRoom',
	methodName : methodName,
	data : data
});
```