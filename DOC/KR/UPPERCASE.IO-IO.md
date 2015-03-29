※ 이 문서는 작성중인 문서입니다.

`CONFIG.isUsingHTMLSnapshot` 검색엔진의 크롤러들이 Single Page 웹 애플리케이션을 방문할 때 HTML 스냅샷을 제공할 지 여부를 설정합니다. 이 기능을 사용하려면 [PhantomJS](http://phantomjs.org)가 서버에 설치되어 있어야 합니다.



###### 리소스 경로 관련
클라이언트에서 사용 가능한 리소스 경로 관련 API입니다.
* `R(path)` `R(path, function(content) {...})` get resource's real path with version. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/R.js)
* `RF(path)` get final resource's real path. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/BOOT/CLIENT/RF.js)


###### IO
* `CONNECT_TO_IO_SERVER(function(on, off, send) {...})` `CONNECT_TO_IO_SERVER({error:, success:})` connect to UPPERCASE.IO server.
