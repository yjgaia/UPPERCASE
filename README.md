# ![ScreenShot](https://raw.githubusercontent.com/UPPERCASEIO/UPPERCASE.IO/master/LOGO.png)
Easy, Clear, and Powerful Full-stack (server-to-client) MVC Middleware for Dynamic Web Site or Mobile Application Development

Based on [UPPERCASE.JS](https://github.com/Hanul/UPPERCASE.JS)

###### TRANSLATION
* [Korean](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/README_KOR.md)

#### Dependencies
* [Node.js](http://nodejs.org)
* [MongoDB](http://www.mongodb.org)
* [ImageMagick](http://www.imagemagick.org)

#### Supported platforms
* Modern web browsers (including Internet explorers 5.5 and above)
* [Apache Cordova](http://cordova.apache.org/)
* [Appcelerator Titanium](http://www.appcelerator.com/titanium/)

#### Sample project
* Sample

## Install
1. Install UPPERCASE.IO on a directory you want.
2. Add the path of UPPERCASE.IO to environment variables.
	* PC
	My computer - Properties - Advanced system settings - Add UPPERCASE_IO_PATH to environment variables.
	* MAC
	```
	vi .profile
	export UPPERCASE_IO_PATH="{{UPPERCASE.IO PATH}}"
	```
	* Linux
	```
	vi .bash_profile
	or
	vi .profile
	export UPPERCASE_IO_PATH="{{UPPERCASE.IO PATH}}"
	```
3. Run MongoDB.
	`mongod --fork --logpath /var/log/mongodb.log --logappend`
4. Execute a project with BOOT script.
    ex) Project.js
    ```javascript
    require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

    BOOT({
        ...
    });
    ```


## Configuration
Each item is formed as `CONFIG.defaultBoxName = 'Sample';`.

###### CONFIG
* `isDevMode` enables development mode. The default is `false`. If enabled, code compression, caching, and so on are skipped. `true` is recommended in development.
* `webServerPort` specifies a server port for web and web socket. If not, the server won't be booted.
* `sercuredWebServerPort` sets a server port for secured web. If not, the secured web server won't start up.
* `socketServerPort` sets a server port for socket.
* `defaultBoxName` defines the name of the default BOX. If not, `'UPPERCASE.IO'` is provided.
* `title` indicates the title of a project. The default value is `'UPPERCASE.IO PROJECT'`.
* `description` implies the description of a project. The default value is `'UPPERCASE.IO PROJECT'`.
* `isMobileFullScreen` decides whether full screen mode is activated on a mobile browser. The default value is `false`.
* `googleSiteVerificationKey` sets google site verification key.

###### NODE_CONFIG
* `securedKeyFilePath` specifies the path of a key file for a secured web server.
* `securedCertFilePath` specifies the path of a cert file for a secured web server.
* `dbName` defines name of a database to use.
* `dbHost` defines host of a MongoDB server to connect. The default values is `'127.0.0.1'`.
* `dbPort` defines port of a MongoDB server to connect. The default value is `27017`.
* `dbUsername` sets username of a MongoDB server to connect.
* `dbPassword` sets password of a MongoDB server to connect.
* `isDBLogMode` sets `true` to turn on database log mode, which outputs data changes as console log. The default value is `false`.
* `maxDataCount` sets the maximum size of data by find command. The default value is `1000`.
* `maxUploadFileMB` sets the maximum file size of a uploadable file. The default value is `10`.

Configurations for distributed servers are below.
* `thisServerName` specifies the current server name, which is used in distributed server configuration.
* `clusteringServers` specifies information of distributed servers.
* `clusteringPort` specifies ports of distributed servers.
* `socketServers` defines information of socket servers.
* `webSocketServers` defines information of Web socket servers.
* `uploadServers` defines information of upload servers.

###### BROWSER_CONFIG
The same as [BROWSER_CONFIG configuration of UPPERCASE.JS](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/README.md#configuration).


## BOX
A BOX is a unit of a module in UPPERCASE.IO.
BOXes are created with a project folder and folders for BOXes.
For example, if folders are organized below, `UUI`, `UANI`, `Yogurt`, `Sample` BOXes are created.
![ScreenShot](https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.IO/master/SampleBOXes.png)

The official BOXes such as `UUI`, `UANI` are managed by UIO-BOX.
* [UPPERCASE.IO Official BOX Repositories](https://github.com/UIO-BOX)

#### Basic components of BOX
These components are optional, so can be chosen for your purpose.
* `BROWSER` is a folder for code run on a web browser.
* `COMMON` is a folder for code shared on both browser and node.js.
* `NODE` is a folder for code run on node.js.
* `R` is a folder for resources.

#### Packaging BOX
Packaging results in one combined JS file in each component folder. For instance, all the code in BROWSER folder becomes BROWSER.js. The other artifacts are copied as they are.
1. Download PACK.js. (Save as with the link below)
	https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.IO/master/PACK.js
2. Run PACK.js as below.
	`node PACK {{BOX name}}`

#### Extending UPPERCASE.JS
Extend functions of UPPERCASE.JS to work with a BOX.
The extended functions are used as a form of {{BOX name}}.MATCH_VIEW.

###### Client package
* `STORE(name)` Browser store class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/STORE.js)
```javascript
store = TestBox.STORE('testStore');
store.save({ name:, value:, isToSession: })
store.get(name)
store.remove(name)
```
* `REQUEST({method:, uri:}, responseListenerOrListeners)` `REQUEST({method:, uri:, paramStr:}, responseListenerOrListeners)` `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)` ajax request.
Not to use a loading bar, set `isNotUsingLoadingBar` to true. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/REQUEST.js)
* `GET(uri, responseListenerOrListeners)` `GET({uri:, paramStr:}, responseListenerOrListeners)` `GET({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax GET request.
Not to use a loading bar, set `isNotUsingLoadingBar` to true. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/GET.js)
* `POST(uri:, responseListenerOrListeners)` `POST({uri:, paramStr:}, responseListenerOrListeners)` `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax POST request.
Not to use a loading bar, set `isNotUsingLoadingBar` to true. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/POST.js)
* `PUT(uri:, responseListenerOrListeners)` `PUT({uri:, paramStr:}, responseListenerOrListeners)` `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax PUT request.
Not to use a loading bar, set `isNotUsingLoadingBar` to true. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/PUT.js)
* `DELETE(uri:, responseListenerOrListeners)` `DELETE({uri:, paramStr:}, responseListenerOrListeners)` `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax DELETE request.
Not to use a loading bar, set `isNotUsingLoadingBar` to true. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/DELETE.js)

###### Browser package
* `MATCH_VIEW({uri:, target:})` match view. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/VIEW.js)
* `HREF(uri)` get href. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/HREF.js)
* `GO()` `GO(uri)` go another view. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/GO.js)
* `GO_NEW_WIN()` `GO_NEW_WIN(uri)` go another view on new window. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/GO_NEW_WIN.js)


