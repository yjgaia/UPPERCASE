# `METHOD` WRITE_FILE
파일을 작성합니다.

파일이 없으면 파일을 생성하고, 파일이 이미 있으면 내용을 덮어씁니다.

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.path* 작성할 파일의 경로
* `OPTIONAL` *params.content* 파일에 작성할 내용 (문자열)
* `OPTIONAL` *params.buffer* 파일에 작성할 내용 (Buffer)
* `OPTIONAL` *params.isSync* true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*
