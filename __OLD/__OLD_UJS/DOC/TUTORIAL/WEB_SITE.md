# 간단한 웹 사이트 만들기
이번에는 UJS를 사용하여 간단한 웹 사이트를 만들어 보겠습니다. 맨 처음으로, 접속한 URI와 같은 위치에 존재하는 HTML 파일을 불러와 출력시켜주는 코드를 작성해보겠습니다.

## HTML 파일을 불러와 출력하기

###### server.js
접속한 URI와 같은 위치에 존재하는 HTML 파일을 불러와 출력시켜주는 웹 서버입니다.

```javascript
WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index';
	}
	
	uri = uri + '.html';
	
	READ_FILE(uri, {
		
        // 파일이 존재하지 않으면 404
		notExists : function() {
			response(404);
		},
		
        // 파일이 존재하면 출력
		success : function(buffer) {
			response({
				buffer : buffer
			});
		}
	});
});
```

## UJS-BROWSER 사용하기
UJS의 DOM 템플릿을 사용하면 화면을 JavaScript 만으로 구성할 수 있습니다. 자세한 내용은 [JavaScript 만으로 웹 페이지 만들기](../JS_WEB_PAGE.md) 문서를 참고하시기 바랍니다.

###### server.js
위 HTML 파일을 불러와 출력하는 서버 코드에서 UJS 관련 리소스를 제공하는 부분을 추가합니다.

```javascript
WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index.html';
	}
	
	// load UJS
	else if (uri.substring(0, 'UJS-'.length) === 'UJS-') {
		uri = '../../../' + uri;
	}
	
	READ_FILE(uri, {
		
		notExists : function() {
			response(404);
		},
		
		success : function(buffer) {
			response({
				buffer : buffer
			});
		}
	});
});
```

###### index.html
UJS 및 각종 JavaScript 파일들을 불러오고, 프로젝트를 초기화하는 코드를 담고 있는 index.html 파일을 작성합니다.

```html
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>UJS-BROWSER Web Site Tutorial</title>
	</head>
	<body>
		<!-- UJS-BROWSER.js를 불러옵니다. -->
		<script src="/UJS-BROWSER.js"></script>
		<!-- 구버젼 브라우저에 대한 지원과, 각종 브라우저들이 갖고있는 버그를 고쳐주는 BROWSER-FIX를 불러옵니다. -->
		<script>
			// UJS-BROWSER-FIX 폴더 지정
		    BROWSER_CONFIG.fixScriptsFolderPath = '/UJS-BROWSER-FIX';
		    // FIX.js를 불러옵니다.
		    LOAD('/UJS-BROWSER-FIX/FIX.js');
		</script>
		<script src="/MAIN.js"></script>
		<script src="/Home.js"></script>
		<script>
			READY(function() {

				// OBJECT 초기화 부분
				INIT_OBJECTS();
				
				MAIN();
			});
		</script>
	</body>
</html>
```

###### MAIN.js
URI와 뷰를 연결해주는 코드를 작성합니다.

```javascript
global.MAIN = METHOD({

	run : function(params) {
		'use strict';

		MATCH_VIEW({
			uri : '',
			target : Home
		});
	}
});
```

###### Home.js
뷰를 작성합니다.

```javascript
global.Home = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// wrapper
		wrapper,

		// close.
		close;

		TITLE('Welcome to Tutorial Site.');

		wrapper = DIV({
			c : 'UJS-BROWSER Web Site Tutorial'
		}).appendTo(BODY);

		//OVERRIDE: self.close
		self.close = close = function(params) {
			wrapper.remove();
		};
	}
});
```

## 다른 템플릿 엔진 사용하기
UJS-BROWSER의 DOM 템플릿을 사용할 수도 있지만, 다른 템플릿 엔진 또한 사용할 수 있습니다.

### Jade 사용하기
JavaScript 기반 템플릿 엔진인 [Jade](http://jade-lang.com)를 사용하여 사이트 만들기

###### server.js
```javascript
var
//IMPORT: Jade
Jade = require('jade');

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
    // 경로가 '' 이면 index로 변경
	if (uri === '') {
		uri = 'index';
	}
	
    // 경로에 .jade를 붙힘
	uri = uri + '.jade';
	
    // 파일이 존재하면,
	CHECK_IS_EXISTS_FILE(uri, function(isExists) {
		
        // Jade로 렌더링하여 출력
		if (isExists === true) {
			response(Jade.renderFile(uri,
			// params	
			{
				pageTitle : 'Page Title'
			}));
		}
        
        // 파일이 존재하지 않으면 404
        else {
			response(404);
		}
	});
});
```
