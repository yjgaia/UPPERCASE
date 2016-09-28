# 분산

## UPPERCASE의 분산 처리 전략
* 업로드 파일들을 분산 서버로 구성할 경우 CORS가 지원되지 않는 Internet Explorer 9 이하 버젼들과 같은 곳에서는 UJS의 GRAPHIC API들을 사용할 수 없습니다.

UPPERCASE의 분산 처리 전략을 설명합니다.
UPPERCASE 기반 프로젝트의 기능별 서버 파트는 다음과 같습니다.
1. `대문 서버` 유저들에게 웹 페이지나 분산 서버들의 정보를 제공하는 서버입니다.
2. `API 서버` 각종 기능들을 프로토콜의 제약 없이 JSON 양식으로 통신하는 서버들입니다.
3. `업로드 파일 서버` 프로젝트에서 업로드 된 파일들을 관리하는 서버들입니다.
4. `MongoDB 데이터베이스 서버` MongoDB를 기반으로 데이터베이스를 관리하는 서버들입니다.

MongoDB는 그 자체로 분산 서버 기능을 제공하기 때문에, 이 문서의 분산 처리 전략에서 MongoDB 서버는 제외합니다. 그렇다면 다음과 같이 세가지 경우의 수가 생깁니다.

1. L4 스위치를 이용해 물리적으로 서버가 분산되어 있을 경우
2. 특정 도메인 주소를 담당하는 `대문 서버`가 있고, 나머지 서버들이 분산하는 경우
3. `대문 서버`가 있고, 또한 `API 서버들`이 있으며 업로드 파일을 분산하여 저장하는 `업로드 파일 서버들`도 있는 경우

#### 1. L4 스위치를 이용해 물리적으로 서버가 분산되어 있을 경우
이 경우에는 각 서버들이 동등하게 분배되어 모든 일을 담당할 수 있습니다.

#### 2. 특정 도메인 주소를 담당하는 `대문 서버`가 있고, 나머지 서버들이 분산하는 경우
이 경우에는 대문 서버가 모든 유저들의 처음 접속을 맞이하므로, 웹 페이지나 분산 서버들의 정보를 가져오는 경우에만 대문 서버가 역할을 수행하고, API 또는 업로드 파일 제공 등의 기능들은 모두 다른 서버들로 분산하는 전략을 취할 수 있습니다.

#### 3. `대문 서버`가 있고, 또한 `API 서버들`이 있으며 업로드 파일을 분산하여 저장하는 `업로드 파일 서버들`도 있는 경우
이 경우 또한 마찬가지로 대문 서버가 모든 유저들의 처음 접속을 맞이하므로, 웹 페이지나 분산 서버들의 정보를 가져오는 경우를 제외한 기능들은 최대한 다른 서버들로 분산합니다. 하지만 API 서버들과 업로드 서버군 또한 나뉘어져 있기 때문에, 각각 기능에 맞추어 분산하는 전략을 취할 수 있습니다.

### 각 서버간 시간을 맞추어야 합니다.
리눅스일 경우 아래 명령어들로 서버 시간을 맞추어야 합니다.
```
mv /etc/localtime /etc/localtime_old
ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
rdate -p time.bora.net
rdate -s time.bora.net
```

## 몽고 DB 분산
우선 인증을 위한 키 파일을 생성합니다.
```
mkdir /srv/mongodb
openssl rand -base64 741 > /srv/mongodb/mongodb-shard-keyfile
chmod 600 /srv/mongodb/mongodb-shard-keyfile
```

몽고 DB 데몬을 원하는 수(CPU 개수 등) 만큼 생성합니다. 여기서 중요한 점은 `--shardsvr` 옵션을 붙혀야 한다는 것입니다. 또한 선택사항이었던 `--logpath`와 `--dbpath`도 반드시 붙혀야 합니다. 이 경우 `--dbpath`에 해당하는 폴더가 존재하여야만 데몬이 실행됩니다.
```
mkdir /data/shard_db1
mkdir /data/shard_db2
mkdir /data/shard_db3
mkdir /data/shard_db4
mkdir /data/shard_db5
mkdir /data/shard_db6
mkdir /data/shard_db7
mkdir /data/shard_db8
```
```
mongod --shardsvr --port 30001 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_db1.log --dbpath /data/shard_db1
mongod --shardsvr --port 30002 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_db2.log --dbpath /data/shard_db2
mongod --shardsvr --port 30003 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_db3.log --dbpath /data/shard_db3
mongod --shardsvr --port 30004 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_db4.log --dbpath /data/shard_db4
mongod --shardsvr --port 30005 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_db5.log --dbpath /data/shard_db5
mongod --shardsvr --port 30006 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_db6.log --dbpath /data/shard_db6
mongod --shardsvr --port 30007 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_db7.log --dbpath /data/shard_db7
mongod --shardsvr --port 30008 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_db8.log --dbpath /data/shard_db8
```

