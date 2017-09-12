# `CLASS` SHARED_STORE
클러스터링 공유 저장소를 생성하는 클래스

## Parameters
* `REQUIRED` *storeName*

## Static Members

### `getStorages()`

### `save(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.storeName*
* `REQUIRED` *params.id*
* `REQUIRED` *params.data*
* `OPTIONAL` *params.removeAfterSeconds*
* `OPTIONAL` *callback*

### `update(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.storeName*
* `REQUIRED` *params.id*
* `REQUIRED` *params.data*
* `OPTIONAL` *params.data.$inc*
* `OPTIONAL` *params.data.$push*
* `OPTIONAL` *params.data.$addToSet*
* `OPTIONAL` *params.data.$pull*
* `OPTIONAL` *params.removeAfterSeconds*
* `OPTIONAL` *callback*

### `get(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.storeName*
* `REQUIRED` *params.id*
* `REQUIRED` *callback*

### `remove(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.storeName*
* `REQUIRED` *params.id*
* `OPTIONAL` *callback*

### `all(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.storeName*
* `OPTIONAL` *params.filter*
* `REQUIRED` *callback*

### `count(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.storeName*
* `OPTIONAL` *params.filter*
* `REQUIRED` *callback*

### `checkExists(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.storeName*
* `OPTIONAL` *params.id*
* `OPTIONAL` *params.filter*
* `REQUIRED` *callback*

### `clear(storeName, callback)`
#### Parameters
* `REQUIRED` *storeName*
* `OPTIONAL` *callback*

## Public Members

### `save(params, callback)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.id*
* `REQUIRED` *params.data*
* `OPTIONAL` *params.removeAfterSeconds*
* `OPTIONAL` *callback*

### `update(params, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.id*
* `REQUIRED` *params.data*
* `OPTIONAL` *params.data.$inc*
* `OPTIONAL` *params.data.$push*
* `OPTIONAL` *params.data.$addToSet*
* `OPTIONAL` *params.data.$pull*
* `OPTIONAL` *params.removeAfterSeconds*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.success*

### `get(id, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *id*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.success*

### `remove(id, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *id*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.success*

### `all(filter, callback)`
#### Parameters
* `OPTIONAL` *filter*
* `REQUIRED` *callback*

### `count(filter, callback)`
#### Parameters
* `OPTIONAL` *filter*
* `REQUIRED` *callback*

### `checkExists(idOrFilter, callback)`
#### Parameters
* `REQUIRED` *idOrFilter*
* `REQUIRED` *callback*

### `clear(callback)`
#### Parameters
* `OPTIONAL` *callback*
