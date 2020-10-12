# `METHOD` ENCRYPTION_REQUEST
암호화된 HTTP 요청을 보냅니다.

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.method* 요청 메소드. GET, POST, PUT, DELETE를 설정할 수 있습니다.
* `OPTIONAL` *params.isSecure* HTTPS 프로토콜인지 여부
* `OPTIONAL` *params.host*
* `OPTIONAL` *params.port*
* `OPTIONAL` *params.uri*
* `OPTIONAL` *params.url* 요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
* `OPTIONAL` *params.paramStr* a=1&b=2&c=3과 같은 형태의 파라미터 문자열
* `OPTIONAL` *params.params* 데이터 형태({...})로 표현한 파라미터 목록
* `OPTIONAL` *params.data* UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
* `OPTIONAL` *params.headers* 요청 헤더
* `OPTIONAL` *responseListenerOrListeners*
* `OPTIONAL` *responseListenerOrListeners.error*
* `OPTIONAL` *responseListenerOrListeners.success*
