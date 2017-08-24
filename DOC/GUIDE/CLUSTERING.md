작성중

# 분산 처리
UPPERCASE에는 [CPU 클러스터링](#CPU-클러스터링)과 [서버 클러스터링](#서버-클러스터링)을 통한 분산 처리를 지원하고 있습니다. 이를 통해 멀티코어 CPU 환경 및 분산 서버 환경에서 프로젝트를 쉽게 분산하여 구동시킬 수 있습니다.

## 목차
* CPU 클러스터링
* 서버 클러스터링
* 프로세스간 데이터 공유
* UPPERCASE를 이용한 분산 서버 설계 전략
* 분산 서버간 시간 맞추기
* MongoDB 분산 서버 설정

## CPU 클러스터링
기본적으로 Node.js 환경은 멀티코어 CPU를 지원하지 않습니다.
UPPERCASE에서는 [`CPU_CLUSTERING`](UPPERCASE-CORE-NODE.md#cpu_clusteringwork)을 통해 멀티코어 CPU 각각에 프로세스를 실행시키는 방법으로 멀티코어 CPU를 지원하고 있습니다. 자식 프로세스들을 다루는 마스터 프로세스를 포함하여 CPU 개수만큼 프로세스가 실행됩니다. (자식 프로세스는 `CPU 개수 - 1`개만큼 실행됩니다.)

```javascript
CPU_CLUSTERING(() => {

	console.log('현재 프로세스의 워커 아이디: ', CPU_CLUSTERING.getWorkerId());

    // 다른 프로세스로부터 데이터를 수신받음
	CPU_CLUSTERING.on('receive', (data) => {
		...
	});

    // 1번 프로세스에서만 동작
	if (CPU_CLUSTERING.getWorkerId() === 1) {

        // 모든 프로세스에 데이터 송신
		CPU_CLUSTERING.broadcast({
			methodName : 'receive',
			data : {
				msg : 'Hey!'
			}
		});
	}
});
```

## 서버 클러스터링
UPPERCASE를 이용하면 CPU간 클러스터링을 넘어, 다른 하드웨어(서버) 간 클러스터링이 가능합니다.
UPPERCASE에서는 [`SERVER_CLUSTERING`](UPPERCASE-CORE-NODE.md#server_clusteringhosts-thisservername-port-work)을 통해 분산 서버 각각에 프로세스를 실행시키는 방법으로 서버 클러스터링을 지원하고 있습니다.
다음은 두 서버 간 분산 처리를 하는 예시입니다.

```javascript
SERVER_CLUSTERING({

    // 연동할 서버들의 호스트 정보
	hosts : {
		serverA : '12.34.56.78',
		serverB : '12.34.56.89'
	},
	
	// 현재 서버는 A 서버 입니다. B 서버에서는 'serverB'로 설정합니다.
	thisServerName : 'serverA',
	
	// 프로세스간 통신을 위한 포트 번호 지정
	port : 8125
	
}, () => {

	console.log('현재 서버의 이름: ', SERVER_CLUSTERING.getThisServerName());

    // 다른 서버로부터 데이터를 수신받음
	SERVER_CLUSTERING.on('receive', (data) => {
		...
	});

    // serverA 서버에서만 동작
    if (SERVER_CLUSTERING.getThisServerName() === 'serverA') {

        // 모든 분산 서버에 데이터 송신
		SERVER_CLUSTERING.broadcast({
			methodName : 'receive',
			data : {
				msg : 'Hey!'
			}
		});
	}
});
```

UPPERCASE에서 제안하는 분산 서버 설계 전략에 대해서는 대해서는 하단의 [UPPERCASE를 이용한 분산 서버 설계 전략](#UPPERCASE를-이용한-분산-서버-설계-전략)을 살펴보시기 바랍니다.

## 프로세스간 데이터 공유
프로세스들은 각자 고유한 메모리 영역을 가지며, 공유 메모리 영역은 존재하지 않습니다. 따라서 프로세스들은 [메시지 전달 방식](https://en.wikipedia.org/wiki/Message_passing)을 통해 데이터를 공유해야 합니다. 이러한 과정을 추상화 하여 마치 공유되는 저장소가 존재하는 것처럼 구현한 것이 UPPERCASE에서 제공하는 `SHARED_STORE` 입니다.

[CPU 클러스터링](#CPU-클러스터링)에도 사용할 수 있고, [서버 클러스터링](#서버-클러스터링)에도 사용할 수 있으며 둘 다 사용하는 경우에도 같은 방식으로 사용할 수 있습니다.

```javascript
let sharedStore = SHARED_STORE('sharedStore');

sharedStore.save({
	id : '1234',
	data : {
		msg : 'Hello World!',
		age : 12
	}
});
```

자세한 사용법은 [`SHARED_STORE` 문서](UPPERCASE-CORE-NODE.md#shared_storestorename)를 참고하시기 바랍니다.






## UPPERCASE를 이용한 분산 서버 설계 전략

### 서버의 종류
UPPERCASE 기반 프로젝트의 기능별 서버 종류들은 다음과 같습니다.
1. `대문 서버` : 유저들에게 [`index.html`](UPPERCASE-BOOT.md#indexhtml-%EC%88%98%EC%A0%95%ED%95%98%EA%B8%B0)과 분산 서버들의 정보를 제공하는 서버입니다.
2. `통신 서버` : 각종 기능들을 프로토콜의 제약 없이 JSON 양식으로 통신하는 서버들입니다.
3. `업로드 파일 서버` : 프로젝트에서 업로드 된 파일들을 관리하는 서버들입니다.
4. `MongoDB 데이터베이스 서버` : MongoDB를 기반으로 데이터베이스를 관리하는 서버들입니다.

MongoDB는 그 자체로 분산 서버 기능을 제공하기 때문에, 분산 처리 전략에서는 MongoDB에 대한 부분은 제외합니다. (MongoDB의 분산 처리에 대해서는 이하 [MongoDB의 분산 처리](#MongoDB의-분산-처리) 항목을 살펴보시기 바랍니다.) 그렇다면 다음과 같이 세가지 경우의 수가 생깁니다.

1. L4 스위치를 이용해 물리적으로 서버가 분산되어 있을 경우
2. 특정 도메인 주소를 담당하는 `대문 서버`가 있고, 나머지 서버들이 분산해 있는 경우
3. `대문 서버`가 있고, 또한 `API 서버들`이 있으며 업로드 파일을 분산하여 저장하는 `업로드 파일 서버들`도 있는 경우

### L4 스위치를 이용해 물리적으로 서버가 분산되어 있을 경우
이 경우에는 각 서버들이 동등하게 분배되어 모든 일을 담당할 수 있습니다.

### 특정 도메인 주소를 담당하는 `대문 서버`가 있고, 나머지 서버들이 분산해 있는 경우
이 경우에는 대문 서버가 모든 유저들의 처음 접속을 맞이하므로, 웹 페이지나 분산 서버들의 정보를 가져오는 경우에만 대문 서버가 역할을 수행하고, API 또는 업로드 파일 제공 등의 기능들은 모두 다른 서버들로 분산하는 전략을 취할 수 있습니다.

### `대문 서버`가 있고, 또한 `API 서버들`이 있으며 업로드 파일을 분산하여 저장하는 `업로드 파일 서버들`도 있는 경우
이 경우 또한 마찬가지로 대문 서버가 모든 유저들의 처음 접속을 맞이하므로, 웹 페이지나 분산 서버들의 정보를 가져오는 경우를 제외한 기능들은 최대한 다른 서버들로 분산합니다. 하지만 API 서버들과 업로드 서버군 또한 나뉘어져 있기 때문에, 각각 기능에 맞추어 분산하는 전략을 취할 수 있습니다.







## 분산 서버간 시간 맞추기
분산 서버끼리 설정된 시간이 다르면, 데이터를 처리하는데 있어 문제가 발생할 수 있습니다. 따라서 분산 서버간 운영체제의 시간을 통일시키는 것이 좋습니다. 아래 명령어는 리눅스 환경에서 운영체제의 시간을 서울 표준시로 맞춥니다. 분산된 모든 서버에서 실행하여 시간을 통일시켜 주시기 바랍니다.
```
mv /etc/localtime /etc/localtime_old
ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
rdate -p time.bora.net
rdate -s time.bora.net
```





## MongoDB 분산 서버 설정
*아래 설명은 독자가 리눅스 환경을 사용하며, `root` 유저로 로그인 한 상태라고 가정하여 설명합니다. `root` 유저가 아니거나 [AWS](https://aws.amazon.com)와 같은 클라우드 서버를 사용하는 경우에는 모든 명령어 앞에 `sudo`를 붙혀주시기 바랍니다.*

### 1. 키 파일 생성
인증을 위한 키 파일을 생성합니다. ***이 키는 모든 분산 서버에 동일하게 복사되어야 합니다.***
```
mkdir /srv/mongodb
openssl rand -base64 741 > /srv/mongodb/mongodb-shard-keyfile
chmod 600 /srv/mongodb/mongodb-shard-keyfile
```

### 2. 몽고 DB 데몬 생성
몽고 DB 데몬을 원하는 수(CPU 개수 등) 만큼 생성합니다. 여기서 중요한 점은 `--shardsvr` 옵션을 붙혀야 한다는 것입니다. 또한 선택사항이었던 `--logpath`와 `--dbpath`도 반드시 붙혀야 합니다. 이 경우 `--dbpath`에 해당하는 폴더가 존재하여야만 데몬이 실행됩니다.
```
mkdir /data
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

### 설정 DB 데몬 생성
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

아래 설정은 모든 공유된 서버끼리 공유하는 것이므로, localhost가 아닌 IP를 반드시 지정해주시기 바랍니다.
```
rs.initiate(
  {
    _id: "csReplSet",
    configsvr: true,
    members: [
      { _id : 0, host : "11.22.33.44:40001" },
      { _id : 1, host : "11.22.33.44:40002" },
      { _id : 2, host : "11.22.33.44:40003" }
    ]
  }
);
```

### `mongos` 실행
이제 `mongos`를 실행합니다. `--configdb` 옵션으로 위에서 생성한 설정 데몬을 가리킵니다. 11.22.33.44는 해당하는 ip로 변경해주시기 바랍니다.
```
mongos --port 27018 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_mongos.log --configdb csReplSet/11.22.33.44:40001,11.22.33.44:40002,11.22.33.44:40003
```

모든 config db가 localhost인 경우
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
db.createUser({ user : '{{root 유저명}}', pwd : '{{root 비밀번호}}', roles : ['root'] });
db.auth('{{root 유저명}}', '{{root 비밀번호}}');
```

`shard` 할 데몬의 접속 경로를 지정합니다. 11.22.33.44는 서버의 IP로 변경합니다.
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
db.createUser({ user : '{{유저명}}', pwd : '{{비밀번호}}', roles : ['readWrite', 'dbAdmin'] });
```

기존 데이터베이스가 존재할 경우, 기존 데이터베이스를 백업하고 새로 생성된 데이터베이스에 복구합니다.
```
mongodump --port {{기존 데이터베이스의 포트}} --db {{데이터베이스 이름}} --username {{데이터베이스 접속 username}} --password {{데이터베이스 접속 password}}
```
```
mongorestore --port {{새 데이터베이스의 포트}} --db {{데이터베이스 이름}} --username {{데이터베이스 접속 username}} --password {{데이터베이스 접속 password}} dump/{{프로젝트 BOX 명}}
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
db.auth('{{root 유저명}}', '{{root 비밀번호}}');
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
db.auth('{{root 유저명}}', '{{root 비밀번호}}');
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
