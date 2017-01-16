# UPPERCASE-DB
UPPERCASE-DB는 Node.js 환경에서 MongoDB 기반 데이터베이스를 다루기 위해 필요한 기능들을 담고 있는 모듈입니다. 구동을 위해 [UPPERCASE-COMMON-NODE](UPPERCASE-COMMON-NODE.md)가 필요합니다.
* [API 문서](../../API/UPPERCASE-DB/NODE/README.md)

## 목차
* [사용방법](#사용방법)
* [`NODE_CONFIG`](#node_config)
* [`CONNECT_TO_DB_SERVER`](#connect_to_db_server)
* [`Box.DB`](#db)
* [`Box.LOG_DB`](#log_db)

## 사용방법
`UPPERCASE-DB` 폴더를 복사하여 사용하거나, `npm`으로 설치하여 사용합니다.

### `UPPERCASE-DB` 폴더를 복사하는 경우
```javascript
require('./UPPERCASE-COMMON/NODE.js');
require('./UPPERCASE-DB/NODE.js');
```

### `npm`을 사용하는 경우
```
npm install uppercase-db
```
```javascript
require('uppercase-db');
```

## `NODE_CONFIG`
* `isDBLogMode` 데이터가 갱신될 때 콘솔 로그를 출력할 지 여부. 기본값은 `false` 입니다.
* `maxDataCount` [`find` 함수]('#find')를 수행할 때 최대로 가져올 데이터의 개수. 기본값은 `1000` 입니다.

## `CONNECT_TO_DB_SERVER`
MongoDB 서버에 연결합니다.

```javascript
CONNECT_TO_DB_SERVER({
	host : '127.0.0.1',
	port : 27017,
	name : 'Test'
}, function() {
	console.log('MongoDB 서버에 접속되었습니다.');
});
```

여러 MongoDB 서버에 접속하는 경우
```javascript
CONNECT_TO_DB_SERVER({
    dbServerName : 'DB_SERVER_1',
	host : '111.111.111.111',
	port : 27017,
	name : 'Test'
}, function() {
	console.log('첫번째 MongoDB 서버에 접속되었습니다.');
});

CONNECT_TO_DB_SERVER({
    dbServerName : 'DB_SERVER_2',
	host : '222.222.222.222',
	port : 27017,
	name : 'Test'
}, function() {
	console.log('두번째 MongoDB 서버에 접속되었습니다.');
});
```

`CONNECT_TO_DB_SERVER`에 사용 가능한 파라미터 목록은 다음과 같습니다.
* `dbServerName` 접속할 MongoDB 서버의 이름. 여러 MongoDB 서버 접속이 필요한 경우 임의로 지정합니다.
* `host` 접속할 MongoDB 서버의 호스트
* `port` 접속할 MongoDB 서버의 포트
* `name` 데이터베이스 이름
* `username` 인증 모드로 MongoDB 서버를 구동한 경우, 데이터베이스의 아이디
* `password` 인증 모드로 MongoDB 서버를 구동한 경우, 데이터베이스의 비밀번호

## `Box.DB`
MongoDB 컬렉션을 다루는 `DB` 클래스

MongoDB를 기반으로 [CRUD](https://ko.wikipedia.org/wiki/CRUD) 기능을 구현한 모듈입니다.

```javascript
var
// db
db = TestBox.DB('Test');

// 데이터를 생성합니다.
db.create({
	msg : 'Hello, DB!',
	number : 12
}, function(savedData) {
    console.log('데이터가 생성되었습니다.', savedData);
});
```

여러 MongoDB 서버에 접속하는 경우
```javascript
var
// db1
db1 = TestBox.DB({
    dbServerName : 'DB_SERVER_1',
    name : 'Test'
}),

// db2
db2 = TestBox.DB({
    dbServerName : 'DB_SERVER_2',
    name : 'Test'
});

db1.create({
	msg : 'Hello, DB!',
	number : 12
}, function(savedData) {
    console.log('데이터가 생성되었습니다.', savedData);
});

db2.create({
	msg : 'Hello, DB!',
	number : 12
}, function(savedData) {
    console.log('데이터가 생성되었습니다.', savedData);
});
```

### `create`

### `get`

### `update`

DB의 update명령어가 동시에 여러번 호출 될 경우 비동기 처리에 의해 모든 update는 같은 데이터(수정된)를 반환합니다.

### `updateNoHistory`

### `updateNoRecord`

### `remove`

### `find`

find 명령시 filter의 모든 property가 `undefined`로만 이루어진 경우, 모든 값을 가져옵니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려는 경우에는, `CHECK_ARE_SAME([{}, filter])`로 filter가 비어있는지 검사해 주시기 바랍니다.

### `count`

### `checkIsExists`

### `aggregate`

### `createIndex`

### `removeIndex`

### `findAllIndexes`

## `Box.LOG_DB`

### `log`

### `find`