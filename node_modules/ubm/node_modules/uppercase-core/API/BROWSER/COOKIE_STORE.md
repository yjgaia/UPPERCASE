# `CLASS` COOKIE_STORE
쿠키 저장소 클래스

쿠키에 데이터를 저장할 수 있는 클래스 입니다.
domain 파라미터를 통해 쿠키를 불러 올 수 있는 도메인 범위를 지정할 수 있습니다.
웹 브라우저가 종료되어도 저장된 값들이 보존됩니다.

## Parameters
* `REQUIRED` *storeNameOrParams*
* `REQUIRED` *storeNameOrParams.storeName*
* `OPTIONAL` *storeNameOrParams.domain*

## Public Members

### `save(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.name*
* `REQUIRED` *params.value*
* `OPTIONAL` *params.isToSession*
* `OPTIONAL` *params.expireTime*

### `get(name)`
#### Parameters
* `REQUIRED` *name*

### `remove(name)`
#### Parameters
* `REQUIRED` *name*

### `all()`

### `count()`

### `clear()`
