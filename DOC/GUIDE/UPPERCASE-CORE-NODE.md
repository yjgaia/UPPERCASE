# UPPERCASE-CORE-NODE
UPPERCASE-CORE-NODE는 Node.js 환경에서 사용할 수 있는 모듈입니다. [UPPERCASE-COMMON-CORE](UPPERCASE-COMMON-CORE.md)를 포함하고 있습니다.
* [API 문서](../../API/UPPERCASE-CORE/NODE/README.md)

## 목차
* [손쉬운 서버 생성](#손쉬운-서버-생성)
* 손쉬운 클러스터링
* 이미지 처리 기능
* [파일 처리 기능](#파일-처리-기능)
* [HTTP 요청 기능](#http-요청-기능)
* 시스템 관련 기능
* 콘솔 로그 관련 기능
* 암호화 관련 기능
* [코드 압축 기능](#코드-압축-기능)

## 손쉬운 서버 생성
TODO:

### 웹 서버 생성
TODO:

### 웹소켓 서버 생성
TODO:

### 소켓(TCP) 서버 생성
TODO:

### 웹소켓 + 소켓 통합 서버 생성
TODO:

### UDP 서버 생성
TODO:

## 손쉬운 클러스터링
TODO:

### CPU 클러스터링
TODO:

### 서버 간 클러스터링
TODO:

## 이미지 처리 기능
TODO:

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

## HTTP 요청 기능
### `REQUEST`
HTTP 요청을 보냅니다.

사용 가능한 형태들은 다음과 같습니다.
* `REQUEST({파라미터들}, function(content, headers) {})`
* `REQUEST({파라미터들}, {error:, success:})`

사용 가능한 파라미터 목록은 다음과 같습니다.
* `method` 요청 메소드 입니다. `GET`, `POST`, `PUT`, `DELETE`를 설정할 수 있습니다.
* `isSecure` HTTPS 프로토콜인지 여부
* `host`
* `port`
* `uri`
* `url` 요청을 보낼 URL입니다. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` 요청을 UPPERCASE기반 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
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
* `url` 요청을 보낼 URL입니다. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` 요청을 UPPERCASE기반 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
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
* `url` 요청을 보낼 URL입니다. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` 요청을 UPPERCASE기반 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
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
* `url` 요청을 보낼 URL입니다. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` 요청을 UPPERCASE기반 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
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
* `url` 요청을 보낼 URL입니다. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` 요청을 UPPERCASE기반 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
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
* `url` 요청을 보낼 URL입니다. `url`을 입력하면 `isSecure`, `host`, `port`, `uri`를 입력할 필요가 없습니다.
* `paramStr` `a=1&b=2&c=3`과 같은 형태의 파라미터 문자열
* `params` 데이터 형태(`{...}`)로 표현한 파라미터 목록
* `data` 요청을 UPPERCASE기반 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
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

## 시스템 관련 기능
TODO:

## 콘솔 로그 관련 기능
TODO:

## 암호화 관련 기능
TODO:

## 코드 압축 기능
### `MINIFY_JS(code)`
JavaScript 코드를 압축합니다.

### `MINIFY_CSS(code)`
CSS 코드를 압축합니다.