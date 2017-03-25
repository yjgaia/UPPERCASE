# CLASS `box.MODEL(inner, self, params)`
MODEL 클래스

## Mom CLASS
`MODEL`

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.name*
* `OPTIONAL` *params.initData*
* `OPTIONAL` *params.methodConfig*
* `OPTIONAL` *params.isNotUsingObjectId*
* `OPTIONAL` *params.isNotUsingHistory*

## Public Members

### `getName()`

### `getInitData()`

### `getCreateValid()`

### `getUpdateValid()`

### `getDB()`

### `create(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `OPTIONAL` *callbackOrHandlers*

### `get(idOrParams, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *idOrParams*
* `OPTIONAL` *idOrParams.id*
* `OPTIONAL` *idOrParams.filter*
* `OPTIONAL` *idOrParams.sort*
* `OPTIONAL` *idOrParams.isRandom*
* `OPTIONAL` *idOrParams.isToCache*
* `OPTIONAL` *idOrParams.clientInfo*
* `REQUIRED` *callbackOrHandlers*

### `update(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `REQUIRED` *data.id*
* `OPTIONAL` *callbackOrHandlers*

### `updateNoHistory(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `REQUIRED` *data.id*
* `OPTIONAL` *callbackOrHandlers*

### `updateNoRecord(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `REQUIRED` *data.id*
* `OPTIONAL` *callbackOrHandlers*

### `remove(id, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *id*
* `OPTIONAL` *callbackOrHandlers*

### `find(params, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.filter*
* `OPTIONAL` *params.sort*
* `OPTIONAL` *params.start*
* `OPTIONAL` *params.count*
* `OPTIONAL` *params.isFindAll*
* `OPTIONAL` *params.isToCache*
* `REQUIRED` *callbackOrHandlers*

### `count(params, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.filter*
* `OPTIONAL` *params.isToCache*
* `REQUIRED` *callbackOrHandlers*

### `checkIsExists(params, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.filter*
* `OPTIONAL` *params.isToCache*
* `REQUIRED` *callbackOrHandlers*
