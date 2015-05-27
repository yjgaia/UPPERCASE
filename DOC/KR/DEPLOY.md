# 배포하기

서버는 반드시 64bit 환경을 사용합니다.




**프로젝트 폴더 내의 V 파일은 매우 중요합니다.**

버전 정보를 담고 있는 V 파일을 배포시 잘 설정해주시기 바랍니다. 만약 분산 서버가 구성되어 있다면 모든 서버의 V 파일이 동일해야합니다.

*※ MongoDB는 32bit 컴퓨터에서는 심각한 제한이 있습니다. 32bit 컴퓨터가 다룰 수 있는 크기가 최대 4gb 이기 때문입니다.*

* `주의사항` 실제 운영 시에 `node-mongodb-client`를 반드시 해당 운영체제에 맞게 컴파일 해 주시기 바랍니다.
* `주의사항` DB의 update명령어가 동시에 여러번 호출 될 경우 모든 update는 같은 데이터(수정된)를 반환합니다.
* `주의사항` find 명령시 filter의 모든 property가 `undefined`로만 이루어진 경우, 모든 값을 가져옵니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려는 경우에는, `CHECK_ARE_SAME([{}, filter])`로 filter가 비어있는지 검사해 주시기 바랍니다.

배포시에는 보안을 위해 MongoDB를 인증 모드로 실행해주시기 바랍니다.

MongoDB 유저 추가
- 우선 관리자로 접근합니다.
```javascript
use admin
db.auth('root 유저명', 'root 비밀번호')
```

```javascript
use DB명
db.createUser({ user : '유저명', pwd : '비밀번호', roles : ['readWrite', 'dbAdmin'] })
```

인증 모드로 MongoDB를 실행한 경우에는 다음과 같이 설정에 MongoDB 접속에 필요한 `username`과 `password`를 추가합니다.

```javascript
require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

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


## V
Git 등의 소스코드 버젼 관리 시에는 .gitignore 등의 설정으로 V 파일을 제외시킵니다.