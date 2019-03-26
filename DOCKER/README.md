# UPPERCASE 도커 컨테이너

## 모든 도커 제거

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

### Window인 경우
```
for /F %c in ('docker ps -a -q') do (docker stop %c)
for /F %c in ('docker ps -a -q') do (docker rm %c)
```

## 도커 접속
```
docker ps
docker exec -it {컨테이너 ID} /bin/bash
```

## 도커 로그 확인
```
docker ps
docker logs {컨테이너 ID}
```