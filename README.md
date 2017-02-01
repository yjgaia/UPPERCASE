작성중

# UPPERCASE
UPPERCASE는 웹 어플리케이션 개발을 도와주는 JavaScript 기반 프레임워크입니다. 서버와 클라이언트를 부드럽게 연결는데 특화되어, 예를 들면 메신저나 SNS 같이 실시간 통신이 중요한 애플리케이션 개발에 유용합니다. 또한 서버 프레임워크로만으로 사용할 수 있으며, 반대로 서버가 불필요한 웹 애플리케이션 개발을 할 때도 유용하게 사용할 수 있습니다.

## 특징
### 왜 이름이 UPPERCASE인가요?
UPPERCASE의 모든 기능들의 이름은 JavaScript의 키워드나 변수 이름, 다른 라이브러리들에서 사용하는 이름을 피하기 위해 대문자로 이루어져 있습니다. 비슷하게, [jQuery](https://jquery.com/)는 `$`를, [Underscore](http://underscorejs.org/)는 `_`를 접두사로 사용하고 있습니다.

```javascript
// UPPERCASE
EACH([52, 97], function(value, index) {
    alert(index + ': ' + value);
});

// jQuery
$.each([52, 97], function(index, value) {
    alert(index + ': ' + value);
});

// Underscore
_.each([52, 97], function(value, index) {
    alert(index + ': ' + value);
});
```

### UPPERCASE는 웹 개발의 모든 영역을 지원합니다.
웹 사이트, 웹 애플리케이션, 웹 게임 등 웹 개발의 모든 영역을 지원합니다.

### UPPERCASE는 서버가 필요한 모든 부분을 지원합니다.
웹 서비스가 아니더라도, UPPERCASE는 서버가 필요한 모든 곳에서 사용할 수 있습니다. 현재 지원하고 있는 클라이언트 목록은 [클라이언트](#클라이언트) 항목을 참고해주시기 바랍니다.

### UPPERCASE는 웹 표준을 지원합니다.
따라서 웹 표준이 지원되는 모든 브라우저에서 구동됩니다.

### UPPERCASE는 Node.js를 제외한 다른 네이티브 모듈의 의존성이 없습니다.
따라서 Node.js가 구동되는 모든 운영체제와 시스템에서 구동됩니다.

### UPPERCASE는 멀티코어 CPU 및 분산 서버 시스템을 지원합니다.
자세한 내용은 [클러스터링 문서](DOC/GUIDE/CLUSTERING.md)를 참고하시기 바랍니다.

## UPPERCASE가 제공하는 기능들 살펴보기
UPPERCASE는 동적인 웹 애플리케이션을 개발하기 위해 필요한 다양한 기능들을 제공합니다.

## 여러가지 통신 프로토콜 서버 지원
TCP/UDP 소켓 서버 및 웹 서버, 리소스 서버를 제공하는 [UJS 서버 구현체들](https://github.com/Hanul/UJS/blob/master/DOC/UJS-NODE.md#각종-서버-구현체들)에 더하여, 웹 소켓 서버 및 웹 소켓을 지원하지 않는 브라우저에서도 웹 소켓과 같은 형태로 통신을 가능하게 해주는 서버 구현체를 포함하고 있습니다.

또한 TCP 소켓과 웹 소켓 프로토콜을 통합하여 제공하는 멀티 프로토콜 소켓 서버 구현체가 포함되어 있습니다.

자세한 내용은 [UPPERCASE-TRANSPORT](UPPERCASE-TRANSPORT.md) 문서를 참고하시기 바랍니다.

## 실시간 통신을 좀 더 쉽게 도와주는 룸 기능
서버에서 룸을 만들고, 특정 룸에 접속한 사람들에게만 메시지를 전달할 수 있습니다. 따라서 특징에 맞는 여러 룸을 만들어 각각에 접속한 유저들에게 필요한 메시지를 전달하는 프로젝트 구조를 설계할 수 있습니다.

자세한 내용은 [UPPERCASE-ROOM](UPPERCASE-ROOM.md) 문서를 참고하시기 바랍니다.

## 데이터베이스 관련 기능
MongoDB를 사용하기 쉽게 CRUD 기능을 구현한 모듈입니다.

자세한 내용은 [UPPERCASE-DB](UPPERCASE-DB.md) 문서를 참고하시기 바랍니다.

## Model-View 패턴에서의 Model 관련 기능
UPPERCASE는 Model-View 패턴을 따릅니다. UPPERCASE는 자체적으로 Model에 대한 여러가지 기능들을 제공하고, 모델에 복잡한 Business Logic을 추가하여 확장시킬 수 있도록 하였습니다.

자세한 내용은 [UPPERCASE-MODEL](UPPERCASE-MODEL.md) 문서를 참고하시기 바랍니다.

## UPPERCASE 기반 하이브리드 앱 개발에 필요한 BROWSER-PACK 제공
UPPERCASE는 하이브리드 앱 개발에 필요한 다양한 기능을 갖고 있는 패키지를 제공하고 있습니다.

자세한 내용은 [Apache Cordova와 Crosswalk를 이용한 하이브리드 앱 개발](CORDOVA.md) 문서를 참고하시기 바랍니다.

## 업로드 처리 기능
UPPERCASE를 사용하면 파일 업로드 기능을 쉽게 구현할 수 있습니다.

자세한 내용은 [UPPERCASE-UPLOAD](UPPERCASE-UPLOAD.md) 문서를 참고하시기 바랍니다.

## 각종 유틸리티 기능
UPPERCASE는 각종 유틸리티 기능들을 제공합니다.

자세한 내용은 [UJS](UJS.md) 문서와 [UPPERCASE-UTIL](UPPERCASE-UTIL.md) 문서를 참고하시기 바랍니다.

## 기본 스타일 제공
UPPERCASE는 웹 브라우저에 상관 없이 같은 모양이 출력되게 하는 기본 스타일을 제공합니다.

자세한 내용은 [기본 스타일](BASE_STYLE.md) 문서를 참고하시기 바랍니다.

## 문서
* [설치하기](DOC/INSTALL.md)
* [튜토리얼](DOC/TUTORIAL.md)
* [가이드](DOC/GUIDE.md)
* [API 문서](API/README.md)
* [릴리즈 노트](DOC/RELEASE.md)

## 클라이언트
UPPERCASE가 공식 지원하는 클라이언트 목록은 다음과 같습니다.
* 웹 브라우저 - UPPERCASE는 자체적으로 웹 브라우저용 클라이언트를 지원하고 있습니다. 테스트가 완료된 웹 브라우저의 종류는 다음과 같습니다.
	- Chrome PC 버전
	- Firefox
	- Edge
	- Safari Mac 버전
	- Chrome Android 버전
	- Safari iOS 버전
* Android - https://github.com/Hanul/Unicorn-Android
* iOS - https://github.com/Hanul/Unicorn-iOS

곧 지원할 예정인 클라이언트 목록은 다음과 같습니다.
* Unity
* Unreal
* Xamarin

비공식 클라이언트 목록은 다음과 같습니다.
* GameMaker: Studio - https://github.com/Hanul/UPPERCASE-GMS-Client

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