# ![ScreenShot](https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.IO/master/LOGO.png)
동적인 웹 사이트 및 모바일 애플리케이션 개발을 위한 쉽고, 명확하면서도 강력한 풀스택 (server-to-client) MVC 미들웨어입니다.

[UPPERCASE.JS](http://uppercaseseries.org/#JS)를 기반으로 하고 있습니다.

#### 기반 시스템
* [Node.js](http://nodejs.org)
* [MongoDB](http://www.mongodb.org)
* [ImageMagick](http://www.imagemagick.org)

#### 지원 플랫폼
* 웹 브라우저 (최신 브라우저 및 인터넷 익스플로러 5.5 이상부터 지원)
* [Titanium](http://www.appcelerator.com/titanium/)

#### 샘플 프로젝트
* Sample

## 설치
1. UPPERCASE.IO를 원하는 경로에 설치합니다.
2. UPPERCASE.IO의 경로를 환경변수에 등록합니다.
	* PC
	내 컴퓨터 - 속성 - 고급 시스템 설정 - 환경 변수에서 UPPERCASE_IO_PATH를 등록합니다.
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
3. BOOT 스크립트로 프로젝트를 실행합니다.
    예) Project.js
    ```javascript
    require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

    BOOT({
        ...
    });
    ```


## 설정
각 설정은 `CONFIG.defaultBoxName = 'Sample';` 과 같이 설정합니다.

###### CONFIG
* `isDevMode` 개발자 모드를 활성화합니다. 기본값은 `false`입니다. 이 모드가 활성화되면, 코드 압축이나 캐싱등의 작업을 건너뛰게 됩니다. 개발을 할 때에는 `true`로 설정하는것이 좋습니다.
* `webServerPort` 웹 서버 및 웹 소켓 서버의 포트를 설정합니다. 설정하지 않으면, 웹 서버 및 웹 소켓 서버를 구동시키지 않습니다.
* `sercuredWebServerPort` 보안 웹 서버의 포트를 설정합니다. 설정하지 않으면, 보안 웹 서버를 구동시키지 않습니다.
* `socketServerPort` 소켓 서버의 포트를 설정합니다.
* `defaultBoxName` 기본 BOX의 이름을 설정합니다. 기본값은 `'UPPERCASE.IO'` 입니다.
* `title` 프로젝트 제목을 입력합니다. 기본값은 `'UPPERCASE.IO PROJECT'` 입니다.
* `description` 프로젝트에 대한 설명을 입력합니다. 기본값은 `'UPPERCASE.IO PROJECT'` 입니다.
* `isMobileFullScreen` 모바일 브라우저에서 full screen으로 화면을 표시할지를 결정합니다. 기본값은 `false`입니다.
* `googleSiteVerificationKey` google site verification key를 설정합니다.

###### NODE_CONFIG
* `securedKeyFilePath` 보안 웹 서버를 위한 key file의 경로를 설정합니다.
* `securedCertFilePath` 보안 웹 서버를 위한 cert file의 경로를 설정합니다.
* `dbName` 사용할 데이터베이스의 이름을 설정합니다.
* `dbHost` MongoDB 데이터베이스 서버의 호스트를 설정합니다. 기본값은 `'127.0.0.1'` 입니다.
* `dbPort` MongoDB 데이터베이스 서버의 포트를 설정합니다. 기본값은 `27017` 입니다.
* `dbUsername` MongoDB 데이터베이스 서버의 접속 아이디를 설정합니다.
* `dbPassword` MongoDB 데이터베이스 서버의 접속 비밀번호를 설정합니다.
* `isDBLogMode` 데이터베이스 로그 모드를 켜고자 할 때 `true`로 설정합니다. 데이터가 수정 될 경우 console 로그를 띄어줍니다. 기본값은 `false` 입니다.
* `maxDataCount` find 명령으로 한번에 가져올 수 있는 최대 data 수를 설정합니다. 기본값은 `1000` 입니다.
* `maxUploadFileMB` 업로드 가능한 최대 파일 크기를 MB 단위로 설정합니다. 기본값은 `10` 입니다.

이하는 분산 서버 관련 설정들입니다.
* `thisServerName` 현재 서버의 이름을 지정합니다. 이는 분산서버 구성에 사용됩니다.
* `clusteringServers` 분산 서버들의 정보를 설정합니다.
* `clusteringPort` 분산 서버 포트를 설정합니다.
* `socketServers` 소켓 서버들의 정보를 설정합니다.
* `webSocketServers` 웹 소켓 서버들의 정보를 설정합니다.
* `uploadServers` 업로드 서버들의 정보를 설정합니다.

###### BROWSER_CONFIG
[UPPERCASE.JS의 BROWSER_CONFIG 설정](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/README_KOR.md#configuration)과 같습니다.


## BOX
BOX는 UPPERCASE.IO에서의 모듈을 칭합니다.
프로젝트 폴더와 BOX폴더 내부의 각 폴더들의 이름으로 BOX들이 생성됩니다.
예를 들어, 아래와 같이 폴더가 구성되어 있다면 `UUI`, `UANI`, `Yogurt`, `Sample` BOX들이 생성됩니다.
![ScreenShot](https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.IO/master/SampleBOXes.png)

`UUI`, `UANI` 등의 UPPERCASE.IO의 공식 BOX 저장소는 다음 경로에 있습니다.
* [UPPERCASE.IO Official BOX Repositories](https://github.com/UIO-BOX)

#### BOX의 일반적인 구성요소
아래 내용들은 필수가 아닙니다. 프로젝트의 성격에 따라 선택적으로 구성할 수 있습니다.
* `BROWSER` 웹 브라우저에서 구동되는 소스들을 저장하는 폴더입니다.
* `COMMON` 웹 브라우저와 node.js에서 동시에 구동되는 소스들을 저장하는 폴더입니다.
* `NODE` node.js 위에서 구동되는 소스들을 저장하는 폴더입니다.
* `R` 리소스 파일들을 저장하는 폴더입니다.

#### BOX 패키징
패키징을 하게되면 각 폴더들의 js 파일들이 하나로 합쳐집니다. 이를테면 BROWSER 폴더의 내용들은 BROWSER.js로 합쳐집니다. 기타 폴더 및 파일들은 그대로 복사됩니다.
1. PACK.js를 다운로드합니다. (오른쪽 클릭 후 다른 이름으로 저장)
	https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.IO/master/PACK.js
2. PACK.js를 아래와 같이 실행합니다.
	`node PACK {{BOX 이름}}`

#### UPPERCASE.JS 확장
BOX에 맞추어 UPPERCASE.JS의 기능을 확장합니다.
확장된 기능은 {{BOX 이름}}.MATCH_VIEW 와 같은 형식으로 사용합니다.

###### 클라이언트 패키지
* `STORE(name)` Browser store class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/STORE.js)
```javascript
store = TestBox.STORE('testStore');
store.save({ name:, value:, isToSession: })
store.get(name)
store.remove(name)
```
* `REQUEST({method:, uri:}, responseListenerOrListeners)` `REQUEST({method:, uri:, paramStr:}, responseListenerOrListeners)` `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)` ajax request.
로딩 바를 사용하지 않으려면 `isNotUsingLoadingBar` 파라미터를 true로 설정합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/REQUEST.js)
* `GET(uri, responseListenerOrListeners)` `GET({uri:, paramStr:}, responseListenerOrListeners)` `GET({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax GET request.
로딩 바를 사용하지 않으려면 `isNotUsingLoadingBar` 파라미터를 true로 설정합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/GET.js)
* `POST(uri:, responseListenerOrListeners)` `POST({uri:, paramStr:}, responseListenerOrListeners)` `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax POST request.
로딩 바를 사용하지 않으려면 `isNotUsingLoadingBar` 파라미터를 true로 설정합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/POST.js)
* `PUT(uri:, responseListenerOrListeners)` `PUT({uri:, paramStr:}, responseListenerOrListeners)` `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax PUT request.
로딩 바를 사용하지 않으려면 `isNotUsingLoadingBar` 파라미터를 true로 설정합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/PUT.js)
* `DELETE(uri:, responseListenerOrListeners)` `DELETE({uri:, paramStr:}, responseListenerOrListeners)` `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax DELETE request.
로딩 바를 사용하지 않으려면 `isNotUsingLoadingBar` 파라미터를 true로 설정합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/CLIENT/REQUEST/DELETE.js)

###### 브라우저 패키지
* `MATCH_VIEW({uri:, target:})` match view. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/VIEW.js)
* `HREF(uri)` get href. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/HREF.js)
* `GO()` `GO(uri)` go another view. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/GO.js)
* `GO_NEW_WIN()` `GO_NEW_WIN(uri)` go another view on new window. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOX/BROWSER/VIEW/GO_NEW_WIN.js)


