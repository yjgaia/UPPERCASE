# UPPERCASE 변경 내역

### 1.4 -> 1.5
* 기존 모델의 beforeListener 구조가 `function(data, ret, next, clientInfo)` 에서 `function(data, next, ret, clientInfo)`로 변경 (자주 쓰는 순서대로 변경)
* MODEL에서 update와 remove 시 originData를 사용할 수 있도록 변경
* DB에서 __IS_ENABLED 기능 제거, 데이터 삭제시 실제 MongoDB 서버에서도 삭제
* CoffeeScript 지원 제거
