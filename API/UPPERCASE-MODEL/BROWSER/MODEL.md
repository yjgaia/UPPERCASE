# `CLASS` box.MODEL
MODEL 클래스

## Mom CLASS
`MODEL`

## Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.roomServerName*
* `REQUIRED` *params.name*
* `OPTIONAL` *params.initData*
* `OPTIONAL` *params.methodConfig*
* `OPTIONAL` *params.methodConfig.create*
* `OPTIONAL` *params.methodConfig.create.valid*
* `OPTIONAL` *params.methodConfig.get*
* `OPTIONAL` *params.methodConfig.update*
* `OPTIONAL` *params.methodConfig.update.valid*
* `OPTIONAL` *params.methodConfig.remove*
* `OPTIONAL` *params.methodConfig.find*
* `OPTIONAL` *params.methodConfig.count*
* `OPTIONAL` *params.methodConfig.checkExists*
* `OPTIONAL` *params.isNotUsingObjectId*

## Static Members

### `getOnNewInfos()`

## Public Members

### `getName()`

### `getInitData()`

### `getCreateValid()`

### `getUpdateValid()`

### `getRoom()`

### `onNew(properties, handler)`
#### Parameters
* `OPTIONAL` *properties*
* `REQUIRED` *handler*

### `onNewWatching(properties, handler)`
#### Parameters
* `OPTIONAL` *properties*
* `REQUIRED` *handler*

### `onRemove(properties, handler)`
#### Parameters
* `OPTIONAL` *properties*
* `REQUIRED` *handler*
