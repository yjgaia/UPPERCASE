

###### 클라이언트 패키지
* `STORE(name)` Browser store class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/STORE.js)
```javascript
store = TestBox.STORE('testStore');
store.save({ name:, value:, isToSession: })
store.get(name)
store.remove(name)
```
* `REQUEST({method:, uri:}, responseListenerOrListeners)` `REQUEST({method:, uri:, paramStr:}, responseListenerOrListeners)` `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)` ajax request.
* `GET(uri, responseListenerOrListeners)` `GET({uri:, paramStr:}, responseListenerOrListeners)` `GET({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax GET request.
* `POST(uri:, responseListenerOrListeners)` `POST({uri:, paramStr:}, responseListenerOrListeners)` `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax POST request.
* `PUT(uri:, responseListenerOrListeners)` `PUT({uri:, paramStr:}, responseListenerOrListeners)` `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax PUT request.
* `DELETE(uri:, responseListenerOrListeners)` `DELETE({uri:, paramStr:}, responseListenerOrListeners)` `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax DELETE request.

###### 브라우저 패키지
* `MATCH_VIEW({uri:, target:})` match view. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/VIEW.js)
* `HREF(uri)` get href. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/HREF.js)
* `GO(uri)` go another view. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/GO.js)
* `GO_NEW_WIN()` `GO_NEW_WIN(uri)` go another view on new window. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/GO_NEW_WIN.js)


## API
기본적으로 프로젝트 구성 시 사용되는 API들입니다.

###### 데이터베이스 관련
* `주의사항` 실제 운영 시에 `node-mongodb-client`를 반드시 해당 운영체제에 맞게 컴파일 해 주시기 바랍니다.
* `주의사항` DB의 update명령어가 동시에 여러번 호출 될 경우 모든 update는 같은 데이터(수정된)를 반환합니다.
* `주의사항` find 명령시 filter의 모든 property가 `undefined`로만 이루어진 경우, 모든 값을 가져옵니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려는 경우에는, `CHECK_ARE_SAME([{}, filter])`로 filter가 비어있는지 검사해 주시기 바랍니다.

* `DB(name)` MongoDB collection wrapper [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)
```javascript
db = TestBox.DB('test');
db.create(data, function() {...})
db.create(data, {error:, success:})
db.get(id, function() {...})
db.get(id, {success:, notExists:, error:})
db.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})
db.update(data, function() {...})
db.update(data, {success:, notExists:, error:})
db.remove(id, function() {...})
db.remove(id, {success:, notExists:, error:})
db.find({filter:, sort:, start:, count:}, function() {...})
db.find({filter:, sort:, start:, count:}, {error:, success:})
db.count({filter:}, function() {...})
db.count({filter:}, {error:, success:})
db.checkIsExists({filter:}, function() {...})
db.checkIsExists({filter:}, {error:, success:})
```
* `LOG_DB(name)` MongoDB collection wrapper class for logging [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/LOG_DB.js)
```javascript
logDB = TestBox.LOG_DB('testLog');
logDB.log(data)
```

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

###### MODEL
* `MODEL` Model(include CRUD functions) interface [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/MODEL/CLIENT/MODEL.js)
```javascript
TestBox.TestModel = OBJECT({
	preset : function() {
		return TestBox.MODEL;
	},
	params : function() {
		return {
			name : 'Test',
			methodConfig : {
				create : ...,
                get : ...,
				update : ...,
				remove : ...,
                find : ...,
                count : ...,
                checkIsExists : ...
			}
		};
	}
});
TestBox.TestModel.create(data, function() {...})
TestBox.TestModel.create(data, {error:, success:})
TestBox.TestModel.get(id, function() {...})
TestBox.TestModel.get(id, {success:, notExists:, error:})
TestBox.TestModel.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})
TestBox.TestModel.update(data, function() {...})
TestBox.TestModel.update(data, {success:, notExists:, error:})
TestBox.TestModel.remove(id, function() {...})
TestBox.TestModel.remove(id, {success:, notExists:, error:})
TestBox.TestModel.find({filter:, sort:, start:, count:}, function() {...})
TestBox.TestModel.find({filter:, sort:, start:, count:}, {error:, success:})
TestBox.TestModel.count({filter:}, function() {...})
TestBox.TestModel.count({filter:}, {error:, success:})
TestBox.TestModel.checkIsExists({filter:}, function() {...})
TestBox.TestModel.checkIsExists({filter:}, {error:, success:})
```

