# `CLASS` global.SHARED_STORE
클러스터링 공유 저장소를 생성하는 클래스

## Parameters
* `REQUIRED` storeName 

## Static Members

### getStorages
###### Parameters
No parameters.

### save
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.storeName 
* `REQUIRED` params.id 
* `REQUIRED` params.data 
* `OPTIONAL` params.removeAfterSeconds 
* `OPTIONAL` callback 

### update
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.storeName 
* `REQUIRED` params.id 
* `REQUIRED` params.data 
* `OPTIONAL` params.data.$inc 
* `OPTIONAL` params.data.$push 
* `OPTIONAL` params.data.$addToSet 
* `OPTIONAL` params.data.$pull 
* `OPTIONAL` params.removeAfterSeconds 
* `OPTIONAL` callback 

### get
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.storeName 
* `REQUIRED` params.id 
* `REQUIRED` callback 

### remove
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.storeName 
* `REQUIRED` params.id 
* `OPTIONAL` callback 

### all
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.storeName 
* `OPTIONAL` params.filter 
* `REQUIRED` callback 

### count
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.storeName 
* `OPTIONAL` params.filter 
* `REQUIRED` callback 

### checkIsExists
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.storeName 
* `OPTIONAL` params.id 
* `OPTIONAL` params.filter 
* `REQUIRED` callback 

### clear
###### Parameters
* `REQUIRED` storeName 
* `OPTIONAL` callback 

## Public Members

### save
###### Parameters
* `REQUIRED` params
* `REQUIRED` params.id
* `REQUIRED` params.data
* `OPTIONAL` params.removeAfterSeconds
* `OPTIONAL` callback

### update
###### Parameters
* `REQUIRED` params
* `REQUIRED` params.id
* `REQUIRED` params.data
* `OPTIONAL` params.data.$inc
* `OPTIONAL` params.data.$push
* `OPTIONAL` params.data.$addToSet
* `OPTIONAL` params.data.$pull
* `OPTIONAL` params.removeAfterSeconds
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.success

### get
###### Parameters
* `REQUIRED` id
* `REQUIRED` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.success

### remove
###### Parameters
* `REQUIRED` id
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.notExists
* `OPTIONAL` callbackOrHandlers.success

### all
###### Parameters
* `OPTIONAL` filter
* `REQUIRED` callback

### count
###### Parameters
* `OPTIONAL` filter
* `REQUIRED` callback

### checkIsExists
###### Parameters
* `REQUIRED` idOrFilter
* `REQUIRED` callback

### clear
###### Parameters
* `OPTIONAL` callback
