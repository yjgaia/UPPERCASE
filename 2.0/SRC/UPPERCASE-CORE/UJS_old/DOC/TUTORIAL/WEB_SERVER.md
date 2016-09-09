# 간단한 웹 서버 만들기

UJS를 이용하여 웹 서버를 쉽게 만들 수 있습니다.
이하는 간단히 웹 서버를 구동하는 코드입니다. http://localhost:8123 으로 접속하면 Welcome! 이라는 메시지를 출력합니다.
```javascript
require('UJS-NODE.js');

INIT_OBJECTS();

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
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
var
// sessions
sessions = {};

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {

    var
    // session key
    sessionKey = requestInfo.cookies.__SESSION_KEY,

    // session
    session;

    if (sessionKey !== undefined) {
        session = sessions[sessionKey];
        
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
}, function(content) {
	console.log(content);
});
```

```javascript
WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {

	console.log(requestInfo.data);
	
	response('ok');
});
```