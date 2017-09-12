# `METHOD` GET_FILE_INFO
파일의 정보를 불러옵니다.

파일의 크기(size), 생성 시간(createTime), 최종 수정 시간(lastUpdateTime)을 불러옵니다.

## Parameters
* `REQUIRED` *pathOrParams*
* `REQUIRED` *pathOrParams.path* 불러올 파일의 경로
* `OPTIONAL` *pathOrParams.isSync* true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*
