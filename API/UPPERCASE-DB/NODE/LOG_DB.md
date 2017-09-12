# `CLASS` box.LOG_DB
로그를 저장하는 기능을 제공하는 LOG_DB 클래스

## Parameters
* `REQUIRED` *nameOrParams*
* `OPTIONAL` *nameOrParams.dbServerName*
* `REQUIRED` *nameOrParams.name*

## Public Members

### `log(data)`
#### Parameters
* `REQUIRED` *data*

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
