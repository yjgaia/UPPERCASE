# `CLASS` box.CLIENT_ROOM
룸 서버와 통신을 주고받는 CLIENT_ROOM 클래스

## Parameters
* `REQUIRED` *nameOrParams*
* `OPTIONAL` *nameOrParams.roomServerName*
* `REQUIRED` *nameOrParams.name*

## Public Members

### `on(methodName, method)`
#### Parameters
* `REQUIRED` *methodName*
* `REQUIRED` *method*

### `off(methodName, method)`
#### Parameters
* `REQUIRED` *methodName*
* `OPTIONAL` *method*

### `send(methodNameOrParams, callback)`
#### Parameters
* `REQUIRED` *methodNameOrParams*
* `REQUIRED` *methodNameOrParams.methodName*
* `REQUIRED` *methodNameOrParams.data*
* `OPTIONAL` *callback*

### `exit()`
