작성중

# 프로젝트 배포하기

## 목차
* [프로젝트 배포](#프로젝트-배포)
* [MongoDB 최초 실행](#mongodb-최초-실행)
* [MongoDB 유저 추가](#mongodb-유저-추가)
* [VERSION 파일](#version-파일)
* [서버 이전](#서버-이전)
* [리눅스 서버 설정](#리눅스-서버-설정)

## 프로젝트 배포
UPPERCASE를 기반으로 개발된 프로젝트를 배포하기 위해서는 다음 과정을 따릅니다.

1. 프로젝트를 배포할 서버를 준비합니다.

2. [설치하기](INSTALL.md) 문서를 참고하여, 서버에 UPPERCASE와 기반 시스템들을 모두 설치합니다.

3. 적당한 위치에 프로젝트 폴더를 생성합니다.

4. 생성한 폴더에 패키징 된 프로젝트와 [DEPENDENCY 파일](CREATE_FOLDER.md#dependency-파일-작성), [VERSION 파일](#version-파일)을 복사합니다. 프로젝트 패키징은 [패키징 문서](PACK.md)를 참고해주시기 바랍니다.

5. [프로젝트 실행을 위한 코드](CREATE_PROJECT.md#프로젝트-실행을-위한-코드-작성)를 배포 서버의 설정에 맞게 작성합니다.

6. 프로젝트를 실행하고, 접속이 잘 되는지 테스트를 수행합니다.
```
cd {{프로젝트 폴더 명}}
node {{프로젝트 명.js}}
```

7. 프로젝트 실행에 문제가 없으면 `Ctrl + C`를 눌러 프로젝트를 종료하고, [`forever`](https://www.npmjs.com/package/forever)와 같은 툴을 사용하여 프로젝트를 데몬 형태로 실행합니다. 여기서 `--max-old-space-size`를 설정하여 Node.js의 기본 메모리 제한을 늘려줍니다. 서버 메모리의 절반 정도로 설정해 주시기 바랍니다.
```
forever start -c "node --max-old-space-size=16384" {{프로젝트 명.js}}
```

8. 프로젝트 실행에 문제가 있다면 문제를 해결한 후, 4번 과정부터 다시 수행합니다. [개발 모드](CONFIGURATION.md#개발-모드)가 아닌 경우, [VERSION 파일](#version-파일)을 업데이트 하여야 변경 사항이 반영됩니다. `forever`로 서버를 재시작 할 때는 아래 명령어를 입력합니다.
```
forever restart {{프로젝트 명.js}}
```

## MongoDB 최초 실행
MongoDB를 최초로 실행할 때는 다음 과정을 따릅니다.

1. 데이터를 저장할 폴더를 생성합니다.
```
mkdir /data
mkdir /data/db
```

2. MongoDB를 외부에서 접속 가능하게 설정합니다. `mongodb.conf`에서 `bindIp: 127.0.0.1`를 `bindIp: 0.0.0.0`로 변경합니다. 또한, 리눅스 환경의 경우 외부에서 접속이 가능하게 하려면 방화벽을 꺼야 합니다. (하단의 [방화벽 끄기](#방화벽-끄기) 항목을 참고하세요.)
```
vi /etc/mongod.conf
```

3. MongoDB를 아래 명령어로 실행합니다. 보안을 위해 기본 포트가 아닌 `27018` 포트로 실행합니다.
```
mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend
```

4. `mongo`로 접속합니다.
```
mongo --port 27018
```

5. 아래와 같이 관리자 계정을 생성합니다.
```javascript
use admin
db.createUser({ user : '{{root 유저명}}', pwd : '{{root 비밀번호}}', roles : ['root'] });
```

6. MongoDB 서버를 종료합니다.
```javascript
db.shutdownServer();
```

7. `--auth` 플래그를 붙혀 인증 모드로 MongoDB를 다시 실행합니다.
```
mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend --auth
```

## MongoDB 유저 추가
[MongoDB를 실행](#mongodb-최초-실행)한 후 데이터베이스에 접근하기 위해서는 사용할 데이터베이스에 유저가 존재해야 합니다. 유저를 추가하기 위한 방법은 다음과 같습니다.

1. 관리자로 로그인합니다.
```javascript
use admin
db.auth('{{root 유저명}}', '{{root 비밀번호}}')
```

2. 사용할 데이터베이스에 유저를 생성합니다.
```javascript
use {{데이터베이스 명}}
db.createUser({ user : '{{유저명}}', pwd : '{{비밀번호}}', roles : ['readWrite', 'dbAdmin'] });
```

3. [프로젝트 실행을 위한 코드](CREATE_PROJECT.md#프로젝트-실행을-위한-코드-작성)에 MongoDB 접속에 필요한 `유저명`과 `비밀번호`를 추가합니다.

```javascript
require(process.env.UPPERCASE_PATH + '/BOOT.js');

BOOT({

	CONFIG : {
		isDevMode : true,
		defaultBoxName : 'Sample',
		title : 'Sample',
		webServerPort : 8888
	},
	
	NODE_CONFIG : {
	
		// 데이터베이스 설정
		dbPort : 27018,
		dbName : '{{데이터베이스 명}}',
		dbUsername : '{{유저 이름}}',
		dbPassword : '{{비밀번호}}'
	}
});
```

## VERSION 파일
**※ VERSION 파일은 매우 중요합니다.**

VERSION 파일은 버전 문자열을 저장하고 있는 파일로써, 이를 기반으로 각종 캐싱 작업과 분산 처리 작업이 수행됩니다.

* 프로젝트를 업데이트 할 때는 VERSION 파일을 갱신해 주시기 바랍니다. 그래야만 클라이언트에 제공되는 리소스들의 캐싱이 새로 생성됩니다. 만약 VERSION 파일을 갱신하지 않을 경우, 이전의 리소스가 계속해서 제공되어 버리고 맙니다.
* 분산 서버가 구성되어 있는 경우, 모든 서버의 VERSION 파일의 내용이 동일해야합니다. 그렇지 않으면 심각한 문제가 발생할 수 있습니다.

## 서버 이전
서버를 이전할 때에는 다음 과정을 따릅니다.

1. 구동중인 프로젝트를 중단합니다. [`forever`](https://www.npmjs.com/package/forever)를 사용한다면 다음과 같이 입력합니다.
```
cd {{프로젝트 폴더 명}}
forever stop {{프로젝트 명.js}}
```

2. 프로젝트를 압축하여 백업합니다.
```
zip -r {{프로젝트 폴더 명.zip}} {{프로젝트 폴더 명}}
```

3. [`mongodump`](https://docs.mongodb.com/manual/reference/program/mongodump/)를 이용하여 데이터베이스를 백업합니다.
```
mongodump --port 27018 --db {{데이터베이스 명}} --username {{유저명}} --password {{비밀번호}}
```

4. 데이터를 압축하여 백업합니다.
```
zip -r dump.zip dump
```

5. [설치하기](INSTALL.md) 문서를 참고하여, 이전할 서버에 UPPERCASE와 기반 시스템들을 모두 설치합니다.

6. 이전할 서버에 백업한 프로젝트를 복사한 후, 압축을 풉니다.
```
unzip {{프로젝트 폴더 명.zip}}
```

7. [MongoDB 유저 추가 항목](#mongodb-유저-추가)을 참고하여 이전할 서버의 데이터베이스에 유저 정보를 생성합니다.

8. 이전할 서버에 백업한 데이터를 복사한 후, 압축을 풉니다.
```
unzip dump.zip
```

9. [`mongorestore`](https://docs.mongodb.com/manual/reference/program/mongorestore/)를 이용하여 백업 한 데이터베이스를 복구합니다.
```
mongorestore --port 27018 --db {{데이터베이스 명}} --username {{유저명}} --password {{비밀번호}} dump/{{프로젝트 명}}
```

10. 프로젝트를 실행합니다. `forever`를 사용한다면 다음과 같이 입력합니다.
```
cd {{프로젝트 폴더 명}}
forever start -c "node --max-old-space-size=16384" {{프로젝트 명.js}}
```

## 리눅스 서버 설정
리눅스 서버 운영시 필요한 서버 설정들에 대해 다룹니다.

### 최대로 동시에 열 수 있는 파일 개수 조절
MongoDB를 사용하거나 UPPERCASE의 [파일 처리 기능](UPPERCASE-CORE-NODE.md#파일-처리-기능), [이미지 처리 기능](UPPERCASE-CORE-NODE.md#이미지-처리-기능)을 사용할 때, 최대로 동시에 열 수 있는 파일 개수가 리눅스에 의해 제한되어 있습니다.
따라서 여러 파일을 동시에 다루는 프로젝트인 경우에는 다음과 같은 설정을 해야 합니다.

**※ 아래와 같은 설정을 하지 않는다면, 여러 파일을 동시에 다루는 프로젝트의 경우 오류가 발생할 수 있습니다.**

1. `ulimit -a`로 최대로 열 수 있는 파일 개수를 확인합니다. `open files` 항목을 살펴보시기 바랍니다.
```
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 62528
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 65535
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

2. 다음 명령어로 `limits.conf`를 수정합니다.
```
vi /etc/security/limits.conf
```

3. `limits.conf`의 맨 끝에 다음과 같은 내용을 추가합니다. (만약 유저가 `root` 유저가 아니라면, `root`를 해당하는 유저명으로 변경해주시기 바랍니다.)
```
root hard nofile 65535
root soft nofile 65535
root hard nproc 65535
root soft nproc 65535
```

4. 이후 터미널을 종료한 후 다시 서버에 접속한 뒤, 프로젝트를 재시작하면 설정한 내용이 반영됩니다.

### 서버 시간 설정
아래와 같이 서버가 위치한 지역의 시간대로 서버 시간을 맞추어 줍니다.
```
mv /etc/localtime /etc/localtime_old
ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
rdate -p time.bora.net
rdate -s time.bora.net
```

### 방화벽 포트 설정
리눅스 설치 후 초기에 설정되어 있는 방화벽으로 인해, SSH 포트(22)를 제외한 모든 포트가 막혀 있습니다. 아래 명령어로 모든 포트를 사용 가능하도록 설정합니다.
```
firewall-cmd --zone=public --add-port=0-65535/tcp --permanent
firewall-cmd --zone=public --add-port=0-65535/udp --permanent
firewall-cmd --reload
```

### SSH 무작위 로그인 시도 차단
서버를 운영하다 보면 SSH 무작위 로그인 시도가 수없이 발생하는 것을 확인할 수 있습니다. 따라서 [Fail2ban](https://www.fail2ban.org)을 설치하여 SSH 무작위 로그인 시도 공격을 차단하는 것이 좋습니다.

작성중

### 중국발 IP 차단
중국에서 서비스를 운영하는 것이 아니라면 보안을 위해 중국발 IP를 차단하는 것이 좋습니다. 대부분의 해킹 시도가 중국에서 이루어지기 때문입니다.

작성중- 프로그램 개발하기

### 모든 Node.js 프로세스 종료
종종 오류로 인해 꺼지지 않는 Node.js 프로세스가 있을 때가 있습니다. 그런 경우에는 다음 명령어를 입력하여 모든 Node.js 프로세스를 강제종료 합니다.
```
pkill node
```

혹은 다음과 같이 커맨드 라인을 지정하여 특정한 프로세스만 종료할 수도 있습니다.
```
pkill -f "node --max-old-space-size=16384 /root/SampleService/Project/Project.js"
```