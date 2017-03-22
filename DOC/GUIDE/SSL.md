# SSL 인증서 적용하기

## UPPERCASE 기반 프로젝트 설정

### CONFIG
* `sercuredWebServerPort` https 프로토콜을 사용하는 보안 웹서버의 포트를 설정합니다. 설정하지 않으면 보안 웹서버를 구동시키지 않습니다.

### NODE_CONFIG
* `securedKeyFilePath` https 프로토콜을 사용하는 보안 웹서버를 위한 key file의 경로를 설정합니다.
* `securedCertFilePath` https 프로토콜을 사용하는 보안 웹서버를 위한 cert file의 경로를 설정합니다.

## [SkyProxy](https://github.com/Hanul/SkyProxy) 사용하기


## [Let's Encrypt](https://letsencrypt.org) 인증서

### 인증서 발급받기
1. [https://certbot.eff.org](https://certbot.eff.org)에 접속하여 안내에 따라 인증서를 발급 받습니다. (CentOS의 경우 [https://certbot.eff.org/#centosrhel7-other](https://certbot.eff.org/#centosrhel7-other))
2. `webroot` 방식으로 발급을 받습니다. 프로젝트 폴더의 `R` 폴더의 위치를 지정해 주면 됩니다.

### 인증서 갱신하기
1. Certbot으로 인증서를 설치하였다면 UPPERCASE-CORE-NODE의 `RUN_SCHEDULE_DAEMON` 기능을 이용해 아래와 같은 코드를 작성하여 인증서를 30일에 한번씩 자동으로 갱신할 수 있습니다.
```javascript
require(process.env.UPPERCASE_PATH + '/UPPERCASE-CORE/NODE.js');

RUN_SCHEDULE_DAEMON([{
	// 30일에 한번
	hour : 30 * 24,
	commands : [
		'certbot renew --quiet'
	]
}]);
```
2. `forever` 모듈로 위 코드를 실행합니다.
```
forever start RUN_SCHEDULE_DAEMON_RENEW_SSL.js
```