## API
기본적으로 프로젝트 구성 시 사용되는 API들입니다.

###### 데이터베이스 관련
`주의사항` DB의 update명령어가 동시에 여러번 호출 될 경우 모든 update는 같은 데이터(수정된)를 반환합니다.
* `DB(name)` MongoDB collection wrapper [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)
```javascript
db = TestBox.DB('test');
db.create(data, function() {...})
db.create(data, {success:, error:})
db.get(id, function() {...})
db.get(id, {success:, notExists:, error:})
db.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})
db.update(data, function() {...})
db.update(data, {success:, notExists:, error:})
db.remove(id, function() {...})
db.remove(id, {success:, notExists:, error:})
db.find({filter:, sort:, start:, count:}, function() {...})
db.find({filter:, sort:, start:, count:}, {success:, error:})
db.count({filter:}, function() {...})
db.count({filter:}, {success:, error:})
db.checkIsExists({filter:}, function() {...})
db.checkIsExists({filter:}, {success:, error:})
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
* `MODEL(name)` `MODEL({name:, methodConfig:})` `MODEL({name:, initData:, methodConfig:})` Model(include CRUD functions) interface [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/MODEL/CLIENT/MODEL.js)
```javascript
TestBox.TestModel = OBJECT({...
TestBox.TestModel.create(data, function() {...})
TestBox.TestModel.create(data, {success:, error:})
TestBox.TestModel.get(id, function() {...})
TestBox.TestModel.get(id, {success:, notExists:, error:})
TestBox.TestModel.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})
TestBox.TestModel.update(data, function() {...})
TestBox.TestModel.update(data, {success:, notExists:, error:})
TestBox.TestModel.remove(id, function() {...})
TestBox.TestModel.remove(id, {success:, notExists:, error:})
TestBox.TestModel.find({filter:, sort:, start:, count:}, function() {...})
TestBox.TestModel.find({filter:, sort:, start:, count:}, {success:, error:})
TestBox.TestModel.count({filter:}, function() {...})
TestBox.TestModel.count({filter:}, {success:, error:})
TestBox.TestModel.checkIsExists({filter:}, function() {...})
TestBox.TestModel.checkIsExists({filter:}, {success:, error:})
```

###### 리소스 경로 관련
클라이언트에서 사용 가능한 리소스 경로 관련 API입니다.
* `R(path)` `R(path, function(content) {...})` get resource's real path with version. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/R.js)
* `RF(path)` get final resource's real path. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/RF.js)


## 고급 유저들을 위한 API
일반적인 UPPERCASE.IO의 설정을 따르지 않고, 직접 UPPERCASE.IO의 각 파트를 사용해 프레임워크를 구축하고자 하는 고급 유저들을 위해, UPPERCASE.IO는 여러가지 API들을 제공합니다.

###### 통신 관련
* `WEB_SOCKET_SERVER(portOrWebServer, connectionListener)` create web socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `WEB_SOCKET_FIX_REQUEST_MANAGER(connectionListener)` create web socket fix request manager (using jsonp long-polling). [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/WEB_SOCKET_SERVER.js)
* `MULTI_PROTOCOL_SOCKET_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:}, connectionListener)` 소켓 서버와 웹 소켓 서버를 결합한 다중 프로토콜 소켓 서버를 실행합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/NODE/SERVER/MULTI_PROTOCOL_SOCKET_SERVER.js)
* `CONNECT_TO_WEB_SOCKET_SERVER({host:, port:, fixRequestURI:}, {success:, error:})` connect to web socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/TRANSPORT/BROWSER/CONNECT_TO_WEB_SOCKET_SERVER.js)

###### 데이터베이스 관련
* `CONNECT_TO_DB_SERVER({username:, password:, host:, port:, name:}, function() {...})` connect to MongoDB server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)

###### ROOM
* `LAUNCH_ROOM_SERVER({socketServerPort:, webSocketServerPort:, webServer:, isCreateWebSocketFixRequestManager:})` Launch room server class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/ROOM/NODE/ROOM.js)

###### UPLOAD
* UPLOAD_REQUEST

###### UTIL
* `MINIFY_CSS(code)` minify css. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_CSS.js)
* `MINIFY_JS(code)` minify js [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_JS.js)
* `IMAGEMAGICK_CONVERT(params)` `IMAGEMAGICK_CONVERT(params, function() {...})` `IMAGEMAGICK_CONVERT(params, {error: function() {...}, success : function() {...}})`  ImageMagick® convert. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_CONVERT.js)
* `IMAGEMAGICK_IDENTIFY(path, function() {...})` `IMAGEMAGICK_IDENTIFY(path, {error: function() {...}, success : function() {...}})` ImageMagick® identify. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.js)
* `IMAGEMAGICK_READ_METADATA(path, function() {...})` `IMAGEMAGICK_READ_METADATA(path, {error: function() {...}, success : function() {...}})` ImageMagick® read metadata. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.js)
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, function() {...})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, {error: function() {...}, success : function() {...}})` ImageMagick® resize. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/.js)
* `COMPILE_COFFEE_TO_JS(code)` compile CoffeeScript to JavaScript. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/COMPILE_COFFEE_TO_JS.js)
* `COMPILE_LITCOFFEE_TO_JS(code)` compile literate CoffeeScript to JavaScript. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/COMPILE_LITCOFFEE_TO_JS.js)
* `RUN_COFFEE(code)` run CoffeeScript. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/RUN_COFFEE.js)
* `RUN_LITCOFFEE(code)` run literate CoffeeScript. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/COFFEESCRIPT/RUN_LITCOFFEE.js)

###### IO
* CONNECT_TO_IO_SERVER


## UPPERCASE.IO의 분산 처리 전략

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
