# UPPERCASE 이용 가이드

## UPPERCASE를 사용하기 위해 필요한 사전 지식
* `JavaScript` UPPERCASE는 JavaScript 기반 프레임워크이므로, JavaScript를 필수로 알고 있어야 합니다.
* 객체 지향 프로그래밍에 대한 기본적인 이해
* [Node.js](http://nodejs.org)가 왜 탄생했는지, 기본적인 구조가 어떻게 되는지 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* [MongoDB](http://www.mongodb.org)가 무엇인지와, 사용하는 명령어들을 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* `HTML5` 및 `CSS` UPPERCASE는 웹 애플리케이션 개발에 사용되기 때문에, HTML5와 CSS를 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* `Git` UPPERCASE는 Git을 이용해 설치 및 업그레이드를 수행합니다.

## 그럼 설치해 봅시다.
[UPPERCASE 설치하기](INSTALL.md)

## [UPPERCASE 코드 컨벤션 규칙](GUIDE/CONVENTION.md)
UPPERCASE를 구현할 때와 UPPERCASE 기반 프로젝트를 개발할 때는 이 규칙에 따라 개발합니다.

## UPPERCASE 모듈
UPPERCASE는 아래 모듈들을 내장하고 있기 때문에, 따로 설치하지 않아도 됩니다. 각 모듈에 대해서는 모듈 문서를 참고하시기 바랍니다.
* [UPPERCASE-CORE](GUIDE/UPPERCASE-CORE.md) UPPERCASE의 가장 근간을 되는 기능들을 담고 있는 모듈입니다. UPPERCASE의 모든 기능들은 이를 기반으로 합니다. 이 모듈만으로도 기본적인 웹 서비스를 충분히 구현할 수 있습니다.
* [UPPERCASE-ROOM](GUIDE/UPPERCASE-ROOM.md) 룸 방식으로 통신을 처리하기 위해 필요한 기능들을 담고 있는 모듈입니다.
* [UPPERCASE-DB](GUIDE/UPPERCASE-DB.md) MongoDB 기반 데이터베이스를 다루기 위해 필요한 기능들을 담고 있는 모듈입니다.
* [UPPERCASE-MODEL](GUIDE/UPPERCASE-MODEL.md) [MVC 패턴](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC)에서 Model에 해당하는 부분을 다루기 위해 필요한 기능들을 담고 있는 모듈입니다.
* [UPPERCASE-BOOT](GUIDE/UPPERCASE-BOOT.md) UPPERCASE의 모든 모듈을 불러들이고, 프로젝트를 실행하기 위해 필요한 모듈입니다.

모듈 내 각 파일들은 다음과 같은 역할을 합니다.
* COMMON.js는 어떤 JavaScript 환경에서도 구동됩니다.
* BROWSER.js는 웹 브라우저 환경에서 구동되는 기능들이 작성되며, COMMON.js를 포함합니다.
* NODE.js는 Node.js 환경에서 구동되는 기능들이 작성되며, COMMON.js를 포함합니다.

## BOX
BOX는 UPPERCASE용 모듈을 지칭합니다. 코드 상에서는 UPPERCASE-CORE의 BOX 기능을 통해 만들 수 있으며,

http://box.uppercase.io

## UPPERCASE 사용 방안
### 웹 애플리케이션을 만들고 싶어요.
UPPERCASE는 웹 애플리케이션 개발을 도와주는 프레임워크입니다. 따라서 이런 경우 최적의 솔루션이 될 수 있습니다!

### 웹 게임을 만들고 싶어요.
웹 게임도 웹 애플리케이션의 일종이기 때문에, UPPERCASE가 최적의 솔루션이 될 수 있습니다. 다만 게임 개발에는 UPPERCASE가 제공하는 기능 외에도 많은 기능들이 필요하기 때문에, UPPERCASE를 기반으로 한 게임 엔진인 SkyEngine을 살펴보시기 바랍니다.

### 웹 사이트를 만들고 싶어요.
UPPERCASE로 웹 사이트도 개발할 수 있지만, 웹 페이지 형식이 아닌 웹 애플리케이션 형태로 개발이 됩니다. 이는 검색 엔진 최적화 측면에서 약점이 될 수 있어, 다음과 같이 사용할 것을 추천합니다.
* UPPERCASE + NSP
* UPPERCASE + SML
* UPPERCASE + NSP + SML

### UPPERCASE를 jQuery 등 다른 라이브러리와 함께 사용하고 싶어요.
* jQuery와 함께 사용하기
* AngularJS와 함께 사용하기
