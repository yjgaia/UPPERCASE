# `CLASS` box.DB
MongoDB 컬렉션을 다루는 DB 클래스

## Parameters
* `REQUIRED` nameOrParams 
* `OPTIONAL` nameOrParams.dbServerName 
* `REQUIRED` nameOrParams.name 
* `OPTIONAL` nameOrParams.isNotUsingObjectId 
* `OPTIONAL` nameOrParams.isNotUsingHistory 

## Static Members

### removeEmptyValues
###### Parameters
* `REQUIRED` data 

## Public Members

### create
###### Parameters
* `REQUIRED` data
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### get
###### Parameters
* `OPTIONAL` idOrParams
* `OPTIONAL` idOrParams.id
* `OPTIONAL` idOrParams.filter
* `OPTIONAL` idOrParams.sort
* `OPTIONAL` idOrParams.isRandom
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.error
* `OPTIONAL` callbackOrHandlers.success

### update
###### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` data.$inc
* `OPTIONAL` data.$push
* `OPTIONAL` data.$addToSet
* `OPTIONAL` data.$pull
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.error
* `OPTIONAL` callbackOrHandlers.success

### updateNoHistory
###### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` data.$inc
* `OPTIONAL` data.$push
* `OPTIONAL` data.$addToSet
* `OPTIONAL` data.$pull
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.error

### updateNoRecord
###### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` data.$inc
* `OPTIONAL` data.$push
* `OPTIONAL` data.$addToSet
* `OPTIONAL` data.$pull
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.error

### remove
###### Parameters
* `REQUIRED` id
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.error
* `OPTIONAL` callbackOrHandlers.success

### find
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.sort
* `OPTIONAL` params.start
* `OPTIONAL` params.count
* `OPTIONAL` params.isFindAll
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.error
* `REQUIRED` callbackOrHandlers.success

### count
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.error
* `REQUIRED` callbackOrHandlers.success

### checkIsExists
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.error
* `REQUIRED` callbackOrHandlers.success

### aggregate
###### Parameters
* `REQUIRED` params
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.error
* `REQUIRED` callbackOrHandlers.success

### createIndex
###### Parameters
* `REQUIRED` index
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.error
* `REQUIRED` callbackOrHandlers.success

### removeIndex
###### Parameters
* `REQUIRED` index
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.error
* `REQUIRED` callbackOrHandlers.success

### findAllIndexes
###### Parameters
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.error
* `REQUIRED` callbackOrHandlers.success
