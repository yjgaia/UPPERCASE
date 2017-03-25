작성중

# UPPERCASE-MODEL
UPPERCASE-MODEL은 [MVC 패턴](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC)에서 Model에 해당하는 부분을 다루기 위해 필요한 기능들을 담고 있는 모듈입니다. 데이터 모델 구조에 맞게 서버와 클라이언트 사이에서 데이터를 전달하고, 필요에 따라 데이터를 데이터베이스에 저장하거나 불러옵니다. 또한 복잡한 Business Logic을 추가하여 확장시킬 수 있습니다.

구동을 위해 [UPPERCASE-ROOM](UPPERCASE-ROOM.md) 및 [UPPERCASE-DB](UPPERCASE-DB.md)가 필요합니다.
* [API 문서](../../API/UPPERCASE-MODEL/README.md)

## 목차
* [사용방법](#사용방법)
* [`Box.MODEL`](#model)

## 사용방법
UPPERCASE 프로젝트 내 `UPPERCASE-MODEL` 폴더를 복사하여 사용하거나, `npm`으로 설치하여 사용합니다.

### `UPPERCASE-MODEL` 폴더를 복사하는 경우
```javascript
require('./UPPERCASE-CORE/NODE.js');
require('./UPPERCASE-ROOM/NODE.js');
require('./UPPERCASE-DB/NODE.js');
require('./UPPERCASE-MODEL/NODE.js');
```

### `npm`을 사용하는 경우
```
npm install uppercase-model
```
```javascript
require('uppercase-model');
```

UPPERCASE-MODEL은 UPPERCASE-ROOM을 기반으로 하기 때문에 룸 서버 설정을 완료한 후 사용 가능합니다. 이에 대한 자세한 사항은 [UPPERCASE-ROOM 문서](UPPERCASE-ROOM.md)를 살펴보시기 바랍니다.

## `Box.MODEL`
`Box.MODEL` 클래스

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

모델의 기본적인 모습은 다음과 같습니다.
```javascript
/*
 * Test 모델
 */
TestBox.TestModel = OBJECT({
	
	preset : () => {
		return TestBox.MODEL;
	},
	
	params : () => {
	    
	    ...
	    
		return {
		    // 모델 명을 지정합니다.
			name : 'Test',
			
			// 각 함수들의 설정을 지정합니다.
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
```

### 모델 구현 예시
```javascript
/*
 * Test 모델
 */
TestBox.TestModel = OBJECT({

	preset : () => {
		return TestBox.MODEL;
	},

	params : () => {

		let validDataSet = {
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

`Box.MODEL`로 생성한 객체의 함수들은 다음과 같습니다.

### `create`
// 데이터를 저장합니다.
TestBox.TestModel.create(data, (savedData) => {...})
TestBox.TestModel.create(data, {error:, success:})

### `get`
// 데이터를 가져옵니다.
TestBox.TestModel.get(id, (savedData) => {...}) // id가 undefined 일 수도 있습니다. 이 때는 가장 최근 데이터를 가져옵니다.
TestBox.TestModel.get(id, {success:, notExists:, error:})
TestBox.TestModel.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})

### `getWatching`
// 데이터를 가져오고, 해당 데이터가 수정되거나 삭제될 때를 감지합니다.
TestBox.TestModel.getWatching(id, (savedData, addUpdateHandler, addRemoveHandler, exit) => {...}) // 데이터가 수정 될 때 addUpdateHandler를, 데이터가 삭제 될 때 addRemoveHandler를 실행합니다. 더 이상 변화를 감지하지 않고자 하는 경우에는 exit을 실행합니다.
TestBox.TestModel.getWatching(id, {success:, notExists:, error:})
TestBox.TestModel.getWatching({filter:, sort:, isRandom:}, {success:, notExists:, error:})

### `update`
// 데이터를 수정합니다.
TestBox.TestModel.update(data, (savedData, originData) => {...})
TestBox.TestModel.update(data, {success:, notExists:, error:})

### `updateNoHistory`
TestBox.TestModel.updateNoHistory(data, (savedData, originData) => {...}) // 변경 내역을 남기지 않습니다. (node.js 환경에서만 제공)
TestBox.TestModel.updateNoHistory(data, {success:, notExists:, error:}) // 변경 내역을 남기지 않습니다. (node.js 환경에서만 제공)

### `updateNoRecord`
TestBox.TestModel.updateNoRecord(data, (savedData, originData) => {...}) // 변경 내역과 마지막 수정 시간 등 아무런 기록을 남기지 않습니다. (node.js 환경에서만 제공)
TestBox.TestModel.updateNoRecord(data, {success:, notExists:, error:}) // 변경 내역과 마지막 수정 시간 등 아무런 기록을 남기지 않습니다. (node.js 환경에서만 제공)

### `remove`
// 데이터를 삭제합니다.
TestBox.TestModel.remove(id, (originData) => {...})
TestBox.TestModel.remove(id, {success:, notExists:, error:})

### `find`
// 데이터를 찾아 목록으로 가져옵니다.
TestBox.TestModel.find({filter:, sort:, start:, count:}, (savedDataSet) => {...})
TestBox.TestModel.find({filter:, sort:, start:, count:}, {error:, success:})

### `findWatching`
// 데이터를 찾아 목록으로 가져오고, 각 데이터가 수정되거나 삭제될 때를 감지합니다.
TestBox.TestModel.findWatching({filter:, sort:, start:, count:}, (savedDataSet, addUpdateHandler, addRemoveHandler, exit) => {...}) // 데이터가 수정 될 때 addUpdateHandler를, 데이터가 삭제 될 때 addRemoveHandler를 실행합니다. 더 이상 변화를 감지하지 않고자 하는 경우에는 exit을 실행합니다.
TestBox.TestModel.findWatching({filter:, sort:, start:, count:}, {error:, success:})

### `count`
// 데이터의 개수를 가져옵니다.
TestBox.TestModel.count({filter:}, (count) => {...})
TestBox.TestModel.count({filter:}, {error:, success:})

### `checkIsExists`
// 데이터가 존재하는지 확인합니다.
TestBox.TestModel.checkIsExists({filter:}, (isExists) => {...})
TestBox.TestModel.checkIsExists({filter:}, {error:, success:})

### `onNew`
// 신규 데이터가 생길 때 받아옵니다.
TestBox.TestModel.onNew(properties, handler)

### `onNewWatching`
TestBox.TestModel.onNewWatching(properties, handler)

### `onNewAndFind`
// 신규 데이터가 생길 때 받아오며, 최초 한번 데이터들을 찾아 가져옵니다.
TestBox.TestModel.onNewAndFind({properties:, filter:, sort:, start:, count:}, {error:, success:})

### `onNewAndFindWatching`
TestBox.TestModel.onNewAndFindWatching({properties:, filter:, sort:, start:, count:}, {error:, success:})

### `onRemove`
// 모델에서 데이터가 삭제 될 때 받아옵니다.
TestBox.TestModel.onRemove(properties, handler)

### 모델 확장
API에서 기본으로 제공되지 않는 기능들은 직접 구현하여 모델을 확장시킬 수 있습니다. 모델 확장은 node.js 환경과 웹 브라우저 환경에서 각각 진행합니다.

#### node.js 환경에서 모델 확장 예시
```javascript
OVERRIDE(TestBox.TestModel, (origin) => {

    TestBox.TestModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {

            // 아래와 같은 방법으로 기본적으로 제공하는 create, get, update, remove, find, count, checkIsExists를 확장할 수 있습니다.
			inner.on('create', {

				before : (data, next, ret, clientInfo) => {

					// 데이터를 생성하기 전에 실행되는 함수입니다.
					// return false; 를 하면, 이 함수가 실행되고 난 후 자동으로 데이터베이스에 값이 생성되지 않고, 데이터베이스에 값을 생성하기 위해서는 반드시 next(); 를 실행해야 합니다.
					// ret 함수는 클라이언트에 직접 데이터를 전달할 때 사용합니다.
				},

				after : (savedData, next, ret, clientInfo) => {

					// 데이터가 생성되고 난 후 실행되는 함수입니다.
					// return false; 를 하면, 이 함수가 실행되고 난 후 자동으로 클라이언트에 값을 전달하지 않고, 클라이언트에 값을 전달하기 위해서는 반드시 next(); 를 실행해야 합니다.
					// ret 함수는 클라이언트에 직접 데이터를 전달할 때 사용합니다.
				}
			});
			
			// 그냥 함수를 추가하게 되면 after로 인식됩니다.
			inner.on('get', (savedData, next, ret, clientInfo) => {
				...
			});
			
			inner.on('get', {

				before : (idOrParams, next, ret, clientInfo) => {
					
					// get의 경우엔 맨 첫 파라미터가 id가 될 수도, filter와 sort 등이 담긴 params가 될 수도 있습니다.
					// 또한 idOrParams가 undefined가 될 수 있기 때문에 관련 처리를 해 주어야 합니다. 
				},

				after : (savedData, next, ret, clientInfo) => {
					...
				}
			});
			
			// 모델에서 사용하는 룸과 같은 룸을 생성하여, 클라이언트에서 모델의 룸으로 전달하는 메시지를 받아서 처리할 수 있습니다.
			TestBox.ROOM(self.getName(), (clientInfo, on) => {

				on(...
			});
		}
	});
});
```

#### 웹 브라우저 환경에서 모델 확장 예시
```javascript
OVERRIDE(TestBox.TestModel, (origin) => {

    TestBox.TestModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {

			// 모델에서 사용하는 룸을 가져옵니다.
			let room = self.getRoom();
			
			room.send(...
		}
	});
});
```