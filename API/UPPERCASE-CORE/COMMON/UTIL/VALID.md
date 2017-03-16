# `CLASS` global.VALID
데이터를 검증하고, 어떤 부분이 잘못되었는지 오류를 확인할 수 있는 VALID 클래스

## Parameters
* `REQUIRED` validDataSet 

## Static Members

### notEmpty
###### Parameters
* `REQUIRED` value 

### regex
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.value 
* `REQUIRED` params.pattern 

### size
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.value 
* `OPTIONAL` params.min 
* `REQUIRED` params.max 

### integer
###### Parameters
* `REQUIRED` value 

### real
###### Parameters
* `REQUIRED` value 

### bool
###### Parameters
* `REQUIRED` value 

### date
###### Parameters
* `REQUIRED` value 

### min
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.value 
* `REQUIRED` params.min 

### max
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.value 
* `REQUIRED` params.max 

### email
###### Parameters
* `REQUIRED` value 

### png
###### Parameters
* `REQUIRED` value 

### url
###### Parameters
* `REQUIRED` value 

### username
###### Parameters
* `REQUIRED` value 

### mongoId
mongodb id check
###### Parameters
* `REQUIRED` value 

### one
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.value 
* `REQUIRED` params.array 

### array
###### Parameters
* `REQUIRED` value 

### data
###### Parameters
* `REQUIRED` value 

### element
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.array 
* `REQUIRED` params.validData 
* `OPTIONAL` params.isToWash 

### property
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.data 
* `REQUIRED` params.validData 
* `OPTIONAL` params.isToWash 

### detail
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.data 
* `REQUIRED` params.validDataSet 
* `OPTIONAL` params.isToWash 

### equal
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.value 
* `REQUIRED` params.validValue 

## Public Members

### check
###### Parameters
No parameters.

### checkAndWash
###### Parameters
No parameters.

### checkForUpdate
###### Parameters
No parameters.

### getValidDataSet
###### Parameters
No parameters.
