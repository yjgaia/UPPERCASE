# `CLASS` WEB_SERVER
웹 서버를 생성하는 클래스

## Parameters
* `REQUIRED` *portOrParams*
* `OPTIONAL` *portOrParams.port* HTTP 서버 포트
* `OPTIONAL` *portOrParams.securedPort* HTTPS 서버 포트
* `OPTIONAL` *portOrParams.securedKeyFilePath* SSL인증 .key 파일 경로
* `OPTIONAL` *portOrParams.securedCertFilePath* SSL인증 .cert 파일 경로
* `OPTIONAL` *portOrParams.rootPath* 리소스 루트 폴더
* `OPTIONAL` *portOrParams.version* 캐싱을 위한 버전. 입력하지 않으면 캐싱 기능이 작동하지 않습니다.
* `OPTIONAL` *portOrParams.preprocessors* 프리프로세서들. 뷰 템플릿 등과 같이, 특정 확장자의 리소스를 응답하기 전에 내용을 변경하는 경우 사용합니다.
* `OPTIONAL` *portOrParams.uploadURI* 업로드를 처리할 URI. URI 문자열 혹은 URI 문자열 배열로 입력합니다.
* `OPTIONAL` *portOrParams.uploadPath* 업로드한 파일을 저장할 경로
* `OPTIONAL` *portOrParams.maxUploadFileMB* 최대 업로드 파일 크기 (MB). 입력하지 않으면 10MB로 지정됩니다.
* `OPTIONAL` *portOrParams.isToNotUseResourceCache* true로 설정하면 리소스 캐시를 사용하지 않습니다.
* `OPTIONAL` *requestListenerOrHandlers*
* `OPTIONAL` *requestListenerOrHandlers.notExistsResource* 리소스가 존재하지 않는 경우
* `OPTIONAL` *requestListenerOrHandlers.error* 오류가 발생한 경우
* `OPTIONAL` *requestListenerOrHandlers.requestListener* 요청 리스너
* `OPTIONAL` *requestListenerOrHandlers.uploadProgress* 업로드 진행중
* `OPTIONAL` *requestListenerOrHandlers.uploadOverFileSize* 업로드 하는 파일의 크기가 maxUploadFileMB보다 클 경우
* `OPTIONAL` *requestListenerOrHandlers.uploadSuccess* 업로드가 정상적으로 완료된 경우

## Static Members

### `getContentTypeFromExtension(extension)`

### `getEncodingFromContentType(contentType)`

### `parseCookieStr(cookieStr)`

## Public Members

### `getNativeServer()`

### `addPreprocessor(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.extension*
* `REQUIRED` *params.preprocessor*
