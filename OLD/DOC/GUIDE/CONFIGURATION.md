# 프로젝트 설정
아래 내용은 UPPERCASE 기반 프로젝트의 설정에 대해 다룹니다. 모듈 별 설정에 대해서는 [모듈 별 문서](../GUIDE.md#모듈-별-문서)를 참고해주시기 바랍니다.

## CONFIG
웹 브라우저 환경과 Node.js 환경 및 다양한 환경에서 공통으로 사용될 수 있는 설정들 입니다.

* `isDevMode` 개발 모드를 활성화합니다. 기본값은 `false`입니다. 이 모드가 활성화되면, 코드 압축이나 캐싱 등의 작업을 건너뛰게 됩니다. 개발할 때에는 `true`로 설정하는것이 좋습니다. 자세한 사항은 아래 [개발 모드](#개발-모드) 및 [운영 모드](#운영-모드) 항목을 참고해 주시기 바랍니다.
* `defaultBoxName` 기본 BOX의 이름을 설정합니다. 기본값은 `'UPPERCASE'` 입니다.
* `title` 프로젝트 제목을 입력합니다. 기본값은 `'UPPERCASE PROJECT'` 입니다.
* `description` 프로젝트 설명을 입력합니다. 기본값은 없습니다.
* `webServerPort` 웹 서버 및 웹소켓 서버의 포트를 설정합니다. 설정하지 않으면 웹 서버 및 웹소켓 서버를 구동하지 않습니다.
* `securedWebServerPort` HTTPS 프로토콜을 사용하는 보안 웹 서버의 포트를 설정합니다. 설정하지 않으면 보안 웹 서버를 구동시키지 않습니다.
* `socketServerPort` 소켓 서버의 포트를 설정합니다. 설정하지 않으면 소켓 서버를 구동시키지 않습니다.
* `maxThumbWidth` 이미지 업로드 시 만들어지는 섬네일의 최대 가로 길이를 설정합니다.
* `maxThumbHeight` 이미지 업로드 시 만들어지는 섬네일의 최대 세로 길이를 설정합니다.
* `requestEncryptionKey` [암호화 HTTP 요청 기능](UPPERCASE-CORE-BROWSER.md#암호화-http-요청-기능)을 사용할 때 필요한 설정입니다. 데이터를 암호화하여 전달하고, 이후 서버에서 자동으로 복호화합니다.

### 개발 모드
개발 모드일 때는 다음과 같은 기능들이 작동됩니다.
* 코드 압축이나 리소스 캐싱 등의 작업을 건너뜁니다.
* `BROWSER` 폴더 및 `COMMON` 폴더에 새 소스코드 파일이 생겼거나 기존 파일이 변경된 경우, 웹 브라우저에서 새로고침을 하면 변경된 파일들이 즉시 반영됩니다. 단, Node.js 환경에서의 `COMMON`이나 `NODE`의 변경사항은 서버 애플리케이션을 재시작해야 반영됩니다.

### 운영 모드
운영 모드일 때는 다음과 같은 기능들이 작동됩니다.
* 웹 브라우저에 JavaScript 파일들을 압축하여 제공합니다.
* 웹 브라우저에 모든 리소스를 캐싱하여 재접속시 빠르게 로딩합니다.

## NODE_CONFIG
Node.js 환경에서 사용될 수 있는 설정들 입니다.

### 데이터베이스 설정
* `dbName` 데이터베이스 이름
* `dbHost` 접속할 MongoDB 서버의 호스트. 기본값은 `'127.0.0.1'` 입니다.
* `dbPort` 접속할 MongoDB 서버의 포트. 기본값은 `27017` 입니다.
* `dbUsername` 인증 모드로 MongoDB 서버를 구동한 경우, 데이터베이스의 아이디
* `dbPassword` 인증 모드로 MongoDB 서버를 구동한 경우, 데이터베이스의 비밀번호
* `maxDataCount` [MODEL](UPPERCASE-MODEL.md#find)이나 [DB의 `find` 메소드](UPPERCASE-DB.md#find)를 수행할 때 최대로 가져올 데이터의 개수. 기본값은 `1000` 입니다.
* `backupDBHost` 백업 서버의 호스트. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBPort` 백업 서버의 포트. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBName` 백업 데이터베이스 이름. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBUsername` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 아이디
* `backupDBPassword` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 비밀번호

### 모델 설정
* `isNotToModelInitialize` 모델에 `initData` 설정으로 초기 데이터를 지정한 경우, 모델을 생성할 때 초기화 되어있지 않은 데이터들을 자동으로 찾아 초기화시킵니다. `isNotToModelInitialize`를 `true`로 지정하면 모델을 생성할 때 자동으로 초기화시키지 않습니다.

### 업로드 설정
* `maxUploadFileMB` 업로드 가능한 최대 파일 크기를 메가바이트 단위로 설정합니다. 기본값은 `10` 입니다.

### 클러스터링 설정
아래 설정들은 CPU 클러스터링 및 서버 클러스터링을 위한 설정들입니다. 클러스터링에 대한 자세한 내용은 [분산 처리 문서](CLUSTERING.md)를 참고해 주시기 바랍니다.
* `isSingleCoreMode` 기본적으로 UPPERCASE-BOOT는 멀티코어 CPU의 개수만큼 프로세스를 실행하여, 멀티코어 CPU 환경에서 최상의 성능을 낼 수 있도록 합니다. 그러나 마이크로 서비스와 같이 굳이 이러한 기능이 필요하지 않을 때도 있습니다. 이런 경우에는 이 설정을 `true`로 지정하여 프로세스를 하나만 실행하도록 할 수 있습니다. 기본값은 `false`입니다.
* `clusteringPort` 서버 클러스터링에 사용되는 포트를 설정합니다. 이 포트는 웹서버나 웹소켓 서버 및 소켓 서버와는 관계가 없고, 오직 분산 서버들간의 메시지 전달을 위해 사용됩니다.
* `clusteringServerHosts` 분산 서버들의 호스트를 각 서버들의 이름과 함께 설정합니다.
* `thisServerName` 현재 서버의 이름을 설정합니다.
```javascript
NODE_CONFIG : {
	clusteringPort : 8603,
	clusteringServerHosts : {
		nodeServer1 : '11.22.33.44',
		nodeServer2 : '44.33.22.11'
	},
	thisServerName : 'nodeServer1'
}
```
* `socketServerHosts` 소켓 서버들이 분산되어 있는 경우 소켓 서버들의 호스트를 배열로 설정합니다.
* `webServerHosts` 웹 서버들이 분산되어 있는 경우 웹 서버들의 호스트를 배열로 설정합니다.
* `uploadServerHosts` 업로드 서버들이 분산되어 있는 경우 업로드 서버들의 호스트를 배열로 설정합니다.

### HTTPS 웹 서버 설정
* `securedKeyFilePath` HTTPS 보안 웹 서버를 위한 Key 파일의 경로를 설정합니다.
* `securedCertFilePath` HTTPS 보안 웹 서버를 위한 Cert 파일의 경로를 설정합니다.

## BROWSER_CONFIG
웹 브라우저 환경에서 사용될 수 있는 설정들 입니다.

* `isSecure` 현재 접속한 URL이 HTTPS 프로토콜인지 여부
* `host` 현재 접속한 URL의 호스트
* `port` 현재 접속한 URL의 포트 번호

### 접속 관련 설정
* `isNotConnectToServer` UPPERCASE 기반 웹 애플리케이션은 페이지를 띄우면 웹소켓을 통해 자동으로 서버에 연결됩니다. 이 설정을 `true`로 지정하면 서버에 자동으로 연결되지 않습니다. 이후 서버에 연결하기 위해서는 [`CONNECT_TO_UPPERCASE_SERVER`](UPPERCASE-BOOT.md#connect_to_uppercase_server)를 사용하여 연결 부분을 직접 개발해야 합니다. 기본값은 `false`입니다.
* `beforeUnloadMessage` `INPUT`이나 `TEXTAREA`에 포커스가 있을 때 페이지를 이동하려 하면 설정한 메시지를 띄웁니다. 이후 확인을 누르면 페이지를 이동하고, 취소를 누르면 이동하지 않습니다.
* `reconnect` 재접속 함수를 설정합니다. 이 함수는 서버와 연결이 끊어진 이후 서버에 다시 접속하려 할 때 실행됩니다. `false`를 `return`하면 서버에 자동으로 재접속하지 않습니다. 이후 서버에 재접속하기 위해서는 명시적으로 재접속 코드를 작성해야 합니다.
	```javascript
	BROWSER_CONFIG : {
		
		reconnect : (isVersionSame, reconnect) => {
			// 서버의 버전(CONFIG.version)이 달라지면 isVersionSame 파라미터가 false로 설정됩니다.
			// false를 return 하여 서버에 자동으로 재접속하지 않는 경우 reconnect 함수를 사용하여 서버에 접속할 수 있습니다.
			
			// 버전이 같으면 코드가 변경된 부분이 없으므로, 화면만 다시 새로고침합니다.
			if (isVersionSame === true) {
				// 화면 새로고침
				REFRESH();
				// 서버에 재접속
				reconnect();
			}
			
			// 버전이 다르면 코드가 변경되었을 수 있으므로, 페이지 자체를 새로고침하여 코드를 새로 불러옵니다.
			else {
				// 페이지 자체를 새로고침
				location.reload();
			}
			
			// 서버에 자동으로 재접속하지 않습니다.
			return false;
		}
	}
	```
	
	로그인 인증을 사용하는 애플리케이션의 경우에는 **서버와의 접속이 끊어지면 인증이 풀린다**는 사실에 주의하시기 바랍니다. 따라서 인증을 다시 수행하거나 로그인 화면을 띄워야 합니다.
	```javascript
	BROWSER_CONFIG : {
		
		reconnect : (isVersionSame, reconnect) => {
			
			// 서버와 접속이 끊어졌었기 때문에 인증을 다시 수행합니다.
			if (isVersionSame === true) {
				
				Sample.UserModel.login({
					username : rememberMeStore.get('username'),
					password : rememberMeStore.get('password')
				});
				
				reconnect();
			}
			
			// 버전이 다르면 코드가 변경되었을 수 있으므로, 페이지 자체를 새로고침하여 코드를 새로 불러옵니다.
			else {
				location.reload();
			}
			
			return false;
		}
	}
	```

## 아이콘 설정
아이콘은 `defaultBoxName`로 설정된 기본 BOX의 R 폴더에 위치한 다음 파일들로 설정됩니다.

- `favicon.ico` 일반적인 웹 브라우저에 지정되는 favicon입니다.
- `apple-touch-icon.png` 애플사의 기기에서 지정되는 아이콘입니다.

## [404](https://ko.wikipedia.org/wiki/HTTP_404) 페이지 설정
UPPERCASE는 기본적으로 404 페이지를 제공하나, `defaultBoxName`로 설정된 기본 BOX에 404.html 파일이 있으면 해당 파일로 대체됩니다.

## index 페이지 설정
UPPERCASE는 기본적으로 index 페이지를 제공하나, `defaultBoxName`로 설정된 기본 BOX에 index.html 파일이 있으면 해당 파일로 대체됩니다. 자세한 내용은 [`index.html` 교체하기](UPPERCASE-BOOT.md#indexhtml-교체하기)를 참고해 주시기 바랍니다.

