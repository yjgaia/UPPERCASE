# UPPERCASE.IO-DB
`node-mongodb-client`를 사용하기 쉽게 Wrapping한 모듈입니다.

*※ UPPERCASE.IO 기반 프로젝트는 이 모듈이 자동으로 포함됩니다. 이하 내용들은 이 모듈을 따로 사용할 때 필요한 내용입니다.*

## 파일 구성
* UPPERCASE.IO-DB 폴더
* UPPERCASE.JS-COMMON.js
* UPPERCASE.JS-NODE.js

## 사용 방법
`UPPERCASE.IO-DB`는 `UPPERCASE.JS`를 기반으로 합니다.

```javascript
// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-DB.
require('../../../UPPERCASE.IO-DB/NODE.js');

CONNECT_TO_DB_SERVER({
	name : 'test'
}, function() {

	var
	// db
	db = TestBox.DB('test');
	...
});
```

## API
* `CONNECT_TO_DB_SERVER({username:, password:, host:, port:, name:}, function() {...})` connect to MongoDB server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)
* `DB(name)` MongoDB collection wrapper [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)
```javascript
db = TestBox.DB('test');
db.create(data, function() {...})
db.create(data, {error:, success:})
db.get(id, function() {...})
db.get(id, {success:, notExists:, error:})
db.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})
db.update(data, function() {...})
db.update(data, {success:, notExists:, error:})
db.remove(id, function() {...})
db.remove(id, {success:, notExists:, error:})
db.find({filter:, sort:, start:, count:}, function() {...})
db.find({filter:, sort:, start:, count:}, {error:, success:})
db.count({filter:}, function() {...})
db.count({filter:}, {error:, success:})
db.checkIsExists({filter:}, function() {...})
db.checkIsExists({filter:}, {error:, success:})
```
* `LOG_DB(name)` MongoDB collection wrapper class for logging [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/LOG_DB.js)
```javascript
logDB = TestBox.LOG_DB('testLog');
logDB.log(data)
```

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
    $gt : {
        a : 3
    }
}
```
* `$gte`
```javascript
// a가 3보다 크거나 같은 데이터를 찾습니다.
filter : {
    $gte : {
        a : 3
    }
}
```
* `$lt`
```javascript
// a가 3보다 작은 데이터를 찾습니다.
filter : {
    $lt : {
        a : 3
    }
}
```
* `$lte`
```javascript
// a가 3보다 작거나 같은 데이터를 찾습니다.
filter : {
    $lte : {
        a : 3
    }
}
```
* `$ne`
```javascript
// a가 3이 아닌 데이터를 찾습니다.
filter : {
    $ne : {
        a : 3
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

## MongoDB 사용 시 주의사항
* **MongoDB는 32bit 컴퓨터에서는 심각한 제한이 있습니다. 32bit 컴퓨터가 다룰 수 있는 크기가 최대 4gb 이기 때문입니다. 따라서 실제 운영 시에는 반드시 64bit 운영체제 위에서 구동하시기 바랍니다.**
* 실제 운영 시에 `node-mongodb-client`를 반드시 해당 운영체제에 맞게 컴파일 해 주시기 바랍니다.
* DB의 update명령어가 동시에 여러번 호출 될 경우 비동기 처리에 의해 모든 update는 같은 데이터(수정된)를 반환합니다.
* find 명령시 filter의 모든 property가 `undefined`로만 이루어진 경우, 모든 값을 가져옵니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려는 경우에는, `CHECK_ARE_SAME([{}, filter])`로 filter가 비어있는지 검사해 주시기 바랍니다.