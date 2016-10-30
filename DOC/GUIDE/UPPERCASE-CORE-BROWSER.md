# UPPERCASE-CORE-BROWSER
UPPERCASE-CORE-BROWSER는 웹 브라우저 환경에서 사용할 수 있는 모듈입니다. [UPPERCASE-COMMON-CORE](UPPERCASE-COMMON-CORE.md)를 포함하고 있습니다.
* [API 문서](../../API/UPPERCASE-CORE/BROWSER/README.md)

## 목차
* [사용방법](#사용방법)
* [`BROWSER_CONFIG`](#browser_config)
* [`INFO`](#info)
* [창 관련 기능](#창_관련_기능)
* DOM 객체 생성
* DOM 객체의 이벤트
* DOM 객체의 스타일
* DOM 객체의 애니메이션
* 뷰 기능
* [HTTP 요청 기능](#http-요청-기능)
* [`CONNECT_TO_WEB_SOCKET_SERVER`](#connect_to_web_socket_server)
* [`STORE`](#store)
* [`MSG({ko:, en:, ...})`](#msgko-en-)
* [`SHOW_ERROR`](#show_error)
* [`SOUND`](#sound)

## 사용방법
`UPPERCASE-CORE` 폴더를 복사하여 사용합니다.

```html
<script src="/UPPERCASE-CORE/BROWSER.js"></script>
```

## `BROWSER_CONFIG`
UPPERCASE 기반 프로젝트에서 웹 브라우저 환경 전용 설정값들을 저장하는 데이터입니다. UPPERCASE의 다른 모듈들도 이를 확장하여 사용합니다. UPPERCASE-CORE-BROWSER에서는 아래와 같은 설정값들을 가지고 있습니다.

* `host` 현재 접속한 URL의 호스트
* `port` 현재 접속한 URL의 포트 번호
* `isSecure` 현재 접속한 URL이 HTTPS 프로토콜인지 여부

## `INFO`
웹 브라우저 정보를 담고 있는 객체

`INFO`의 함수들은 다음과 같습니다.

### `getLang()`
2글자로 이루어진 현재 웹 애플리케이션의 언어 설정 코드를 가져옵니다. 기본은 브라우저의 언어 설정으로 설정됩니다.

```javascript
INFO.getLang(); // 'ko'
```

### `changeLang(lang)`
현재 웹 애플리케이션의 언어 설정을 변경합니다. 이는 [`MSG`](#msg)에 영향을 끼칩니다.

```javascript
INFO.changeLang('ko');
```

### `checkIsTouchMode()`
터치 모드인지 확인합니다. 터치로만 조작이 가능한 기기에서는 항상 `true`를 반환하고, 마우스로만 조작이 가능한 기기에서는 항상 `false`를 반환합니다. 터치와 마우스 조작 둘 다 가능한 기기에서는 터치를 하는 순간 혹은 마우스를 조작하는 순간 변경됩니다.

```javascript
INFO.checkIsTouchMode(); // 스마트폰에서는 true, PC에서는 false
```

### `getBrowserInfo()`
웹 브라우저의 정보를 반환합니다.

```javascript
INFO.getBrowserInfo(); // ex) {name : "Chrome", version : 53}
```

## 창 관련 기능
### `TITLE()` `TITLE(title)`
브라우저 창에 표시되는 문서의 제목을 가져오거나 변경합니다.
```javascript
TITLE('Welcome!');

TITLE(); // 'Welcome!'
```

### `WIN_WIDTH()`
브라우저 창의 가로 길이를 픽셀 단위로 가져옵니다.

### `WIN_HEIGHT()`
브라우저 창의 세로 길이를 픽셀 단위로 가져옵니다.

### `SCROLL_LEFT()`
가로 스크롤의 현재 위치를 픽셀 단위로 가져옵니다.

### `SCROLL_TOP()`
세로 스크롤의 현재 위치를 픽셀 단위로 가져옵니다.

## DOM 객체 생성
단순히 정보를 제공하기 위한 웹 페이지를 개발하는 과거와는 달리, 현대에는 동적인 웹 애플리케이션을 개발하는 경우가 늘고 있습니다.

아래 예제들을 보면, 동적으로 변하는 DOM 요소들을 처리하는 방법

### HTML로 DOM 요소 생성
HTML 코드와 JavaScript 코드가 분리되어 있던 기존 웹 개발 방식에서는, DOM 객체를 다루기 위한 코드를 작성하기가 굉장히 불편했습니다. JavaScript에서 DOM 객체를 일일히 찾아내어 다뤄야 하기 때문입니다. 또한 DOM 객체를 찾기 위하여, HTML 요소에 `id` 나 `class` 속성을 반드시 지정해 주어야 했습니다. 이는 HTML이 원래 정보 제공을 위한 문서 작성을 목적으로 만들어졌기 때문입니다.

```html
<html>
    <head>
        <style>
            #hello {
                color : red;
            }
        </style>
    </head>
    <body>
        <p id="hello">안녕하세요.</p>
        <script>
        
            var
            // hello
            hello = document.getElementById('hello');
            
            // 원래 빨간색인 글자 색을 파란색으로 변경
            hello.style.color = 'blue';
        
        </script>
    </body>
</html>
```

### JavaScript로 DOM 요소 생성
위와 같이, HTML 요소를 JavaScript에서 일일히 찾는 방식은 **웹 애플리케이션**을 개발하는데에는 적합하지 않습니다. 그렇다면, JavaScript에서 DOM 객체를 생성하여 다루면 어떨까요? 그러면 DOM 객체를 찾는 과정이 없어지기 때문에 좀 더 쉽게 DOM 객체를 다룰 수 있습니다. 그러나 이와 같은 방법은 JavaScript 코드가 복잡해진다는 단점이 있습니다.

```javascript
var
// hello
hello = document.createElement('p');
hello.style.color = 'red';
hello.appendChild(document.createTextNode('안녕하세요.'));
document.body.appendChild(hello);

// 원래 빨간색인 글자 색을 파란색으로 변경
hello.style.color = 'blue';
```

### UPPERCASE의 DOM 객체 생성 기능을 사용하여 DOM 요소 생성
UPPERCASE의 DOM 객체 생성 기능은, 위와 같이 JavaScript에서 직접 DOM 객체를 생성하는 방식을 명료하게 표현하여 이해하기 쉬운 코드를 만들 수 있도록 돕습니다.

```javascript
var
// hello
hello = P({
    style : {
        color : 'red'
    },
    c : '안녕하세요.'
}).appendTo(BODY);

// 원래 빨간색인 글자 색을 파란색으로 변경
hello.addStyle({
    color : 'blue'
});
```

### `NODE`
일반적으로 웹 페이지를 구성하는 DOM 요소들은 [트리 구조](https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%A6%AC_%EA%B5%AC%EC%A1%B0)로 이루어지게 됩니다. 따라서 DOM 객체를 살펴보기 전에, 트리 구조를 정의하기 위한 `NODE` 클래스를 먼저 살펴보겠습니다. 아래의 DOM 객체를 생성하는 모든 기능들은 이 `NODE` 클래스를 상속하여 구현되어 있습니다. 또한 개발자가 `NODE`를 상속하여 새로운 종류의 `NODE`를 만들어 낼 수 있습니다.

### `DOM`
DOM 객체를 다루는 클래스입니다. UPPERCASE는 `DOM` 클래스를 상속한, 각 HTML 태그들과 대응되는 클래스들을 갖고 있습니다. 만약 UPPERCASE가 제공하지 않는 종류의 HTML 요소가 필요한 경우, `DOM`을 상속하여 직접 구현할 수 있습니다.

### `BODY`
HTML `body` 태그와 대응되는 객체입니다. (`BODY`는 웹 페이지에 단 하나만 존재할 수 있기 때문에 클래스가 아니라 객체입니다.)

### `CANVAS`
### `AUDIO`
### `VIDEO`

## DOM 객체의 이벤트
TODO:

## DOM 객체의 스타일
TODO: CSS 비판, vh 등을 들먹이며

## DOM 객체의 애니메이션
TODO:

## 뷰 기능
TODO:

## HTTP 요청 기능
TODO:

## `CONNECT_TO_WEB_SOCKET_SERVER`
* `CONNECT_TO_WEB_SOCKET_SERVER(port, connectionListenerOrListeners)`
* `CONNECT_TO_WEB_SOCKET_SERVER({host:, port:}, connectionListenerOrListeners)`

[UPPERCASE-CORE-NODE의 `WEB_SOCKET_SERVER`](UPPERCASE-COMMON-NODE.md#web_socket_server)로 생성한 웹 소켓 서버에 연결합니다.

```javascript
CONNECT_TO_WEB_SOCKET_SERVER(8125, {
	error : function(errorMsg) {
		console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	},
	success : function(on, off, send, disconnect) {
        // on           메소드를 생성합니다.
        // off          메소드를 제거합니다.
        // send         서버의 메소드에 데이터를 전송합니다.
        // disconnect   서버와의 연결을 끊습니다.

		send({
			methodName : 'message',
			data : {
				name : 'YJ Sim'
			}
		}, function(retMsg) {
		    console.log('서버로부터의 메시지:' + retMsg);
		});
		
		on('__DISCONNECTED', function() {
			console.log('연결이 끊어졌습니다.');
		});
	}
});
```

클라이언트에서 사용하는 함수들은 다음과 같습니다.

#### `on(methodName, method)`
`on` 함수는 클라이언트에 메소드를 생성하는 함수로써, 서버에서 `send` 함수로 전송한 데이터를 받습니다.

#### `off(methodName)` `off(methodName, method)`
`off` 함수는 클라이언트에 생성된 메소드를 제거합니다.

#### `send(params)` `send(params, callback)`
`send`는 서버로 데이터를 전송하며, 서버에서 `on` 함수로 생성한 메소드가 데이터를 받습니다.

사용 가능한 파라미터는 다음과 같습니다.
* `methodName` 서버에 `on` 함수로 설정된 메소드 이름
* `data` 전송할 데이터

#### `disconnect()`
서버와의 연결을 끊습니다.

## `STORE`
저장소 클래스

웹 브라우저가 종료되어도 저장된 값들이 보존됩니다.

```javascript
var
// store
store = STORE('testStore');

store.save({
    name : 'name',
    value : 'YJ Sim'
});

store.get(name); // 'YJ Sim'

store.remove(name);
```

`STORE`로 생성한 객체의 함수들은 다음과 같습니다.

### `save({name:, value:})`
특정 `name`에 `value`를 저장합니다.

### `get(name)`
`name`에 해당하는 값을 가져옵니다.

### `remove(name)`
`name`에 해당하는 값을 지웁니다.

## `MSG({ko:, en:, ...})`
[`INFO`](#info)의 [웹 애플리케이션 언어 설정 코드](#getlang)에 해당하는 문자열을 반환합니다. 만약 알 수 없는 언어 설정 코드라면, 첫 문자열을 반환합니다.

```javascript
// 브라우저 언어 설정이 한국어일 경우, '집'
// 브라우저 언어 설정이 영어일 경우, 'Home'
// 브라우저 언어 설정이 한국어나 영어가 아닌 경우, 알 수 없는 언어 설정 코드이므로 첫 문자열인 '집'
MSG({
    ko : '집',
    en : 'Home'
});
```

## `SHOW_ERROR(tag, errorMsg)` `SHOW_ERROR(tag, errorMsg, params)`
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

## `SOUND`
TODO: