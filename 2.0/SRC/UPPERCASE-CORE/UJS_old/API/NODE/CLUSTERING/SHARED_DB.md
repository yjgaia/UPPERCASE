# `CLASS` global.SHARED_DB
CPU and server clustering shared db class

## Parameters
* `REQUIRED` dbName 

## Static Members

### getStorages
get storages.
###### Parameters
No parameters.

### save
save.
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.dbName 
* `REQUIRED` params.id 
* `REQUIRED` params.data 
* `OPTIONAL` params.removeAfterSeconds 
* `OPTIONAL` remove 

### update
update.
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.dbName 
* `REQUIRED` params.id 
* `REQUIRED` params.data 
* `OPTIONAL` params.data.$inc 
* `OPTIONAL` params.data.$push 
* `OPTIONAL` params.data.$addToSet 
* `OPTIONAL` params.data.$pull 
* `OPTIONAL` params.removeAfterSeconds 
* `OPTIONAL` remove 

### get
get.
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.dbName 
* `REQUIRED` params.id 

### remove
remove.
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.dbName 
* `REQUIRED` params.id 

### list
list.
###### Parameters
* `REQUIRED` dbName 

### count
count.
###### Parameters
* `REQUIRED` dbName 

### clear
clear.
###### Parameters
* `REQUIRED` dbName 

## Public Members

### save
save.
###### Parameters
* `REQUIRED` params
* `REQUIRED` params.id
* `REQUIRED` params.data
* `OPTIONAL` params.removeAfterSeconds

### update
update.
###### Parameters
* `REQUIRED` params
* `REQUIRED` params.id
* `REQUIRED` params.data
* `OPTIONAL` params.data.$inc
* `OPTIONAL` params.data.$push
* `OPTIONAL` params.data.$addToSet
* `OPTIONAL` params.data.$pull
* `OPTIONAL` params.removeAfterSeconds

### get
get.
###### Parameters
* `REQUIRED` id

### remove
remove.
###### Parameters
* `REQUIRED` id

### list
list.
###### Parameters
No parameters.

### count
count.
###### Parameters
No parameters.

### clear
clear.
###### Parameters
No parameters.
