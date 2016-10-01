# UPPERCASE-CORE-NODE
UPPERCASE-CORE-NODE는 Node.js 환경에서 사용할 수 있는 모듈입니다. [UPPERCASE-COMMON-CORE](UPPERCASE-COMMON-CORE.md)를 포함하고 있습니다.
* [API 문서](../../API/UPPERCASE-CORE/NODE/README.md)

## 목차
* [사용방법](#사용방법)
* [`NODE_CONFIG`](#node_config)
* [파일 처리 기능](#파일-처리-기능)
* [이미지 처리 기능](#이미지-처리-기능)
* [손쉬운 서버 생성](#손쉬운-서버-생성)
* [HTTP 요청 기능](#http-요청-기능)
* [손쉬운 클러스터링](#손쉬운-클러스터링)
* [시스템 관련 기능](#시스템-관련-기능)
* [콘솔 로그 관련 기능](#콘솔-로그-관련-기능)
* [문자열 암호화 기능](#문자열-암호화-기능)
* [코드 압축 기능](#코드-압축-기능)

## 사용방법
`UPPERCASE-CORE` 폴더 내의 `NODE.js` 파일을 복사하여 사용하거나, `npm`을 사용합니다.ㄴ

### `NODE.js` 파일을 복사하는 경우
```javascript
require('./UPPERCASE-CORE/NODE.js');
```

### `npm`을 사용하는 경우
```
npm install uppercase-core-node
```
```javascript
require('uppercase-core-node');
```

## `NODE_CONFIG`
UPPERCASE 기반 프로젝트에서 Node.js 환경 전용 설정값들을 저장하는 데이터입니다. UPPERCASE의 다른 모듈들도 이를 확장하여 사용합니다. UPPERCASE-CORE-NODE에서는 별다른 설정값을 가지고 있지 않습니다.

## 파일 처리 기능
파일을 다루는 다양한 기능들을 소개합니다. 파일 처리 기능들은 공통적으로 `isSync` 파라미터를 설정할 수 있습니다. `isSync`를 `true`로 설정하게 되면, 기능을 수행하는 동안 프로그램이 일시정지하여 성능이 떨어지게 됩니다. 따라서 특수한 경우가 아니라면 `isSync` 파라미터를 사용하지 않으시기 바랍니다.

```javascript
// 일반적인 경우
READ_FILE('some.txt', function(buffer) {
	console.log('파일의 내용: ' + buffer.toString());
});

// isSync를 true로 설정
console.log('파일의 내용: ' + READ_FILE({
    path : 'some.txt',
    isSync : true
}).toString());
```

### `WRITE_FILE`
파일을 작성합니다. 파일이 없으면 파일을 생성하고, 파일이 이미 있으면 내용을 덮어씁니다.

사용 가능한 형태들은 다음과 같습니다.
* `WRITE_FILE({path:, content:}, function() {})`
* `WRITE_FILE({path:, content:}, {error:, success:})`
* `WRITE_FILE({path:, buffer:}, function() {})`
* `WRITE_FILE({path:, buffer:}, {error:, success:})`
* `WRITE_FILE({path:, content:, isSync: true})`
* `WRITE_FILE({path:, buffer:, isSync: true})`

```javascript
WRITE_FILE({
	path : 'some.txt',
	content : '이것은 텍스트 파일입니다.'
}, {
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function() {
		console.log('파일 작성에 성공하였습니다.');
	}
});
```

### `READ_FILE`
파일의 내용을 불러옵니다. 내용을 `Buffer`형으로 불러오기 때문에, 내용을 문자열로 불러오려면 `toString` 함수를 이용하시기 바랍니다.

사용 가능한 형태들은 다음과 같습니다.
* `READ_FILE(path, function(buffer) {})`
* `READ_FILE(path, {notExists:, success:})`
* `READ_FILE(path, {error:, success:})`
* `READ_FILE(path, {notExists:, error:, success:})`
* `READ_FILE({path:, isSync: true})`

```javascript
READ_FILE('some.txt', {
	notExists : function() {
		console.log('파일이 존재하지 않습니다.');
	},
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function(buffer) {
		console.log('파일의 내용: ' + buffer.toString());
	}
});
```

### `GET_FILE_INFO`
파일의 정보를 불러옵니다. 파일의 크기(`size`), 생성 시간(`createTime`), 최종 수정 시간(`lastUpdateTime`)을 불러옵니다.

사용 가능한 형태들은 다음과 같습니다.
* `GET_FILE_INFO(path, function(info) {})`
* `GET_FILE_INFO(path, {notExists:, success:})`
* `GET_FILE_INFO(path, {error:, success:})`
* `GET_FILE_INFO(path, {notExists:, error:, success:})`
* `GET_FILE_INFO({path:, isSync: true})`

```javascript
GET_FILE_INFO('some.txt', {
	notExists : function() {
		console.log('파일이 존재하지 않습니다.');
	},
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function(info) {
		console.log('파일의 크기: ' + info.size + ' 바이트');
		console.log('파일의 생성 시간: ' + info.createTime);
		console.log('파일의 최종 수정 시간: ' + info.lastUpdateTime);
	}
});
```

### `COPY_FILE`
파일을 복사합니다.

사용 가능한 형태들은 다음과 같습니다.
* `COPY_FILE({from:, to:}, function() {})`
* `COPY_FILE({from:, to:}, {notExists:, success:})`
* `COPY_FILE({from:, to:}, {error:, success:})`
* `COPY_FILE({from:, to:}, {notExists:, error:, success:})`
* `COPY_FILE({from:, to:, isSync: true})`

```javascript
COPY_FILE({
	from : 'from.txt',
	to : 'to.txt'
}, {
	notExists : function() {
		console.log('파일이 존재하지 않습니다.');
	},
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function() {
		console.log('파일을 복사했습니다.');
	}
});
```

### `MOVE_FILE`
파일의 위치를 이동시킵니다.

사용 가능한 형태들은 다음과 같습니다.
* `MOVE_FILE({from:, to:}, function() {})`
* `MOVE_FILE({from:, to:}, {notExists:, success:})`
* `MOVE_FILE({from:, to:}, {error:, success:})`
* `MOVE_FILE({from:, to:}, {notExists:, error:, success:})`
* `MOVE_FILE({from:, to:, isSync: true})`

```javascript
MOVE_FILE({
	from : 'from.txt',
	to : 'to.txt'
}, {
    notExists : function() {
		console.log('파일이 존재하지 않습니다.');
	},
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function() {
		console.log('파일을 옮겼습니다.');
	}
});
```

### `REMOVE_FILE`
파일을 삭제합니다.

사용 가능한 형태들은 다음과 같습니다.
* `REMOVE_FILE(path, function() {})`
* `REMOVE_FILE(path, {notExists:, success:})`
* `REMOVE_FILE(path, {error:, success:})`
* `REMOVE_FILE(path, {notExists:, error:, success:})`
* `REMOVE_FILE({path:, isSync: true})`

```javascript
REMOVE_FILE('some.txt', {
	notExists : function() {
		console.log('파일이 존재하지 않습니다.');
	},
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function() {
		console.log('파일을 삭제했습니다.');
	}
});
```

### `CHECK_IS_EXISTS_FILE`
지정된 경로에 파일이나 폴더가 존재하는지 확인합니다.

사용 가능한 형태들은 다음과 같습니다.
* `CHECK_IS_EXISTS_FILE(path, function(isExists) {})`
* `CHECK_IS_EXISTS_FILE({path:, isSync: true})`

```javascript
CHECK_IS_EXISTS_FILE('some.txt', function(isExists) {
    if (isExists === true) {
	    console.log('파일이 존재합니다.');
	} else {
	    console.log('파일이 존재하지 않습니다.');
	}
});
```

### `CREATE_FOLDER`
폴더를 생성합니다.

사용 가능한 형태들은 다음과 같습니다.
* `CREATE_FOLDER(path, function() {})`
* `CREATE_FOLDER(path, {error:, success:})`
* `CREATE_FOLDER({path:, isSync: true})`

```javascript
CREATE_FOLDER('SomeFolder', {
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function() {
		console.log('폴더를 생성했습니다.');
	}
});
```

### `REMOVE_FOLDER`
폴더를 삭제합니다. 폴더 내의 모든 파일 및 폴더를 삭제하므로, 주의해서 사용해야 합니다.

사용 가능한 형태들은 다음과 같습니다.
* `REMOVE_FOLDER(path, function() {})`
* `REMOVE_FOLDER(path, {notExists:, success:})`
* `REMOVE_FOLDER(path, {error:, success:})`
* `REMOVE_FOLDER(path, {notExists:, error:, success:})`
* `REMOVE_FOLDER({path:, isSync: true})`

```javascript
REMOVE_FOLDER('SomeFolder', {
	notExists : function() {
		console.log('폴더가 존재하지 않습니다.');
	},
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function() {
		console.log('폴더를 삭제했습니다.');
	}
});
```

### `CHECK_IS_FOLDER`
지정된 경로가 (파일이 아닌) 폴더인지 확인합니다.

사용 가능한 형태들은 다음과 같습니다.
* `CHECK_IS_FOLDER(path, function(isFolder) {})`
* `CHECK_IS_FOLDER({path:, isSync: true})`

```javascript
CHECK_IS_FOLDER('SomeFolder', function(isFolder) {
    if (isFolder === true) {
	    console.log('폴더입니다.');
	} else {
	    console.log('파일입니다.');
	}
});
```

### `FIND_FILE_NAMES`
지정된 경로에 위치한 파일들의 이름 목록을 불러옵니다. (폴더는 제외합니다.)

사용 가능한 형태들은 다음과 같습니다.
* `FIND_FILE_NAMES(path, function(fileNames) {})`
* `FIND_FILE_NAMES(path, {notExists:, success:})`
* `FIND_FILE_NAMES(path, {error:, success:})`
* `FIND_FILE_NAMES(path, {notExists:, error:, success:})`
* `FIND_FILE_NAMES({path:, isSync: true})`

```javascript
FIND_FILE_NAMES('SomeFolder', {
	notExists : function() {
		console.log('폴더가 존재하지 않습니다.');
	},
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function(fileNames) {
		console.log('이 폴더에 존재하는 파일들은 다음과 같습니다. 파일 목록: ' + fileNames);
	}
});
```

### `FIND_FOLDER_NAMES`
지정된 경로에 위치한 폴더들의 이름 목록을 불러옵니다. (파일은 제외합니다.)

사용 가능한 형태들은 다음과 같습니다.
* `FIND_FOLDER_NAMES(path, function(folderNames) {})`
* `FIND_FOLDER_NAMES(path, {notExists:, success:})`
* `FIND_FOLDER_NAMES(path, {error:, success:})`
* `FIND_FOLDER_NAMES(path, {notExists:, error:, success:})`
* `FIND_FOLDER_NAMES({path:, isSync: true})`

```javascript
FIND_FOLDER_NAMES('SomeFolder', {
	notExists : function() {
		console.log('폴더가 존재하지 않습니다.');
	},
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function(folderNames) {
		console.log('이 폴더에 존재하는 폴더들은 다음과 같습니다. 폴더 목록: ' + folderNames);
	}
});
```

## 이미지 처리 기능
UPPERCASE-CORE-NODE에는 성능과 안정성이 보장된 [ImageMagick](http://www.imagemagick.org)을 사용하여 이미지를 쉽게 처리할 수 있도록 도와주는 기능들이 있습니다. 이미지 처리 기능을 사용하기 전에, [ImageMagick 설치하기](INSTALL_IMAGEMAGICK.md)를 참고하시어 ImageMagick을 먼저 설치해주시기 바랍니다.

### `IMAGEMAGICK_CONVERT`
ImageMagick의 `convert` 기능을 사용합니다.

사용 가능한 형태들은 다음과 같습니다.
* `IMAGEMAGICK_CONVERT(params)`
* `IMAGEMAGICK_CONVERT(params, function() {})`
* `IMAGEMAGICK_CONVERT(params, {error:, success:})`

```javascript
IMAGEMAGICK_CONVERT(['sample.png', '-resize', '100x100\!', 'sample-square.png']);
```
```javascript
IMAGEMAGICK_CONVERT(['sample.png', '-resize', '200x200\!', 'sample-square.png'], function() {
	console.log('이미지 크기를 변경하였습니다.');
});
```
```javascript
IMAGEMAGICK_CONVERT(['sample.png', '-resize', '300x300\!', 'sample-square.png'], {
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function() {
	    console.log('이미지 크기를 변경하였습니다.');
	}
});
```

### `IMAGEMAGICK_IDENTIFY`
ImageMagick의 `identify` 기능을 사용합니다.

사용 가능한 형태들은 다음과 같습니다.
* `IMAGEMAGICK_IDENTIFY(path, function() {})`
* `IMAGEMAGICK_IDENTIFY(path, {error:, success:})`

```javascript
IMAGEMAGICK_IDENTIFY('image.png', function(features) {
	console.log('이미지 정보: ' + STRINGIFY(features));
	console.log('이미지 크기: ' + features.width + 'x' + features.height);
});
```
```javascript
IMAGEMAGICK_IDENTIFY('image.png', {
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function(metadata) {
	    console.log('이미지 정보: ' + STRINGIFY(features));
	    console.log('이미지 크기: ' + features.width + 'x' + features.height);
	}
});
```

### `IMAGEMAGICK_READ_METADATA`
ImageMagick을 이용해 이미지의 메타데이터를 반한홥니다.

사용 가능한 형태들은 다음과 같습니다.
* `IMAGEMAGICK_READ_METADATA(path, function() {})`
* `IMAGEMAGICK_READ_METADATA(path, {error:, success:})`

```javascript
IMAGEMAGICK_READ_METADATA('image.png', function(metadata) {
	console.log('이미지의 메타 데이터: ' + STRINGIFY(metadata));
});
```
```javascript
IMAGEMAGICK_READ_METADATA('image.png', {
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function(metadata) {
	    console.log('이미지의 메타 데이터: ' + STRINGIFY(metadata));
	}
});
```

### `IMAGEMAGICK_RESIZE`
ImageMagick을 사용해 이미지의 크기를 조절하여 새 파일로 저장합니다.

사용 가능한 형태들은 다음과 같습니다.
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:}, function() {})`
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, height:}, function() {})`
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, function() {})`
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:}, {error:, success:})`
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, height:}, {error:, success:})`
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, {error:, success:})`

```javascript
IMAGEMAGICK_RESIZE({
	srcPath : 'image.png',
	distPath : 'image-width-100.png',
	width : 100
});
```
```javascript
IMAGEMAGICK_RESIZE({
	srcPath : 'image.png',
	distPath : 'image-height-100.png',
	height : 100
}, function() {
    console.log('이미지 크기를 변경하였습니다.');
});
```
```javascript
IMAGEMAGICK_RESIZE({
	srcPath : 'image.png',
	distPath : 'image-square.png',
	width : 100,
	height : 100
}, {
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function() {
	    console.log('이미지 크기를 변경하였습니다.');
	}
});
```

## 손쉬운 서버 생성
UPPERCASE-CORE-NODE를 사용하게 되면 여러 종류의 서버들을 손쉽게 생성할 수 있습니다.

### `WEB_SERVER(portOrParams, requestListenerOrHandlers)`
웹 서버를 생성하는 클래스

사용 가능한 형태들은 다음과 같습니다.

#### 요청에 응답하는 간단한 웹 서버

```javascript
WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
    
	// http://localhost:8123/main
	if (requestInfo.uri === 'main') {
		response('Welcome!');
	}
});
```

#### 리소스를 제공하는 웹 서버
아래 코드를 실행하면 `R` 폴더의 리소스들을 제공하는 웹 서버가 생성됩니다. 만약 `R` 폴더에 `photo.png` 파일이 존재한다면, http://localhost:8123/photo.png 로 접속하면 해당 이미지를 열 수 있습니다.
```javascript
WEB_SERVER({
    port : 8123,
	rootPath : __dirname + '/R'
});
```

`version` 파라미터를 지정하게 되면, 리소스들을 웹 브라우저에 캐싱하게 됩니다.
```javascript
WEB_SERVER({
    port : 8123,
	rootPath : __dirname + '/R',
	version : Date.now()
});
```

* `CONFIG.isDevMode`가 `true`인 경우에는 `version` 파라미터를 지정하더라도 캐싱 기능이 작동하지 않습니다.

#### 업로드 기능을 제공하는 웹 서버
웹 서버에 업로드 기능을 추가할 수 있습니다. 상세한 예제는  [UPPERCASE-UPLOAD-SAMPLE 프로젝트](https://github.com/Hanul/UPPERCASE-UPLOAD-SAMPLE)를 살펴보시기 바랍니다.
```javascript
WEB_SERVER({
    port : 8123,
	uploadURI : '__UPLOAD',
	uploadPath : __dirname + '/UPLOAD_FILES'
}, {
	uploadProgress : function(params, bytesRecieved, bytesExpected) {
		console.log('업로드 중... (' + bytesRecieved + '/' + bytesExpected + ')');
	},
    uploadOverFileSize : function(params, maxUploadFileMB, response) {
		response('업로드 가능한 용량은 최대 ' + maxUploadFileMB + 'MB 입니다.');
	},
	uploadSuccess : function(params, fileDataSet, response) {
		response('업로드가 완료되었습니다. 파일 정보: ' + STRINGIFY(fileDataSet));
	}
});
```

* 파일 업로드 시, 이미지 파일인 경우 [Exif 메타데이터의 정보](https://ko.wikipedia.org/wiki/%EA%B5%90%ED%99%98_%EC%9D%B4%EB%AF%B8%EC%A7%80_%ED%8C%8C%EC%9D%BC_%ED%98%95%EC%8B%9D#Exif_.EB.A9.94.ED.83.80.EB.8D.B0.EC.9D.B4.ED.84.B0.EC.9D.98_.EC.A0.95.EB.B3.B4)를 참고하여 자동으로 이미지의 방향을 교정해줍니다. 이를 위해 [ImageMagick](http://www.imagemagick.org)을 이용한 이미지 처리 기능을 사용합니다. 따라서 [ImageMagick 설치하기](INSTALL_IMAGEMAGICK.md)를 참고하시어, ImageMagick을 먼저 설치해주시기 바랍니다.

`WEB_SERVER`에 사용 가능한 파라미터 목록은 다음과 같습니다.
* `port` HTTP 서버 포트
* `securedPort` HTTPS 서버 포트
* `securedKeyFilePath` SSL인증 .key 파일 경로
* `securedCertFilePath` SSL인증 .cert 파일 경로
* `rootPath` 리소스 루트 폴더
* `version` 캐싱을 위한 버전. 입력하지 않으면 캐싱 기능이 작동하지 않습니다.
* `preprocessors` 프리프로세서들. 뷰 템플릿 등과 같이, 특정 확장자의 리소스를 응답하기 전에 내용을 변경하는 경우 사용합니다.
* `uploadURI` 업로드를 처리할 URI. URI 문자열 혹은 URI 문자열 배열로 입력합니다.
* `maxUploadFileMB` 최대 업로드 파일 크기 (MB). 입력하지 않으면 10MB로 지정됩니다.
* `uploadPath` 업로드한 파일을 저장할 경로

`WEB_SERVER`에 사용 가능한 핸들러 목록은 다음과 같습니다.
* `notExistsResource` 리소스가 존재하지 않는 경우
* `error`
* `requestListener`
* `uploadProgress`
* `uploadOverFileSize` 업로드 하는 파일의 크기가 maxUploadFileMB보다 클 경우
* `uploadSuccess`

### 웹소켓 서버 생성
TODO:

### 소켓(TCP) 서버 생성
TODO:

### 웹소켓 + 소켓 통합 서버 생성
TODO:

### UDP 서버 생성
TODO:

## HTTP 요청 기능
### `REQUEST`
HTTP 요청을 보냅니다.

사용 가능한 형태들은 다음과 같습니다.
* `REQUEST({파라미터들}, function(content, headers) {})`
* `REQUEST({파라미터들}, {error:, success:})`

사용 가능한 파라미터 목록은 다음과 같습니다.
* `method` 요청 메소드. `GET`, `POST`, `PUT`, `DELETE`를 설정할 수 있습니다.
* `isSecure` HTTPS 프로토콜인지 여부
* `host`
* `port`
* `uri`
* `url` 요청을 보낼 URL. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
* `headers` 요청 헤더

```javascript
REQUEST({
	method : 'GET',
	isSecure : true,
	host : 'github.com',
	uri : 'Hanul/UPPERCASE'
}, function(content) {
	...
});
```
```javascript
REQUEST({
	method : 'GET',
	url : 'https://github.com/Hanul/UPPERCASE'
}, function(content) {
	...
});
```

### `GET`
HTTP GET 요청을 보냅니다.

사용 가능한 형태들은 다음과 같습니다.
* `GET({파라미터들}, function(content, headers) {})`
* `GET({파라미터들}, {error:, success:})`
* `GET(url, function(content, headers) {})`
* `GET(url, {error:, success:})`

사용 가능한 파라미터 목록은 다음과 같습니다.
* `isSecure` HTTPS 프로토콜인지 여부
* `host`
* `port`
* `uri`
* `url` 요청을 보낼 URL. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
* `headers` 요청 헤더

```javascript
GET({
	isSecure : true,
	host : 'github.com',
	uri : 'Hanul/UPPERCASE'
}, function(content) {
	...
});
```
```javascript
GET('https://github.com/Hanul/UPPERCASE', function(content) {
	...
});
```

### `POST`
HTTP POST 요청을 보냅니다.

사용 가능한 형태들은 다음과 같습니다.
* `POST({파라미터들}, function(content, headers) {})`
* `POST({파라미터들}, {error:, success:})`
* `POST(url, function(content, headers) {})`
* `POST(url, {error:, success:})`

사용 가능한 파라미터 목록은 다음과 같습니다.
* `isSecure` HTTPS 프로토콜인지 여부
* `host`
* `port`
* `uri`
* `url` 요청을 보낼 URL. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
* `headers` 요청 헤더

### `PUT`
HTTP POST 요청을 보냅니다.

사용 가능한 형태들은 다음과 같습니다.
* `PUT({파라미터들}, function(content, headers) {})`
* `PUT({파라미터들}, {error:, success:})`
* `PUT(url, function(content, headers) {})`
* `PUT(url, {error:, success:})`

사용 가능한 파라미터 목록은 다음과 같습니다.
* `isSecure` HTTPS 프로토콜인지 여부
* `host`
* `port`
* `uri`
* `url` 요청을 보낼 URL. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
* `headers` 요청 헤더

### `DELETE`
HTTP POST 요청을 보냅니다.

사용 가능한 형태들은 다음과 같습니다.
* `DELETE({파라미터들}, function(content, headers) {})`
* `DELETE({파라미터들}, {error:, success:})`
* `DELETE(url, function(content, headers) {})`
* `DELETE(url, {error:, success:})`

사용 가능한 파라미터 목록은 다음과 같습니다.
* `isSecure` HTTPS 프로토콜인지 여부
* `host`
* `port`
* `uri`
* `url` 요청을 보낼 URL. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
* `headers` 요청 헤더

### `DOWNLOAD`
HTTP 리소스를 다운로드합니다.

사용 가능한 형태들은 다음과 같습니다.
* `DOWNLOAD({파라미터들}, function(content, headers) {})`
* `DOWNLOAD({파라미터들}, {error:, success:})`

사용 가능한 파라미터 목록은 다음과 같습니다.
* `isSecure` HTTPS 프로토콜인지 여부
* `host`
* `port`
* `uri`
* `url` 요청을 보낼 URL. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
* `headers` 요청 헤더
* `path` 리소스를 다운로드하여 저장할 경로

```javascript
DOWNLOAD({
	isSecure : true,
	host : 'github.com',
	uri : 'Hanul/UPPERCASE/archive/master.zip',
	path : 'UPPERCASE.zip'
});
```
```javascript
DOWNLOAD({
	url : 'https://github.com/Hanul/UPPERCASE/archive/master.zip',
	path : 'UPPERCASE.zip'
});
```

## 손쉬운 클러스터링
TODO:

### CPU 클러스터링
TODO:

### 서버 간 클러스터링
TODO:

## 시스템 관련 기능
### `CPU_USAGES()`
CPU 각 코어 당 사용률을 반환합니다.

### `MEMORY_USAGE()`
메모리 사용률을 반환합니다.

### `DISK_USAGE()`
디스크 사용률을 반환합니다.

사용 가능한 형태들은 다음과 같습니다.
* `DISK_USAGE({function(usage) {}})`
* `DISK_USAGE({error:, success:})`
* `DISK_USAGE(drive, {function(usage) {}})`
* `DISK_USAGE(drive, {error:, success:})`

```javascript
DISK_USAGE('c:', function(usage) {
    console.log(usage);
});
```

### `RUN_SCHEDULE_DAEMON(schedules)`
매일 정해진 시간마다 주어진 터미널 명령어들을 실행하는 데몬을 구동합니다.

아래는 프로세스에 쌓여있는 메모리를 초기화하기 위해, 유저 수가 적은 새벽 6시에 `forever` 모듈로 실행시킨 데몬을 재시작하는 코드입니다.
```javascript
RUN_SCHEDULE_DAEMON([
// 새벽 6시에 서비스 중지
{
	hour : 6,
	commands : [
		'forever stop MessengerServer.js',
		'pkill -f "node --max-old-space-size=16384 /root/Service/Messenger/MessengerServer.js"'
	]
},
// 새벽 6시 1분에 서비스 재개
{
	hour : 6,
	minute : 1,
	commands : [
		'forever start -c "node --max-old-space-size=16384" MessengerServer.js'
	]
}]);
```

## 콘솔 로그 관련 기능
### `CONSOLE_RED(text)`
콘솔에 표시할 텍스트를 빨간색으로 설정합니다.
```javascript
console.log('이것은 ' + CONSOLE_RED('빨간색') + '입니다.');
```

### `CONSOLE_GREEN(text)`
콘솔에 표시할 텍스트를 초록색으로 설정합니다.
```javascript
console.log('이것은 ' + CONSOLE_GREEN('초록색') + '입니다.');
```

### `CONSOLE_BLUE(text)`
콘솔에 표시할 텍스트를 파란색으로 설정합니다.
```javascript
console.log('이것은 ' + CONSOLE_BLUE('파란색') + '입니다.');
```

### `CONSOLE_YELLOW(text)`
콘솔에 표시할 텍스트를 노란색으로 설정합니다.
```javascript
console.log('이것은 ' + CONSOLE_YELLOW('노란색') + '입니다.');
```

### `SHOW_ERROR(tag, errorMsg)` `SHOW_ERROR(tag, errorMsg, params)`
콘솔에 오류 메시지를 출력합니다.

다음 코드를 실행하면,
```javascript
SHOW_ERROR('샘플 오류', '엄청난 오류가 발생했습니다!');
```
콘솔에 다음과 같은 오류 메시지를 빨간색으로 출력합니다.
```
[샘플 오류] 오류가 발생했습니다. 오류 메시지: 엄청난 오류가 발생했습니다!
```

다음 코드를 실행하면,
```javascript
SHOW_ERROR('샘플 오류', '엄청난 오류가 발생했습니다!', {
    a : 1,
    b : 2,
    c : 3
});
```
콘솔에 다음과 같은 오류 메시지를 빨간색으로 출력합니다.
```
[샘플 오류] 오류가 발생했습니다. 오류 메시지: 엄청난 오류가 발생했습니다!
다음은 오류를 발생시킨 파라미터입니다.
{
    "a": 1,
    "b": 2,
    "c": 3
}
```

## 문자열 암호화 기능
문자열 암호화 기능으로 `HMAC-SHA` 알고리즘들 중 `HMAC-SHA1`, `HMAC-SHA256`, `HMAC-SHA512` 세가지를 지원합니다. [`SHA1` 알고리즘의 취약점](https://en.wikipedia.org/wiki/SHA-1#The_SHAppening)이 발견되었기 때문에, `HMAC-SHA1` 보다는 `HMAC-SHA256`나 `HMAC-SHA512`를 사용하시기 바랍니다.

### `SHA1({password:, key})`
비밀번호를 주어진 키를 이용하여 HMAC SHA1 알고리즘으로 암호화 합니다. **그러나 SHA1 알고리즘의 취약점이 발견**되었기 때문에, 암호화가 필요한 경우에는 SHA256을 사용하시기 바랍니다.

```javascript
SHA1({
	password : '1234',
	key : 'test'
}); // '16dd1fdd7c595eab4586cebba6b34eaff41acc53'
```

### `SHA256({password:, key})`
비밀번호를 주어진 키를 이용하여 HMAC SHA256 알고리즘으로 암호화 합니다.

```javascript
SHA256({
	password : '1234',
	key : 'test'
}); // '5471d39e681ffc00128c11b573f4a3356ceba766956bb928d562d2c7c0c2db6a'
```

### `SHA512({password:, key})`
비밀번호를 주어진 키를 이용하여 HMAC SHA512 알고리즘으로 암호화 합니다.

```javascript
SHA512({
	password : '1234',
	key : 'test'
}); // 'ae451e84ce797ab519f454e9e3c9220550a5119c1063f75837281e4157c91cf27ec3d7a38df3254cdbc4c108189ed4b8d904baf2320a23d5268b1e81c110343b'
```

## 코드 압축 기능
### `MINIFY_JS(code)`
JavaScript 코드를 압축합니다.

### `MINIFY_CSS(code)`
CSS 코드를 압축합니다.