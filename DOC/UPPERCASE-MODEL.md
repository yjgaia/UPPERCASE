# UPPERCASE-MODEL
UPPERCASE는 Model-View 패턴을 따릅니다. 이 모듈은 Model-View 패턴에서 Model 부분을 다루고 있습니다. 자체적으로 제공하는 기본적인 기능들 외에도 모델에 복잡한 Business Logic을 추가하여 확장시킬 수 있습니다.

## 모델 구현 예시
```javascript
// Example Model
TestBox.TestModel = OBJECT({

	preset : function() {
		return TestBox.MODEL;
	},

	params : function() {

		var
		// valid data set
		validDataSet = {
			name : {
				notEmpty : true,
				size : {
					min : 0,
					max : 255
				}
			},
			age : {
				notEmpty : true,
				integer : true
			},
			isMan : {
				bool : true
			}
		};

		return {
			name : 'Test',
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				},
				remove : {
					role : 'Test'
				}
			}
		};
	}
});
```

## API
* `MODEL` Model(include CRUD functions) interface [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/MODEL/CLIENT/MODEL.js)
```javascript
TestBox.TestModel = OBJECT({
	preset : function() {
		return TestBox.MODEL;
	},
	params : function() {
		return {
			name : 'Test',
			methodConfig : {
				create : ...,
                get : ...,
				update : ...,
				remove : ...,
                find : ...,
                count : ...,
                checkIsExists : ...
			}
		};
	}
});
TestBox.TestModel.create(data, function() {...})
TestBox.TestModel.create(data, {error:, success:})
TestBox.TestModel.get(id, function() {...}) // id가 undefined 일 수도 있습니다. 이 때는 가장 최근 데이터를 가져옵니다.
TestBox.TestModel.get(id, {success:, notExists:, error:})
TestBox.TestModel.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})
TestBox.TestModel.update(data, function() {...})
TestBox.TestModel.update(data, {success:, notExists:, error:})
TestBox.TestModel.remove(id, function() {...})
TestBox.TestModel.remove(id, {success:, notExists:, error:})
TestBox.TestModel.find({filter:, sort:, start:, count:}, function() {...})
TestBox.TestModel.find({filter:, sort:, start:, count:}, {error:, success:})
TestBox.TestModel.count({filter:}, function() {...})
TestBox.TestModel.count({filter:}, {error:, success:})
TestBox.TestModel.checkIsExists({filter:}, function() {...})
TestBox.TestModel.checkIsExists({filter:}, {error:, success:})
TestBox.TestModel.onNew(properties, handler)
TestBox.TestModel.onNewWatching(properties, handler)
TestBox.TestModel.onNewAndFind({properties:, filter:, sort:, start:, count:}, {error:, success:})
TestBox.TestModel.onNewAndFindWatching({properties:, filter:, sort:, start:, count:}, {error:, success:})
TestBox.TestModel.onRemove(properties, handler)
```

## 모델 확장
API에서 기본으로 제공되지 않는 기능들은 직접 구현하여 모델을 확장시킬 수 있습니다. 모델 확장은 node.js 환경과 웹 브라우저 환경에서 각각 진행합니다.

