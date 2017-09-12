# `CLASS` box.ROOM
서버에 생성된 룸과 통신을 주고받는 ROOM 클래스

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
* `OPTIONAL` *methodNameOrParams.data*
* `OPTIONAL` *callback*

### `exit()`