### configdb가 여러대일 경우
configdb가 여러대일 경우에는 다음과 같이 설정합니다.
데몬들을 관리하는 설정 데몬을 `--configsvr` 옵션을 붙혀 생성합니다.또한 선택사항이었던 `--logpath`와 `--dbpath`도 반드시 붙혀야 합니다. 이 경우 `--dbpath`에 해당하는 폴더가 존재하여야만 데몬이 실행됩니다.
```
mkdir /data/shard_config1
mkdir /data/shard_config2
mkdir /data/shard_config3
```
```
mongod --configsvr --replSet csReplSet --port 40001 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_config1.log --dbpath /data/shard_config1
mongod --configsvr --replSet csReplSet --port 40002 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_config2.log --dbpath /data/shard_config2
mongod --configsvr --replSet csReplSet --port 40003 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_config3.log --dbpath /data/shard_config3
```

```
mongo --port 40001
```

```
rs.initiate(
  {
    _id: "csReplSet",
    configsvr: true,
    members: [
      { _id : 0, host : "localhost:40001" },
      { _id : 1, host : "localhost:40002" },
      { _id : 2, host : "localhost:40003" }
    ]
  }
);
```

이제 `mongos`를 실행합니다. `--configdb` 옵션으로 위에서 생성한 설정 데몬을 가리킵니다. 11.22.33.44는 해당하는 ip로 변경해주시기 바랍니다.
```
mongos --port 27018 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_mongos.log --configdb csReplSet/11.22.33.44:40001,11.22.33.44:40002,11.22.33.44:40003
```
```
mongos --port 27018 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_mongos.log --configdb csReplSet/localhost:40001,localhost:40002,localhost:40003
```

이제 `mongos`에 접속합니다.
```
mongo --port 27018
```

`admin` 데이터베이스에 접속합니다.
```
use admin
```

우선 `root` 계정을 생성하고 로그인합니다.
```
db.createUser({ user : 'root 유저명', pwd : 'root 비밀번호', roles : ['root'] });
db.auth('root 유저명', 'root 비밀번호');
```

`shard` 할 데몬의 접속 경로를 지정합니다. replica set을 사용하였으므로 localhost 사용 불가
```
sh.addShard('11.22.33.44:30001');
sh.addShard('11.22.33.44:30002');
sh.addShard('11.22.33.44:30003');
sh.addShard('11.22.33.44:30004');
sh.addShard('11.22.33.44:30005');
sh.addShard('11.22.33.44:30006');
sh.addShard('11.22.33.44:30007');
sh.addShard('11.22.33.44:30008');
```

샤딩 할 데이터베이스를 지정합니다.
```
sh.enableSharding('{{데이터베이스 명}}');
```

샤딩 할 콜렉션들을 지정합니다.
```
sh.shardCollection('{{데이터베이스 명}}.{{콜렉션 명}}', {_id : 1});
sh.shardCollection('{{데이터베이스 명}}.{{콜렉션 명}}', {_id : 1});
sh.shardCollection('{{데이터베이스 명}}.{{콜렉션 명}}', {_id : 1});
...
```

데이터베이스의 유저를 추가합니다.
```
use {{데이터베이스 명}}
db.createUser({ user : '유저명', pwd : '비밀번호', roles : ['readWrite', 'dbAdmin'] });
```

기존 데이터베이스가 존재할 경우, 기존 데이터베이스를 백업하고 새로 생성된 데이터베이스에 복구합니다.
```
mongodump --port {{기존 데이터베이스의 포트}} --db {{데이터베이스 이름}} --username {{데이터베이스 접속 username}} --password {{데이터베이스 접속 password}}
```
```
mongorestore --port {{새 데이터베이스의 포트}} --db {{데이터베이스 이름}} --username {{데이터베이스 접속 username}} --password {{데이터베이스 접속 password}} dump/{{프로젝트 폴더 명}}
```

이제 모든 설정이 끝났습니다.

