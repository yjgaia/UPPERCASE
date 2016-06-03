# ![ScreenShot](https://raw.githubusercontent.com/Hanul/UPPERCASE/master/LOGO.png)
UPPERCASE는 실시간성에 특화된 풀스택 프레임워크입니다.
* [Node.js](http://nodejs.org) 기반
* JavaScript 유틸리티 셋 [UJS](DOC/UJS.md) 기반
* Model-View 패턴
* 모듈 시스템 [BOX](https://github.com/Hanul/UJS/blob/master/DOC/UJS-COMMON.md#box) 기반
* 멀티 코어 CPU 지원
* 구형 브라우저 호환

## 사전 지식
UPPERCASE를 사용하기 위해서는 이하 기술셋을 알고있어야 합니다.
* JavaScript, Node.js
* MongoDB
* HTML, CSS
* Git

## 시작하기
* [설치하기](DOC/INSTALL.md)
* [프로젝트 생성](DOC/CREATE_PROJECT.md)
* [모델 생성](DOC/CREATE_MODEL.md)
* [간단한 블로그 만들기](DOC/MAKE_BLOG.md)
* [블로그에 인증 추가하기](DOC/ADD_AUTH_TO_BLOG.md)
* [업로드 기능 만들기](DOC/UPLOAD.md) (작성중)
* [UPPERCASE가 제공하는 기능들 살펴보기](DOC/OVERVIEW.md)
* [Configuration](DOC/CONFIG.md)
* [패키징](DOC/PACK.md)
* [배포 및 서버 이전](DOC/DEPLOY.md)
* [UPPERCASE 업데이트](DOC/UPDATE.md)
* [UADMIN](DOC/UADMIN.md) (작성중)

## 한걸음 더
* [BOX 이해하기](DOC/BOX.md)
* [기본 스타일](DOC/BASE_STYLE.md)
* [index.html을 따로 만들고 싶다면](DOC/index.html.md)
* [Apache Cordova와 Crosswalk를 이용한 하이브리드 앱 개발](DOC/HYBRID_APP.md) (작성중)
* [소셜 연동](DOC/SOCIAL.md) (작성중)
* [Android, iOS 모바일 네이티브 앱 개발](DOC/MOBILE_NATIVE.md) (작성중)
* [nw.js을 이용한 데스크톱 앱 개발](DOC/nw.js.md) (작성중)
* [다중 프로젝트 구성](DOC/MULTI_PROJECT.md) (작성중)
* [프로젝트 혼합하기](DOC/MIX_PROJECT.md) (작성중)
* [검색 최적화](DOC/SEO.md) (작성중)
* [프로젝트 성능 향상](DOC/SPEED_UP.md) (작성중)
* [분산 서버 구성](DOC/CLUSTERING.md) (작성중)
* [Less 사용하기](DOC/Less.md)

## 모듈 상세보기
* [UPPERCASE-TRANSPORT](DOC/UPPERCASE-TRANSPORT.md) 서버와 클라이언트간의 통신을 담당하는 모듈입니다.
* [UPPERCASE-ROOM](DOC/UPPERCASE-ROOM.md) 통신 처리를 룸 방식으로 처리하는 모듈입니다.
* [UPPERCASE-DB](DOC/UPPERCASE-DB.md) 데이터베이스를 다루는 모듈입니다.
* [UPPERCASE-MODEL](DOC/UPPERCASE-MODEL.md) Model-View 패턴에서 Model 부분을 다루는 모듈입니다.
* [UPPERCASE-UTIL](DOC/UPPERCASE-UTIL.md) npm 모듈을 사용하는 유틸리티를 모은 모듈입니다.
* [UPPERCASE-UPLOAD](DOC/UPPERCASE-UPLOAD.md) 업로드 관련 기능을 제공하는 모듈입니다.
* [UPPERCASE](DOC/UPPERCASE.md) UPPERCASE 통합을 위한 모듈입니다.

## API
* [UJS API](https://github.com/Hanul/UJS/blob/master/API/README.md)
* [UPPERCASE API](API/README.md)

## UPPERCASE 클라이언트
UPPERCASE는 기본적으로 웹 클라이언트만을 내장하고 있기 때문에, 다른 플랫폼에서의 동작을 보장하기 위해 플랫폼 별로 클라이언트가 존재합니다.

### Unicorn
Unicorn은 객체 지향 언어들을 지원하기 위해 개발된 UPPERCASE 클라이언트들의 API 원형입니다.
* [Unicorn](https://github.com/Hanul/Unicorn)
* [Unicorn-Android](https://github.com/Hanul/Unicorn-Android)
* [Unicorn-iOS](https://github.com/Hanul/Unicorn-iOS)

## UPPERCASE를 서버로 사용하기
UPPERCASE를 서버로 사용하고, 클라이언트는 다른 솔루션들과 함께 사용할 수 있습니다.
* [UPPERCASE + jQuery](DOC/jQuery.md)
* [UPPERCASE + AngularJS](DOC/AngularJS.md)
* [UPPERCASE + NSP(Node Server Pages)](DOC/NSP.md)

## 공식 지원 BOX

### UI 관련
* [UUI](https://github.com/Hanul/UUI)
* [UANI](https://github.com/Hanul/UANI)
* [Yogurt](https://github.com/Hanul/Yogurt)
* [USOCIAL](https://github.com/Hanul/USOCIAL)

### 앱 개발 관련
* [UPUSH](https://github.com/Hanul/UPUSH) iOS와 Android 애플리케이션에 푸시 메시지를 전송하는 기능을 가진 BOX입니다.
* [GooglePlayPurchaseValidator](https://github.com/Hanul/GooglePlayPurchaseValidator) 구글 플레이 In-App 결제 검증 BOX입니다.
* [AppStorePurchaseValidator](https://github.com/Hanul/AppStorePurchaseValidator) 앱스토어 In-App 결제 검증 BOX입니다.

### 기타
* [UMAIL](https://github.com/Hanul/UMAIL)

## 파생 프로젝트
* [Node Server Pages](https://github.com/Hanul/NSP)
* [SkyMongoBackup](https://github.com/Hanul/SkyMongoBackup) 매일 데이터베이스를 백업하는 애플리케이션입니다.
* [SkyProxy](https://github.com/Hanul/SkyProxy) 한 서버에서 여러 도메인을 사용하고자 할때 필요한 프록시 서버입니다.
* [SkyRelay](https://github.com/Hanul/SkyRelay) 실시간 멀티플레이 게임을 구현하고자 할 때 홀펀칭에 사용되는 릴레이 서버입니다.

## 샘플 프로젝트
* [UPPERCASE-Sample-Chat](https://github.com/Hanul/UPPERCASE-Sample-Chat)

## 기타
* [UPPERCASE 빌드](DOC/BUILD.md)

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)

## 문의하기
* [GitHub Issues](https://github.com/Hanul/UPPERCASE/issues)
* [UPPERCASE 페이스북 그룹](https://www.facebook.com/groups/uppercase/)
