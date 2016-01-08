# UPPERCASE
이 문서는 UPPERCASE의 API 관련 내용을 담고 있습니다. UPPERCASE 기반 프로젝트를 개발하기 위해서는 다음 문서들을 참고하시기 바랍니다.

* [UPPERCASE 설치하기](INSTALL.md)
* [프로젝트 생성](CREATE_PROJECT.md)
* [모델 생성](CREATE_MODEL.md)
* [간단한 블로그 만들기](MAKE_BLOG.md)
* [블로그에 인증 추가하기](ADD_AUTH_TO_BLOG.md)
* [UPPERCASE가 제공하는 기능들 살펴보기](OVERVIEW.md)
* [Configuration](CONFIG.md)
* [UPPERCASE 업데이트](UPDATE.md)

## 설정
UPPERCASE의 설정은 [Configuration](CONFIG.md) 문서를 참고해 주시기 바랍니다.

## BROWSER API
* `CONNECT_TO_IO_SERVER(function(on, off, send) {...})` `CONNECT_TO_IO_SERVER({error:, success:})` UPPERCASE 서버에 접속합니다.

### 리소스 경로 관련
클라이언트에서 사용 가능한 리소스 경로 관련 API입니다.
* `SampleBox.R(path)` `SampleBox.R(path, function(content) {...})` 리소스의 실제 경로를 반환하거나, 리소스의 내용을 가져옵니다. [예제보기](../EXAMPLES/IO/CLIENT/R.js)
* `SampleBox.RF(path)` 불변 리소스의 실제 경로를 반환합니다. [예제보기](../EXAMPLES/IO/CLIENT/RF.js)

### 서버 시간 관련
클라이언트와 서버 시간을 동기화하기 위한 API 입니다.
* `TIME(date)` 브라우저와 서버 시간의 차이를 계산하여, 데이터베이스에 저장되어 있던 시간을 브라우저의 국가 설정에 맞는 시간대로 변경합니다. [예제보기](../EXAMPLES/IO/CLIENT/TIME.js)
* `SERVER_TIME(date)` `TIME`과 반대 역할을 합니다. 변경된 시간을 서버의 시간대로 변경합니다. [예제보기](../EXAMPLES/IO/CLIENT/SERVER_TIME.js)
