# `CLASS` LAUNCH_ROOM_SERVER
룸 서버를 생성하는 클래스

## Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.socketServerPort* TCP 소켓 기반으로 룸 서버를 생성하기 위한 포트 번호
* `OPTIONAL` *params.webServer* 웹소켓 기반으로 룸 서버를 생성하기 위한 웹 서버

## Static Members

### `addInitRoomFunc(roomName, initRoomFunc)`
#### Parameters
* `REQUIRED` *roomName*
* `REQUIRED` *initRoomFunc*

### `broadcast(params, toExceptSend)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.roomName*
* `REQUIRED` *params.methodName*
* `OPTIONAL` *params.data*
* `OPTIONAL` *toExceptSend*
