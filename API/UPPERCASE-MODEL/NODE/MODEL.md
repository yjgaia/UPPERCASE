# `CLASS` box.MODEL
MODEL 클래스

## Mom
origin

## Parameters
* `REQUIRED` params 
* `REQUIRED` params.name 
* `OPTIONAL` params.initData 
* `OPTIONAL` params.methodConfig 
* `OPTIONAL` params.isNotUsingObjectId 
* `OPTIONAL` params.isNotUsingHistory 

## Static Members
No static members.

## Public Members

### getName
#### Parameters
No parameters.

### getInitData
#### Parameters
No parameters.

### getCreateValid
#### Parameters
No parameters.

### getUpdateValid
#### Parameters
No parameters.

### getDB
#### Parameters
No parameters.

### create
#### Parameters
* `REQUIRED` data
* `OPTIONAL` callbackOrHandlers

### get
#### Parameters
* `OPTIONAL` idOrParams
* `OPTIONAL` idOrParams.id
* `OPTIONAL` idOrParams.filter
* `OPTIONAL` idOrParams.sort
* `OPTIONAL` idOrParams.isRandom
* `OPTIONAL` idOrParams.isToCache
* `OPTIONAL` idOrParams.clientInfo
* `REQUIRED` callbackOrHandlers

### update
#### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` callbackOrHandlers

### updateNoHistory
#### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` callbackOrHandlers

### updateNoRecord
#### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` callbackOrHandlers

### remove
#### Parameters
* `REQUIRED` id
* `OPTIONAL` callbackOrHandlers

### find
#### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.sort
* `OPTIONAL` params.start
* `OPTIONAL` params.count
* `OPTIONAL` params.isFindAll
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers

### count
#### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers

### checkIsExists
#### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers
