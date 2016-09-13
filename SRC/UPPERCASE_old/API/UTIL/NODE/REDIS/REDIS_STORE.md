# `CLASS` global.REDIS_STORE
Redis store class

## Parameters
* `REQUIRED` storeName 

## Static Members
No static members.

## Public Members

### save
save.
###### Parameters
* `REQUIRED` params
* `REQUIRED` params.name
* `REQUIRED` params.value
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### get
get.
###### Parameters
* `REQUIRED` name
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### remove
remove.
###### Parameters
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### list
list.
###### Parameters
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### count
count.
###### Parameters
* `REQUIRED` callbackOrHandlers
* `REQUIRED` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error

### clear
clear.
###### Parameters
* `OPTIONAL` callbackOrHandlers
* `OPTIONAL` callbackOrHandlers.success
* `OPTIONAL` callbackOrHandlers.error
