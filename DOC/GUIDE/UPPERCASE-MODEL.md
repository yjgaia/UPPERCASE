작성중

# UPPERCASE-MODEL
UPPERCASE-MODEL은 [MVC 패턴](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC)에서 모델에 해당하는 부분을 다루기 위해 필요한 기능들을 담고 있는 모듈입니다. 데이터 모델 구조에 맞게 서버와 클라이언트 사이에서 데이터를 전달하고, 필요에 따라 데이터를 데이터베이스에 저장하거나 불러옵니다. 또한 복잡한 Business Logic을 추가하여 모델을 확장시킬 수 있습니다.

구동을 위해 [UPPERCASE-ROOM](UPPERCASE-ROOM.md) 및 [UPPERCASE-DB](UPPERCASE-DB.md)가 필요합니다.

*UPPERCASE-MODEL 모듈을 따로 사용하는 것이 아닌, UPPERCASE를 기반으로 프로젝트를 생성하는 경우에는 [모델 생성](CREATE_MODEL.md) 문서를 참고하시기 바랍니다.*

* [API 문서](../../API/UPPERCASE-MODEL/README.md)

## 목차
* [사용방법](#사용방법)
* [`Box.MODEL`](#model)
* [초기 데이터 설정](#초기-데이터-설정)
* [함수별 설정](#함수별-설정)
* [함수별 전처리/후처리 설정](#함수별-전처리후처리-설정)
* [모델 기능 확장](#모델-기능-확장)

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

UPPERCASE-MODEL은 UPPERCASE-ROOM을 기반으로 하기 때문에 룸 서버 설정을 완료한 후에 사용이 가능합니다. 룸 서버 설정에 대한 자세한 내용은 [UPPERCASE-ROOM 문서](UPPERCASE-ROOM.md)를 살펴보시기 바랍니다.

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
			
			// 함수별 설정을 지정합니다.
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

`params`에서 `return`으로 사용 가능한 파라미터 목록은 다음과 같습니다.

* `roomServerName` 접속할 룸 서버의 이름. 여러 룸 서버에 접속한 경우 임의로 지정합니다.
* `name` 모델 명
* `initData` 초기화 데이터. 자세한 내용은 [초기화 데이터](#초기화-데이터) 항목을 참고하시기 바랍니다.
* `methodConfig` 함수별 설정. 자세한 내용은 [함수별 설정](#함수별-설정) 항목을 참고하시기 바랍니다.

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
					min : 1,
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

`Box.MODEL`를 상속받은 객체의 함수들은 다음과 같습니다.

### `create`
* `Model.create(data, (savedData) => {})`
* `Model.create(data, {error:, notValid:, success:})`

데이터를 생성합니다. `isNotUsingObjectId`가 `true`가 아니고 `data`에 `id`를 따로 지정하지 않으면 `id`가 자동으로 생성됩니다. 또한 데이터 생성 시간이 `createTime`에 저장됩니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

```javascript
Model.create({
	msg : 'Hello, DB!',
	number : 12
}, (savedData) => {
	console.log('데이터 생성 완료', savedData);
});
```

### `get`
* `Model.get(id, (savedData) => {})`
* `Model.get(id, {error:, notExists:, success:})`
* `Model.get({filter:, sort:, isRandom:}, {error:, notExists:, success:})`
* `Model.get((savedData) => {})` 가장 최근 데이터를 가져옵니다.

`id`에 해당하는 데이터를 가져옵니다. 혹은 `filter`에 해당하는 데이터를 가져옵니다. `filter`는 [MongoDB의 Query Selector](MONGODB_QUERY_SELECTOR.md)를 사용합니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

```javascript
Model.get('5636e47415899c3c04b5e70f', {
    notExists : () => {
		console.log('데이터가 존재하지 않습니다.');
	},
	success : (savedData) => {
		console.log('데이터:', savedData);
	}
});
```

### `getWatching`
* `Model.getWatching(id, (savedData, addUpdateHandler, addRemoveHandler, exit) => {})` 데이터가 수정 될 때 `addUpdateHandler`를, 데이터가 삭제 될 때 `addRemoveHandler`를 실행합니다. 더 이상 변화를 감지하지 않고자 하는 경우에는 `exit`을 실행합니다.
* `Model.getWatching(id, {error:, notExists:, success:})`
* `Model.getWatching({filter:, sort:, isRandom:}, {error:, notExists:, success:})`

데이터를 가져오고, 해당 데이터가 수정되거나 삭제될 때를 감지합니다.

웹 브라우저 환경에서만 사용할 수 있습니다.

```javascript
Model.getWatching('5636e47415899c3c04b5e70f', {
    notExists : () => {
		console.log('데이터가 존재하지 않습니다.');
	},
	success : (savedData, addUpdateHandler, addRemoveHandler, exit) => {
		
		console.log('데이터:', savedData);
		
		addUpdateHandler((savedData) => {
	    	console.log('데이터가 수정되었습니다.', savedData);
		});
		
		addRemoveHandler(() => {
			console.log('데이터가 삭제되었습니다.');
		});
	}
});
```

### `update`
* `Model.update(data, (savedData, originData) => {})`
* `Model.update(data, {error:, notValid:, notExists:, success:})`

데이터를 수정합니다. `lastUpdateTime`에 마지막 수정 시간이 저장됩니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

```javascript
Model.update({
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
Model.update({
	...
	$inc : {
		num : 2
	}
}, ...);
```
```javascript
// num이 2 감소합니다.
Model.update({
	...
	$inc : {
		num : -2
	}
}, ...);
```

* `$push`
```javascript
// 배열 array에 3을 추가합니다.
Model.update({
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
Model.update({
	...
	$addToSet : {
		array : 3
	}
}, ...);
```

* `$pull`
```javascript
// 배열 array에서 3을 제거합니다.
Model.update({
	...
	$pull : {
		array : 3
	}
}, ...);
```

* `$pull`
```javascript
// 배열 array에서 a가 3인 데이터를 제거합니다.
Model.update({
	...
	$pull : {
		array : {
			a : 3
		}
	}
}, ...);
```

`update`명령어가 동시에 여러번 호출된 경우 비동기 처리에 의해 모든 `update`의 결과는 최종적으로 수정된 같은 데이터를 반환합니다.

### `updateNoHistory`
사용 방식은 `update`와 동일하나, 변경 내역을 남기지 않고 데이터를 수정합니다. 그러나 `lastUpdateTime`은 갱신됩니다.

Node.js 환경에서만 사용할 수 있습니다.

### `updateNoRecord`
사용 방식은 `update`와 동일하나, 변경 내역과 마지막 수정 시간 등 아무런 기록을 남기지 않고 데이터를 수정합니다.

Node.js 환경에서만 사용할 수 있습니다.

### `remove`
* `Model.remove(id, (originData) => {})`
* `Model.remove(id, {error:, notExists:, success:})`

`id`에 해당하는 데이터를 삭제합니다.

```javascript
Model.remove('5636e47415899c3c04b5e70f', {
    notExists : () => {
		console.log('데이터가 존재하지 않습니다.');
	},
	success : (originData) => {
		console.log('삭제된 데이터:', originData);
	}
});
```

### `find`
* `Model.find({filter:, sort:, start:, count:}, (savedDataSet) => {})`
* `Model.find({filter:, sort:, start:, count:}, {error:, success:})`

`filter`에 해당하는 데이터를 찾아 목록으로 가져옵니다. `filter`는 [MongoDB의 Query Selector](MONGODB_QUERY_SELECTOR.md)를 사용합니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

```javascript
Model.find({
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

Model.find({
    filter : {
        number : undefined
    }
}, (savedDataSet) => {
	console.log('검색된 데이터 목록:', savedDataSet);
});

Model.find((savedDataSet) => {
	console.log('검색된 데이터 목록:', savedDataSet);
});
```

`find`로 가져올 수 있는 데이터의 최대 개수는 `NODE_CONFIG.maxDataCount`에 설정한 숫자입니다. 이를 무시하고 모든 데이터를 가져오고자 하는 경우에는 `isFindAll` 파라미터를 `true`로 설정합니다. (Node.js 환경에서만 사용 가능합니다.) 성능에 치명적인 영향을 끼칠 수 있으므로 주의하시기 바랍니다.

```javascript
Model.find({
    filter : {
        number : 3
    },
    isFindAll : true
}, (savedDataSet) => {
	console.log('모든 데이터 목록:', savedDataSet);
});
```

### `findWatching`
* `Model.findWatching({filter:, sort:, start:, count:}, (savedDataSet, addUpdateHandler, addRemoveHandler, exit) => {})` 데이터가 수정 될 때 `addUpdateHandler`를, 데이터가 삭제 될 때 `addRemoveHandler`를 실행합니다. 더 이상 변화를 감지하지 않고자 하는 경우에는 `exit`을 실행합니다.
* `Model.findWatching({filter:, sort:, start:, count:}, {error:, success:})`

`filter`에 해당하는 데이터를 찾아 목록으로 가져오고, 각 데이터가 수정되거나 삭제될 때를 감지합니다.

웹 브라우저 환경에서만 사용할 수 있습니다.

```javascript
Model.findWatching({
    filter : {
        number : 3
    },
    sort : {
        createTime : -1
    }
}, (savedDataSet, addUpdateHandler, addRemoveHandler, exit) => {
	
	console.log('검색된 데이터 목록:', savedDataSet);
	
	EACH(savedDataSet, (savedData) => {
		
		addUpdateHandler(savedData.id, (savedData) => {
	    	console.log('데이터가 수정되었습니다.', savedData);
		});
		
		addRemoveHandler(savedData.id, () => {
			console.log('데이터가 삭제되었습니다.');
		});
	});
});
```

### `count`
* `Model.count({filter:}, (count) => {})`
* `Model.count({filter:}, {error:, success:})`

`filter`에 해당하는 데이터의 개수를 가져옵니다. `filter`는 [MongoDB의 Query Selector](MONGODB_QUERY_SELECTOR.md)를 사용합니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

```javascript
Model.count({
    filter : {
        number : 3
    }
}, (count) => {
	console.log('검색된 데이터의 개수:', count);
});
```

### `checkIsExists`
* `Model.checkIsExists({filter:}, (isExists) => {})`
* `Model.checkIsExists({filter:}, {error:, success:})`

`filter`에 해당하는 데이터가 존재하는지 확인합니다. `filter`는 [MongoDB의 Query Selector](MONGODB_QUERY_SELECTOR.md)를 사용합니다.

Node.js와 웹 브라우저 환경 양쪽에서 사용 가능합니다.

```javascript
Model.checkIsExists({
    filter : {
        number : 3
    }
}, (isExists) => {
	if (isExists === true) {
		console.log('데이터가 존재합니다.');
	} else {
		console.log('데이터가 존재하지 않습니다.');
	}
});
```

### `onNew`
* `Model.onNew(properties, handler)`

신규 데이터가 생길 때 받아옵니다.

웹 브라우저 환경에서만 사용할 수 있습니다.

### `onNewWatching`
* `TestBox.TestModel.onNewWatching(properties, handler)`

웹 브라우저 환경에서만 사용할 수 있습니다.

### `onNewAndFind`
* `TestBox.TestModel.onNewAndFind({properties:, filter:, sort:, start:, count:}, {error:, success:})`

신규 데이터가 생길 때 받아오며, 최초 한번 데이터들을 찾아 가져옵니다.

웹 브라우저 환경에서만 사용할 수 있습니다.

### `onNewAndFindWatching`
* `TestBox.TestModel.onNewAndFindWatching({properties:, filter:, sort:, start:, count:}, {error:, success:})`

웹 브라우저 환경에서만 사용할 수 있습니다.

### `onRemove`
* `TestBox.TestModel.onRemove(properties, handler)`

모델에서 데이터가 삭제 될 때 받아옵니다.

웹 브라우저 환경에서만 사용할 수 있습니다.

## 초기 데이터 설정
초기 데이터를 설정하면, `create`함수로 데이터를 생성할 때 주어진 데이터에 초기 데이터를 덮어 씌우고 생성하게 됩니다.

```javascript

```

## 함수별 설정
`create`, `get`, `update`, `remove`, `find`, `count`, `checkIsExist` 함수들에 대해 설정을 지정할 수 있습니다.

### 함수를 사용하지 않음
단순히 `false`를 지정하게 되면, 해당 함수 자체를 생성하지 않습니다.

```javascript
TestBox.TestModel = OBJECT({
    
    preset : () => {
        return TestBox.MODEL;
    },
    
    params : () => {
        return {
            name : 'Test',
            methodConfig : {
                // create 함수를 생성하지 않습니다.
                create : false
            }
        };
    }
});

// create 함수를 생성하지 않았으므로 오류 발생
TestBox.TestModel.create({
    name : 'YJ',
    age : 30
});
```

### `valid`
`create`와 `update` 함수에는 `valid` 설정을 지정할 수 있습니다. `valid` 설정을 지정하면 데이터를 생성하거나 수정할 때, 주어진 데이터를 검증하게 됩니다.

```javascript
TestBox.TestModel = OBJECT({
    
    preset : () => {
        return TestBox.MODEL;
    },
    
    params : () => {
    
        let validDataSet = {
        
            // 이름
			name : {
			    // 이름은 필수로 입력해야 합니다.
				notEmpty : true,
				// 이름은 최소 1글자 이상, 255글자 이하입니다.
				size : {
					min : 1,
					max : 255
				}
			},
			
			// 나이
			age : {
			    // 나이는 필수로 입력해야 합니다.
				notEmpty : true,
				// 나이는 숫자입니다.
				integer : true
			},
			
			// 남자인가?
			isMan : {
				bool : true
			}
		};
        
        return {
            name : 'Test',
            methodConfig : {
                // 데이터를 생성하거나 수정할 때 데이터를 검증합니다.
                create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				}
            }
        };
    }
});

// 데이터 검증 실패 (name 값이 없고, age가 숫자가 아님)
TestBox.TestModel.create({
    age : '30살'
}, {
    notValid : (validErrors) => {
        console.log('데이터 검증에 실패하였습니다.', validErrors);
    }
});
```

### `role`
`clientInfo.roles` 배열에 해당 롤이 포함되어 있는 경우에 실행 가능도록 설정합니다. 회원 전용 기능 등을 구현할 때 유용합니다.

### `authKey`
`create`와 `update`, `remove` 함수에는 `authKey` 설정을 지정할 수 있습니다. 

`create`의 경우 데이터의 `authKey`에 `clientInfo.authKey`의 값을 삽입합니다.

```javascript

```

`update` 및 `remove`의 경우 원래 데이터의 `authKey`의 값이 `clientInfo.authKey`와 동일한 경우에만 실행됩니다.

```javascript

```

### `adminRole`
`clientInfo.roles` 배열에 해당 롤이 포함되어 있는 경우에 실행 가능도록 설정합니다. `role` 설정과 `authKey` 설정에 해당하지 않는 경우에도, `adminRole` 설정에 해당되면 실행 가능한 것이 특징입니다. 운영자 전용 기능 등을 구현할 때 유용합니다.

```javascript

```

## 함수별 전처리/후처리 설정
`clientInfo`는 `undefined` 일 수 있습니다.

## 모델 기능 확장
API에서 기본으로 제공되지 않는 기능들은 직접 구현하여 모델을 확장시킬 수 있습니다. 모델 확장은 node.js 환경과 웹 브라우저 환경에서 각각 진행합니다.

### node.js 환경에서 모델 확장 예시
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

### 웹 브라우저 환경에서 모델 확장 예시
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