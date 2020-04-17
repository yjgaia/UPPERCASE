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
sroute('{{도메인}}', 8887, '/etc/letsencrypt/live/{{도메인}}/privkey.pem', '/etc/letsencrypt/live/{{도메인}}/fullchain.pem');
```

## [Let's Encrypt](https://letsencrypt.org) 사용하기
[Let's Encrypt](https://letsencrypt.org)는 ISRG에서 만든 무료 SSL 인증서입니다.

### 인증서 발급받기
1. 프로젝트를 HTTP 프로토콜 방식으로 실행합니다.
2. [https://certbot.eff.org](https://certbot.eff.org)에 접속하여 안내에 따라 Certbot을 설치합니다. CentOS의 경우 아래와 같이 설치합니다.
```
wget https://dl.eff.org/certbot-auto
sudo mv certbot-auto /usr/local/bin/certbot-auto
sudo chown root /usr/local/bin/certbot-auto
sudo chmod 0755 /usr/local/bin/certbot-auto
```
3. `webroot` 방식으로 발급받습니다. 프로젝트 BOX 폴더의 `R` 폴더의 위치를 지정하면 됩니다. 아래는 예시입니다.
	```
	/usr/local/bin/certbot-auto certonly --webroot -w /root/SampleProject/Sample/R -d sample.com
	```
4. 이후 UPPERCASE 기반 프로젝트 설정에 관련 설정을 추가하거나, SkyProxy를 사용하여 SSL 인증서를 설정하면 됩니다.

### 인증서 갱신하기
[Let's Encrypt](https://letsencrypt.org)는 90일 이내에 갱신을 해야만 계속해서 사용할 수 있다는 제한이 있습니다. Certbot으로 인증서를 발급받은 경우 아래 명령어를 입력하여 갱신하면 계속해서 인증서를 사용할 수 있습니다. (단, 서버를 이전하는 경우에는 인증서를 새로 발급받아야 합니다.)

```
/usr/local/bin/certbot-auto renew
```