## API
기본적으로 프로젝트 구성 시 사용되는 API들입니다.

###### Database
`주의사항` DB의 update명령어가 동시에 여러번 호출 될 경우 모든 update는 같은 데이터(수정된)를 반환합니다.
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

###### Resources
클라이언트에서 사용 가능한 리소스 경로 관련 API입니다.
* `R(path)` `R(path, function(content) {...})` get resource's real path with version. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/R.js)
* `RF(path)` get final resource's real path. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/RF.js)


## Advanced APIs
일반적인 UPPERCASE.IO의 설정을 따르지 않고, 직접 UPPERCASE.IO의 각 파트를 사용해 프레임워크를 구축하고자 하는 고급 유저들을 위해, UPPERCASE.IO는 여러가지 API들을 제공합니다.

###### Networking
* `WEB_SOCKET_SERVER(portOrWebServer, connectionListener)` create web socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `WEB_SOCKET_FIX_REQUEST_MANAGER(connectionListener)` create web socket fix request handler. (using jsonp long-polling) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `MULTI_PROTOCOL_SOCKET_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:}, connectionListener)` 소켓 서버와 웹 소켓 서버를 결합한 다중 프로토콜 소켓 서버를 실행합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/MULTI_PROTOCOL_SOCKET_SERVER.js)
* `CONNECT_TO_WEB_SOCKET_SERVER({host:, port:, fixRequestURI:}, {error:, success:})` connect to web socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/BROWSER/CONNECT_TO_WEB_SOCKET_SERVER.js)

