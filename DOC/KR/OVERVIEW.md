# UPPERCASE.IO가 제공하는 기능들 살펴보기
UPPERCASE.IO는 동적인 웹 애플리케이션을 개발하기 위해 필요한 다양한 기능들을 제공합니다.

## 여러가지 통신 프로토콜 서버 지원
TCP/UDP 소켓 서버 및 웹 서버, 리소스 서버를 제공하는 [UPPERCASE.JS 서버 구현체들](https://github.com/Hanul/UPPERCASE.JS/blob/master/DOC/KR/UPPERCASE.JS-NODE.md#각종-서버-구현체들)에 더하여, 웹 소켓 서버 및 웹 소켓을 지원하지 않는 브라우저에서도 웹 소켓과 같은 형태로 통신을 가능하게 해주는 서버 구현체를 포함하고 있습니다.

또한 TCP 소켓과 웹 소켓 프로토콜을 통합하여 제공하는 멀티 프로토콜 소켓 서버 구현체가 포함되어 있습니다.

자세한 내용은 [UPPERCASE.IO-TRANSPORT](UPPERCASE.IO-TRANSPORT.md) 문서를 참고하시기 바랍니다.

## 실시간 통신을 좀 더 쉽게 도와주는 룸 기능
서버에서 룸을 만들고, 특정 룸에 접속한 사람들에게만 메시지를 전달할 수 있습니다. 따라서 특징에 맞는 여러 룸을 만들어 각각에 접속한 유저들에게 필요한 메시지를 전달하는 프로젝트 구조를 설계할 수 있습니다.

자세한 내용은 [UPPERCASE.IO-ROOM](UPPERCASE.IO-ROOM.md) 문서를 참고하시기 바랍니다.

## 데이터베이스 관련 기능
MongoDB를 사용하기 쉽게 CRUD 기능을 구현한 모듈입니다.

자세한 내용은 [UPPERCASE.IO-DB](UPPERCASE.IO-DB.md) 문서를 참고하시기 바랍니다.

## Model-View 패턴에서의 Model 관련 기능
UPPERCASE.IO는 Model-View 패턴을 따릅니다. UPPERCASE.IO는 자체적으로 Model에 대한 여러가지 기능들을 제공하고, 모델에 복잡한 Business Logic을 추가하여 확장시킬 수 있도록 하였습니다.

자세한 내용은 [UPPERCASE.IO-MODEL](UPPERCASE.IO-MODEL.md) 문서를 참고하시기 바랍니다.

## UPPERCASE.IO 기반 하이브리드 앱 개발에 필요한 BROWSER-PACK 제공
UPPERCASE.IO는 하이브리드 앱 개발에 필요한 다양한 기능을 갖고 있는 패키지를 제공하고 있습니다.

자세한 내용은 [Apache Cordova와 Crosswalk를 이용한 하이브리드 앱 개발](CORDOVA.md) 문서를 참고하시기 바랍니다.

## 업로드 처리 기능
UPPERCASE.IO를 사용하면 파일 업로드 기능을 쉽게 구현할 수 있습니다.

자세한 내용은 [UPPERCASE.IO-UPLOAD](UPPERCASE.IO-UPLOAD.md) 문서를 참고하시기 바랍니다.

## 각종 유틸리티 기능
UPPERCASE.IO는 각종 유틸리티 기능들을 제공합니다.

자세한 내용은 [UPPERCASE.JS](UPPERCASE.JS.md) 문서와 [UPPERCASE.IO-UTIL](UPPERCASE.IO-UTIL.md) 문서를 참고하시기 바랍니다.

## 기본 스타일 제공
UPPERCASE.IO는 웹 브라우저에 상관 없이 같은 모양이 출력되게 하는 기본 스타일을 제공합니다.

자세한 내용은 [기본 스타일](BASE_STYLE.md) 문서를 참고하시기 바랍니다.

다음 문서: [Configuration](CONFIG.md)