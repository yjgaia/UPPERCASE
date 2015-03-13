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