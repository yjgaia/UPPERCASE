작성중

# 간단한 웹 서버 만들기

UJS를 이용하여 웹 서버를 쉽게 만들 수 있습니다.
이하는 간단히 웹 서버를 구동하는 코드입니다. http://localhost:8123 으로 접속하면 Welcome! 이라는 메시지를 출력합니다.
```javascript
require('UJS-NODE.js');

INIT_OBJECTS();

WEB_SERVER(8123, (requestInfo, response, onDisconnected) => {

	let uri = requestInfo.uri;
	
	if (uri === '') {
		response('Welcome!');
	}
});
```
1. WEB_SERVER 메소드를 이용해 8123 포트로 웹 서버를 구동시켰습니다.
2. requestInfo에 담긴 uri 정보를 불러와, uri가 '' 일 경우(단순히 http://localhost:8123 으로 접속 시) Welcome! 이라는 메시지를 출력하도록 구성하였습니다.

이를 발전시켜 다양한 기능을 하는 웹 서버를 만들 수 있습니다.

## 세션 처리하기
```javascript
let sessions = {};

WEB_SERVER(8123, (requestInfo, response, onDisconnected) => {

    let sessionKey = requestInfo.cookies.__SESSION_KEY;

    if (sessionKey !== undefined) {
        
        let session = sessions[sessionKey];
        
        // 세션이 없으면 세션 생성
        if (session === undefined) {
            sessions[sessionKey] = {
                // 세션 내용
                data : 'This is session data.',
                // 30 분 이후에 자동 삭제
                removeAfterSeconds : 30 * 60
            };
            console.log('create session.');
        }
        
        // 세션이 있으면 내용 출력
        else {
        	console.log(session.data);
        }
    }

    response({
        content : 'Welcome to UJS web server!',
		// 세션키가 없으면 세션 키 생성
        headers : sessionKey !== undefined ? undefined : {
            'Set-Cookie' : CREATE_COOKIE_STR_ARRAY({
                __SESSION_KEY : RANDOM_STR(40)
            })
        }
    });
});
```

## 데이터 파라미터 처리하기
`REQUEST` 기능 등에서 `data` 파라미터를 추가하면 서버에서는 `requestInfo.data`로 받아 올 수 있습니다. 만약 `data` 파라미터가 추가되지 않으면, *`requestInfo.data`는 `undefined`*라는 것에 주의하세요!

```javascript
GET({
	port : 8123,
	data : {
		msg : 'test'
	}
}, (content) => {
	console.log(content);
});
```

```javascript
WEB_SERVER(8123, (requestInfo, response, onDisconnected) => {

	console.log(requestInfo.data);
	
	response('ok');
});
```


# 간단한 웹 사이트 만들기
이번에는 UJS를 사용하여 간단한 웹 사이트를 만들어 보겠습니다. 맨 처음으로, 접속한 URI와 같은 위치에 존재하는 HTML 파일을 불러와 출력시켜주는 코드를 작성해보겠습니다.

## HTML 파일을 불러와 출력하기

###### server.js
접속한 URI와 같은 위치에 존재하는 HTML 파일을 불러와 출력시켜주는 웹 서버입니다.

```javascript
WEB_SERVER(8123, (requestInfo, response, onDisconnected) => {

	let uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index';
	}
	
	uri = uri + '.html';
	
	READ_FILE(uri, {
		
        // 파일이 존재하지 않으면 404
		notExists : () => {
			response(404);
		},
		
        // 파일이 존재하면 출력
		success : (buffer) => {
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
WEB_SERVER(8123, (requestInfo, response, onDisconnected) => {

	let uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index.html';
	}
	
	// load UJS
	else if (uri.substring(0, 'UJS-'.length) === 'UJS-') {
		uri = '../../../' + uri;
	}
	
	READ_FILE(uri, {
		
		notExists : () => {
			response(404);
		},
		
		success : (buffer) => {
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
		<script src="/MAIN.js"></script>
		<script src="/Home.js"></script>
		<script>
			'use strict';
			
			// OBJECT 초기화 부분
			INIT_OBJECTS();
			
			MAIN();
		</script>
	</body>
</html>
```

###### MAIN.js
URI와 뷰를 연결해주는 코드를 작성합니다.

```javascript
global.MAIN = METHOD({

	run : (params) => {

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

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
	
		TITLE('Welcome to Tutorial Site.');

		let wrapper = DIV({
			c : 'UJS-BROWSER Web Site Tutorial'
		}).appendTo(BODY);

		//OVERRIDE: self.close
		let close = self.close = (params) => {
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
let Jade = require('jade');

WEB_SERVER(8123, (requestInfo, response, onDisconnected) => {

	let uri = requestInfo.uri;
	
    // 경로가 '' 이면 index로 변경
	if (uri === '') {
		uri = 'index';
	}
	
    // 경로에 .jade를 붙힘
	uri = uri + '.jade';
	
    // 파일이 존재하면,
	CHECK_IS_FILE_EXISTS(uri, (isExists) => {
		
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