###### 리소스 경로 관련
클라이언트에서 사용 가능한 리소스 경로 관련 API입니다.
* `R(path)` `R(path, function(content) {...})` get resource's real path with version. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/R.js)
* `RF(path)` get final resource's real path. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/RF.js)


## 고급 유저들을 위한 API
일반적인 UPPERCASE.IO의 설정을 따르지 않고, 직접 UPPERCASE.IO의 각 파트를 사용해 프레임워크를 구축하고자 하는 고급 유저들을 위해, UPPERCASE.IO는 여러가지 API들을 제공합니다.

###### 통신 관련
* `WEB_SOCKET_SERVER(portOrWebServer, connectionListener)` create web socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `WEB_SOCKET_FIX_REQUEST_MANAGER(connectionListener)` create web socket fix request handler. (using jsonp long-polling) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `MULTI_PROTOCOL_SOCKET_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:}, connectionListener)` 소켓 서버와 웹 소켓 서버를 결합한 다중 프로토콜 소켓 서버를 실행합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/MULTI_PROTOCOL_SOCKET_SERVER.js)
* `CONNECT_TO_WEB_SOCKET_SERVER({host:, port:, fixRequestURI:}, {error:, success:})` connect to web socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/BROWSER/CONNECT_TO_WEB_SOCKET_SERVER.js)

###### 데이터베이스 관련
* `CONNECT_TO_DB_SERVER({username:, password:, host:, port:, name:}, function() {...})` connect to MongoDB server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)

###### ROOM
* `LAUNCH_ROOM_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:})` Launch room server class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
* `CONNECT_TO_ROOM_SERVER({methodName:, data:})` * `CONNECT_TO_ROOM_SERVER({methodName:, data:}, function(on, off, send) {...})` connect to room server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/BROWSER/CONNECT/CONNECT_TO_ROOM_SERVER.js)

###### UPLOAD
* `UPLOAD_REQUEST({requestInfo:, uploadPath:}, function() {...})` `UPLOAD_REQUEST({requestInfo:, uploadPath:}, {overFileSize:, error:, success:})` create upload request handler. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UPLOAD/NODE/UPLOAD_REQUEST.js)
	* UPLOAD_REQUEST가 업로드 파일을 처리할 수 있도록 반드시 웹 서버에 noParsingParamsURI 설정을 추가해야 합니다. 예제를 참고해주세요.

###### UTIL
* `MINIFY_CSS(code)` minify css. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_CSS.js)
* `MINIFY_JS(code)` minify js [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_JS.js)
* `IMAGEMAGICK_CONVERT(params)` `IMAGEMAGICK_CONVERT(params, function() {...})` `IMAGEMAGICK_CONVERT(params, {error: function() {...}, success : function() {...}})`  ImageMagick® convert. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_CONVERT.js)
* `IMAGEMAGICK_IDENTIFY(path, function() {...})` `IMAGEMAGICK_IDENTIFY(path, {error: function() {...}, success : function() {...}})` ImageMagick® identify. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.js)
* `IMAGEMAGICK_READ_METADATA(path, function() {...})` `IMAGEMAGICK_READ_METADATA(path, {error: function() {...}, success : function() {...}})` ImageMagick® read metadata. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.js)
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, function() {...})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, {error: function() {...}, success : function() {...}})` ImageMagick® resize. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/.js)
* `COMPILE_COFFEE_TO_JS(code)` `COMPILE_COFFEE_TO_JS({code:, fileName:})` compile CoffeeScript to JavaScript. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/COMPILE_COFFEE_TO_JS.js)
* `COMPILE_LITCOFFEE_TO_JS(code)` `COMPILE_LITCOFFEE_TO_JS({code:, fileName:})` compile literate CoffeeScript to JavaScript. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/COMPILE_LITCOFFEE_TO_JS.js)
* `RUN_COFFEE(code)` `RUN_COFFEE({code:, fileName:})` run CoffeeScript. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/RUN_COFFEE.js)
* `RUN_LITCOFFEE(code)` `RUN_LITCOFFEE({code:, fileName:})` run literate CoffeeScript. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/RUN_LITCOFFEE.js)

###### IO
* `CONNECT_TO_IO_SERVER(function(on, off, send) {...})` `CONNECT_TO_IO_SERVER({error:, success:})` connect to UPPERCASE.IO server.


## License
[MIT](../../LICENSE)

## Author
[Young Jae Sim](https://github.com/Hanul)

## Contact
* [Official Web Site](http://UPPERCASE.IO)
* [Facebook UPPERCASE.IO User Group](https://www.facebook.com/groups/uppercase/)
* [GitHub Issues](https://github.com/UPPERCASE-Series/UPPERCASE.IO/issues)
