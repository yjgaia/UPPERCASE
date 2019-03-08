

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