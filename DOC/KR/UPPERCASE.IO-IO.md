# UPPERCASE.IO-IO

## 리소스 경로 관련
클라이언트에서 사용 가능한 리소스 경로 관련 API입니다.
* `R(path)` `R(path, function(content) {...})` get resource's real path with version. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/R.js)
* `RF(path)` get final resource's real path. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/RF.js)

## IO
* `CONNECT_TO_IO_SERVER(function(on, off, send) {...})` `CONNECT_TO_IO_SERVER({error:, success:})` connect to UPPERCASE.IO server.
