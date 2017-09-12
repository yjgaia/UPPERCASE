# `METHOD` READ_FILE
파일의 내용을 불러옵니다.

내용을 Buffer형으로 불러오기 때문에, 내용을 문자열로 불러오려면 toString 메소드를 이용하시기 바랍니다.

## Parameters
* `REQUIRED` *pathOrParams*
* `REQUIRED` *pathOrParams.path* 불러올 파일의 경로
* `OPTIONAL` *pathOrParams.isSync* true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*
