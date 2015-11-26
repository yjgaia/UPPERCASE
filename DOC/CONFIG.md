# Configuration

## CONFIG
* `isDevMode` 개발 모드를 활성화합니다. 기본값은 `false`입니다. 이 모드가 활성화되면, 코드 압축이나 캐싱등의 작업을 건너뛰게 됩니다. 개발을 할 때에는 `true`로 설정하는것이 좋습니다. 자세한 사항은 아래 [개발 모드](#개발-모드) 항목을 참고해 주시기 바랍니다.
* `webServerPort` 웹서버 및 웹소켓 서버의 포트를 설정합니다. 설정하지 않으면 웹 서버 및 웹 소켓 서버를 구동하지 않습니다.
* `sercuredWebServerPort` https 프로토콜을 사용하는 보안 웹서버의 포트를 설정합니다. 설정하지 않으면 보안 웹서버를 구동시키지 않습니다.
* `socketServerPort` 소켓 서버의 포트를 설정합니다.
* `defaultBoxName` 기본 BOX의 이름을 설정합니다. 기본값은 `'UPPERCASE'` 입니다.
* `title` 프로젝트 제목을 입력합니다. 기본값은 `'UPPERCASE PROJECT'` 입니다.
* `isMobileFullScreen` 모바일 브라우저에서 full screen으로 화면을 표시할지를 결정합니다. 기본값은 `false`입니다.
* `isUsingHTMLSnapshot` 검색엔진의 크롤러들이 Single Page 웹 애플리케이션을 방문할 때 HTML 스냅샷을 제공할 지 여부를 설정합니다. 기본값은 `false`입니다. 이 기능을 사용하려면 [PhantomJS](http://phantomjs.org)가 서버에 설치되어 있어야 합니다.

### 개발 모드
개발 모드일 때는 다음과 같은 기능들이 작동합니다.
* BROWSER 폴더 및 COMMON 폴더에 새 소스코드 파일이 생겼거나 기존 파일이 변경된 경우, 웹 브라우저에서 새로고침을 하면 변경된 파일들이 자동으로 반영됩니다.

### 운영 모드
운영 모드일 때는 다음과 같은 기능들이 작동합니다.
* JavaScript 파일들을 압축하여 제공합니다.
* 웹 브라우저에 모든 리소스를 캐싱하여 재접속시 빠르게 로딩합니다.

## NODE_CONFIG
### 데이터베이스 관련 설정
* `dbName` 사용할 데이터베이스의 이름을 설정합니다.
* `dbHost` MongoDB 서버의 호스트를 설정합니다. 기본값은 `'127.0.0.1'` 입니다.
* `dbPort` MongoDB 서버의 포트를 설정합니다. 기본값은 `27017` 입니다.
* `dbUsername` MongoDB 서버의 접속 아이디를 설정합니다.
* `dbPassword` MongoDB 서버의 접속 비밀번호를 설정합니다.
* `isDBLogMode` 데이터베이스 로그 모드를 켜고자 할 때 `true`로 설정합니다. 데이터가 수정 될 경우 console에 로그를 띄어줍니다. 기본값은 `false` 입니다.
* `maxDataCount` find 명령으로 한번에 가져올 수 있는 최대 data 수를 설정합니다. 기본값은 `1000` 입니다.

### 업로드 관련 설정
* `maxUploadFileMB` 업로드 가능한 최대 파일 크기를 MB 단위로 설정합니다. 기본값은 `10` 입니다.
* `maxThumbWidth` 자동으로 만들어지는 섬네일의 최대 가로 길이를 설정합니다.
* `maxThumbHeight` 자동으로 만들어지는 섬네일의 최대 세로 길이를 설정합니다.

### 보안 웹서버 관련 설정
* `securedKeyFilePath` https 프로토콜을 사용하는 보안 웹서버를 위한 key file의 경로를 설정합니다.
* `securedCertFilePath` https 프로토콜을 사용하는 보안 웹서버를 위한 cert file의 경로를 설정합니다.

### 분산 서버 관련 설정
* `thisServerName` 현재 서버의 이름을 설정합니다.
* `clusteringPort` 클러스터링을 위한 서버의 포트를 설정합니다. 이 포트는 웹서버나 웹소켓 서버 등과는 관계가 없고, 분산 서버들간의 메시지 전달을 위해 사용됩니다.
* `clusteringServerHosts` 분산 서버들의 host를 설정합니다.
```javascript
NODE_CONFIG : {
	thisServerName : 'serverA',
	clusteringPort : 8603,
	clusteringServerHosts : {
		serverA : '127.0.0.1',
		serverB : '127.0.0.1'
	}
}
```
* `socketServerHosts` 소켓 서버들의 host를 설정합니다.
* `webSocketServerHosts` 웹소켓 서버들의 host를 설정합니다.
* `uploadServerHosts` 업로드 서버들의 host를 설정합니다.

## BROWSER_CONFIG
[UPPERCASE.JS의 BROWSER_CONFIG 설정](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/README_KOR.md#configuration)에 아래 설정들을 추가로 지정할 수 있습니다.

### 접속 관련 설정
* `beforeUnloadMessage` `INPUT`이나 `TEXTAREA`에 포커스 되어 있을때, 페이지가 이동하려 하면 띄어주는 메시지를 설정합니다.
* `disconnected()` 서버와의 접속이 끊어졌을 때 실행되는 함수입니다.
* `reconnect(isVersionSame, reconnect)` 서버에 다시 접속될 때 실행되는 함수입니다. 서버의 버젼이 달라지면 `isVersionSame`이 `false`로 설정됩니다. 또한 `false`를 `return`하면, 서버에 재접속 되지 않습니다. 그러나 파라미터로 설정된 `reconnect` 함수로 서버에 재접속하는 코드를 작성할 수 있습니다. `reconnect` 하기 전 페이지를 새로고침 하고자 할 때는 `REFRESH` 메소드를 사용합니다. 인증 등을 사용할 때에는 **서버와의 접속이 끊어지면 인증이 풀리**기 때문에, 재접속 시 인증을 수행하는 코드를 작성해주시기 바랍니다. (로그인 화면으로 넘어가는 방법도 있습니다.)

	```javascript
	BROWSER_CONFIG.reconnect = function(isVersionSame, reconnect) {
		
		// if versions are same, REFRESH.
		if (isVersionSame === true) {
			REFRESH();
			reconnect();
		}
		
		// if versions are not same, reload page.
		else {
			location.reload();
		}
	};
	```
	```javascript
	BROWSER_CONFIG.reconnect = function(isVersionSame, reconnect) {
		
		// if versions are same, reconnect.
		if (isVersionSame === true) {
			
			Sample.UserModel.login({
				username : rememberMeStore.get('username'),
				password : rememberMeStore.get('password')
			});
			
			reconnect(false);
		}
		
		// if versions are not same, reload page.
		else {
			location.reload();
		}
	};
	```

## 아이콘 설정
아이콘은 `defaultBoxName`로 설정된 기본 BOX의 R 폴더에 위치한 다음 파일들로 설정됩니다.

- `favicon.ico` 일반적인 웹 브라우저에 지정되는 favicon입니다.
- `apple-touch-icon.png` 애플사의 기기에서 지정되는 아이콘입니다.

다음 문서: [패키징](PACK.md)
