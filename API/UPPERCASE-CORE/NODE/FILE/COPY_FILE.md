# `METHOD` COPY_FILE
파일을 복사합니다.

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.from* 복사할 파일의 위치
* `REQUIRED` *params.to* 파일을 복사할 위치
* `OPTIONAL` *params.isSync* true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExistsHandler*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*