### node.js 환경에서 모델 확장 예시
```javascript
OVERRIDE(TestBox.TestModel, function(origin) {
	'use strict';

    TestBox.TestModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {

            // 아래와 같은 방법으로 기본적으로 제공하는 create, get, update, remove, find, count, checkIsExists를 확장할 수 있습니다.
			inner.on('create', {

				before : function(data, next, ret, clientInfo) {

					// 데이터를 생성하기 전에 실행되는 함수입니다.
					// return false; 를 하면, 이 함수가 실행되고 난 후 자동으로 데이터베이스에 값이 생성되지 않고, 데이터베이스에 값을 생성하기 위해서는 반드시 next(); 를 실행해야 합니다.
					// ret 함수는 클라이언트에 직접 데이터를 전달할 때 사용합니다.
				},

				after : function(savedData, next, ret, clientInfo) {

					// 데이터가 생성되고 난 후 실행되는 함수입니다.
					// return false; 를 하면, 이 함수가 실행되고 난 후 자동으로 클라이언트에 값을 전달하지 않고, 클라이언트에 값을 전달하기 위해서는 반드시 next(); 를 실행해야 합니다.
					// ret 함수는 클라이언트에 직접 데이터를 전달할 때 사용합니다.
				}
			});
			
			// 그냥 함수를 추가하게 되면 after로 인식됩니다.
			inner.on('get', function(savedData, next, ret, clientInfo) {
				...
			});
			
			inner.on('get', {

				before : function(idOrParams, next, ret, clientInfo) {
					
					// get의 경우엔 맨 첫 파라미터가 id가 될 수도, filter와 sort 등이 담긴 params가 될 수도 있습니다.
					// 또한 idOrParams가 undefined가 될 수 있기 때문에 관련 처리를 해 주어야 합니다. 
				},

				after : function(savedData, next, ret, clientInfo) {
					...
				}
			});
			
			// 모델에서 사용하는 룸과 같은 룸을 생성하여, 클라이언트에서 모델의 룸으로 전달하는 메시지를 받아서 처리할 수 있습니다.
			TestBox.ROOM(self.getName(), function(clientInfo, on) {

				on(...
			});
		}
	});
});
```

### 웹 브라우저 환경에서 모델 확장 예시
```javascript
OVERRIDE(TestBox.TestModel, function(origin) {
	'use strict';

    TestBox.TestModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {

			var
			// 모델에서 사용하는 룸을 가져옵니다.
			room = self.getRoom();
			
			room.send(...
		}
	});
});
```

## UPPERCASE-MODEL 단독 사용
`UPPERCASE-MODEL`은 `UPPERCASE`에 포함되어 있으나, 단독으로 사용할 수도 있습니다.

### 의존 모듈
`UPPERCASE-MODEL`은 아래 모듈들에 의존성을 가지므로, 단독으로 사용할 경우 `UPPERCASE-MODEL` 폴더와 함께 아래 모듈들을 복사해서 사용하시기 바랍니다.
* UPPERCASE-DB
* UPPERCASE-ROOM
* UPPERCASE-TRANSPORT
* UJS-NODE.js
* UJS-BROWSER.js
* UJS-BROWSER-FIX

또한 `UPPERCASE-MODEL`은 `UPPERCASE-ROOM`을 기반으로 하기 때문에 룸 서버 설정을 완료한 후 사용 가능합니다. 이에 대한 자세한 사항은 [UPPERCASE-ROOM](UPPERCASE-ROOM.md) 문서를 살펴보시기 바랍니다. 실제 모델 구현은 node.js 환경과 웹 브라우저 환경에서 동일한 코드로 작성할 수 있습니다.

### node.js 환경에서 필요한 모듈 import
```javascript
// load UJS.
require('../../../UJS-NODE.js');

// load UPPERCASE-TRANSPORT.
require('../../../UPPERCASE-TRANSPORT/NODE.js');

// load UPPERCASE-ROOM.
require('../../../UPPERCASE-ROOM/NODE.js');

// load UPPERCASE-DB.
require('../../../UPPERCASE-DB/NODE.js');

// load UPPERCASE-MODEL.
require('../../../UPPERCASE-MODEL/NODE.js');
```

### 웹 브라우저 환경에서 필요한 모듈 import
```html
<!-- import UJS -->
<script src="UJS-BROWSER.js"></script>
<script>
	BROWSER_CONFIG.fixScriptsFolderPath = 'UJS-BROWSER-FIX';
	LOAD('UJS-BROWSER-FIX/FIX.js');
</script>

<!-- import UPPERCASE-TRANSPORT -->
<script src="UPPERCASE-TRANSPORT/BROWSER.js"></script>

<!-- import UPPERCASE-ROOM -->
<script src="UPPERCASE-ROOM/BROWSER.js"></script>

<!-- import UPPERCASE-MODEL -->
<script src="UPPERCASE-MODEL/BROWSER.js"></script>
```
