
###### ROOM
* `LAUNCH_ROOM_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:})` Launch room server class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
* `CONNECT_TO_ROOM_SERVER({methodName:, data:})` * `CONNECT_TO_ROOM_SERVER({methodName:, data:}, function(on, off, send) {...})` connect to room server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/BROWSER/CONNECT/CONNECT_TO_ROOM_SERVER.js)


###### ROOM
* `ROOM(name)` Connection room class (for clients) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/CLIENT/ROOM.js)
```javascript
room = TestBox.ROOM('testRoom');
room.on(methodName, function(data) {...})
room.off(methodName)
room.send(methodName, function(data) {...})
room.exit()
```
* `ROOM(name, connectionListener)` create room. (for node.js) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
```javascript
TestBox.ROOM('testRoom', function(clientInfo, on, off) {
    on(methodName, function(data, ret) {
    	...
    	// ret(..); is necessary.
        ret(resultData);
    });
    off(methodName);
});
```
* `BROADCAST({roomName:, methodName:, data:})` broadcast to rooms. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
