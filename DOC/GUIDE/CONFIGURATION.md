작성중

# Configuration
아래 설정들로, UJS 기반 애플리케이션의 작동 방식을 설정할 수 있습니다. 설정은 다음과 같이, UJS를 불러온 이후에 작성하면 됩니다.

```html
<!-- UJS-BROWSER.js를 불러옵니다. -->
<script src="/UJS-BROWSER.js"></script>
<!-- UJS의 작동방식을 설정합니다. -->
<script>
'use strict';
RUN(() => {
	
	// 개발 모드
	CONFIG.isDevMode = true;
	
	// 기본 포트를 변경합니다.
	BROWSER_CONFIG.port = 8010;
});
</script>
```

```javascript
// UJS-NODE.js를 불러옵니다.
require('./UJS-NODE.js');

// 개발 모드
CONFIG.isDevMode = true;

// 이런 방식으로 설정하면 됩니다.
NODE_CONFIG.something = 'sample';
```

## CONFIG
웹 브라우저 환경과 Node.js 환경 및 다양한 환경에서 공통으로 사용될 수 있는 설정들 입니다.

* `CONFIG.isDevMode` 이것을 `true`로 설정하면, UJS 기반 프로젝트가 개발 모드로 실행됩니다. Node.js 환경에서 `WEB_SERVER`와 `RESOURCE_SERVER` 기능을 사용할 경우 개발 모드일때 캐싱을 하지 않습니다.

## BROWSER_CONFIG
웹 브라우저 환경에서 사용될 수 있는 설정들 입니다.

* `BROWSER_CONFIG.fixScriptsFolderPath` UJS-BROWSER-FIX 스크립트들이 저장되어 있는 폴더의 경로를 지정합니다.
* `BROWSER_CONFIG.host` 이 설정의 기본값은 현재 웹 브라우저에서 접속한 호스트와 같습니다. 그러나 하이브리드 앱 등을 만들 경우 변경될 수 있습니다.
* `BROWSER_CONFIG.port` 이 설정의 기본값은 현재 웹 브라우저에서 접속한 포트와 같습니다. 그러나 하이브리드 앱 등을 만들 경우 변경될 수 있습니다.
* `BROWSER_CONFIG.isSupportingX2` 도트 아트를 사용하는 프로젝트의 경우, 레티나 디스플레이와 같은 고사양 화면에서는 픽셀을 강제로 늘이기 때문에 이미지가 흐릿하게 보입니다. 이를 대응하기 위해서, HTML5 Cavnas 기능을 사용하여 이미지 픽셀을 2배씩 늘려주어 흐릿하게 보이지 않도록 하는 기능이 UJS에 포함되어 있습니다. 이  설정을 사용할 경우 `true`로 지정합니다. 자세한 내용은 [도트 아트를 사용하는 프로젝트 만들기](DOT_ART.md) 문서를 참고하시기 바랍니다.
* `BROWSER_CONFIG.isUsingFlashCanvasPro` HTML5 Canvas를 지원하지 않는 구형 브라우저에서 `CANVAS` 기능을 사용하는 경우 UJS-BROWSER-FIX가 내부적으로 [FlashCanvas](http://flashcanvas.net)를 사용합니다. 기본적으로는 Free edition을 사용하나, Pro 버전을 사용하여 성능을 향상시킬 수 있습니다. 상업용 프로젝트에서 Pro 버전을 사용하기 위해서는 FlashCanvas Pro의 라이센스를 구매해야 하므로, 필요한 경우 이하 경로에서 라이센스를 구매한 후 이 설정을 `true`로 지정합니다.
    * http://flashcanvas.net/purchase

# NODE_CONFIG
Node.js 환경에서 사용될 수 있는 설정들 입니다.
* UJS에서 사용되는 설정은 없습니다. 그러나 개발자가 필요에 의해 추가할 수 있습니다.

이제 다 보았습니다! UJS를 업데이트 하실때는 [이 문서](UPDATE.md)를 참고하시면 됩니다. 더 많은 내용은 [INDEX 문서](INDEX.md)의 `한걸음 더` 항목이나, `튜토리얼` 항목을 참고해 주시기 바랍니다.


# Configuration

## CONFIG
* `isDevMode` 개발 모드를 활성화합니다. 기본값은 `false`입니다. 이 모드가 활성화되면, 코드 압축이나 캐싱등의 작업을 건너뛰게 됩니다. 또한 `BROWSER` 및 `COMMON` 폴더의 코드가 변경된 경우 웹 브라우저에서 새로고침하여 변경된 사항을 적용할 수 있습니다. (Node.js 환경에서의 `COMMON`이나 `NODE`의 변경사항은 서버를 재시작하여야 반영됩니다.) 개발할 때에는 `true`로 설정하는것이 좋습니다. 자세한 사항은 아래 [개발 모드](#개발-모드) 항목을 참고해 주시기 바랍니다.
* `webServerPort` 웹서버 및 웹소켓 서버의 포트를 설정합니다. 설정하지 않으면 웹 서버 및 웹 소켓 서버를 구동하지 않습니다.
* `sercuredWebServerPort` https 프로토콜을 사용하는 보안 웹서버의 포트를 설정합니다. 설정하지 않으면 보안 웹서버를 구동시키지 않습니다.
* `socketServerPort` 소켓 서버의 포트를 설정합니다.
* `defaultBoxName` 기본 BOX의 이름을 설정합니다. 기본값은 `'UPPERCASE'` 입니다.
* `title` 프로젝트 제목을 입력합니다. 기본값은 `'UPPERCASE PROJECT'` 입니다.

### 개발 모드
개발 모드일 때는 다음과 같은 기능들이 작동합니다.
* BROWSER 폴더 및 COMMON 폴더에 새 소스코드 파일이 생겼거나 기존 파일이 변경된 경우, 웹 브라우저에서 새로고침을 하면 변경된 파일들이 자동으로 반영됩니다.

### 운영 모드
운영 모드일 때는 다음과 같은 기능들이 작동합니다.
* JavaScript 파일들을 압축하여 제공합니다.
* 웹 브라우저에 모든 리소스를 캐싱하여 재접속시 빠르게 로딩합니다.

## NODE_CONFIG
### 데이터베이스 설정
* `dbName` 사용할 데이터베이스의 이름을 설정합니다.
* `dbHost` MongoDB 서버의 호스트를 설정합니다. 기본값은 `'127.0.0.1'` 입니다.
* `dbPort` MongoDB 서버의 포트를 설정합니다. 기본값은 `27017` 입니다.
* `dbUsername` MongoDB 서버의 접속 아이디를 설정합니다.
* `dbPassword` MongoDB 서버의 접속 비밀번호를 설정합니다.
* `maxDataCount` find 명령으로 한번에 가져올 수 있는 최대 data 수를 설정합니다. 기본값은 `1000` 입니다.
* `backupHost` 백업 서버의 호스트. 자세한 내용은 [백업 서버 세팅하기](#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupPort` 백업 서버의 포트. 자세한 내용은 [백업 서버 세팅하기](#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupName` 백업 데이터베이스 이름. 자세한 내용은 [백업 서버 세팅하기](#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupUsername` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 아이디
* `backupPassword` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 비밀번호

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
[UJS의 BROWSER_CONFIG 설정](https://github.com/Hanul/UJS/blob/master/README_KOR.md#configuration)에 아래 설정들을 추가로 지정할 수 있습니다.

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

