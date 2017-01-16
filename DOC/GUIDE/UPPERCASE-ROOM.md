# UPPERCASE-ROOM
UPPERCASE-ROOM은 룸 방식으로 통신을 처리하기 위해 필요한 기능들을 담고 있는 모듈입니다. 구동을 위해 [UPPERCASE-COMMON-NODE](UPPERCASE-COMMON-NODE.md)와 [UPPERCASE-COMMON-BROWSER](UPPERCASE-COMMON-BROWSER.md)가 필요합니다.
* [API 문서](../../API/UPPERCASE-ROOM/NODE/README.md)

## 목차
* [사용방법](#사용방법)
* [`LAUNCH_ROOM_SERVER`](#launch_room_server)
* [`ROOM`](#room)
* [`CLIENT_ROOM`](#CLIENT_ROOM)
* [`BROADCAST`](#BROADCAST)

## 사용방법

## `LAUNCH_ROOM_SERVER`
룸 서버를 생성하는 클래스

Node.js 환경에서만 사용할 수 있습니다.

## `CONNECT_TO_ROOM_SERVER`
룸 서버에 접속합니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

## `ROOM`
ROOM은 Node.js와 웹 브라우저 환경에서의 사용법이 각각 다릅니다.

### Node.js 환경
룸을 생성합니다.

### 웹 브라우저 환경
룸 서버와 통신을 주고받는 `ROOM` 클래스

## `CLIENT_ROOM`
Node.js 환경에서도 룸 서버와 통신을 주고받을 수 있도록 만들어진 `CLIENT_ROOM` 클래스 입니다. 사용 방법은 웹 브라우저 환경에서의 `ROOM` 클래스와 완전히 동일합니다.

## `BROADCAST`
주어진 이름을 가진 모든 룸에 데이터를 전송합니다.

Node.js 환경에서만 사용할 수 있습니다.