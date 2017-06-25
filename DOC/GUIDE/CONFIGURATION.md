작성중

# 프로젝트 설정
아래 내용은 UPPERCASE 기반 프로젝트의 설정에 대해 다룹니다. 모듈 별 설정에 대해서는 [모듈 별 문서](../GUIDE.md#모듈-별-문서)를 참고해주시기 바랍니다.

## CONFIG
웹 브라우저 환경과 Node.js 환경 및 다양한 환경에서 공통으로 사용될 수 있는 설정들 입니다.

* `isDevMode` 개발 모드를 활성화합니다. 기본값은 `false`입니다. 이 모드가 활성화되면, 코드 압축이나 캐싱 등의 작업을 건너뛰게 됩니다. 개발할 때에는 `true`로 설정하는것이 좋습니다. 자세한 사항은 아래 [개발 모드](#개발-모드) 및 [운영 모드](#운영-모드) 항목을 참고해 주시기 바랍니다.
* `webServerPort` 웹 서버 및 웹소켓 서버의 포트를 설정합니다. 설정하지 않으면 웹 서버 및 웹소켓 서버를 구동하지 않습니다.
* `sercuredWebServerPort` https 프로토콜을 사용하는 보안 웹서버의 포트를 설정합니다. 설정하지 않으면 보안 웹서버를 구동시키지 않습니다.
* `socketServerPort` 소켓 서버의 포트를 설정합니다.
* `defaultBoxName` 기본 BOX의 이름을 설정합니다. 기본값은 `'UPPERCASE'` 입니다.
* `title` 프로젝트 제목을 입력합니다. 기본값은 `'UPPERCASE PROJECT'` 입니다.

### 개발 모드
개발 모드일 때는 다음과 같은 기능들이 작동합니다.
* 코드 압축이나 캐싱 등의 작업을 건너뜁니다.
* `BROWSER` 폴더 및 `COMMON` 폴더에 새 소스코드 파일이 생겼거나 기존 파일이 변경된 경우, 웹 브라우저에서 새로고침을 하면 변경된 파일들이 자동으로 반영됩니다. 단, Node.js 환경에서의 `COMMON`이나 `NODE`의 변경사항은 서버를 재시작하여야 반영됩니다.

### 운영 모드
운영 모드일 때는 다음과 같은 기능들이 작동합니다.
* JavaScript 파일들을 압축하여 제공합니다.
* 웹 브라우저에 모든 리소스를 캐싱하여 재접속시 빠르게 로딩합니다.

## NODE_CONFIG
Node.js 환경에서 사용될 수 있는 설정들 입니다.

### 데이터베이스 관련 설정
* `dbName` 사용할 데이터베이스의 이름을 설정합니다.
* `dbHost` MongoDB 서버의 호스트를 설정합니다. 기본값은 `'127.0.0.1'` 입니다.
* `dbPort` MongoDB 서버의 포트를 설정합니다. 기본값은 `27017` 입니다.
* `dbUsername` MongoDB 서버의 접속 아이디를 설정합니다.
* `dbPassword` MongoDB 서버의 접속 비밀번호를 설정합니다.
* `maxDataCount` find 명령으로 한번에 가져올 수 있는 최대 data 수를 설정합니다. 기본값은 `1000` 입니다.
* `backupDBHost` 백업 서버의 호스트. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBPort` 백업 서버의 포트. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBName` 백업 데이터베이스 이름. 자세한 내용은 [백업 서버 세팅하기](UPPERCASE-DB.md#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupDBUsername` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 아이디
* `backupDBPassword` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 비밀번호

### 보안 웹서버 설정
* `securedKeyFilePath` https 프로토콜을 사용하는 보안 웹서버를 위한 key file의 경로를 설정합니다.
* `securedCertFilePath` https 프로토콜을 사용하는 보안 웹서버를 위한 cert file의 경로를 설정합니다.

### 분산 서버 설정
* `clusteringPort` 클러스터링을 위한 서버의 포트를 설정합니다. 이 포트는 웹서버나 웹소켓 서버 등과는 관계가 없고, 분산 서버들간의 메시지 전달을 위해 사용됩니다.
* `clusteringServerHosts` 분산 서버들의 host를 아래와 같이 설정합니다.
* `thisServerName` 현재 서버의 이름을 아래와 같이 설정합니다.
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
* `socketServerHosts` 소켓 서버들의 host를 배열로 설정합니다.
* `webSocketServerHosts` 웹소켓 서버들의 host를 배열로 설정합니다.
* `uploadServerHosts` 업로드 서버들의 host를 배열로 설정합니다.

단일 서버 머신에서 분산하는 경우 (CPU 클러스터링)
```javascript
NODE_CONFIG : {
	reidsPorts : [7000, 7001, 7002, 7003]
}
```

여러 서버 머신으로 분산하는 경우
```javascript
NODE_CONFIG : {
	reidsPorts : {
		'127.0.0.1' : [7000, 7001, 7002, 7003],
		'test.com' : [7000, 7001, 7002, 7003]
	}
}
```

### 기타 설정
* `isNotUsingCPUClustering` 기본적으로 UPPERCASE는 멀티코어 CPU의 개수만큼 프로세서가 실행되어, 멀티코어 CPU에서 최상의 성능을 낼 수 있도록 합니다. 그러나 마이크로 서비스 등을 제작할 때에는 이러한 기능이 불필요할 수 있습니다. 이 때 `true`로 지정하면 프로세스를 하나만 만듭니다. 기본은 `false`입니다.

## BROWSER_CONFIG
웹 브라우저 환경에서 사용될 수 있는 설정들 입니다.

### 접속 관련 설정
* `beforeUnloadMessage` `INPUT`이나 `TEXTAREA`에 포커스 되어 있을때, 페이지가 이동하려 하면 메시지를 띄웁니다.

## 아이콘 설정
아이콘은 `defaultBoxName`로 설정된 기본 BOX의 R 폴더에 위치한 다음 파일들로 설정됩니다.

- `favicon.ico` 일반적인 웹 브라우저에 지정되는 favicon입니다.
- `apple-touch-icon.png` 애플사의 기기에서 지정되는 아이콘입니다.

## 404 페이지 설정
UPPERCASE는 기본적으로 404 페이지를 제공하나, `defaultBoxName`로 설정된 기본 BOX에 404.html 파일이 있으면 해당 파일로 대체됩니다.

## index 페이지 설정
UPPERCASE는 기본적으로 index 페이지를 제공하나, `defaultBoxName`로 설정된 기본 BOX에 index.html 파일이 있으면 해당 파일로 대체됩니다.

