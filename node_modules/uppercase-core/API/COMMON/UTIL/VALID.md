# `CLASS` VALID
데이터를 검증하고, 어떤 부분이 잘못되었는지 오류를 확인할 수 있는 VALID 클래스

## Parameters
* `REQUIRED` *validDataSet*

## Static Members

### `notEmpty(value)`
#### Parameters
* `REQUIRED` *value*

### `regex(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.value*
* `REQUIRED` *params.pattern*

### `size(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.value*
* `OPTIONAL` *params.min*
* `REQUIRED` *params.max*

### `integer(value)`
#### Parameters
* `REQUIRED` *value*

### `real(value)`
#### Parameters
* `REQUIRED` *value*

### `bool(value)`
#### Parameters
* `REQUIRED` *value*

### `date(value)`
#### Parameters
* `REQUIRED` *value*

### `min(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.value*
* `REQUIRED` *params.min*

### `max(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.value*
* `REQUIRED` *params.max*

### `email(value)`
#### Parameters
* `REQUIRED` *value*

### `png(value)`
#### Parameters
* `REQUIRED` *value*

### `url(value)`
#### Parameters
* `REQUIRED` *value*

### `username(value)`
#### Parameters
* `REQUIRED` *value*

### `mongoId(value)`
check is mongo id.
#### Parameters
* `REQUIRED` *value*

### `one(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.value*
* `REQUIRED` *params.array*

### `array(value)`
#### Parameters
* `REQUIRED` *value*

### `data(value)`
#### Parameters
* `REQUIRED` *value*

### `element(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.array*
* `REQUIRED` *params.validData*
* `OPTIONAL` *params.isToWash*

### `property(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.data*
* `REQUIRED` *params.validData*
* `OPTIONAL` *params.isToWash*

### `detail(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.data*
* `REQUIRED` *params.validDataSet*
* `OPTIONAL` *params.isToWash*
* `OPTIONAL` *params.errors*

### `equal(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.value*
* `REQUIRED` *params.validValue*

## Public Members

### `check(data)`

### `checkAndWash(data)`

### `checkForUpdate(data)`

### `getValidDataSet()`
