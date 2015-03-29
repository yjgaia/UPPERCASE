# UPPERCASE.IO-DB
※ 이 문서는 작성중인 문서입니다.

`UPPERCASE.IO-DB`는 `UPPERCASE.JS`와 `UPPERCASE.IO-BOX` 모듈을 기반으로 합니다.

MongoDB는 32bit 컴퓨터에서는 심각한 제한이 있습니다. 32bit 컴퓨터가 다룰 수 있는 크기가 최대 4gb 이기 때문입니다.

```javascript
// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-BOX.
require('../../../UPPERCASE.IO-BOX/CORE.js');
require('../../../UPPERCASE.IO-BOX/NODE.js');

// load UPPERCASE.IO-DB.
require('../../../UPPERCASE.IO-DB/NODE.js');
```

### 사용 가능한 특수 기호

###### filter에서
* $and
* $or
* $gt
* $gte
* $lt
* $lte
* $ne

###### update 시
* $inc



###### 데이터베이스 관련
* `주의사항` 실제 운영 시에 `node-mongodb-client`를 반드시 해당 운영체제에 맞게 컴파일 해 주시기 바랍니다.
* `주의사항` DB의 update명령어가 동시에 여러번 호출 될 경우 모든 update는 같은 데이터(수정된)를 반환합니다.
* `주의사항` find 명령시 filter의 모든 property가 `undefined`로만 이루어진 경우, 모든 값을 가져옵니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려는 경우에는, `CHECK_ARE_SAME([{}, filter])`로 filter가 비어있는지 검사해 주시기 바랍니다.

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




###### 데이터베이스 관련
* `CONNECT_TO_DB_SERVER({username:, password:, host:, port:, name:}, function() {...})` connect to MongoDB server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)
