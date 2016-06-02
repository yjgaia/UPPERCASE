# `CLASS` box.DB
MongoDB collection wrapper class

## Parameters
* `REQUIRED` nameOrParams 
* `REQUIRED` nameOrParams.name 
* `OPTIONAL` nameOrParams.isNotUsingObjectId 
* `OPTIONAL` nameOrParams.isNotUsingHistory 

## Static Members

### removeEmptyValues
remove empty values.
###### Parameters
* `REQUIRED` data 

## Public Members

### create
create data.
###### Parameters
* `REQUIRED` data
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### get
get data.
###### Parameters
* `OPTIONAL` idOrParams
* `OPTIONAL` idOrParams.id
* `OPTIONAL` idOrParams.filter
* `OPTIONAL` idOrParams.sort
* `OPTIONAL` idOrParams.isRandom
* `OPTIONAL` idOrParams.isToCache
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.error

### update
update data.
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

### updateNoHistory
update data, but not save history
###### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` data.$inc
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.error

### remove
remove data.
###### Parameters
* `REQUIRED` id
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.error

### find
find data set.
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.sort
* `OPTIONAL` params.start
* `OPTIONAL` params.count
* `OPTIONAL` params.isFindAll
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### count
count data set.
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### checkIsExists
check is exists.
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### aggregate
aggregate.
###### Parameters
* `REQUIRED` params
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### createIndex
create index.
###### Parameters
* `REQUIRED` keys
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### removeIndex
remove index.
###### Parameters
* `REQUIRED` index
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### findAllIndexes
find all indexes
###### Parameters
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error
