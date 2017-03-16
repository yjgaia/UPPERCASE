# `METHOD` global.CONNECT_TO_ROOM_SERVER
룸 서버에 접속합니다.

## Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.host 
* `REQUIRED` params.port 
* `OPTIONAL` connectionListenerOrListeners 
* `OPTIONAL` connectionListenerOrListeners.success 
* `OPTIONAL` connectionListenerOrListeners.error 

## Static Members

### checkIsConnected
###### Parameters
* `OPTIONAL` roomServerName 

### enterRoom
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.roomName 

### on
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.methodName 
* `REQUIRED` method 

### off
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.methodName 
* `OPTIONAL` method 

### send
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.methodName 
* `REQUIRED` params.data 
* `OPTIONAL` callback 

### exitRoom
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.roomName 

## Public Members
No public members.
