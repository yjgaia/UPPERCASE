# UPPERCASE-ROOM
UPPERCASE-ROOM은 [UPPERCASE-CORE](UPPERCASE-CORE.md)에서 지원하는 통신 시스템을 확장하여, 룸이라는 개념으로 모든 통신이 이루어질 수 있도록 만든 모듈입니다.

서버에서 룸을 만들고 특정 룸에 접속한 사람들에게만 메시지를 전달할 수 있습니다. 따라서 상황에 맞는 여러 룸들을 만들어, 룸에 접속한 유저들에게만 필요한 메시지를 전달하는 구조를 쉽게 구현할 수 있습니다.

구동을 위해 [UPPERCASE-COMMON-NODE](UPPERCASE-COMMON-NODE.md)와 [UPPERCASE-COMMON-BROWSER](UPPERCASE-COMMON-BROWSER.md)가 필요합니다.
* [API 문서](../../API/UPPERCASE-ROOM/NODE/README.md)

## 목차
* [사용방법](#사용방법)
* [`LAUNCH_ROOM_SERVER`](#launch_room_server)
* [`CONNECT_TO_ROOM_SERVER`](#connect_to_room_server)
* [`Box.ROOM`](#boxroom)
* [`Box.CLIENT_ROOM`](#boxCLIENT_ROOM)
* [`Box.BROADCAST`](#boxBROADCAST)

## 사용방법

## `LAUNCH_ROOM_SERVER`
룸 서버를 생성하는 클래스

Node.js 환경에서만 사용할 수 있습니다.

사용 가능한 파라미터 목록은 다음과 같습니다.
* `socketServerPort`
* `webSocketServerPort`
* `webServer`

## `CONNECT_TO_ROOM_SERVER`
룸 서버에 접속합니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

`CONNECT_TO_ROOM_SERVER`에 사용 가능한 파라미터 목록은 다음과 같습니다.
* `roomServerName` 접속할 룸 서버의 이름. 여러 룸 서버 접속이 필요한 경우 임의로 지정합니다.
* `isSecure` 웹 브라우저 환경에서만 사용되는 파라미터로, 룸 서버에 WSS 프로토콜을 사용하여 접속할지 여부
* `host` 접속할 룸 서버의 호스트
* `port` 접속할 룸 서버의 포트

## `Box.ROOM`
`ROOM`은 Node.js와 웹 브라우저 환경에서의 사용법이 각각 다릅니다.

### Node.js 환경
* `Box.ROOM(name, () => {})`

룸을 생성합니다.

### 웹 브라우저 환경
* `Box.ROOM(name)`
* `Box.ROOM({roomServerName:, name:})`

서버에 생성된 룸과 통신을 주고받는 `ROOM` 클래스

## `Box.CLIENT_ROOM`
Node.js 환경에서도 룸 서버와 통신을 주고받을 수 있도록 만들어진 `CLIENT_ROOM` 클래스 입니다. 사용 방법은 웹 브라우저 환경에서의 `ROOM` 클래스와 완전히 동일합니다.

## `Box.BROADCAST`
* `BROADCAST({roomName:, methodName:, data:})`

이름이 `roomName`인 모든 룸에 데이터를 전송합니다.

Node.js 환경에서만 사용할 수 있습니다.