### 몽고 DB 서버를 재시작 하는 경우
`mongos`에 접속합니다.
```
mongo --port 27018
```

다음과 같이 데몬 서버를 종료합니다.
```
use admin
db.shutdownServer();
```

`mongos`에 접속합니다.
```
mongo --port 40001
mongo --port 40002
mongo --port 40003
```

다음과 같이 데몬 서버를 종료합니다.
```
use admin
db.shutdownServer();
```

이제 나머지 데몬들도 모두 종료합니다.
```
mongod --dbpath /data/shard_db1 --shutdown
mongod --dbpath /data/shard_db2 --shutdown
mongod --dbpath /data/shard_db3 --shutdown
mongod --dbpath /data/shard_db4 --shutdown
mongod --dbpath /data/shard_db5 --shutdown
mongod --dbpath /data/shard_db6 --shutdown
mongod --dbpath /data/shard_db7 --shutdown
mongod --dbpath /data/shard_db8 --shutdown
```


## Redis 분산
redis 폴더로 이동합니다.
```
cd redis-stable
```

CPU 개수만큼 폴더를 만듭니다.
```
mkdir 7001 7002 7003 7004 7005 7006 7007 7008
```

7001 폴더에 redis.conf 파일을 복사한 후 아래 내용들을 수정합니다. 특히, 여러 서버로 분산 처리 하는 경우에는 bind에 다른 서버의 ip 주소를 등록해야 합니다.
```
cp redis.conf 7001

vi 7001/redis.conf
...
```
```
daemonize yes
port 7001
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 15000
dir ./7001/
logfile "redis.log"
```

이 redis.conf 파일을 각 폴더에 복사한 후 port및 dir을 각 폴더명으로 변경합니다.
```
cp 7001/redis.conf 7002
cp 7001/redis.conf 7003
cp 7001/redis.conf 7004
cp 7001/redis.conf 7005
cp 7001/redis.conf 7006
cp 7001/redis.conf 7007
cp 7001/redis.conf 7008

vi 7002/redis.conf
...
```

이제 각 port의 Redis들을 시작합니다.
```
src/redis-server 7001/redis.conf
src/redis-server 7002/redis.conf
src/redis-server 7003/redis.conf
src/redis-server 7004/redis.conf
src/redis-server 7005/redis.conf
src/redis-server 7006/redis.conf
src/redis-server 7007/redis.conf
src/redis-server 7008/redis.conf
```

클러스터들을 설정하기 위해 redis-trib 유틸리티를 실행합니다. 참고로, 이 유틸리티는 루비로 작성되어 있어 실행하기 위해서는 루비와 rubygems, 루비용 redis 클라이언트가 설치되어 있어야 합니다.
```
sudo yum install ruby
sudo gem install redis
```
```
src/redis-trib.rb create 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006 127.0.0.1:7007 127.0.0.1:7008
```

중간에 아래와 같은 메시지가 뜨면 yes를 입력합니다.
```
Can I set the above configuration? (type 'yes' to accept): yes
```

모든 설정이 끝났습니다. Redis에 접속합니다.
```
src/redis-cli -c -p 7001
```

### Redis 서버 초기화
```
src/redis-cli -c -p 7001 flushall
src/redis-cli -c -p 7002 flushall
src/redis-cli -c -p 7003 flushall
src/redis-cli -c -p 7004 flushall
src/redis-cli -c -p 7005 flushall
src/redis-cli -c -p 7006 flushall
src/redis-cli -c -p 7007 flushall
src/redis-cli -c -p 7008 flushall
```

### Redis 서버를 재시작 하는 경우
모든 Redis 서버들을 종료합니다.
```
src/redis-cli -c -p 7001 shutdown
src/redis-cli -c -p 7002 shutdown
src/redis-cli -c -p 7003 shutdown
src/redis-cli -c -p 7004 shutdown
src/redis-cli -c -p 7005 shutdown
src/redis-cli -c -p 7006 shutdown
src/redis-cli -c -p 7007 shutdown
src/redis-cli -c -p 7008 shutdown
```

다시 모든 서버들을 실행합니다.
```
src/redis-server 7001/redis.conf
src/redis-server 7002/redis.conf
src/redis-server 7003/redis.conf
src/redis-server 7004/redis.conf
src/redis-server 7005/redis.conf
src/redis-server 7006/redis.conf
src/redis-server 7007/redis.conf
src/redis-server 7008/redis.conf
```

다시 Redis에 접속합니다.
```
src/redis-cli -c -p 7001
```
