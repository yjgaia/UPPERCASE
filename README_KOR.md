![ScreenShot](https://raw.githubusercontent.com/UPPERCASEIO/UPPERCASE.IO/master/LOGO.png)
=========
동적인 웹 사이트 및 모바일 애플리케이션 개발을 위한 쉽고, 명확하면서도 강력한 풀스택 (server-to-client) MVC 미들웨어

[UPPERCASE.JS](http://uppercaseseries.org/#JS)를 기반으로 하고 있습니다.

## Based On
- JavaScript 1.5 (ECMA-262, 3rd edition)
- CommonJS Modules/1.0

Server-side:
- [Node.js](http://nodejs.org)
- [MongoDB](http://www.mongodb.org)
- [ImageMagick](http://www.imagemagick.org)

Client-side:
- Web Browsers or
- [Titanium](http://www.appcelerator.com/titanium/) or
- [Swift Client](https://github.com/UPPERCASE-Series/UPPERCASE.IO-Swift-Client) or
- [Java Client](https://github.com/UPPERCASE-Series/UPPERCASE.IO-Java-Client)

## 용어

#### BOX
BOX는 UPPERCASE.IO에서의 모듈을 칭합니다.

UPPERCASE.IO의 공식 BOX 저장소는 다음 링크에 있습니다.
* [UPPERCASE.IO Official BOX Repositories](https://github.com/UIO-BOX)

###### BOX 패키징
1. PACK.js 다운로드 (오른쪽 클릭 후 다른 이름으로 저장)
	https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.IO/master/PACK.js
2. PACK.js 실행
	`node PACK {{BOX 이름}}`

## 설치

1. UPPERCASE.IO를 설치한다.

2. UPPERCASE.IO의 경로를 환경변수에 등록한다.

	MAC
	```
	vi .profile
	export UPPERCASE_IO_PATH="{{UPPERCASE.IO PATH}}"
	```
	
	Linux
	```
	vi .bash_profile
	or
	vi .profile
	export UPPERCASE_IO_PATH="{{UPPERCASE.IO PATH}}"
	```

3. 프로젝트를 실행한다.

    Project.js
    ```javascript
    require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

    BOOT({
        ...
    });
    ```

* DB: update를 동시에 여러번 할 경우 모든 update의 callback은 같은 데이터(수정된)를 반환합니다.

## UPPERCASE.IO의 분산 처리 전략

UPPERCASE.IO 기반 프로젝트의 주축을 이루는 서버의 기능별 파트는
1. 대문 서버 - 유저들에게 웹 페이지나 분산된 서버들의 정보를 제공하는 서버이다.
2. API 서버 - 각종 기능들을 프로토콜의 제약 없이 JSON 양식으로 통신하는 서버이다.
3. 업로드 파일 서버 - 프로젝트에서 업로드 된 파일들을 관리하는 서버이다.
4. MongoDB 기반 데이터베이스 서버

어차피 MongoDB는 자체로 분산 처리를 하기 때문에, 분산 처리 전략에서 DB 서버는 제외한다. 그렇다면 다음과 같이 세가지 경우의 수가 생긴다.

1. L4 스위치를 이용해 물리적으로 서버가 분산되어 있을 경우
2. 특정 도메인 주소를 담당하는 대문 서버가 있고, 나머지 서버들로 분산하는 경우
3. 대문 서버가 있고, 또한 API서버들이 있으며 업로드 파일을 분산하여 저장하는 서버가 있는 경우


#### 1. L4 스위치를 이용해 물리적으로 서버가 분산되어 있을 경우

이 경우에는 각 서버들이 동등하게 분배되어 모든 일을 담당하여 하면 된다.


#### 2. 특정 도메인 주소를 담당하는 대문 서버가 있고, 나머지 서버들로 분산하는 경우

이 경우에는 대문 서버가 모든 유저들의 접속을 맞이하므로, 웹 페이지나 분산 서버들의 정보를 가져오는 경우를 제외하고는 API 또는 업로드 파일 제공 등의 기능을 최대한 다른 서버들로 분산하는 전략을 취한다.
BTNcafe의 서버 전략은 여기에 해당한다.

여기에 더불어 UPPERCASE.IO의 R 기능을 이용하여 대문 서버가 제공할 이미지들 또한 분산처리한다면 대문 서버가 감당하는 부하가 많이 줄어들게 된다.
UPPERCASE.IO에서는 상대적으로 트래픽이 적은 API 서버들이 자동으로 이 역할을 담당한다.
따라서 여기서는 대문 서버를 제외한 모든 서버들이 담당하게 된다.


#### 3. 대문 서버가 있고, 또한 API서버들이 있으며 업로드 파일을 분산하여 저장하는 서버가 있는 경우
이 경우 또한 마찬가지로 대문 서버가 모든 유저들의 접속을 맞이하므로, 웹 페이지나 분산 서버들의 정보를 가져오는 경우를 제외한 기능들은 최대한 다른 서버들로 분산한다. 하지만 API 서버들과 업로드 서버군 또한 나뉘어져 있기 때문에, 각각 기능에 맞추어 분산하는 전략을 취한다.

여기에 더불어 UPPERCASE.IO의 R 기능을 이용하여 대문 서버가 제공할 이미지들 또한 분산처리한다면 대문 서버가 감당하는 부하가 많이 줄어들게 된다.
UPPERCASE.IO에서는 상대적으로 트래픽이 적은 API 서버들이 자동으로 이 역할을 담당한다.

## License
[MIT](LICENSE)

## Author
[Young Jae Sim](https://github.com/Hanul)

## Contact
* [Facebook User Group](https://www.facebook.com/groups/uppercase/)
* [GitHub Issues](https://github.com/UPPERCASE-Series/UPPERCASE.IO/issues)

## Other Link
* [Official Web Site](http://UPPERCASE.IO)
* [1.3 version](http://1.3.UPPERCASE.IO)
* [UPPERCASE.IO Official BOX Repositories](https://github.com/UIO-BOX)
