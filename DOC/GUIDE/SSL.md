# SSL 인증서 적용하기
이 문서는 UPPERCASE 기반 프로젝트가 HTTPS 프로토콜을 지원하기 위해 SSL 인증서를 적용하는 방법에 대해 다룹니다.

## UPPERCASE 기반 프로젝트 설정
UPPERCASE 기반 프로젝트에서 SSL 인증서를 적용하기 위해서는 아래 설정들을 추가하기만 하면 됩니다.

### `CONFIG`
* `sercuredWebServerPort` HTTPS 프로토콜을 사용하는 보안 웹서버의 포트를 설정합니다. 설정하지 않으면 보안 웹서버를 구동하지 않습니다.

### `NODE_CONFIG`
* `securedKeyFilePath` HTTPS 프로토콜을 사용하는 보안 웹서버를 위한 Key 파일의 경로를 설정합니다.
* `securedCertFilePath` HTTPS 프로토콜을 사용하는 보안 웹서버를 위한 Cert 파일의 경로를 설정합니다.

## [SkyProxy](https://github.com/Hanul/SkyProxy) 사용하여 SSL 인증서 설정
[SkyProxy](https://github.com/Hanul/SkyProxy)를 사용하여 SSL 인증서를 설정한 경우, UPPERCASE 기반 프로젝트에서는 SSL 인승서 관련 설정을 하지 않아도 됩니다.
```javascript
sroute('secure.site.com', 8887, '/home/site/privkey.pem', '/home/site/cert.pem');
```

## [Let's Encrypt](https://letsencrypt.org) 사용하기
[Let's Encrypt](https://letsencrypt.org)는 ISRG에서 만든 무료 SSL 인증서입니다.

### 인증서 발급받기
1. [https://certbot.eff.org](https://certbot.eff.org)에 접속하여 안내에 따라 인증서를 발급받습니다.
2. `webroot` 방식으로 발급받습니다. 프로젝트 BOX 폴더의 `R` 폴더의 위치를 지정하면 됩니다.
3. 이후 UPPERCASE 기반 프로젝트 설정에 관련 설정을 추가하거나, SkyProxy를 사용하여 SSL 인증서를 설정하면 됩니다.

### 인증서 자동으로 갱신하기
[Let's Encrypt](https://letsencrypt.org)는 90일 이내에 갱신을 해야만 계속해서 사용할 수 있다는 제한이 있습니다. Certbot으로 인증서를 발급받은 경우 아래 방법에 따라 자동갱신을 설정하면 계속해서 인증서를 사용할 수 있습니다.

1. UPPERCASE-CORE-NODE의 `RUN_SCHEDULE_DAEMON` 기능을 이용해 아래와 같이 인증서를 30일에 한번씩 자동으로 갱신하는 코드를 작성합니다.
    ```javascript
    require(process.env.UPPERCASE_PATH + '/UPPERCASE-CORE/NODE.js');
    
    RUN_SCHEDULE_DAEMON([{
    	// 30일에 한번씩 갱신
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