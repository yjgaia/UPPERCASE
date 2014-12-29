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
* `STORE(name)` Browser store class [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/STORE.js)
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
Essential in an UPPERCASE project.

###### Database
`Note` if update of DB commands are called simultaneously, all the updates return the same revised data.
* `DB(name)` MongoDB collection wrapper [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)
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
* `LOG_DB(name)` MongoDB collection wrapper class for logging [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/LOG_DB.js)
```javascript
logDB = TestBox.LOG_DB('testLog');
logDB.log(data)
```

###### ROOM
* `ROOM(name)` Connection room class (for clients) [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/CLIENT/ROOM.js)
```javascript
room = TestBox.ROOM('testRoom');
room.on(methodName, function(data) {...})
room.off(methodName)
room.send(methodName, function(data) {...})
room.exit()
```
* `ROOM(name, connectionListener)` create room. (for node.js) [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
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
* `BROADCAST({roomName:, methodName:, data:})` broadcast to rooms. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)

###### MODEL
* `MODEL` Model(include CRUD functions) interface [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/MODEL/CLIENT/MODEL.js)
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
On resources used by clients.

* `R(path)` `R(path, function(content) {...})` get resource's real path with version. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/R.js)
* `RF(path)` get final resource's real path. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/RF.js)


## Advanced APIs
For advanced users who want to build a framework on parts of UPPERCASE.IO.

###### Networking
* `WEB_SOCKET_SERVER(portOrWebServer, connectionListener)` create web socket server. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `WEB_SOCKET_FIX_REQUEST_MANAGER(connectionListener)` create web socket fix request handler. (using jsonp long-polling) [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `MULTI_PROTOCOL_SOCKET_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:}, connectionListener)` execute a multi-protocol socket server that is a combination of a socket server and a web socket server. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/MULTI_PROTOCOL_SOCKET_SERVER.js)
* `CONNECT_TO_WEB_SOCKET_SERVER({host:, port:, fixRequestURI:}, {error:, success:})` connect to web socket server. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/BROWSER/CONNECT_TO_WEB_SOCKET_SERVER.js)

###### Database
* `CONNECT_TO_DB_SERVER({username:, password:, host:, port:, name:}, function() {...})` connect to MongoDB server. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)

###### ROOM
* `LAUNCH_ROOM_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:})` Launch room server class [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)
* `CONNECT_TO_ROOM_SERVER({methodName:, data:})` * `CONNECT_TO_ROOM_SERVER({methodName:, data:}, function(on, off, send) {...})` connect to room server. Set `isNotUsingLoadingBar` to true in case of not using a loading bar. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/BROWSER/CONNECT/CONNECT_TO_ROOM_SERVER.js)

###### UPLOAD
* `UPLOAD_REQUEST({requestInfo:, uploadPath:}, function() {...})` `UPLOAD_REQUEST({requestInfo:, uploadPath:}, {overFileSize:, error:, success:})` create upload request handler. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UPLOAD/NODE/UPLOAD_REQUEST.js)
	* In order for UPLOAD_REQUEST to handle uploaded files, it is necessary to add noParsingParamsURI option to a web server. please refer to Example.

###### UTIL
* `MINIFY_CSS(code)` minify css. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_CSS.js)
* `MINIFY_JS(code)` minify js [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_JS.js)
* `IMAGEMAGICK_CONVERT(params)` `IMAGEMAGICK_CONVERT(params, function() {...})` `IMAGEMAGICK_CONVERT(params, {error: function() {...}, success : function() {...}})`  ImageMagick® convert. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_CONVERT.js)
* `IMAGEMAGICK_IDENTIFY(path, function() {...})` `IMAGEMAGICK_IDENTIFY(path, {error: function() {...}, success : function() {...}})` ImageMagick® identify. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.js)
* `IMAGEMAGICK_READ_METADATA(path, function() {...})` `IMAGEMAGICK_READ_METADATA(path, {error: function() {...}, success : function() {...}})` ImageMagick® read metadata. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.js)
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, function() {...})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, {error: function() {...}, success : function() {...}})` ImageMagick® resize. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/.js)
* `COMPILE_COFFEE_TO_JS(code)` `COMPILE_COFFEE_TO_JS({code:, fileName:})` compile CoffeeScript to JavaScript. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/COMPILE_COFFEE_TO_JS.js)
* `COMPILE_LITCOFFEE_TO_JS(code)` `COMPILE_LITCOFFEE_TO_JS({code:, fileName:})` compile literate CoffeeScript to JavaScript. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/COMPILE_LITCOFFEE_TO_JS.js)
* `RUN_COFFEE(code)` `RUN_COFFEE({code:, fileName:})` run CoffeeScript. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/RUN_COFFEE.js)
* `RUN_LITCOFFEE(code)` `RUN_LITCOFFEE({code:, fileName:})` run literate CoffeeScript. [Example](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/RUN_LITCOFFEE.js)

###### IO
* `CONNECT_TO_IO_SERVER(function(on, off, send) {...})` `CONNECT_TO_IO_SERVER({error:, success:})` connect to UPPERCASE.IO server.


## Distributed processing in UPPERCASE.IO
* In case of processing uploaded files on distributed servers, it is unavailable to use GRAPHIC API of UPPERCASE.JS on web browsers of no CORS support such as Internet Explorer 9 or earlier.

Strategies of distributed computing in UPPERCASE.IO is explained here.
Server components based on UPPERCASE.IO are following:
1. `Game server` serves web pages and information on distibuted servers to users.
2. `API server` communicates various functions by JSON format without harness of protocols.
3. `Upload file server` manages uploaded files.
4. `MongoDB database server` manages databases based on MongoDB.

Please consult to MongoDB on strategies of distribution for it.

Here are 3 cases:

1. A L4 switch distributes servers physically
2. A `Gate server` takes a specific domain name, and the other servers are distributed
3. There is a `Gate server` and `API server`s and `Upload file servers` for distributed uploaded files

#### 1. A L4 switch distributes servers physically
Each server works equally.

#### 2. A `Gate server` takes a specific domain name, and the other servers are distributed
The Gate server accepts the initial request of each user, so serves web pages and information on distibuted servers, and
the other servers serve API or uploaded files.

#### 3. There is a `Gate server` and `API server`s and `Upload file servers` for distributed uploaded files
The same as 2, but API servers and Upload file servers are separated, so it is recommended to adopt proper strategies for the topology.

## Build UPPERCASE.IO
```
cd SRC
node __BUILD.js
```

## License
[MIT](../../LICENSE)

## Author
[Young Jae Sim](https://github.com/Hanul)

## Contact
* [Official Web Site](http://UPPERCASE.IO)
* [Facebook UPPERCASE.IO User Group](https://www.facebook.com/groups/uppercase/)
* [GitHub Issues](https://github.com/UPPERCASE-Series/UPPERCASE.IO/issues)
