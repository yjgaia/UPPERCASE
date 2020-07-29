# ![UPPERCASE Logo](https://raw.githubusercontent.com/Hanul/UPPERCASE/master/LOGO.png)
UPPERCASE는 웹 어플리케이션 개발을 도와주는 JavaScript 기반 프레임워크입니다. 서버와 클라이언트를 부드럽게 연결는데 특화되어, 예를 들면 메신저나 SNS 같이 실시간 통신이 중요한 애플리케이션 개발에 유용합니다. 또한 서버 프레임워크로만으로 사용할 수 있으며, 반대로 서버가 불필요한 웹 애플리케이션 개발을 할 때도 유용하게 사용할 수 있습니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 특징
#### 왜 이름이 UPPERCASE인가요?
UPPERCASE의 모든 기능들의 이름은 JavaScript의 키워드나 변수 이름, 다른 라이브러리들에서 사용하는 이름을 피하기 위해 대문자로 이루어져 있습니다. 비슷하게, [jQuery](https://jquery.com/)는 `$`를, [Underscore](http://underscorejs.org/)는 `_`를 접두사로 사용하고 있습니다.

```javascript
// UPPERCASE
EACH([52, 97], (value, index) => {
    alert(index + ': ' + value);
});

// jQuery
$.each([52, 97], (index, value) => {
    alert(index + ': ' + value);
});

// Underscore
_.each([52, 97], (value, index) => {
    alert(index + ': ' + value);
});
```

#### UPPERCASE는 웹 개발의 모든 영역을 지원합니다.
웹 사이트, 웹 애플리케이션, 웹 게임 등 웹 개발의 모든 영역을 지원합니다.

#### UPPERCASE는 서버가 필요한 모든 부분을 지원합니다.
꼭 웹 개발이 아니더라도, UPPERCASE는 서버가 필요한 모든 프로젝트에서 사용할 수 있습니다.
* [클라이언트 항목](#클라이언트) 참고

#### UPPERCASE는 웹 표준을 지원합니다.
따라서 웹 표준을 지원하는 모든 브라우저에서 구동됩니다.

#### UPPERCASE는 Node.js를 제외한 다른 네이티브 모듈의 의존성이 없습니다.
따라서 Node.js가 구동되는 모든 운영체제와 시스템에서 구동됩니다.

#### UPPERCASE는 멀티코어 CPU 및 분산 서버 시스템을 지원합니다.
* [클러스터링 문서](DOC/GUIDE/CLUSTERING.md) 참고

## UPPERCASE의 구조
![STRUCTURE](https://raw.githubusercontent.com/Hanul/UPPERCASE/master/DOC/GUIDE/STRUCTURE.png)
UPPERCASE는 [각종 모듈](DOC/GUIDE.md#모듈-별-문서)과 [BOX](DOC/GUIDE/BOX.md), [Uniconn](#클라이언트) 등으로 이루어져 있습니다.

## UPPERCASE가 제공하는 기능들
UPPERCASE는 동적인 웹 애플리케이션을 개발하기 위해 필요한 다양한 기능들을 제공합니다.

#### 여러가지 통신 프로토콜 서버
TCP/UDP 소켓 서버 및 웹 서버(HTTP/HTTPS), 웹 소켓 서버가 구현되어 있으며, TCP 소켓과 웹 소켓 프로토콜이 통합된 멀티 프로토콜 소켓 서버를 제공하고 있습니다.
* [손쉬운 서버 생성 문서](https://github.com/Hanul/UPPERCASE-CORE/blob/master/DOC/NODE.md#손쉬운-서버-생성) 참고

#### 실시간 통신을 좀 더 쉽게 도와주는 룸 기능
룸이라는 개념을 도입하여 상황에 맞는 여러 룸들을 만들면, 룸에 접속한 유저들에게만 필요한 메시지를 전달하는 구조를 쉽게 구현할 수 있습니다.
* [UPPERCASE-ROOM 문서](https://github.com/Hanul/UPPERCASE-ROOM/blob/master/DOC/UPPERCASE-ROOM.md) 참고

#### 데이터베이스 관련 기능
Node.js 환경에서 MongoDB 기반 데이터베이스를 쉽게 다룰 수 있습니다.
* [UPPERCASE-DB 문서](https://github.com/Hanul/UPPERCASE-DB/blob/master/DOC/UPPERCASE-DB.md) 참고

#### [MVC 패턴](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC)에서의 Model 관련 기능
UPPERCASE 기반 프로젝트는 자연스럽게 [MVC 패턴](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC)을 따르게 됩니다. UPPERCASE는 자체적으로 MVC 패턴에서의 Model에 대한 여러가지 기능들을 제공하고, Model에 복잡한 Business Logic을 추가하여 확장시킬 수 있습니다.
* [UPPERCASE-MODEL 문서](https://github.com/Hanul/UPPERCASE-MODEL/blob/master/DOC/UPPERCASE-MODEL.md) 참고

UPPERCASE는 이 외에도 업로드 기능, 각종 유틸리티 기능, 모든 브라우저 통합 기본 스타일 등을 제공하고 있습니다. 자세한 내용은 아래 문서들을 참고하시기 바랍니다.

## 문서
* [설치하기](DOC/INSTALL.md)
* [개발하기](DOC/GUIDE.md#개발하기)
* [튜토리얼](DOC/TUTORIAL.md)
* [가이드](DOC/GUIDE.md)
* [API 문서](API/README.md)

## 클라이언트
UPPERCASE가 공식 지원하는 클라이언트 목록은 다음과 같습니다.
* 웹 브라우저 - UPPERCASE는 기본적으로 웹 브라우저에서 구동됩니다.
* [Android 클라이언트](https://github.com/Hanul/Uniconn-Android)
* [iOS 클라이언트](https://github.com/Hanul/Uniconn-iOS)
* [Unity 클라이언트](https://github.com/Hanul/Uniconn-Unity)
* [GameMaker: Studio 클라이언트](https://github.com/Hanul/UPPERCASE-GameMaker-Client)

지원 예정인 클라이언트 목록은 다음과 같습니다.
* Unreal 클라이언트
* Xamarin 클라이언트

기타 클라이언트 라이브러리를 지원받고 싶은 플랫폼이 있으면, [GitHub Issues](https://github.com/Hanul/UPPERCASE/issues)에 글을 남겨주시기 바랍니다.

## 링크
* [GitHub Issues](https://github.com/Hanul/UPPERCASE/issues)
* [UPPERCASE 블로그](http://blog.uppercase.io)
* [UPPERCASE 페이스북 유저 그룹](https://www.facebook.com/groups/uppercase/)
* [UPPERCASE BOX 저장소](http://box.uppercase.io)

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)
