## Build
```
docker build . --tag hanul/mongodb:0.1
```

## 운영 서버에서 실행
```
docker run -v /data/db:/data/db -p 27018:27018 -e MONGO_DB=TestDB -e MONGO_USERNAME=test -e MONGO_PASSWORD=test123 -e MONGO_ROOT_USERNAME=root -e MONGO_ROOT_PASSWORD=test123 --name mongodb hanul/mongodb:0.1
```

## 개발용 머신에서 실행
```
docker run -v ~/docker/data/db:/data/db -p 27018:27018 -e MONGO_DB=TestDB -e MONGO_USERNAME=test -e MONGO_PASSWORD=test123 -e MONGO_ROOT_USERNAME=root -e MONGO_ROOT_PASSWORD=test123 --name mongodb hanul/mongodb:0.1
```

## Windows 에서는
```
docker volume create --name=mongodb
docker run -v mongodb:/data/db -p 27018:27018 -e MONGO_DB=TestDB -e MONGO_USERNAME=test -e MONGO_PASSWORD=test123 -e MONGO_ROOT_USERNAME=root -e MONGO_ROOT_PASSWORD=test123 --name mongodb hanul/mongodb:0.1
```