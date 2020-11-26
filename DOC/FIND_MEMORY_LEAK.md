# 메모리 릭 찾는 방법
아래와 같이 애플리케이션을 실행합니다.
```
node --inspect app.js
```

애플리케이션에 `USR1` 신호를 보내줍니다.
```
kill -s USR1 {pid}
```

SSH를 통해 로컬 머신과 연결시킵니다.
```
ssh -L 9221:localhost:9229 user@remote.example.com
```

로컬 머신에서 Chrome DevTools(chrome://inspect)을 열어 localhost:9221에 접속합니다.

Memory 탭에서 메모리 스냅샷을 만든 후 분석합니다.
 