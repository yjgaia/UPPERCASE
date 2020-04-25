# `CLASS` SESSION_STORE
세션 저장소 클래스

웹 브라우저가 종료되면 저장된 값들이 삭제됩니다.

## Parameters
* `REQUIRED` *storeName*

## Public Members

### `save(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.name*
* `REQUIRED` *params.value*

### `get(name)`
#### Parameters
* `REQUIRED` *name*

### `remove(name)`
#### Parameters
* `REQUIRED` *name*

### `all()`

### `count()`

### `clear()`
