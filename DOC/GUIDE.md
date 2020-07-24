# UPPERCASE 이용 가이드
이 문서는 UPPERCASE를 사용하는 방법에 대해 다룹니다.

## 목차
* [필요한 사전 지식](#필요한-사전-지식)
* [설치하기](#설치하기)
* [개발하기](#개발하기)
* [출시하기](#출시하기)
* [모듈 별 문서](#모듈-별-문서)
* [사용 방안](#사용-방안)
* [고급 기능](#고급-기능)

## 필요한 사전 지식
UPPERCASE를 사용하기 위해 필요한 사전 지식들은 다음과 같습니다.

* `JavaScript` UPPERCASE는 JavaScript 기반 프레임워크이므로, JavaScript를 필수로 알고 있어야 합니다.
* 객체 지향 프로그래밍에 대한 기본적인 이해
* [Node.js](http://nodejs.org)가 왜 탄생했는지, 기본적인 구조가 어떻게 되는지 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* [MongoDB](http://www.mongodb.org)가 무엇인지와, 사용하는 명령어들을 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* `HTML5 및 CSS` UPPERCASE는 웹 애플리케이션 개발에 사용되기 때문에, HTML5와 CSS를 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* `Git` UPPERCASE는 Git을 이용해 설치 및 업그레이드를 수행합니다.

## 설치하기
[UPPERCASE 설치하기](INSTALL.md)

## 개발하기
* UPPERCASE 기반 프로젝트를 개발할 때는 [UPPERCASE 코드 컨벤션 규칙](GUIDE/CONVENTION.md)에 따라 개발합니다.
* [프로젝트 생성](GUIDE/CREATE_PROJECT.md)
* [프로젝트 설정](GUIDE/CONFIGURATION.md)
* [모델 생성](GUIDE/CREATE_MODEL.md)
* [UPPERCASE의 모듈 시스템, BOX](GUIDE/BOX.md)
* [튜토리얼](TUTORIAL.md)

## 출시하기
* [프로젝트 배포하기](GUIDE/DEPLOY.md)
* [SSL 인증서 적용하기](GUIDE/SSL.md)
* [하이브리드 앱 만들기](GUIDE/HYBRID_APP.md)

## 모듈 별 문서
UPPERCASE는 아래 모듈들을 모두 내장하고 있기 때문에, 따로 설치하지 않아도 됩니다. 각 모듈에 대해서는 해당하는 모듈 문서를 참고하시기 바랍니다.
* [UPPERCASE-CORE](https://github.com/Hanul/UPPERCASE-CORE) UPPERCASE의 가장 근간을 되는 기능들을 담고 있는 모듈이며, UPPERCASE의 모든 기능들은 이를 기반으로 합니다. 이 모듈만으로도 기본적인 웹 서비스를 충분히 구현할 수 있습니다.
* [UPPERCASE-ROOM](https://github.com/Hanul/UPPERCASE-ROOM) 룸 방식으로 통신을 처리하기 위해 필요한 기능들을 담고 있는 모듈입니다.
* [UPPERCASE-DB](https://github.com/Hanul/UPPERCASE-DB) MongoDB 기반 데이터베이스를 다루기 위해 필요한 기능들을 담고 있는 모듈입니다.
* [UPPERCASE-MODEL](https://github.com/Hanul/UPPERCASE-MODEL) [MVC 패턴](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC)에서 모델에 해당하는 부분을 다루기 위해 필요한 기능들을 담고 있는 모듈입니다.

모듈 내 각 파일들은 다음과 같은 역할을 합니다.
* `COMMON.js`는 어떠한 JavaScript 환경에서도 구동되는 기능들을 포함하고 있습니다.
* `BROWSER.js`는 `COMMON.js`를 포함하며, 웹 브라우저 환경에서만 구동되는 기능들을 포함하고 있습니다.
* `NODE.js`는 `COMMON.js`를 포함하며, Node.js 환경에서만 구동되는 기능들을 포함하고 있습니다.

## 사용 방안
### 웹 애플리케이션을 만들고 싶어요.
UPPERCASE는 웹 애플리케이션 개발을 도와주는 프레임워크입니다. 따라서 웹 애플리케이션을 만드는 경우에는 최적의 솔루션이 될 수 있습니다.
* [웹 채팅 튜토리얼](https://github.com/Hanul/UPPERCASE-Chat-Tutorial)
* [SNS 튜토리얼](https://github.com/Hanul/UPPERCASE-SNS-Tutorial)

### 웹 게임을 만들고 싶어요.
웹 게임도 웹 애플리케이션의 일종이기 때문에, UPPERCASE가 최적의 솔루션이 될 수 있습니다.
* [웹 게임 튜토리얼](https://github.com/Hanul/UPPERCASE-Game-Tutorial)

다만 게임 개발에는 UPPERCASE가 제공하는 기능 외에도 많은 기능들이 필요하기 때문에, UPPERCASE 기반 게임 엔진인 [SkyEngine](http://skyengine.uppercase.io)을 살펴보시기 바랍니다.

### 웹 사이트를 만들고 싶어요.
UPPERCASE로 웹 사이트를 만들게 되면, 웹 사이트 마저도 웹 애플리케이션 형태로 개발될 것입니다. 이는 [검색 엔진 최적화](https://ko.wikipedia.org/wiki/%EA%B2%80%EC%83%89_%EC%97%94%EC%A7%84_%EC%B5%9C%EC%A0%81%ED%99%94) 측면에서 약점이 될 수 있으며, 따라서 다음과 같은 추가 기술들과 함께, 웹 사이트 튜토리얼을 살펴보시기 바랍니다.
* [SML](https://github.com/Hanul/SML)
* [NSP](https://github.com/Hanul/NSP)
* [웹 사이트 튜토리얼](https://github.com/Hanul/UPPERCASE-Site-Tutorial)

### UPPERCASE를 다른 JavaScript 라이브러리와 함께 사용하고 싶어요.
* [jQuery와 함께 사용하기](https://github.com/Hanul/UPPERCASE-with-jQuery)
* [AngularJS와 함께 사용하기](https://github.com/Hanul/UPPERCASE-with-AngularJS)

## 고급 기능
* [분산 처리](GUIDE/CLUSTERING.md)
* [여러 프로젝트 연동하기](GUIDE/MIX_PROJECT.md)
* [UPPERCASE를 수정하여 사용하기](GUIDE/MODIFY_UPPERCASE.md)

추가적인 문의사항은 [링크](../README.md#링크)나, [작성자의 이메일](mailto:hanul@hanul.me)로 문의 바랍니다.
