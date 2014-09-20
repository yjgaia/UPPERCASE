VERSIONS
========
1.4.2 (2014. 9. 21)
- UPPERCASE.JS 1.4.12 반영
- 버그 개선
- BOX 내부의 NODE.js COMMON.js BROWSER.js 등도 각각 가져올 수 있도록 기능 추가 
- 버젼 정보를 V 파일에 자동으로 생성
- 기존 DB 백업 시스템을 제거하고, __HISTORY를 만들어 1개의 데이터에 대해 시간별로 저장
- DB: isIncludeRemoved로 삭제된 데이터를 가져오는 설정 추가
- 라이브러리용 박스는 프로젝트 폴더/BOX에 넣어도 작동
- PACK.js 추가
- MODEL update와 remove 시 authKey 인증 기능 추가 clientInfo.authKey와 비교
- MODEL 설정 변경
- ROOM 서버 재접속 처리

1.4.1 (2014. 7. 31)
- 나뉘어져 있던 포트들을 하나로 공유
- 동시에 요청을 보냈을 경우 나중 요청이 처리되지 않던 버그 개선
- UPPERCASE.JS 1.4.10 반영

1.4 (2014. 7. 29)
- MIT License로 변경

1.3 (2014. 4. 17)

1.2 (2014. 1)

1.1 (2013. 8)

1.0 (2013. 3)
- BTNcafe의 가상현실 SNS인 Bigtown의 소스코드로부터 Full-stack Framework 부분이 분리됨
