# `METHOD` REMOVE_FOLDER
폴더를 삭제합니다.

폴더 내의 모든 파일 및 폴더를 삭제하므로, 주의해서 사용해야 합니다.

## Parameters
* `REQUIRED` *pathOrParams*
* `REQUIRED` *pathOrParams.path* 삭제할 폴더의 경로
* `OPTIONAL` *pathOrParams.isSync* true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*
