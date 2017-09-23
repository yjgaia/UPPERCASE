# `CLASS` box.MODEL
MODEL 클래스

## Mom CLASS
`MODEL`

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.name*
* `OPTIONAL` *params.initData*
* `OPTIONAL` *params.methodConfig*
* `OPTIONAL` *params.methodConfig.create*
* `OPTIONAL` *params.methodConfig.create.valid*
* `OPTIONAL` *params.methodConfig.create.role*
* `OPTIONAL` *params.methodConfig.create.authKey*
* `OPTIONAL` *params.methodConfig.create.adminRole*
* `OPTIONAL` *params.methodConfig.get*
* `OPTIONAL` *params.methodConfig.get.role*
* `OPTIONAL` *params.methodConfig.update*
* `OPTIONAL` *params.methodConfig.update.valid*
* `OPTIONAL` *params.methodConfig.update.role*
* `OPTIONAL` *params.methodConfig.update.authKey*
* `OPTIONAL` *params.methodConfig.update.adminRole*
* `OPTIONAL` *params.methodConfig.remove*
* `OPTIONAL` *params.methodConfig.remove.role*
* `OPTIONAL` *params.methodConfig.remove.authKey*
* `OPTIONAL` *params.methodConfig.remove.adminRole*
* `OPTIONAL` *params.methodConfig.find*
* `OPTIONAL` *params.methodConfig.find.role*
* `OPTIONAL` *params.methodConfig.count*
* `OPTIONAL` *params.methodConfig.count.role*
* `OPTIONAL` *params.methodConfig.checkExists*
* `OPTIONAL` *params.methodConfig.checkExists.role*
* `OPTIONAL` *params.isNotUsingObjectId*
* `OPTIONAL` *params.isNotUsingHistory*
* `OPTIONAL` *params.isNotToInitialize*

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
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.notValid*
* `OPTIONAL` *callbackOrHandlers.success*

### `get(idOrParams, callbackOrHandlers)`
#### Parameters
* `OPTIONAL` *idOrParams*
* `OPTIONAL` *idOrParams.id*
* `OPTIONAL` *idOrParams.filter*
* `OPTIONAL` *idOrParams.sort*
* `OPTIONAL` *idOrParams.isRandom*
* `OPTIONAL` *idOrParams.clientInfo*
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.success*

### `update(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `REQUIRED` *data.id*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.notValid*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.success*

### `updateNoHistory(data, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *data*
* `REQUIRED` *data.id*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.notValid*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.success*

### `remove(id, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *id*
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.notExists*
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
