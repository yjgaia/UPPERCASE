# UPPERCASE-DB
UPPERCASE-DB는 Node.js 환경에서 MongoDB 기반 데이터베이스를 다루기 위해 필요한 기능들을 담고 있는 모듈입니다. 구동을 위해 [UPPERCASE-CORE-NODE](UPPERCASE-CORE-NODE.md)가 필요합니다.
* [API 문서](../../API/UPPERCASE-DB/README.md)

## 목차
* [사용방법](#사용방법)
* [`NODE_CONFIG`](#node_config)
* [`CONNECT_TO_DB_SERVER`](#connect_to_db_server)
* [`Box.DB`](#boxdb)
* [`Box.LOG_DB`](#boxlog_db)
* [백업 서버 세팅하기](#백업-서버-세팅하기)

## 사용방법
UPPERCASE 프로젝트 내 `UPPERCASE-DB` 폴더를 복사하여 사용하거나, `npm`으로 설치하여 사용합니다.

### `UPPERCASE-DB` 폴더를 복사하는 경우
```javascript
require('./UPPERCASE-CORE/NODE.js');
require('./UPPERCASE-DB/NODE.js');
```

### `npm`을 사용하는 경우
[![npm](https://img.shields.io/npm/v/uppercase-db.svg)](https://www.npmjs.com/package/uppercase-db)
```
npm install uppercase-db
```
```javascript
require('uppercase-db');
```

## `NODE_CONFIG`
* `maxDataCount` [`find` 메소드](#find)를 수행할 때 최대로 가져올 데이터의 개수. 기본값은 `1000` 입니다.

## `CONNECT_TO_DB_SERVER`
MongoDB 서버에 연결합니다.

```javascript
CONNECT_TO_DB_SERVER({
	host : '127.0.0.1',
	port : 27017,
	name : 'Test'
}, () => {
	console.log('MongoDB 서버에 접속되었습니다.');
});
```

여러 MongoDB 서버에 접속하는 경우, `dbServerName`을 지정합니다.
```javascript
CONNECT_TO_DB_SERVER({
	dbServerName : 'DB_SERVER_1',
	host : '111.111.111.111',
	port : 27017,
	name : 'Test'
}, () => {
	console.log('첫번째 MongoDB 서버에 접속되었습니다.');
});

CONNECT_TO_DB_SERVER({
	dbServerName : 'DB_SERVER_2',
	host : '222.222.222.222',
	port : 27017,
	name : 'Test'
}, () => {
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
* `url` URL로 MongoDB에 접속하는 경우, 데이터베이스의 URL
* `backupHost` 백업 서버의 호스트. 자세한 내용은 [백업 서버 세팅하기](#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupPort` 백업 서버의 포트. 자세한 내용은 [백업 서버 세팅하기](#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupName` 백업 데이터베이스 이름. 자세한 내용은 [백업 서버 세팅하기](#백업-서버-세팅하기)를 참고하시기 바랍니다.
* `backupUsername` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 아이디
* `backupPassword` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 비밀번호
* `backupURL` URL로 백업 서버의 MongoDB에 접속하는 경우, 백업 데이터베이스의 URL

## `Box.DB`
MongoDB 컬렉션을 다루는 `DB` 클래스

MongoDB를 기반으로 [CRUD](https://ko.wikipedia.org/wiki/CRUD) 기능을 구현한 클래스입니다.

```javascript
let db = TestBox.DB('Test');

// 데이터를 생성합니다.
db.create({
	msg : 'Hello, DB!',
	number : 12
}, (savedData) => {
	console.log('데이터가 생성되었습니다.', savedData);
});
```

여러 MongoDB 서버에 접속하는 경우, `dbServerName`를 지정하여 연결할 데이터베이스 서버를 선택합니다.
```javascript
let db1 = TestBox.DB({
	dbServerName : 'DB_SERVER_1',
	name : 'Test'
});

let db2 = TestBox.DB({
	dbServerName : 'DB_SERVER_2',
	name : 'Test'
});

db1.create({
	msg : 'Hello, DB!',
	number : 12
}, (savedData) => {
	console.log('데이터가 생성되었습니다.', savedData);
});

db2.create({
	msg : 'Hello, DB!',
	number : 12
}, (savedData) => {
	console.log('데이터가 생성되었습니다.', savedData);
});
```

`Box.DB`에 사용 가능한 파라미터 목록은 다음과 같습니다.
* `dbServerName` 여러 MongoDB 서버에 접속하는 경우 서버 이름
* `name` 데이터베이스 이름
* `isNotUsingObjectId` MongoDB의 기본 `id` 형식인 `ObjectId`를 쓰지 않을 것인지 여부. `true`로 지정하면 데이터를 생성할 때 `id`를 따로 지정해야 합니다.
* `isNotUsingHistory` 데이터를 생성, 수정, 삭제할 때 변경 내역을 남기지 않을 것인지 여부

`Box.DB`로 생성한 객체의 메소드들은 다음과 같습니다.

### `create`
* `db.create(data)`
* `db.create(data, (savedData) => {})`
* `db.create(data, {error:, success:})`

데이터를 생성합니다. `isNotUsingObjectId`가 `true`가 아니고 `data`에 `id`를 따로 지정하지 않으면 `id`가 자동으로 생성됩니다. 또한 데이터 생성 시간이 `createTime`에 저장됩니다.

```javascript
db.create({
	msg : 'Hello, DB!',
	number : 12
}, (savedData) => {
	console.log('데이터 생성 완료', savedData);
});
```

### `get`
* `db.get(id, (savedData) => {})`
* `db.get(id, {notExists:, error:, success:})`
* `db.get({filter:, sort:, isRandom:}, {notExists:, error:, success:})`
* `db.get((savedData) => {})` 가장 최근 데이터를 가져옵니다.

`id`에 해당하는 데이터를 가져옵니다. 혹은 `filter`에 해당하는 데이터를 가져옵니다. `filter`는 [Query Selector](QUERY_SELECTOR.md)를 사용하여 작성합니다.

```javascript
db.get('5636e47415899c3c04b5e70f', {
	notExists : () => {
		console.log('데이터가 존재하지 않습니다.');
	},
	success : (savedData) => {
		console.log('데이터:', savedData);
	}
});
```

### `update`
* `db.update(data)`
* `db.update(data, (savedData, originData) => {})`
* `db.update(data, {notExists:, error:, success:})`

데이터를 수정합니다. `lastUpdateTime`에 마지막 수정 시간이 저장됩니다.

```javascript
db.update({
	id : '5636e47415899c3c04b5e70f',
	number : 3
}, {
	notExists : () => {
		console.log('데이터가 존재하지 않습니다.');
	},
	success : (savedData, originData) => {
		console.log('데이터 수정 완료', savedData);
	}
});
```

`update` 명령의 `data`에 다음과 같은 특수기호들을 사용하여 데이터를 수정할 수 있습니다. 이를 통해 분산 시스템에서 발생할 수 있는 **데이터 동시성 문제**를 피할 수 있습니다.

* `$inc`
```javascript
// num이 2 증가합니다.
db.update({
	...
	$inc : {
		num : 2
	}
}, ...);
```
```javascript
// num이 2 감소합니다.
db.update({
	...
	$inc : {
		num : -2
	}
}, ...);
```

* `$push`
```javascript
// 배열 array에 3을 추가합니다.
db.update({
	...
	data : {
		$push : {
			array : 3
		}
	}
});
```

* `$addToSet`
```javascript
// 배열 array에 3이 없는 경우에만 3을 추가합니다.
db.update({
	...
	$addToSet : {
		array : 3
	}
}, ...);
```

* `$pull`
```javascript
// 배열 array에서 3을 제거합니다.
db.update({
	...
	$pull : {
		array : 3
	}
}, ...);
```

* `$pull`
```javascript
// 배열 array에서 a가 3인 데이터를 제거합니다.
db.update({
	...
	$pull : {
		array : {
			a : 3
		}
	}
}, ...);
```

`update`명령어가 동시에 여러번 호출된 경우 모든 `update`의 결과는 최종적으로 수정된 데이터를 똑같이 반환하는 사실에 주의하시기 바랍니다.

데이터를 수정하는 경우 데이터의 변경 내역이 대상 데이터베이스의 이름 뒤에 `__HISTORY`를 붙힌 데이터베이스(예: `Test`인 경우 `Test__HISTORY`)에 저장됩니다.

### `updateNoHistory`
사용 방식은 `update`와 동일하나, 변경 내역을 남기지 않고 데이터를 수정합니다. 한편, `lastUpdateTime`은 갱신됩니다.

### `remove`
* `db.remove(id)`
* `db.remove(id, (originData) => {})`
* `db.remove(id, {notExists:, error:, success:})`

`id`에 해당하는 데이터를 삭제합니다.

```javascript
db.remove('5636e47415899c3c04b5e70f', {
	notExists : () => {
		console.log('데이터가 존재하지 않습니다.');
	},
	success : (originData) => {
		console.log('삭제된 데이터:', originData);
	}
});
```

### `find`
* `db.find({filter:, sort:, start:, count:}, (savedDataSet) => {})`
* `db.find({filter:, sort:, start:, count:}, {error:, success:})`

`filter`에 해당하는 데이터를 찾아 목록으로 가져옵니다. `filter`는 [Query Selector](QUERY_SELECTOR.md)를 사용하여 작성합니다.

```javascript
db.find({
	filter : {
		number : 3
	},
	sort : {
		createTime : -1
	}
}, (savedDataSet) => {
	console.log('검색된 데이터 목록:', savedDataSet);
});
```

`find` 명령시 `filter`의 모든 요소가 `undefined`로만 이루어진 경우, 모든 값을 가져옵니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려는 경우에는, `CHECK_ARE_SAME([filter, {}])`로 `filter`의 모든 요소가 `undefined` 인지 검사하여 적절한 처리를 해 주시기 바랍니다.

```javascript
// 아래 두 find 명령은 결과가 같습니다.

db.find({
	filter : {
		number : undefined
	}
}, (savedDataSet) => {
	console.log('검색된 데이터 목록:', savedDataSet);
});

db.find((savedDataSet) => {
	console.log('검색된 데이터 목록:', savedDataSet);
});
```

`find`로 가져올 수 있는 데이터의 최대 개수는 `NODE_CONFIG.maxDataCount`에 설정한 숫자입니다. 이를 무시하고 모든 데이터를 가져오고자 하는 경우에는 `isFindAll` 파라미터를 `true`로 설정합니다. 성능에 치명적인 영향을 끼칠 수 있으므로 주의하시기 바랍니다.

```javascript
db.find({
	filter : {
		number : 3
	},
	isFindAll : true
}, (savedDataSet) => {
	console.log('모든 데이터 목록:', savedDataSet);
});
```

### `findAllAndUpdateNoHistory`
* `db.findAllAndUpdateNoHistory({filter:, data:})`
* `db.findAllAndUpdateNoHistory({filter:, data:}, () => {})`
* `db.findAllAndUpdateNoHistory({filter:, data:}, {error:, success:})`

`filter`에 해당하는 데이터를 찾아 수정합니다. `filter`는 [Query Selector](QUERY_SELECTOR.md)를 사용하여 작성합니다. `lastUpdateTime`에 마지막 수정 시간이 저장됩니다.

```javascript
db.findAllAndUpdateNoHistory({
	filter : {
		number : 3
	},
	data : {
		number : 13
	}
}, () => {
	console.log('모든 데이터 수정 완료');
});
```

`findAllAndUpdateNoHistory` 명령시 `filter`의 모든 요소가 `undefined`로만 이루어진 경우, 모든 값을 수정합니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려는 경우에는, `CHECK_ARE_SAME([filter, {}])`로 `filter`의 모든 요소가 `undefined` 인지 검사하여 적절한 처리를 해 주시기 바랍니다.

`findAllAndUpdateNoHistory`로 데이터를 수정하는 경우에는 데이터의 변경 내역이 저장되지 않습니다.

### `count`
* `db.count({filter:}, (count) => {})`
* `db.count({filter:}, {error:, success:})`

`filter`에 해당하는 데이터의 개수를 가져옵니다. `filter`는 [Query Selector](QUERY_SELECTOR.md)를 사용하여 작성합니다.

```javascript
db.count({
	filter : {
		number : 3
	}
}, (count) => {
	console.log('검색된 데이터의 개수:', count);
});
```

### `checkExists`
* `db.checkExists({filter:}, (exists) => {})`
* `db.checkExists({filter:}, {error:, success:})`

`filter`에 해당하는 데이터가 존재하는지 확인합니다. `filter`는 [Query Selector](QUERY_SELECTOR.md)를 사용하여 작성합니다.

```javascript
db.checkExists({
	filter : {
		number : 3
	}
}, (exists) => {
	if (exists === true) {
		console.log('데이터가 존재합니다.');
	} else {
		console.log('데이터가 존재하지 않습니다.');
	}
});
```

### `aggregate`
* `db.aggregate(params, (dataSet) => {})`
* `db.aggregate(params, {error:, success:})`

MongoDB의 Aggregation 기능을 이용해, 데이터를 가공해서 가져옵니다. 자세한 내용은 [MongoDB Aggregation 문서](https://docs.mongodb.com/manual/aggregation/)를 참고하시기 바랍니다.

```javascript
db.aggregate([{
	$sort : {
		number : 1
	}
}, {
	$group : {
		_id : '$msg',
		highestNumber : {
			$first : '$number'
		}
	}
}], (result) => {
	console.log(result);
});
```

### `createIndex`
* `db.createIndex(index)`
* `db.createIndex(index, () => {})`
* `db.createIndex(index, {error:, success:})`

`find`가 빠르게 수행될 수 있도록 인덱스를 생성합니다.

```javascript
db.createIndex({
	msg : 1
});
```

### `removeIndex`
* `db.removeIndex(index)`
* `db.removeIndex(index, () => {})`
* `db.removeIndex(index, {error:, success:})`

인덱스를 삭제합니다.

```javascript
db.removeIndex({
	msg : 1
});
```

### `findAllIndexes`
* `db.findAllIndexes(() => {})`
* `db.findAllIndexes({error:, success:})`

모든 인덱스 목록을 가져옵니다.

```javascript
db.findAllIndexes((indexes) => {
	console.log('인덱스 목록:', indexes);
});
```

### 데이터의 변경 내역을 가져오는 방법
데이터를 생성하거나 수정, 삭제하는 경우 데이터의 변경 내역이 대상 데이터베이스의 이름 뒤에 `__HISTORY`를 붙힌 데이터베이스(예: `Test`인 경우 `Test__HISTORY`)에 저장됩니다. 단, `update` 명령으로 데이터를 수정할 때 `isNotUsingHistory` 파라미터가 `true`이거나, `updateNoHistory`를 사용하여 데이터를 수정하면 변경 내역이 남지 않습니다.

데이터의 변경 내역은 다음과 같이 가져올 수 있습니다.
```javascript
let historyDB = TestBox.DB('Test__HISTORY');

historyDB.find({
	filter : {
		docId : '5636e47415899c3c04b5e70f'
	},
	sort : {
		time : -1
	}
}, (historyDataSet) => {
	console.log('데이터의 모든 변경 내역:', historyDataSet);
});
```

## `Box.LOG_DB`
로그를 저장하는 기능을 제공하는 `LOG_DB` 클래스

```javascript
let logDB = TestBox.LOG_DB('testLog');

logDB.log({
	feeling : 'good',
	weather : 'sunny'
});
```

### `log(data)`
로그를 남깁니다. 로그 기록 시간이 `time`에 저장됩니다.

```javascript
logDB.log({
	feeling : 'good',
	weather : 'sunny'
});
```

### `find`
* `logDB.find({filter:, sort:, start:, count:}, (logs) => {})`
* `logDB.find({filter:, sort:, start:, count:}, {error:, success:})`

`filter`에 해당하는 로그를 찾아 목록으로 가져옵니다.

```javascript
logDB.find({
	filter : {
		feeling : 'good'
	},
	sort : {
		time : -1
	}
}, (logs) => {
	console.log('검색된 로그 목록:', logs);
});
```

## 백업 서버 세팅하기
`CONNECT_TO_DB_SERVER`로 데이터베이스 서버에 연결할 때 `backup` 관련 파라미터를 지정하면, 백업 서버에도 동시에 연결됩니다. 이후 데이터의 생성, 수정, 삭제와 같은 갱신 작업을 하게되면 백업 서버에도 동일하게 반영됩니다. 단, 데이터의 변경 내역이 `__HISTORY` 데이터베이스에 저장되지는 않으며, `LOG_DB`를 이용해 작성한 로그 데이터도 저장되지 않습니다.

* `backupHost` 백업 서버의 호스트
* `backupPort` 백업 서버의 포트
* `backupName` 백업 데이터베이스 이름
* `backupUsername` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 아이디
* `backupPassword` 인증 모드로 백업 서버를 구동한 경우, 백업 데이터베이스의 비밀번호

```javascript
CONNECT_TO_DB_SERVER({
	host : '127.0.0.1',
	port : 27017,
	name : 'Test',
	backupHost : '111.222.333.444',
	backupPort : 27017,
	backupName : 'Test__BACKUP'
}, () => {
	console.log('MongoDB 서버에 접속되었습니다.');
});
```
