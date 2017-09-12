# `CLASS` box.DB
MongoDB 컬렉션을 다루는 DB 클래스

## Parameters
* `REQUIRED` *nameOrParams*
* `OPTIONAL` *nameOrParams.dbServerName*
* `REQUIRED` *nameOrParams.name*
* `OPTIONAL` *nameOrParams.isNotUsingObjectId*
* `OPTIONAL` *nameOrParams.isNotUsingHistory*

## Static Members

### `removeEmptyValues(data)`
#### Parameters
* `REQUIRED` *data*

## Public Members

### `create(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.success*
* `OPTIONAL` *callbackOrHandlers.error*

### `get(idOrParams, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *idOrParams*
* `OPTIONAL` *idOrParams.id*
* `OPTIONAL` *idOrParams.filter*
* `OPTIONAL` *idOrParams.sort*
* `OPTIONAL` *idOrParams.isRandom*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `update(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `REQUIRED` *data.id*
* `OPTIONAL` *data.$inc*
* `OPTIONAL` *data.$push*
* `OPTIONAL` *data.$addToSet*
* `OPTIONAL` *data.$pull*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `updateNoHistory(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `REQUIRED` *data.id*
* `OPTIONAL` *data.$inc*
* `OPTIONAL` *data.$push*
* `OPTIONAL` *data.$addToSet*
* `OPTIONAL` *data.$pull*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.success*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*

### `remove(id, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *id*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `find(params, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.filter*
* `OPTIONAL` *params.sort*
* `OPTIONAL` *params.start*
* `OPTIONAL` *params.count*
* `OPTIONAL` *params.isFindAll*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `findAllAndUpdateNoHistory(params, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.filter*
* `REQUIRED` *params.data*
* `OPTIONAL` *params.data.$inc*
* `OPTIONAL` *params.data.$push*
* `OPTIONAL` *params.data.$addToSet*
* `OPTIONAL` *params.data.$pull*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `count(params, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.filter*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `checkExists(params, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.filter*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `aggregate(params, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `createIndex(index, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *index*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `removeIndex(index, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *index*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `findAllIndexes(callbackOrHandlers)`
#### Parameters
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*
