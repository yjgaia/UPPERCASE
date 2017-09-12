# `METHOD` CONNECT_TO_ROOM_SERVER
룸 서버에 접속합니다.

## Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.roomServerName*
* `REQUIRED` *params.host*
* `REQUIRED` *params.port*
* `OPTIONAL` *connectionListenerOrListeners*
* `OPTIONAL` *connectionListenerOrListeners.success*
* `OPTIONAL` *connectionListenerOrListeners.error*

## Static Members

### `checkIsConnected(roomServerName)`
#### Parameters
* `OPTIONAL` *roomServerName*

### `enterRoom(params)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.roomServerName*
* `REQUIRED` *params.roomName*

### `on(params, method)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.roomServerName*
* `REQUIRED` *params.methodName*
* `REQUIRED` *method*

### `off(params, method)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.roomServerName*
* `REQUIRED` *params.methodName*
* `OPTIONAL` *method*

### `send(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.roomServerName*
* `REQUIRED` *params.methodName*
* `REQUIRED` *params.data*
* `OPTIONAL` *callback*

### `exitRoom(params)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.roomServerName*
* `REQUIRED` *params.roomName*
