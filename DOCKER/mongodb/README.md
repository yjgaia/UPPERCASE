## Build
```
docker build . --tag hanul/mongodb:latest
```

## 운영 서버에서 실행
```
docker run -d -v /data/db:/data/db -p 27018:27018 -e MONGO_DB={DB 이름} -e MONGO_USERNAME={유저 명} -e MONGO_PASSWORD={비밀번호} -e MONGO_ROOT_USERNAME=root -e MONGO_ROOT_PASSWORD={비밀번호} --name mongodb hanul/mongodb:latest
```

## 개발용 머신에서 실행
```
docker run -d -v ~/docker/data/db:/data/db -p 27018:27018 -e MONGO_DB=TestDB -e MONGO_USERNAME=test -e MONGO_PASSWORD=test123 -e MONGO_ROOT_USERNAME=root -e MONGO_ROOT_PASSWORD=test123 --name mongodb hanul/mongodb:latest
```

## Windows 에서는
```
docker volume create --name=mongodb
docker run -v mongodb:/data/db -p 27018:27018 -e MONGO_DB=TestDB -e MONGO_USERNAME=test -e MONGO_PASSWORD=test123 -e MONGO_ROOT_USERNAME=root -e MONGO_ROOT_PASSWORD=test123 --name mongodb hanul/mongodb:latest
```