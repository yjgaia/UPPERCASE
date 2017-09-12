# `METHOD` CHECK_FILE_EXISTS
지정된 경로에 파일이나 폴더가 존재하는지 확인합니다.

## Parameters
* `REQUIRED` *pathOrParams*
* `REQUIRED` *pathOrParams.path* 확인할 경로
* `OPTIONAL` *pathOrParams.isSync* true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
* `OPTIONAL` *callback*
