작성중

# 프로젝트 배포하기

1. 우선, 프로젝트를 배포할 서버를 준비합니다.

2. 프로젝트를 배포할 서버가 준비되면, 서버에 [설치하기](INSTALL.md) 문서를 참고하여 필요한 기반 시스템을 모두 설치합니다.

3. 프로젝트 폴더를 생성합니다.

4. 생성한 폴더에 패키징 된 프로젝트와 **V 파일**을 복사합니다. 프로젝트 패키징은 [패키징](PACK.md) 문서를 참고해주시기 바랍니다.

3. 프로젝트 실행을 위한 코드를 배포 서버의 설정에 맞게 작성합니다.

4. 프로젝트를 실행하고, 접속이 잘 되는지 등 테스트를 수행합니다.
```
node {{프로젝트 명.js}}
```

5. 프로젝트 실행에 문제가 없으면 `Ctrl + C`를 눌러 프로젝트를 종료하고, `forever` 등으로 프로젝트를 데몬 형태로 실행합니다. 여기서 `--max-old-space-size` 설정은 node.js의 메모리 제한을 늘려줍니다. 서버의 사양에 맞게 설정해주시기 발바니다.
```
forever start -c "node --max-old-space-size=2048" {{프로젝트 명.js}}
```
```
forever start -c "node --max-old-space-size=16384" {{프로젝트 명.js}}
```

6. 프로젝트 실행에 문제가 있다면 문제를 해결한 후, 4번 과정부터 다시 수행합니다. 이 때, **V 파일**을 업데이트 하여야 변경된 사항이 반영됩니다. `forever`로 서버를 재시작 할 때는 아래 명령어를 입력합니다.
```
forever restart {{프로젝트 명.js}}
```

## 주의사항
* DB의 update명령어가 동시에 여러번 호출 될 경우 모든 update는 같은 데이터(수정된)를 반환합니다.
* find 명령을 수행할 때, filter의 모든 property가 `undefined`로만 이루어진 경우에는 모든 값을 대상으로 검색합니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려면, `if (CHECK_ARE_SAME([{}, filter]) === true) {...}`로 filter가 비어있는지 확인하시기 바랍니다.
* 배포시에는 보안을 위해 MongoDB를 인증 모드로 실행해주시기 바랍니다.

## MongoDB 최초 실행하기
MongoDB를 최초로 실행하기 전, 데이터베이스를 저장할 폴더를 생성합니다.
```
mkdir /data
mkdir /data/db
```

MongoDB를 외부에서 접속 가능하게 설정합니다. `mongodb.conf`에서 `bindIp: 127.0.0.1`를 `bindIp: 0.0.0.0`로 변경합니다. 또한, 리눅스 환경의 경우 외부에서 접속이 가능하게 하려면 방화벽을 꺼야 합니다. (맨 하단 방화벽 설정 항목 참고)
```
vi /etc/mongod.conf
```

MongoDB를 아래 명령어로 실행합니다.
```
mongod --fork --logpath /var/log/mongodb.log --logappend
```

`mongo`로 접속합니다.
```
mongo
```

관리자 계정을 생성합니다.
```javascript
use admin
db.createUser({ user : '{{root 유저명}}', pwd : '{{root 비밀번호}}', roles : ['root'] });
```

MongoDB 서버를 종료합니다.
```javascript
db.shutdownServer();
```

이제, 인증 모드로 MongoDB를 실행합니다.
```
mongod --fork --logpath /var/log/mongodb.log --logappend --auth
```

## MongoDB 유저 추가
인증 모드로 MongoDB를 실행한 후 데이터베이스에 접근하기 위해서는 해당 데이터베이스에 유저가 존재해야 합니다. 유저를 추가하기 위한 방법은 다음과 같습니다.

1. 우선 관리자로 로그인합니다.
	```javascript
	use admin
	db.auth('root 유저명', 'root 비밀번호')
	```
	
	* 만약 관리자 계정이 없다면 생성합니다.
	```javascript
	use admin
	db.createUser({ user : '{{root 유저명}}', pwd : '{{root 비밀번호}}', roles : ['root'] });
	```

2. 데이터베이스에 유저를 생성합니다.
	```javascript
	use DB명
	db.createUser({ user : '{{유저명}}', pwd : '{{비밀번호}}', roles : ['readWrite', 'dbAdmin'] });
	```

