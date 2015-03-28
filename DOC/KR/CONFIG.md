# Configuration

###### CONFIG
* `isDevMode` 개발자 모드를 활성화합니다. 기본값은 `false`입니다. 이 모드가 활성화되면, 코드 압축이나 캐싱등의 작업을 건너뛰게 됩니다. 개발을 할 때에는 `true`로 설정하는것이 좋습니다.
* `webServerPort` 웹 서버 및 웹 소켓 서버의 포트를 설정합니다. 설정하지 않으면, 웹 서버 및 웹 소켓 서버를 구동시키지 않습니다.
* `sercuredWebServerPort` 보안 웹 서버의 포트를 설정합니다. 설정하지 않으면, 보안 웹 서버를 구동시키지 않습니다.
* `socketServerPort` 소켓 서버의 포트를 설정합니다.
* `defaultBoxName` 기본 BOX의 이름을 설정합니다. 기본값은 `'UPPERCASE.IO'` 입니다.
* `title` 프로젝트 제목을 입력합니다. 기본값은 `'UPPERCASE.IO PROJECT'` 입니다.
* `isMobileFullScreen` 모바일 브라우저에서 full screen으로 화면을 표시할지를 결정합니다. 기본값은 `false`입니다.

###### NODE_CONFIG
* `securedKeyFilePath` 보안 웹 서버를 위한 key file의 경로를 설정합니다.
* `securedCertFilePath` 보안 웹 서버를 위한 cert file의 경로를 설정합니다.
* `dbName` 사용할 데이터베이스의 이름을 설정합니다.
* `dbHost` MongoDB 데이터베이스 서버의 호스트를 설정합니다. 기본값은 `'127.0.0.1'` 입니다.
* `dbPort` MongoDB 데이터베이스 서버의 포트를 설정합니다. 기본값은 `27017` 입니다.
* `dbUsername` MongoDB 데이터베이스 서버의 접속 아이디를 설정합니다.
* `dbPassword` MongoDB 데이터베이스 서버의 접속 비밀번호를 설정합니다.
* `isDBLogMode` 데이터베이스 로그 모드를 켜고자 할 때 `true`로 설정합니다. 데이터가 수정 될 경우 console 로그를 띄어줍니다. 기본값은 `false` 입니다.
* `maxDataCount` find 명령으로 한번에 가져올 수 있는 최대 data 수를 설정합니다. 기본값은 `1000` 입니다.
* `maxUploadFileMB` 업로드 가능한 최대 파일 크기를 MB 단위로 설정합니다. 기본값은 `10` 입니다.

이하는 분산 서버 관련 설정들입니다.
* `thisServerName` 현재 서버의 이름을 지정합니다. 이는 분산서버 구성에 사용됩니다.
* `clusteringServers` 분산 서버들의 정보를 설정합니다.
* `clusteringPort` 분산 서버 포트를 설정합니다.
* `socketServers` 소켓 서버들의 정보를 설정합니다.
* `webSocketServers` 웹 소켓 서버들의 정보를 설정합니다.
* `uploadServers` 업로드 서버들의 정보를 설정합니다.

###### BROWSER_CONFIG
[UPPERCASE.JS의 BROWSER_CONFIG 설정](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/README_KOR.md#configuration)과 같습니다.