###### Database
* `CONNECT_TO_DB_SERVER({username:, password:, host:, port:, name:}, function() {...})` connect to MongoDB server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)

###### ROOM
* `LAUNCH_ROOM_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:})` Launch room server class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
* `CONNECT_TO_ROOM_SERVER({methodName:, data:})` * `CONNECT_TO_ROOM_SERVER({methodName:, data:}, function(on, off, send) {...})` connect to room server. 로딩 바를 사용하지 않으려면 `isNotUsingLoadingBar` 파라미터를 true로 설정합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/BROWSER/CONNECT/CONNECT_TO_ROOM_SERVER.js)

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


## Distributed processing in UPPERCASE.IO
* 업로드 파일들을 분산 서버로 구성할 경우 CORS가 지원되지 않는 Internet Explorer 9 이하 버젼들과 같은 곳에서는 UPPERCASE.JS의 GRAPHIC API들을 사용할 수 없습니다.

UPPERCASE.IO의 분산 처리 전략을 설명합니다.
UPPERCASE.IO 기반 프로젝트의 기능별 서버 파트는 다음과 같습니다.
1. `대문 서버` 유저들에게 웹 페이지나 분산 서버들의 정보를 제공하는 서버입니다.
2. `API 서버` 각종 기능들을 프로토콜의 제약 없이 JSON 양식으로 통신하는 서버들입니다.
3. `업로드 파일 서버` 프로젝트에서 업로드 된 파일들을 관리하는 서버들입니다.
4. `MongoDB 데이터베이스 서버` MongoDB를 기반으로 데이터베이스를 관리하는 서버들입니다.

MongoDB는 그 자체로 분산 서버 기능을 제공하기 때문에, 이 문서의 분산 처리 전략에서 MongoDB 서버는 제외합니다. 그렇다면 다음과 같이 세가지 경우의 수가 생깁니다.

1. L4 스위치를 이용해 물리적으로 서버가 분산되어 있을 경우
2. 특정 도메인 주소를 담당하는 `대문 서버`가 있고, 나머지 서버들이 분산하는 경우
3. `대문 서버`가 있고, 또한 `API 서버들`이 있으며 업로드 파일을 분산하여 저장하는 `업로드 파일 서버들`도 있는 경우

#### 1. L4 스위치를 이용해 물리적으로 서버가 분산되어 있을 경우
이 경우에는 각 서버들이 동등하게 분배되어 모든 일을 담당할 수 있습니다.

#### 2. 특정 도메인 주소를 담당하는 `대문 서버`가 있고, 나머지 서버들이 분산하는 경우
이 경우에는 대문 서버가 모든 유저들의 처음 접속을 맞이하므로, 웹 페이지나 분산 서버들의 정보를 가져오는 경우에만 대문 서버가 역할을 수행하고, API 또는 업로드 파일 제공 등의 기능들은 모두 다른 서버들로 분산하는 전략을 취할 수 있습니다.

#### 3. `대문 서버`가 있고, 또한 `API 서버들`이 있으며 업로드 파일을 분산하여 저장하는 `업로드 파일 서버들`도 있는 경우
이 경우 또한 마찬가지로 대문 서버가 모든 유저들의 처음 접속을 맞이하므로, 웹 페이지나 분산 서버들의 정보를 가져오는 경우를 제외한 기능들은 최대한 다른 서버들로 분산합니다. 하지만 API 서버들과 업로드 서버군 또한 나뉘어져 있기 때문에, 각각 기능에 맞추어 분산하는 전략을 취할 수 있습니다.


## Build UPPERCASE.IO
```
cd SRC
node __BUILD.js
```

## License
[MIT](LICENSE)

## Author
[Young Jae Sim](https://github.com/Hanul)

## Contact
* [Facebook UPPERCASE.IO User Group](https://www.facebook.com/groups/uppercase/)
* [GitHub Issues](https://github.com/UPPERCASE-Series/UPPERCASE.IO/issues)

## 기타 링크
* [Official Web Site](http://UPPERCASE.IO)
* [1.3 version](http://1.3.UPPERCASE.IO)
* [UPPERCASE.IO Official BOX Repositories](https://github.com/UIO-BOX)
