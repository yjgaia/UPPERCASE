# UPPERCASE-UPLOAD
클라이언트에서 서버로의 파일 업로드 처리를 쉽게 하는 모듈입니다.

## 설정
이하 설정을 적용하면 작동 방식이 결정됩니다.
* `NODE_CONFIG.maxUploadFileMB` 업로드 가능한 최대 파일 크기를 MB 단위로 설정합니다. 기본값은 `10` 입니다.

## API
* `UPLOAD_REQUEST({requestInfo:, uploadPath:}, function() {...})` `UPLOAD_REQUEST({requestInfo:, uploadPath:}, {overFileSize:, error:, success:})` create upload request handler. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UPLOAD/NODE/UPLOAD_REQUEST.js)
	* UPLOAD_REQUEST가 업로드 파일을 처리할 수 있도록 반드시 웹 서버에 noParsingParamsURI 설정을 추가해야 합니다. 예제를 참고해주세요.

## 업로드 폼 생성
웹 브라우저 환경에서는 `UPPERCASE-UPLOAD`는 `UPPERCASE.JS`와 `UPPERCASE-TRANSPORT`를 기반으로 합니다.

```html
<script>
	global = window;
</script>

<!-- import UPPERCASE.JS -->
<script src="UPPERCASE.JS-COMMON.js"></script>
<script src="UPPERCASE.JS-BROWSER.js"></script>
<script>
	BROWSER_CONFIG.fixScriptsFolderPath = 'UPPERCASE.JS-BROWSER-FIX';
	LOAD('UPPERCASE.JS-BROWSER-FIX/FIX.js');
</script>

<!-- import UPPERCASE-TRANSPORT -->
<script src="UPPERCASE-TRANSPORT/BROWSER.js"></script>

<script>
	READY(function() {
	
    	// init all singleton classes.
		INIT_OBJECTS();
		
		var
		// wrapper
		wrapper = DIV({
			c : [
			
			// 업로드가 완료되면 이곳에 파일 정보가 출력됩니다.
			IFRAME({
			    name : '__UPLOAD_FORM'
			}),
			
			// 업로드 폼
			FORM({
				action : 'http://' + BROWSER_CONFIG.host + ':' + BROWSER_CONFIG.port + '/__UPLOAD',
				target : '__UPLOAD_FORM',
				method : 'POST',
				enctype : 'multipart/form-data',
				c : [ input = INPUT({
					type : 'file',
					name : 'file',
					isMultiple : true
				}), INPUT({
				    type : 'submit'
				})]
			})]
		}).appendTo(BODY)
	});
</script>
```

## UPPERCASE-UPLOAD 단독 사용
`UPPERCASE-UPLOAD`는 `UPPERCASE`에 포함되어 있으나, 단독으로 사용할 수도 있습니다.

### 의존 모듈
`UPPERCASE-UPLOAD`는 아래 모듈들에 의존성을 가지므로, 단독으로 사용할 경우 `UPPERCASE-UPLOAD` 폴더와 함께 아래 모듈들을 복사해서 사용하시기 바랍니다.
* UPPERCASE-UPLOAD
* UPPERCASE-UTIL
* UPPERCASE-TRANSPORT
* UPPERCASE.JS-COMMON.js
* UPPERCASE.JS-NODE.js
* UPPERCASE.JS-BROWSER.js
* UPPERCASE.JS-BROWSER-FIX

## 사용 방법
아래 코드는 서버에서 파일 업로드 요청을 받아옵니다.
```javascript
// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE-TRANSPORT.
require('../../../UPPERCASE-TRANSPORT/NODE.js');

// load UPPERCASE-UTIL.
require('../../../UPPERCASE-UTIL/NODE.js');

// load UPPERCASE-UPLOAD.
require('../../../UPPERCASE-UPLOAD/NODE.js');

var
// web server
webServer = WEB_SERVER({
	port : 8124,
	// __UPLOAD라는 경로는 업로드 처리를 위해 웹 서버에서 따로 parsing 하지 않는다.
	noParsingParamsURI : '__UPLOAD'
}, function(requestInfo, response, onDisconnected) {

	if (requestInfo.uri === '__UPLOAD') {

		UPLOAD_REQUEST({
			requestInfo : requestInfo,
			// 업로드 한 파일들이 UPLOAD_FILES 폴더에 저장됩니다.
			uploadPath : __dirname + '/UPLOAD_FILES'
		}, {
			error : function(errorMsg) {
				response(errorMsg);
			},
			overFileSize : function() {
				response('OVER FILE SIZE!');
			},
			success : function(fileDataSet) {
				response(STRINGIFY(fileDataSet));
			}
		});
	}
});
```
