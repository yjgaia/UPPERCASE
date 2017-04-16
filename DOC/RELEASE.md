# UPPERCASE 릴리즈 노트
UPPERCASE의 최신 변경 사항을 다룹니다. 변경 사항을 확인하신 후 [UPPERCASE를 업데이트](INSTALL.md#업데이트) 해 주시기 바랍니다.

## 2.0.0-BETA (2016-?-?)
1.x에서 2.0.0으로 업데이트하면서 변경된 점은 다음과 같습니다.
- **ECMAScript 6**으로 모든 코드가 변경되었습니다.
- UJS의 모든 코드는 UPPERCASE-CORE에 흡수되었습니다.
- box.uppercase.io라는 BOX 저장소 및 UPPERCASE BOX Manager를 만들었습니다.
- CHECK_IS_ARGUMENTS 메소드가 제거되었습니다.
- 기존 VALID의 check는 checkAndWash로 변경되었으며, 빈 값을 임의로 삭제하지 않는 check 함수가 따로 추가되었습니다.
- VALID.id가 VALID.mongoId로 변경되었습니다.
- CHECK_IS_EXISTS_FILE는 CHECK_FILE_EXISTS로 이름이 변경되었습니다.
- RESOURCE_SERVER와 UPLOAD_REQUEST가 WEB_SERVER로 통합되었으며, onDisconnected 기능은 제거되었습니다.
- clientInfo.lastReceiveTime가 clientInfo.lastSendTime으로 변경되었습니다.
- 이벤트 처리 시 e.getKeyCode와 e.getKeyName 함수가 e.getKey로 통합되었습니다.
- RGBA 메소드가 제거되었습니다.
- LOAD, LOAD_CSS, READY 메소드가 제거되었습니다.
- 버전 정보가 저장되어 있는 V 파일이 VERSION 파일로 이름이 변경되었습니다.
- CPU_SHARED_DB, CPU_SHARED_STORE, SHARED_DB가 SHARED_STORE로 통합되었습니다.
- REDIS_STORE가 제거되었습니다.
- 큰 장점이 없는 DB 캐시 기능이 제거되었습니다.
- isUsingHTMLSnapshot, isMobileFullScreen 설정이 제거되었습니다.
- SHA1 알고리즘의 취약점이 발견되어 SHA1 메소드가 제거되었습니다.
- COOKIE_STORE가 제거되었습니다.
