# UPPERCASE-DB
UPPERCASE-DB는 Node.js 환경에서 MongoDB 기반 데이터베이스를 다루기 위해 필요한 기능들을 담고 있는 모듈입니다. 구동을 위해 [UPPERCASE-COMMON-NODE](UPPERCASE-COMMON-NODE.md)가 필요합니다.
* [API 문서](../../API/UPPERCASE-DB/NODE/README.md)

## 목차
* [사용방법](#사용방법)
* [`NODE_CONFIG`](#node_config)
* [`CONNECT_TO_DB_SERVER`](#connect_to_db_server)
* [`Box.DB`](#boxdb)
* [`Box.LOG_DB`](#boxlog_db)

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

## 성능 관련 팁

## 너무 많은 문서 추가나 수정이 일어날 경우 데이터베이스가 lock에 걸릴 수 있습니다.
이는 MongoDB의 단점 중의 하나로, 순간적으로 너무 많은 문서 추가나 수정이 발생하면 데이터베이스가 lock에 걸려 반응 속도가 현저히 떨어집니다. 이럴 경우에는 SHARED_STORE와 같은 캐싱을 적절히 사용하시기 바랍니다.

## 자주 변경되는 문서는 `updateNoHistory`를 사용합니다.
게시판 게시글의 조회수 같은 경우는 굳이 history를 남길 필요가 없습니다. 이럴 경우 `updateNoHistory`를 사용합니다. 또한 `updateNoHistory`는 `lastUpdateTime`을 갱신하지 않습니다.











## API

* `DB(name)` `DB({dbServerName:, name:})` MongoDB collection wrapper [예제보기](../EXAMPLES/DB/NODE/DB.js)
```javascript
db = TestBox.DB('test');

// 데이터를 저장합니다.
db.create(data, function(savedData) {...})
db.create(data, {error:, success:})

// 데이터를 가져옵니다.
db.get(id, function(savedData) {...})
db.get(id, {success:, notExists:, error:})
db.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})

// 데이터를 수정합니다.
db.update(data, function(savedData, originData) {...})
db.update(data, {success:, notExists:, error:})
db.updateNoHistory(data, function() {...}) // 변경 내역을 남기지 않습니다.
db.updateNoHistory(data, {success:, notExists:, error:}) // 변경 내역을 남기지 않습니다.
db.updateNoRecord(data, function() {...}) // 변경 내역과 마지막 수정 시간 등 아무런 기록을 남기지 않습니다.
db.updateNoRecord(data, {success:, notExists:, error:}) // 변경 내역과 마지막 수정 시간 등 아무런 기록을 남기지 않습니다.

// 데이터를 삭제합니다.
db.remove(id, function(originData) {...})
db.remove(id, {success:, notExists:, error:})

// 데이터를 찾아 목록으로 가져옵니다.
db.find({filter:, sort:, start:, count:}, function(savedDataSet) {...})
db.find({filter:, sort:, start:, count:}, {error:, success:})

// 데이터의 개수를 가져옵니다.
db.count({filter:}, function(count) {...})
db.count({filter:}, {error:, success:})

// 데이터가 존재하는지 확인합니다.
db.checkIsExists({filter:}, function(isExists) {...})
db.checkIsExists({filter:}, {error:, success:})

// MongoDB의 Aggregation 기능을 이용해, 데이터를 가공해서 가져옵니다. 자세한 내용은 MongoDB의 Aggregation 기능을 참고하시기 바랍니다.
db.aggregate(params, function(dataSet) {...})
db.aggregate(params, {error:, success:})
```
* `LOG_DB(name)` MongoDB collection wrapper class for logging [예제보기](../EXAMPLES/DB/NODE/LOG_DB.js)
```javascript
logDB = TestBox.LOG_DB('testLog');
logDB.log(data)
```

`CONNECT_TO_DB_SERVER`의 `dbServerName`을 지정하면, 여러 데이터베이스 서버에 접속할 수 있습니다. `DB`의 `dbServerName` 설정으로 연결할 데이터베이스 서버를 선택할 수 있습니다.

### 사용 가능한 특수 기호
`get`, `find` 명령의 `filter`에는 다음과 같은 특수기호를 사용할 수 있습니다.
* `$and`
```javascript
// a가 3이고, b가 2인 데이터를 찾습니다.
filter : {
    $and : [{
        a : 3
    }, {
        b : 2
    }]
}
```
* `$or`
```javascript
// a가 3이거나, b가 2인 데이터를 찾습니다.
filter : {
    $or : [{
        a : 3
    }, {
        b : 2
    }]
}
```
* `$gt`
```javascript
// a가 3보다 큰 데이터를 찾습니다.
filter : {
    a : {
        $gt : 3
    }
}
```
* `$gte`
```javascript
// a가 3보다 크거나 같은 데이터를 찾습니다.
filter : {
    a : {
        $gte : 3
    }
}
```
* `$lt`
```javascript
// a가 3보다 작은 데이터를 찾습니다.
filter : {
    a : {
        $lt : 3
    }
}
```
* `$lte`
```javascript
// a가 3보다 작거나 같은 데이터를 찾습니다.
filter : {
    a : {
        $lte : 3
    }
}
```
* `$ne`
```javascript
// a가 3이 아닌 데이터를 찾습니다.
filter : {
    a : {
        $ne : 3
    }
}
```

`update` 명령의 `data`에 다음과 같은 특수기호를 사용하여 데이터를 가공할 수 있습니다.
* `$inc`
```javascript
// num이 2 증가합니다.
SampleModel.update({
    ...
    $inc : {
        num : 2
    }
})
```
```javascript
// num이 2 감소합니다.
SampleModel.update({
    ...
    $inc : {
        num : -2
    }
})
```
* `$addToSet`
```javascript
// 배열 array에 3이 없는 경우에만 3을 추가합니다.
SampleModel.update({
    ...
    $addToSet : {
        array : 3
    }
})
```
* `$push`
```javascript
// 배열 array에 3을 추가합니다.
SampleModel.update({
    ...
    $push : {
        array : 3
    }
})
```
* `$pull`
```javascript
// 배열 array에서 3을 제거합니다.
SampleModel.update({
    ...
    $pull : {
        array : 3
    }
})
```
* `$pull`
```javascript
// 배열 array에서 a가 3인 데이터를 제거합니다.
SampleModel.update({
    ...
    $pull : {
        array : {
            a : 3
        }
    }
})
```

## 특정 문서의 수정 내역을 가져오는 방법
특정 문서의 수정 내역은 문서가 저장된 데이터베이스 이름 뒤에 `__HISTORY`를 붙혀 `DB` 오브젝트를 만들고, `find`로 가져올 수 있습니다. 
```javascript
var
// history db
historyDB = TestBox.DB('test__HISTORY');

db.find({filter:}, function(historyDataSet) {...})
```

## UPPERCASE-DB 단독 사용
`UPPERCASE-DB`는 `UPPERCASE`에 포함되어 있으나, 단독으로 사용할 수도 있습니다.

### 의존 모듈
`UPPERCASE-DB`는 아래 모듈들에 의존성을 가지므로, 단독으로 사용할 경우 `UPPERCASE-DB` 폴더와 함께 아래 모듈들을 복사해서 사용하시기 바랍니다.
* UJS-NODE.js

## 사용 방법
```javascript
// load UJS.
require('../../../UJS-NODE.js');

// load UPPERCASE-DB.
require('../../../UPPERCASE-DB/NODE.js');

CONNECT_TO_DB_SERVER({
	name : 'test'
}, function() {

	var
	// db
	db = TestBox.DB('test');
	...
});
```
