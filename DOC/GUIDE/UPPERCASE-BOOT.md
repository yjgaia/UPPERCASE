작성중

# UPPERCASE-BOOT
UPPERCASE-BOOT는 UPPERCASE의 모든 내장 모듈들을 불러들이고, 프로젝트를 실행하기 위한 기능들을 제공하는 모듈입니다. 이 문서에서는 UPPERCASE-BOOT 모듈이 제공하는 기능들에 대해서만 설명합니다. UPPERCASE를 기반으로 프로젝트를 개발하는 방법에 대해서는 [가이드 문서](../GUIDE.md#%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0)를 참고하여 주시기 바랍니다.
* [API 문서](../../API/UPPERCASE-BOOT/README.md)

## 목차
* [사용방법](#사용방법)
* [`CONFIG`](#config)
* [`NODE_CONFIG`](#node_config)
* [`BROWSER_CONFIG`](#browser_config)
* [`Box.R(path)`](#boxrpath-boxrpath-callback)
* [`Box.RF(path)`](#boxrfpath)
* [`TIME(date)`](#timedate)
* [`SERVER_TIME(date)`](#server_timedate)
* [`CONNECT_TO_UPPERCASE_SERVER`](#connect_to_uppercase_server)
* [UPPERCASE의 기본 스타일](#uppercase의-기본-스타일)
* [index.html 수정하기](#indexhtml-수정하기)

## 사용방법
[UPPERCASE를 설치](../INSTALL.md)하였다면, 다음과 같이 프로젝트를 실행할 수 있습니다.

```javascript
require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		defaultBoxName : 'Hello',
		webServerPort : 8888
	}
});
```

## `CONFIG`
아래 설정들은 UPPERCASE-BOOT 관련 설정들입니다. UPPERCASE와 관련된 모든 설정에 대해서는 [프로젝트 설정 문서](CONFIGURATION.md)를 참고해 주시기 바랍니다.

### 프로젝트 설정
* `isDevMode` 개발 모드를 활성화합니다. 기본값은 `false`입니다. 이 모드가 활성화되면, 코드 압축이나 캐싱 등의 작업을 건너뛰게 됩니다. 개발할 때에는 `true`로 설정하는것이 좋습니다. 자세한 사항은 [프로젝트 설정 문서](CONFIGURATION.md)의 [개발 모드](CONFIGURATION.md#개발-모드) 및 [운영 모드](CONFIGURATION.md#운영-모드) 항목을 참고해 주시기 바랍니다.
* `defaultBoxName` 기본 BOX의 이름을 설정합니다. 기본값은 `'UPPERCASE'` 입니다.
* `title` 프로젝트 제목을 입력합니다. 기본값은 `'UPPERCASE PROJECT'` 입니다.
* `description` 프로젝트 설명을 입력합니다. 기본값은 없습니다.

### 서버 설정
* `webServerPort` 웹 서버 및 웹소켓 서버의 포트를 설정합니다. 설정하지 않으면 웹 서버 및 웹소켓 서버를 구동하지 않습니다.
* `securedWebServerPort` HTTPS 프로토콜을 사용하는 보안 웹 서버의 포트를 설정합니다. 설정하지 않으면 보안 웹 서버를 구동시키지 않습니다.
* `socketServerPort` 소켓 서버의 포트를 설정합니다. 설정하지 않으면 소켓 서버를 구동시키지 않습니다.

### 섬네일 이미지 설정
UPPERCASE-BOOT가 제공하는 이미지 업로드 기능을 사용할 때, 자동으로 만들어지는 섬네일에 대한 설정입니다. 아무런 설정을 하지 않으면 섬네일을 만들지 않습니다.
* `maxThumbWidth` 이미지 업로드 시 만들어지는 섬네일의 최대 가로 길이를 설정합니다.
* `maxThumbHeight` 이미지 업로드 시 만들어지는 섬네일의 최대 세로 길이를 설정합니다.

## `NODE_CONFIG`
아래 설정들은 Node.js 환경에서 사용되는 설정들입니다.

### 데이터베이스 설정
* `dbName` 데이터베이스 이름
* `dbHost` 접속할 MongoDB 서버의 호스트. 기본값은 `'127.0.0.1'` 입니다.
* `dbPort` 접속할 MongoDB 서버의 포트. 기본값은 `27017` 입니다.
* `dbUsername` 인증 모드로 MongoDB 서버를 구동한 경우, 데이터베이스의 아이디
* `dbPassword` 인증 모드로 MongoDB 서버를 구동한 경우, 데이터베이스의 비밀번호
* `backupDBHost` 백업 서버의 호스트. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBPort` 백업 서버의 포트. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBName` 백업 데이터베이스 이름. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBUsername` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 아이디
* `backupDBPassword` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 비밀번호

### 업로드 설정
* `maxUploadFileMB` 업로드 가능한 최대 파일 크기를 메가바이트 단위로 설정합니다. 기본값은 `10` 입니다.

### 클러스터링 설정
아래 설정들은 CPU 클러스터링 및 서버 클러스터링을 위한 설정들입니다. 클러스터링에 대한 자세한 내용은 [분산 처리 문서](CLUSTERING.md)를 참고해 주시기 바랍니다.
* `isNotUsingCPUClustering` 기본적으로 UPPERCASE-BOOT는 멀티코어 CPU의 개수만큼 프로세스가 실행되어, 멀티코어 CPU 환경에서 최상의 성능을 낼 수 있도록 작동합니다. 그러나 마이크로 서비스 등을 제작할 때와 같이 이러한 기능이 필요하지 않은 경우가 있습니다. 이런 경우에는 이 설정을 `true`로 지정하여 하나의 프로세스만을 실행할 수도 있습니다. 기본값은 `false`입니다.
* `clusteringPort` 서버 클러스터링에 사용되는 포트를 설정합니다. 이 포트는 웹서버나 웹소켓 서버, 소켓 서버와는 관계가 없고, 오직 분산 서버들간의 메시지 전달을 위해 사용됩니다.
* `clusteringServerHosts` 분산 서버들의 호스트를 각 서버들의 이름과 함께 설정합니다.
* `thisServerName` 현재 서버의 이름을 설정합니다.
* `socketServerHosts` 소켓 서버들이 분산되어 있는 경우 소켓 서버들의 호스트를 배열로 설정합니다.
* `webSocketServerHosts` 웹소켓 서버들이 분산되어 있는 경우 웹소켓 서버들의 호스트를 배열로 설정합니다.
* `uploadServerHosts` 업로드 서버들이 분산되어 있는 경우 업로드 서버들의 호스트를 배열로 설정합니다.

### HTTPS 서버 설정
* `securedKeyFilePath` HTTPS 보안 웹서버를 위한 Key 파일의 경로를 설정합니다.
* `securedCertFilePath` HTTPS 보안 웹서버를 위한 Cert 파일의 경로를 설정합니다.

## `BROWSER_CONFIG`
아래 설정들은 웹 브라우저 환경에서 사용되는 설정들입니다.

* `isNotToConnectServer` UPPERCASE 기반 웹 애플리케이션은 페이지를 띄우면 자동으로 UPPERCASE 서버에 연결합니다. 이 설정을 `true`로 지정하면 UPPERCASE 서버에 연결하지 않습니다. 이후에 UPPERCASE 서버에 연결하기 위해서는 [`CONNECT_TO_UPPERCASE_SERVER`](#connect_to_uppercase_server)를 사용하시기 바랍니다. 기본값은 `false`입니다.
* `beforeUnloadMessage` `INPUT`이나 `TEXTAREA`에 포커스 되어 있을때, 페이지가 이동하려 하면 메시지를 띄웁니다.
* `reconnect` `reconnect(isVersionSame, reconnect)` 함수를 정의합니다. 이 함수는 서버와의 연결이 끊어진 이후 서버에 다시 접속하려 할 때 실행됩니다. 서버의 버젼이 달라지면 `isVersionSame`이 `false`로 설정됩니다. 또한 `false`를 `return`하면, 서버에 재접속 되지 않습니다. 그러나 파라미터로 설정된 `reconnect` 함수로 서버에 재접속하는 코드를 작성할 수 있습니다. `reconnect` 하기 전 페이지를 새로고침 하고자 할 때는 `REFRESH` 메소드를 사용합니다. 인증 등을 사용할 때에는 **서버와의 접속이 끊어지면 인증이 풀리**기 때문에, 재접속 시 인증을 수행하는 코드를 작성해주시기 바랍니다. (로그인 화면으로 넘어가는 방법도 있습니다.)
	```javascript
	BROWSER_CONFIG : {
		
		reconnect : (isVersionSame, reconnect) => {
			
			// if versions are same, REFRESH.
			if (isVersionSame === true) {
				REFRESH();
				reconnect();
			}
			
			// if versions are not same, reload page.
			else {
				location.reload();
			}
			
			return false;
		}
	}
	```
	```javascript
	BROWSER_CONFIG : {
		
		reconnect : (isVersionSame, reconnect) => {
			
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
			
			return false;
		}
	}
	```

## `Box.R(path)` `Box.R(path, callback)`
리소스의 경로를 가져오거나, `callback`을 지정하여 리소스의 내용을 가져옵니다.

웹 브라우저 환경에서만 사용 가능합니다.

## `Box.RF(path)`
업로드한 파일의 경로를 가져옵니다.

웹 브라우저 환경에서만 사용 가능합니다.

* UPPERCASE 기반 프로젝트에서 업로드 한 파일들은 `__RF` 폴더에 저장됩니다.
* 이미지의 경우 `__RF/THUMB` 파일에 섬네일이 저장됩니다.

## `TIME(date)`
웹 브라우저의 시간과 서버 시간의 차이를 계산하여, 서버로부터 넘어온 시간을 웹 브라우저 시간대의 시간으로 변경합니다.

웹 브라우저 환경에서만 사용 가능합니다.

## `SERVER_TIME(date)`
`TIME`과 반대 역할을 합니다. 웹 브라우저에서 생성된 시간을 서버 시간대의 시간으로 변경합니다.

웹 브라우저 환경에서만 사용 가능합니다.

## `CONNECT_TO_UPPERCASE_SERVER`
`BROWSER_CONFIG.isNotToConnectServer` 설정을 `true`로 지정하면 자동으로 UPPERCASE 서버에 연결되지 않습니다.

이후 UPPERCASE에 접속하기 위해서는 해당 부분을 직접 개발해야 합니다. 이 때 사용되는 함수가 `CONNECT_TO_UPPERCASE_SERVER`입니다.

[BROWSER_INIT.js](../../SRC/UPPERCASE-BOOT/BROWSER_INIT.js) 파일의 다음 내용을 참고하여 개발하시기 바랍니다.

```javascript
SYNC_TIME();

let connect = RAR(() => {
	
	if (isConnecting !== true) {
		isConnecting = true;
		
		CONNECT_TO_UPPERCASE_SERVER((on) => {
			
			FOR_BOX((box) => {
				if (box.CONNECTED !== undefined) {
					box.CONNECTED();
				}
			});
		
			on('__DISCONNECTED', () => {
				
				FOR_BOX((box) => {
					if (box.DISCONNECTED !== undefined) {
						box.DISCONNECTED();
					}
				});
				
				isConnecting = false;
				
				let reloadInterval = INTERVAL(1, RAR(() => {
	
					GET({
						port : CONFIG.webServerPort,
						uri : '__VERSION'
					}, (version) => {
						
						if (reloadInterval !== undefined) {
							reloadInterval.remove();
							reloadInterval = undefined;
							
							if ((document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT')
							|| BROWSER_CONFIG.beforeUnloadMessage === undefined
							|| confirm(BROWSER_CONFIG.beforeUnloadMessage) === true) {
								
								if (BROWSER_CONFIG.reconnect === undefined || BROWSER_CONFIG.reconnect(CONFIG.version === version, connect) !== false) {
									
									// if versions are same, REFRESH.
									if (CONFIG.version === version) {
										REFRESH();
										connect();
									}
									
									// if versions are not same, reload page.
									else {
										location.reload();
									}
								}
							}
						}
					});
				}));
			});
		});
	}
});
```

## UPPERCASE의 기본 스타일
UPPERCASE-BOOT는 웹 브라우저마다의 스타일 차이를 없애주고 같은 스타일로 프로젝트 개발을 시작할 수 있도록 기본 스타일을 제공합니다.

기본 스타일의 자세한 내용은 [BASE_STYLE.css](../../SRC/UPPERCASE-BOOT/R/BASE_STYLE.css) 파일을 참고하시기 바랍니다.

## index.html 수정하기
기본적으로 UPPERCASE가 index.html을 생성하기에 일반적으로 이 내용이 필요하지는 않을 것입니다. 그러나 특정한 사유로 인해 index.html을 따로 만들고 싶을 수 있습니다. 그럴 때는 `BROWSER`, `COMMON`, `NODE` 폴더가 저장되어 있는 프로젝트 기본 BOX 폴더에 index.html을 만들면 이를 인식하여 사용하게 됩니다. UPPERCASE와 연동하기 위한 기본적인 index.html의 코드는 다음과 같습니다. 이를 수정해서 사용하시기 바랍니다.

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
		<meta name="fragment" content="!">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
		<link href="/favicon.ico" rel="shortcut icon">
		<title>샘플 페이지</title>
		<link rel="stylesheet" type="text/css" href="/__CSS">
	</head>
	<body>
		<script src="/__SCRIPT"></script>
	</body>
</html>
```

**`<script src="/__SCRIPT"></script>` 코드는 반드시 `<body></body>` 사이에 들어가야 합니다. `<head></head>`에 들어가면 제대로 작동하지 않습니다.**
