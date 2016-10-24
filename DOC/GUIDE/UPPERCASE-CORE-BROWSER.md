# UPPERCASE-CORE-BROWSER
UPPERCASE-CORE-BROWSER는 웹 브라우저 환경에서 사용할 수 있는 모듈입니다. [UPPERCASE-COMMON-CORE](UPPERCASE-COMMON-CORE.md)를 포함하고 있습니다.
* [API 문서](../../API/UPPERCASE-CORE/BROWSER/README.md)

## 목차
* [사용방법](#사용방법)
* [`BROWSER_CONFIG`](#browser_config)
* 브라우저 정보
* 창 관련 기능
* DOM 기능
* 뷰 기능
* [HTTP 요청 기능](#http-요청-기능)
* [`CONNECT_TO_WEB_SOCKET_SERVER`](#connect_to_web_socket_server)
* 저장소 기능
* 국제화 관련 기능
* [SHOW_ERROR](#show_error)
* [기타 기능](#기타-기능)

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

## 브라우저 정보
TODO:

## 창 관련 기능
TODO:

## DOM 기능
HTML과 CSS 비판, vh 등을 들먹이며

### `CANVAS`
### `AUDIO`
### `VIDEO`

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

## 저장소 기능
TODO:

## 국제화 관련 기능
TODO:

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

## 기타 기능
TODO: