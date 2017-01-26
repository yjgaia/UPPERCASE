# UPPERCASE-ROOM
UPPERCASE-ROOM은 [UPPERCASE-CORE](UPPERCASE-CORE.md)에서 지원하는 통신 시스템을 확장하여, 룸이라는 개념으로 모든 통신이 이루어질 수 있도록 만든 모듈입니다. 구동을 위해 [UPPERCASE-COMMON-NODE](UPPERCASE-COMMON-NODE.md)와 [UPPERCASE-COMMON-BROWSER](UPPERCASE-COMMON-BROWSER.md)가 필요합니다.
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

## `CONNECT_TO_ROOM_SERVER`
룸 서버에 접속합니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

## `Box.ROOM`
ROOM은 Node.js와 웹 브라우저 환경에서의 사용법이 각각 다릅니다.

### Node.js 환경
룸을 생성합니다.

### 웹 브라우저 환경
룸 서버와 통신을 주고받는 `ROOM` 클래스

## `Box.CLIENT_ROOM`
Node.js 환경에서도 룸 서버와 통신을 주고받을 수 있도록 만들어진 `CLIENT_ROOM` 클래스 입니다. 사용 방법은 웹 브라우저 환경에서의 `ROOM` 클래스와 완전히 동일합니다.

## `Box.BROADCAST`
주어진 이름을 가진 모든 룸에 데이터를 전송합니다.

Node.js 환경에서만 사용할 수 있습니다.