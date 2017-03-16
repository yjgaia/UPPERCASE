# `CLASS` box.ROOM
서버에 생성된 룸과 통신을 주고받는 ROOM 클래스

## Parameters
* `REQUIRED` nameOrParams 
* `OPTIONAL` nameOrParams.roomServerName 
* `REQUIRED` nameOrParams.name 

## Static Members
No static members.

## Public Members

### on
###### Parameters
* `REQUIRED` methodName
* `REQUIRED` method

### off
###### Parameters
* `REQUIRED` methodName
* `OPTIONAL` method

### send
###### Parameters
* `REQUIRED` methodNameOrParams
* `REQUIRED` methodNameOrParams.methodName
* `OPTIONAL` methodNameOrParams.data
* `OPTIONAL` callback

### exit
###### Parameters
No parameters.
