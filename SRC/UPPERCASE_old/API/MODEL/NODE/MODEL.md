# `CLASS` box.MODEL
Model(include CRUD functions) class

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
get name.
###### Parameters
No parameters.

### getInitData
get init data.
###### Parameters
No parameters.

### getCreateValid
get create valid.
###### Parameters
No parameters.

### getUpdateValid
get update valid.
###### Parameters
No parameters.

### getDB
get db.
###### Parameters
No parameters.

### create
create.
###### Parameters
* `REQUIRED` data
* `OPTIONAL` callbackOrHandlers

### get
get.
###### Parameters
* `OPTIONAL` idOrParams
* `OPTIONAL` idOrParams.id
* `OPTIONAL` idOrParams.filter
* `OPTIONAL` idOrParams.sort
* `OPTIONAL` idOrParams.isRandom
* `OPTIONAL` idOrParams.isToCache
* `OPTIONAL` idOrParams.clientInfo
* `REQUIRED` callbackOrHandlers

### update
update.
###### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` callbackOrHandlers

### updateNoHistory
update no history.
###### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` callbackOrHandlers

### updateNoRecord
update no record.
###### Parameters
* `REQUIRED` data
* `REQUIRED` data.id
* `OPTIONAL` callbackOrHandlers

### remove
remove.
###### Parameters
* `REQUIRED` id
* `OPTIONAL` callbackOrHandlers

### find
find.
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.sort
* `OPTIONAL` params.start
* `OPTIONAL` params.count
* `OPTIONAL` params.isFindAll
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers

### count
count.
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers

### checkIsExists
check is exists.
###### Parameters
* `OPTIONAL` params
* `OPTIONAL` params.filter
* `OPTIONAL` params.isToCache
* `REQUIRED` callbackOrHandlers