3. 다음과 같이 프로젝트 실행을 위한 설정 파일(프로젝트 명.js)에 MongoDB 접속에 필요한 `유저명`과 `비밀번호`를 추가합니다.
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
			// 데이터베이스 이름은 Sample 입니다.
			dbName : 'Sample',
			// 데이터베이스 접속 username은 test입니다.
			dbUsername : 'test',
			// 데이터베이스 접속 password는 1234입니다.
			dbPassword : '1234'
		}
	});
	```

## V 파일
**프로젝트 폴더 내의 V 파일은 매우 중요합니다.**

V 파일은 버젼 넘버를 저장하고 있는 파일로써, 이를 기반으로 캐싱이 수행됩니다.

* 프로젝트를 업데이트 할 때는 V 파일의 숫자를 증가시켜주시기 바랍니다. 그래야 캐싱이 새롭게 반영됩니다.
* 버전 정보를 담고 있는 V 파일을 배포시 잘 설정해주시기 바랍니다. 만약 분산 서버가 구성되어 있다면 모든 서버의 V 파일이 동일해야합니다.
* Git 등의 소스코드 버젼 관리 시에는 .gitignore 등의 설정으로 V 파일을 제외시킵니다.

## 설정 파일에 설정하기 (프로젝트 명.js)
**추후 프로젝트 업데이트 시 실수로 개발 환경의 설정 파일을 덮어씌우지 마세요. 필요한 변경 사항만 수정해주시기 바랍니다.**

## 서버 이전하기
1. 기존 프로젝트를 중단합니다. 만약 `forever`를 사용한다면 다음과 같이 입력합니다.
```
cd {{프로젝트 폴더 명}}
forever start -c "node --max-old-space-size=2048" {{프로젝트 명.js}}
```

2. 기존 서버에서 프로젝트를 압축하여 백업합니다.
```
zip -r {{프로젝트 폴더 명.zip}} {{프로젝트 폴더 명}}
```

3. 기존 서버에서 데이터베이스를 백업합니다.
```
mongodump --db {{데이터베이스 이름}} --username {{데이터베이스 접속 username}} --password {{데이터베이스 접속 password}}
```

4. 이전 할 서버에 [UPPERCASE를 세팅](INSTALL.md)합니다.

5. 이전 할 서버에 백업한 프로젝트의 압축을 풉니다.
```
unzip {{프로젝트 폴더 명.zip}}
```

6. 데이터베이스에 유저 정보를 생성합니다.
상단의 `MongoDB 유저 추가` 부분을 참고하여 유저 정보를 생성합니다.

7. 이전 할 서버에서 데이터베이스를 복구합니다.
```
mongorestore --db {{데이터베이스 이름}} --username {{데이터베이스 접속 username}} --password {{데이터베이스 접속 password}} dump/{{프로젝트 BOX 명}}
```

8. 프로젝트를 실행합니다. 만약 `forever`를 사용한다면 다음과 같이 입력합니다.
```
cd {{프로젝트 BOX 명}}
forever start -c "node --max-old-space-size=2048" {{프로젝트 명.js}}
```

## 서버 설정
서버 운영시 필요한 서버 설정에 대해 다룹니다.

### 최대 동시에 열 수 있는 파일 개수 조절
UPPERCASE의 파일 처리 기능이나 IMAGEMAGICK 관련 기능을 사용할 때 최대 동시에 열 수 있는 파일 개수가 제한되어 있습니다.
따라서 파일을 동시에 여럿을 다루는 기능을 만들 경우에는 다음과 같은 설정을 해야합니다.

***만약 아래 설정을 하지 않으면, 많은 파일을 다루는 애플리케이션의 경우 파일 관련 기능이 제대로 작동하지 않을 수 있습니다.***

`ulimit -a`로 최대 열 수 있는 파일 개수를 확인합니다. `open files` 설정을 보시기 바랍니다. 이후, 다음 명령어로 `limits.conf`를 수정합니다.
```
vi /etc/security/limits.conf
```

이 파일의 맨 끝에 다음과 같은 내용을 추가합니다. (만약 유저가 root가 아니라면, root를 유저명으로 변경해주시기 바랍니다.)
```
root hard nofile 65535
root soft nofile 65535
root hard nproc 65535
root soft nproc 65535
```

이후 다시 서버에 재접속한 뒤, 프로젝트를 재시작하면 반영됩니다.

### 모든 node.js 프로세스 종료
종종 죽지 않는 node.js 프로세스가 있을 경우가 있습니다. 그럴때는 다음 명령어를 입력해주면 모든 node.js 프로젝트가 강제 종료 됩니다.
```
pkill node
```

혹은 다음과 같이 커맨드 라인을 지정해 줄 수도 있습니다.
```
pkill -f "node --max-old-space-size=16384 /root/SampleService/Project/Project.js"
```

### 방화벽 끄기
서버 운영시 방화벽을 끌 필요가 있을때 아래 명령어로 방화벽을 해제합니다.
```
systemctl stop firewalld
```

서버 머신 리부팅 시에도 방화벽이 실행되지 않도록 하려면 다음 명령어를 입력해 줍니다.
```
systemctl disable firewalld
```

### 서버 시간 설정
서버가 위치한 지역의 시간대로 서버 시간을 맞추어 줍니다.
```
mv /etc/localtime /etc/localtime_old
ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
rdate -p time.bora.net
rdate -s time.bora.net
```