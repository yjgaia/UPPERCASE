# `METHOD` global.CONNECT_TO_ROOM_SERVER
connect to room server.

## Parameters
* `REQUIRED` params 
* `OPTIONAL` params.name 
* `OPTIONAL` params.isSecure 
* `OPTIONAL` params.host 
* `REQUIRED` params.port 
* `OPTIONAL` params.fixRequestURI 
* `OPTIONAL` connectionListenerOrListeners 
* `OPTIONAL` connectionListenerOrListeners.success 
* `OPTIONAL` connectionListenerOrListeners.error 

## Static Members

### checkIsConnected
check is connected.
###### Parameters
* `OPTIONAL` roomServerName 

### enterRoom
enter room.
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.roomName 

### on
on.
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.methodName 
* `REQUIRED` method 

### off
off.
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.methodName 
* `OPTIONAL` method 

### send
send.
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.methodName 
* `REQUIRED` params.data 
* `OPTIONAL` callback 

### exitRoom
exit room.
###### Parameters
* `REQUIRED` params 
* `OPTIONAL` params.roomServerName 
* `REQUIRED` params.roomName 

## Public Members
No public members.
