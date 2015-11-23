# 프로젝트 혼합하기
여러 프로젝트를 혼합하여 사용할 수 있습니다. 일례로, SSO(Single Sign On)과 같은 기능을 구현하기 위해서는 반드시 이러한 기능이 필요하게 됩니다.

본 문서에서는, UPPERCASE.IO 기반의 프로젝트들을 어떻게 혼합하여 사용할 수 있는지 순서대로 소개합니다.

## 1. 공유 프로젝트 BOX 패키징
공유할 프로젝트의 BOX를 패키징 합니다. BOX를 패키징 하는 방법은 [BOX 이해하기](BOX.md) 문서를 참고해주시기 바랍니다.

패키징 된 BOX를 다른 프로젝트에 복사합니다.

## 2. 모델 OVERRIDE
프로젝트의 `BROWSER` 폴더에 `OVERRIDE.js`라는 파일을 만듭니다. 아래 예제에서는 공유할 프로젝트의 BOX 명을 `SP`로, 사용할 프로젝트의 BOX 명을 `Sample`이라고 하겠습니다. `SP.SomeModel`을 OVERRIDE 하여 `SP_ROOM_SERVER`에 연결하도록 설정합니다.

```javascript
Sample.OVERRIDE = METHOD({

	run : function() {
		'use strict';
		
		OVERRIDE(SP.SomeModel, function(origin) {
			SP.SomeModel = OBJECT({
				preset : function(params) {
					params.roomServerName = 'SP_ROOM_SERVER';
					return origin;
				}
			});
		});
	}
});
```


## 3. 공유 프로젝트의 룸 서버 연결
이제 `SP_ROOM_SERVER`로 연결하는 코드를 작성해 보겠습니다. 아래와 같은 코드를 `NODE/MAIN.js`에 추가합니다. 아래 코드는 [UPPERCASE.IO-IO 모듈](UPPERCASE.IO-IO.md)의 [BROWSER_INIT.js](../../UPPERCASE.IO-IO/BROWSER_INIT.js)을 참고한 것입니다.

```javascript
var
// sp web server host
spWebServerHost = 'sp.com',

// sp web server port
spWebServerPort = 8888,

// connect to sp server.
connectToSpServer;

connectToSpServer = RAR(function() {
	
	CONNECT_TO_IO_SERVER({
		roomServerName : 'SP_ROOM_SERVER',
		webServerHost : spWebServerHost,
		webServerPort : spWebServerPort
	}, function(on) {

		on('__DISCONNECTED', function() {

			var
			// reload interval
			reloadInterval;
			
			if (BROWSER_CONFIG.disconnected !== undefined) {
				BROWSER_CONFIG.disconnected();
			}
			
			reloadInterval = INTERVAL(1, RAR(function() {

				GET({
					host : spWebServerHost,
					port : spWebServerPort,
					uri : '__VERSION'
				}, function(version) {
					
					if (reloadInterval !== undefined) {
						reloadInterval.remove();
						reloadInterval = undefined;
						
						if ((document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT')
						|| BROWSER_CONFIG.beforeUnloadMessage === undefined
						|| confirm(BROWSER_CONFIG.beforeUnloadMessage) === true) {
							
							if (BROWSER_CONFIG.reconnect === undefined || BROWSER_CONFIG.reconnect(true, connectToSpServer) !== false) {
								
								REFRESH();
								connectToSpServer();
							}
						}
					}
				});
			}));
		});
	});
});
```

이제 `SP.SomeModel`에 대한 처리는 `SP_ROOM_SERVER`로 넘겨집니다.