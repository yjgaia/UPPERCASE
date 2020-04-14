# 분산 처리
UPPERCASE에는 [CPU 클러스터링](#CPU-클러스터링)과 [서버 클러스터링](#서버-클러스터링)을 통한 분산 처리를 지원하고 있습니다. 이를 통해 멀티코어 CPU 환경 및 분산 서버 환경에서 프로젝트를 쉽게 구동시킬 수 있습니다.

## 목차
* [CPU 클러스터링](#cpu-클러스터링)
* [서버 클러스터링](#서버-클러스터링)
* [프로세스간 데이터 공유](#프로세스간-데이터-공유)
* [UPPERCASE를 이용한 분산 서버 설계 전략](#uppercase를-이용한-분산-서버-설계-전략)
* [분산 서버간 시간 맞추기](#분산-서버간-시간-맞추기)
* [MongoDB 분산 서버 설정](#mongodb-분산-서버-설정)

## CPU 클러스터링
기본적으로는 Node.js 환경에서 멀티코어 환경을 지원하지 않습니다. UPPERCASE에서는 [`CPU_CLUSTERING 기능`](UPPERCASE-CORE-NODE.md#cpu_clusteringwork)을 통해, CPU 코어 각각에 프로세스를 실행시키는 방법으로 멀티코어 환경을 지원하고 있습니다. 자식 프로세스들을 관리하는 마스터 프로세스를 포함하여 CPU 개수만큼 프로세스가 실행됩니다. (따라서 자식 프로세스는 `CPU 개수 - 1`개만큼 실행됩니다.)

```javascript
CPU_CLUSTERING(() => {

	console.log('현재 프로세스의 워커 아이디: ', CPU_CLUSTERING.getWorkerId());

	// 다른 프로세스로부터 데이터를 수신받음
	CPU_CLUSTERING.on('receive', (data) => {
		...
	});

	// 1번 프로세스에서만 동작하도록
	if (CPU_CLUSTERING.getWorkerId() === 1) {

		// 현재 프로세스를 제외한 모든 프로세스에 데이터 송신
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
UPPERCASE를 이용하면 CPU간 클러스터링을 넘어, 다른 하드웨어(서버) 간 클러스터링이 가능합니다. UPPERCASE에서는 [`SERVER_CLUSTERING 기능`](UPPERCASE-CORE-NODE.md#server_clusteringhosts-thisservername-port-work)을 통해 분산된 서버에서 각각 프로세스를 실행시키는 방법으로 서버 클러스터링을 지원하고 있습니다.

다음은 두 서버 간 클러스터링 예시입니다.

```javascript
SERVER_CLUSTERING({

	// 연동할 서버들의 호스트 정보
	hosts : {
		serverA : '12.34.56.78',
		serverB : '12.34.56.89'
	},
	
	// 현재 서버는 A 서버 입니다. B 서버에서는 'serverB'로 설정합니다.
	thisServerName : 'serverA',
	
	// 클러스터링 목적으로 프로세스간 통신을 위한 포트 번호 지정
	port : 8125
	
}, () => {

	console.log('현재 서버의 이름: ', SERVER_CLUSTERING.getThisServerName());

	// 다른 서버로부터 데이터를 수신받음
	SERVER_CLUSTERING.on('receive', (data) => {
		...
	});

	// serverA 서버에서만 동작하도록
	if (SERVER_CLUSTERING.getThisServerName() === 'serverA') {

		// 현재 서버를 제외한 모든 분산 서버에 데이터 송신
		SERVER_CLUSTERING.broadcast({
			methodName : 'receive',
			data : {
				msg : 'Hey!'
			}
		});
	}
});
```

UPPERCASE를 이용한 다양한 분산 서버 설계 전략을 아래 [분산 서버 설계 전략 항목](#uppercase를-이용한-분산-서버-설계-전략)에서 다루고 있습니다.

## 프로세스간 데이터 공유
Node.js 프로세스들은 각자 고유한 메모리 영역을 가지며, 공유 메모리 영역은 존재하지 않습니다. 따라서 프로세스들은 [메시지 전달 방식](https://en.wikipedia.org/wiki/Message_passing)을 통해 데이터를 공유해야 합니다. 이러한 과정을 추상화하여, 마치 공유 저장소가 존재하는 것처럼 구현한 것이 UPPERCASE에서 제공하는 [`SHARED_STORE` 기능](UPPERCASE-CORE-NODE.md#shared_storestorename)입니다.

[CPU 클러스터링](#CPU-클러스터링)에도 사용할 수 있고 [서버 클러스터링](#서버-클러스터링)에도 사용할 수 있으며, 둘 다 사용하는 경우에도 같은 방식으로 사용할 수 있습니다.

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
UPPERCASE를 이용하여 분산 서버에 대응하는 다양한 설계 전략들에 대해 살펴보겠습니다.

### 서버의 종류
UPPERCASE 기반 프로젝트에서 기능별로 서버 종류를 나누어보면 다음과 같습니다.
1. **대문 서버** : 유저들에게 [`index.html` 파일](UPPERCASE-BOOT.md#indexhtml-수정하기)과 분산 서버들의 정보를 제공하는 서버입니다.
2. **애플리케이션 서버** : 프로젝트를 구성하는 각종 기능들과 로직이 포함되어 있는 서버입니다.
3. **업로드 서버** : 업로드 기능 및 업로드 파일들을 제공하는 서버입니다.
4. **MongoDB 데이터베이스 서버** : 데이터를 저장하기 위해 MongoDB 데이터베이스가 구동되고 있는 서버입니다.

MongoDB는 그 자체로 분산 서버 기능을 제공하기 때문에, 이 항목에서는 MongoDB에 대한 부분은 제외하겠습니다. MongoDB 서버의 분산 처리에 대해서는 하단의 [MongoDB 분산 서버 설정 항목](#mongodb-분산-서버-설정)을 살펴보시기 바랍니다.

그럼 다음과 같은 세가지 상황에서의 설계 전략을 각각 살펴보겠습니다.

1. L4 스위치를 이용해 물리적으로 서버가 분산되어 있는 경우
2. 도메인 주소가 연결되어 있는 **대문 서버**가 있고, 나머지 서버들이 분산되어 있는 경우
3. 1, 2번에 더해, 업로드 파일을 분산하여 저장하는 **업로드 서버**들이 따로 있는 경우

### L4 스위치를 이용해 물리적으로 서버가 분산되어 있는 경우
![L4 스위치](https://raw.githubusercontent.com/Hanul/UPPERCASE/master/DOC/GUIDE/CLUSTERING/L4.png)

이 경우에는 L4 스위치에 의해 트래픽이 각 서버들에게 동등하게 분배됩니다. 이 경우에는 각 애플리케이션 서버에 [분산 서버 설정](CONFIGURATION.md#분산-서버-설정) 중 `clusteringPort`, `clusteringServerHosts`, `thisServerName`를 설정하면 분산 서버 구성이 완료됩니다.

### 도메인 주소가 연결되어 있는 **대문 서버**가 있고, 나머지 서버들이 분산되어 있는 경우
![대문 서버](https://raw.githubusercontent.com/Hanul/UPPERCASE/master/DOC/GUIDE/CLUSTERING/door.png)

이 경우에는 대문 서버가 모든 유저들의 처음 접속을 맞이하며, [`index.html` 파일](UPPERCASE-BOOT.md#indexhtml-수정하기) 제공과 분산 서버들의 정보를 가져오는 데만 역할을 수행하고 기타 기능들은 모두 다른 서버들에 분산하게 됩니다. 따라서 대문 서버가 L4 스위치의 역할 또한 수행한다고 할 수 있습니다.

대문 서버에는 [분산 서버 설정](CONFIGURATION.md#분산-서버-설정) 중 `socketServerHosts`, `webServerHosts`를 설정하고, 각 애플리케이션 서버에는 `clusteringPort`, `clusteringServerHosts`, `thisServerName`를 설정하여 분산 서버 구성을 완료합니다.

### 업로드 파일을 분산하여 저장하는 **업로드 서버**들이 따로 있는 경우
![업로드 서버](https://raw.githubusercontent.com/Hanul/UPPERCASE/master/DOC/GUIDE/CLUSTERING/upload.png)

위 두 가지 경우에 더해, 업로드 기능만을 처리하는 서버를 따로 구성할 수도 있습니다. 업로드 서버들을 따로 구성하게 되면, 업로드 기능의 분리 외에도 업로드 된 파일들을 제공하는 역할을 분리할 수 있어, 파일 다운로드에서 발생하는 트래픽을 적당히 분산할 수 있습니다.

이 경우에는 애플리케이션 서버에 `uploadServerHosts`를 추가로 설정합니다.

## 분산 서버간 시간 맞추기
분산 서버끼리 설정된 시간이 다르면 분산된 데이터를 처리하는데 있어 시간의 차이로 인해 문제가 발생할 수 있습니다. 따라서 분산 서버간 운영체제의 시간을 통일시키는 것이 좋습니다. 아래 명령어는 리눅스 환경에서 운영체제의 시간을 서울 표준시로 맞추는 예시입니다.
```
mv /etc/localtime /etc/localtime_old
ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
rdate -p time.bora.net
rdate -s time.bora.net
```

## MongoDB 분산 서버 설정
*아래 설명은 리눅스 환경을 사용하며, `root` 유저로 로그인 한 상태를 가정하여 설명합니다. `root` 유저가 아니거나 [AWS](https://aws.amazon.com)와 같은 클라우드 서버를 사용하는 경우에는 모든 명령어 앞에 `sudo`를 붙혀주시기 바랍니다.*

### 1. 서버 설정
MongoDB 분산 서버를 세팅하기 전에 [최대로 동시에 열 수 있는 파일 개수 조절](DEPLOY.md#최대로-동시에-열-수-있는-파일-개수-조절) 및 [서버 시간 설정](DEPLOY.md#서버-시간-설정)이 되어있는지 확인합니다.

### 2. 키 파일 생성
인증을 위한 키 파일을 생성합니다. ***이 키는 모든 MongoDB 서버에 동일하게 복사되어야 합니다.***
```
mkdir /srv/mongodb
openssl rand -base64 741 > /srv/mongodb/mongodb-shard-keyfile
chmod 600 /srv/mongodb/mongodb-shard-keyfile
```

### 3. MongoDB 데몬 생성
MongoDB 데몬을 각 서버에 CPU 코어 수 만큼 생성합니다.

우선, 데이터를 저장할 폴더들을 생성합니다.
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

분산 프로세스를 구성하기 위해 `--shardsvr` 옵션을 붙혀 MongoDB 데몬을 실행합니다. 또한 `--logpath`와 `--dbpath`도 반드시 설정해야 합니다. `--dbpath`에는 조금 전에 만들었던 폴더를 지정합니다.
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

### 4. 설정 데이터베이스 데몬 생성
위에서 생성한 MongoDB 데몬들을 관리하는 설정 데이터베이스 데몬을 생성합니다.

우선, 설정 데이터를 저장할 폴더들을 생성합니다.
```
mkdir /data/shard_config1
mkdir /data/shard_config2
mkdir /data/shard_config3
```

설정 데이터베이스 데몬을 `--configsvr` 옵션을 붙혀 생성합니다. 설정 데이터베이스 데몬을 또한 `--logpath`와 `--dbpath`도 반드시 설정해야 합니다.
```
mongod --configsvr --replSet csReplSet --port 40001 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_config1.log --dbpath /data/shard_config1
mongod --configsvr --replSet csReplSet --port 40002 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_config2.log --dbpath /data/shard_config2
mongod --configsvr --replSet csReplSet --port 40003 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_config3.log --dbpath /data/shard_config3
```

이제 설정 데이터베이스 중 하나에 접속하여, 세 설정 데이터베이스를 연동합니다.
```
mongo --port 40001
```

아래와 같은 명령어를 입력하여 [`Replica Set`](https://docs.mongodb.com/manual/replication/)을 시작합니다.
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

완료되면, 접속을 종료합니다.
```
exit
```

### 5. `mongos` 실행
이제 분산된 MongoDB 서버들을 종합적으로 관리하는 `mongos`를 실행합니다. 아래와 같이 `--configdb` 옵션으로 조금 전 생성한 설정 데몬들을 지정합니다.
```
mongos --port 27018 --fork --keyFile /srv/mongodb/mongodb-shard-keyfile --logpath /var/log/mongo_shard_mongos.log --configdb csReplSet/localhost:40001,localhost:40002,localhost:40003 --bind_ip_all
```

이제 `mongos`에 접속합니다.
```
mongo --port 27018
```

`root` 계정을 생성하기 위해 `admin` 데이터베이스에 접속합니다.
```
use admin
```

`root` 계정을 생성하고 로그인합니다.
```
db.createUser({ user : '{{root 유저명}}', pwd : '{{root 비밀번호}}', roles : ['root'] });
db.auth('{{root 유저명}}', '{{root 비밀번호}}');
```

[3번 과정](#3-mongodb-데몬-생성)에서 생성했던 MongoDB 데몬들의 접속 경로를 지정합니다. `{{데이터베이스 서버 IP}}`는 데이터베이스 서버의 IP로 변경합니다. 같은 서버인 경우에는 `localhost`로 지정합니다.
```
sh.addShard('{{데이터베이스 서버 IP}}:30001');
sh.addShard('{{데이터베이스 서버 IP}}:30002');
sh.addShard('{{데이터베이스 서버 IP}}:30003');
sh.addShard('{{데이터베이스 서버 IP}}:30004');
sh.addShard('{{데이터베이스 서버 IP}}:30005');
sh.addShard('{{데이터베이스 서버 IP}}:30006');
sh.addShard('{{데이터베이스 서버 IP}}:30007');
sh.addShard('{{데이터베이스 서버 IP}}:30008');
```

데이터를 분산 처리할 데이터베이스를 지정합니다.
```
sh.enableSharding('{{데이터베이스 명}}');
```

데이터베이스에서 사용하는 콜렉션들을 지정합니다. 특별히 UPPERCASE의 내부적인 사용 목적으로 `__CHECK_ALIVE` 콜렉션을 추가합니다.
```
sh.shardCollection('{{데이터베이스 명}}.{{BOX 이름}}.__CHECK_ALIVE', {_id : 1});
sh.shardCollection('{{데이터베이스 명}}.{{BOX 이름}}.{{콜렉션 명}}', {_id : 1});
sh.shardCollection('{{데이터베이스 명}}.{{BOX 이름}}.{{콜렉션 명}}', {_id : 1});
sh.shardCollection('{{데이터베이스 명}}.{{BOX 이름}}.{{콜렉션 명}}', {_id : 1});
...
```

데이터베이스에 유저를 추가합니다.
```
use {{데이터베이스 명}}
db.createUser({ user : '{{유저명}}', pwd : '{{비밀번호}}', roles : ['readWrite', 'dbAdmin'] });
```

접속을 종료합니다.
```
exit
```

기존에 운영중이던 데이터베이스가 존재하는 경우에는, 기존 데이터베이스를 백업하고 새로 생성된 데이터베이스에 복구합니다.
```
mongodump --port {{기존 데이터베이스의 포트}} --db {{데이터베이스 이름}} --username {{데이터베이스 접속 username}} --password {{데이터베이스 접속 password}}
```
```
mongorestore --port 27018 --db {{데이터베이스 이름}} --username {{데이터베이스 접속 username}} --password {{데이터베이스 접속 password}} dump/{{프로젝트 BOX 명}}
```

이제 모든 설정이 끝났습니다.

### MongoDB 서버를 재시작 해야하는 경우
MongoDB 서버를 재시작 해야하는 경우에는 다음과 같은 방법을 따릅니다.

`mongos`에 접속합니다.
```
mongo --port 27018
```

다음과 같이 `mongos`를 종료합니다.
```
use admin
db.auth('{{root 유저명}}', '{{root 비밀번호}}');
db.shutdownServer();
```

각 설정 데이터베이스에 접속합니다.
```
mongo --port 40001
mongo --port 40002
mongo --port 40003
```

다음과 같이 설정 데이터베이스들을 종료합니다.
```
use admin
db.auth('{{root 유저명}}', '{{root 비밀번호}}');
db.shutdownServer();
```

마지막으로 다음 명령어를 입력하여 MongoDB 데몬들도 모두 종료합니다.
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

이제 서버를 재시작한 후, [3번 과정](#3-mongodb-데몬-생성)부터 다시 수행합니다.