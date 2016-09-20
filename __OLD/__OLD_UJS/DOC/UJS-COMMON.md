
# BOX
UJS 기반 프로젝트에서, BOX는 모듈과 같은 개념입니다.

### BOX 만들기
`BOX`라는 명령으로 BOX를 만들 수 있습니다. 선언부에 작성합니다.

```javascript
// 선언부
BOX('SomeBox');
BOX('SmallBox');
BOX('BigBox');
```

### BOX에 기능 추가하기
만들어진 BOX에 기능을 추가해 보겠습니다. BOX 이름 뒤에 콤마(`.`)를, 그 뒤에 이름과 기능을 작성하면 됩니다.

```javascript
// 선언부
SomeBox.SomeMethod = METHOD(...
SomeBox.SomeClass = CLASS(...
SomeBox.SomeObject = OBJECT(...

// 실행부
SomeBox.SomeMethod();
```

혹은 다음과 같이, BOX 내 집합인 PACK을 추가하고, 만들어진 PACK에 기능을 추가할 수 있습니다. BOX를 함수 형태로 하여 PACK의 이름을 넣고, 콤마(`.`)를, 그 뒤에 이름과 기능을 작성하면 됩니다.

```javascript
// 선언부
SomeBox('SomePack.GoodPack').SomeMethod = METHOD(...
SomeBox('SomePack.GoodPack').SomeClass = CLASS(...
SomeBox('SomePack.GoodPack').SomeObject = OBJECT(...

// 실행부
SomeBox.SomePack.GoodPack.SomeMethod();
```

BOX 시스템을 통해 BOX 단위로 프로젝트를 나눌 수 있습니다. 이를 조합하여 큰 규모의 프로젝트를 제작할 수 있습니다.

### 함수 관련 기능
* `RUN(function() {})` 함수를 실행하고, 결과값을 반환합니다. 코드 블록이 필요한 경우 유용하게 사용할 수 있습니다. [예제보기](../EXAMPLES/COMMON/UTIL/FUNCTION/RUN.js)

    ```javascript
    // a is 1.
    RUN(function() {
    
        var
        // a
        a = 1;
        
        return 'a is ' + a + '.';
    })
    ```

* `RAR(function() {})` `RAR(params, function(params) {})` 함수를 실행하고, 함수를 반환합니다. 선언과 즉시 실행해야 하는 함수를 선언할 때 유용합니다. [예제보기](../EXAMPLES/COMMON/UTIL/FUNCTION/RAR.js)

    ```javascript
    var
    // func.
    func = RAR(function() {
    
        var
        // a
        a = 1;
        
        return 'a is ' + a + '.';
    });
    
    // a is 1.
    func()
    ```

### 반복문 관련 기능
* `REPEAT` 주어진 `count` 만큼 `i` 값을 0부터 1씩 증가시키면서 함수를 실행하거나, `start`에서 `end`까지 `i` 값을 1씩 증가시키면서 함수를 실행하거나, `start`에서 `limit` 이전까지 `i` 값을 1씩 증가시키면서 함수를 실행할 수 있습니다. [예제보기](../EXAMPLES/COMMON/UTIL/REPEAT/REPEAT.js)
    * `REPEAT(count, function(i) {})`
    * `REPEAT({start:, end:}, function(i) {})`
    * `REPEAT({start:, end:, step:}, function(i) {})`
    * `REPEAT({start:, limit:}, function(i) {})`
    * `REPEAT({start:, limit:, step:}, function(i) {})`

    ```javascript
    // run 5 times. i is 0 ~ 4.
    REPEAT(5, function(i) {...})
    
    // run 5 times. i is 1 ~ 5.
    REPEAT({
        start : 1,
        end : 5
    }, function(i) {...})
    
    // run 4 times. i is 1 ~ 4.
    REPEAT({
        start : 1,
        limit : 5
    }, function(i) {...})
    ```

* `EACH` 데이터나 배열의 요소들을 하나씩 꺼내 함수에 넘겨 실행합니다. 도중에 멈추기 위해서는 함수에서 `false`를 반환합니다. 모든 요소들을 처리하였다면 `true`를, 중간에 멈추었다면 `false`를 반환합니다. [예제보기](../EXAMPLES/COMMON/UTIL/REPEAT/EACH.js)
    * `EACH(data, function(value, name) {})`
    * `EACH(array, function(value, key) {})`
    * `EACH(function(value) {})(array)`

    ```javascript
    // 1
    // 2
    EACH({
        a : 1,
        b : 2
    }, function(value) {
        console.log(value);
    })
    
    // a is 1.
    // b is 2.
    EACH({
        a : 1,
        b : 2,
        c : 3
    }, function(value, name) {
        
        console.log(name + ' is ' + value + '.');
        
        if (value === 2) {
            // stop.
            return false;
        }
    })
    
    // 1
    // 2
    EACH([1, 2], function(value) {
        console.log(value);
    })
    
    // array[0] is 1.
    // array[1] is 2.
    EACH([1, 2, 3], function(value, key) {
        
        console.log('array[' + key + '] is ' + value + '.');
        
        if (value === 2) {
            // stop.
            return false;
        }
    })
    
    // array[0] is 1.
    // array[1] is 2.
    EACH(function(value, key) {
        
        console.log('array[' + key + '] is ' + value + '.');
        
        if (value === 2) {
            // stop.
            return false;
        }
    })([1, 2, 3])
    ```
* `REVERSE_EACH` 배열의 요소들을 뒤에서부터 하나씩 꺼내 함수에 넘겨 실행합니다. 도중에 멈추기 위해서는 함수에서 `false`를 반환합니다. 모든 요소들을 처리하였다면 `true`를, 중간에 멈추었다면 `false`를 반환합니다. [예제보기](../EXAMPLES/COMMON/UTIL/REPEAT/REVERSE_EACH.js)
    * `REVERSE_EACH(array, function(value, key) {})`
    * `REVERSE_EACH(function(value) {})(array)`

    ```javascript
    // 2
    // 1
    REVERSE_EACH([1, 2], function(value) {
        console.log(value);
    })
    
    // array[2] is 3.
    // array[1] is 2.
    REVERSE_EACH([1, 2, 3], function(value, key) {
        
        console.log('array[' + key + '] is ' + value + '.');
        
        if (value === 2) {
            // stop.
            return false;
        }
    })
    
    // array[2] is 3.
    // array[1] is 2.
    REVERSE_EACH(function(value, key) {
        
        console.log('array[' + key + '] is ' + value + '.');
        
        if (value === 2) {
            // stop.
            return false;
        }
    })([1, 2, 3])
    ```

### 시간 지연 관련 기능
* `DELAY(seconds, function(delay) {})` `seconds` 초 이후에 함수를 실행하는 클래스입니다. `remove`로 함수 실행을 취소할 수 있습니다. [예제보기](../EXAMPLES/COMMON/UTIL/DELAY/DELAY.js)

    ```javascript
    var
    // delay, run function after 3 seconds.
    delay = DELAY(3, function(delay) {...});
    
    // stop.
    delay.remove()
    ```

* `INTERVAL(seconds, function(interval) {})` `seconds` 초 마다 함수를 실행하는 클래스입니다. `remove`로 멈출 수 있습니다. [예제보기](../EXAMPLES/COMMON/UTIL/DELAY/INTERVAL.js)

    ```javascript
    var
    // interval, run function every 3 seconds.
    interval = INTERVAL(3, function(interval) {...});
    
    // stop.
    interval.remove()
    ```

* `LOOP(fps, function(fps) {})` 1초에 `fps`번 함수를 실행하는 클래스입니다. 게임 개발 등에서 유용하게 사용할 수 있습니다. `changeFPS`로 `fps`를 변경할 수 있고, `remove`로 멈출 수 있습니다. [예제보기](../EXAMPLES/COMMON/UTIL/DELAY/LOOP.js)

    ```javascript
    var
    // loop
    loop = LOOP(100, function(fps) {...});
    
    // change fps to 60.
    loop.changeFPS(60)
    
    // stop.
    loop.remove()
    ```

### 기타 기능
* `RANDOM_STR(length)` 영어 대소문자와 숫자로 이루어진 `length` 길이의 임의의 문자열을 생성합니다. [예제보기](../EXAMPLES/COMMON/UTIL/RANDOM_STR.js)

    ```javascript
    // ex) b9hSosKhvl
    RANDOM_STR(10)
    ```

* `OVERRIDE(origin, function(origin) {})` 특정 클래스나 함수 등을 재지정 할 때 유용한 기능입니다. [예제보기](../EXAMPLES/COMMON/UTIL/OVERRIDE.js)

    ```javascript
    var
    // calculate.
    calculate = function(a, b) {
        return a + b;
    };
    
    OVERRIDE(calculate, function(origin) {
        calculate = function(a, b) {
            return origin(a, b) + origin(a, b);
        };
    })
    
    // 10
    calculate(2, 3)
    ```

* `NEXT` 비동기 함수들을 처리할 때 순서대로 실행할 수 있도록 도와줍니다. 이를 통해 JavaScript 기반 프로젝트에서 흔히 겪을 수 있는 `callback 지옥 문제`를 해결할 수 있습니다. [예제보기](../EXAMPLES/COMMON/UTIL/NEXT.js)
    * `NEXT([function(next) {}, function() { return function() {}; }, function() { return function() {}; }, ...])`
    * `NEXT(count, [function(i, next) {}, function() { return function() {}; }, ...])`
    * `NEXT(array, [function(element, next) {}, function() { return function() {}; }, ...])`

    ```
    async1(function() {
        async2(function() {
            async3(function() {
                async4(function() {
                    async5(function() {
                        ...
                    });
                });
            });
        });
    });
    
    NEXT([
    function(next) {
        async1(next);
    },
    function(next) {
        return function() {
            async2(next);
        };
    },
    function(next) {
        return function() {
            async3(next);
        };
    },
    function(next) {
        return function() {
            async4(next);
        };
    },
    function(next) {
        return function() {
            async5(next);
        };
    },
    function() {
        return function() {
            ...
        };
    }])
    ```

* `PARALLEL` 함수들을 병렬로 처리합니다. 비동기 처리를 동시에 수행할 때 유용합니다. [예제보기](../EXAMPLES/COMMON/UTIL/PARALLEL.js)
    * `PARALLEL([function(done) {}, function(done) {}, ..., function() {}])`
    * `PARALLEL(count, [function(done) {}, function() {}])`
    * `PARALLEL(array, [function(value, done) {}, function() {}])`

    ```
    PARALLEL([
    function(done) {
        async1(done);
    },
    function(done) {
        async2(done);
    },
    function(done) {
        async3(done);
    },
    function(done) {
        async4(done);
    },
    function(done) {
        async5(done);
    },
    function() {
        console.log('done!');
    }])
    ```

* `STRINGIFY(value)` 특정 값을 문자열로 변경합니다. 데이터의 경우, `Date`형 값 또한 처리할 수 있습니다. [예제보기](../EXAMPLES/COMMON/UTIL/STRINGIFY.js)

    ```
    // '1'
    STRINGIFY(1)
    
    // 'true'
    STRINGIFY(true)
    
    // '{"a":1,"b":2}'
    STRINGIFY({
        a : 1,
        b : 2
    })
    ```

* `PARSE_STR(stringifiedValue)` `STRINGIFY`로 처리된 문자열을 다시 값으로 변경합니다. [예제보기](../EXAMPLES/COMMON/UTIL/PARSE_STR.js)

    ```
    // 1
    PARSE_STR('1')
    
    // true
    PARSE_STR('true')
    
    /* {
        a : 1,
        b : 2
    } */
    PARSE_STR('{"a":1,"b":2}')
    ```

* `VALID(validDataSet)` 데이터를 검증 및 정제하는 클래스입니다. **만약 `validDataSet`에 정의되지 않은 값이 존재하는 경우, VALID는 해당 값을 지웁니다. 이에 주의하시기 바랍니다.** 다음과 같은 다양한 검증을 처리할 수 있습니다. [예제보기](../EXAMPLES/COMMON/UTIL/VALID.js)

    * `VALID.notEmpty(value)` 값이 빈 값(`''`, `undefined`)인지 확인합니다.
    * `VALID.regex({pattern:, value:})` 값이 정규표현식을 통과하는지 확인합니다.
    * `VALID.size({max:, value:})` `VALID.size({min:, max:, value:})` 값의 길이를 확인합니다.
    * `VALID.integer(value)` 값이 정수인지 확인합니다.
    * `VALID.real(value)` 값이 실수인지 확인합니다.
    * `VALID.bool(value)` 값이 boolean인지 확인합니다.
    * `VALID.date(value)` 값이 `Date` 형인지 확인합니다.
    * `VALID.min({min:, value:})` 값이 최소값 보다 큰지 확인합니다.
    * `VALID.max({max:, value:})` 값이 최대값 보다 작은지 확인합니다.
    * `VALID.email(value)` 값이 이메일 형식인지 확인합니다.
    * `VALID.png(value)` 값이 png data URI 형식인지 확인합니다.
    * `VALID.url(value)` 값이 URL 형식인지 확인합니다.
    * `VALID.username(value)` 값이 일반적인 아이디 형식(영어 대소문자, 숫자, 하이픈, 언더바로 이루어진)인지 확인합니다. 이 검증은 영어 대문자를 포함하기 때문에, 소문자로만 이루어진 아이디를 입력받고 싶다면 `toLowerCase()`를 사용하여 대문자를 소문자로 바꾸어 처리하시기 바랍니다.
    * `VALID.id(value)` 값이 `MongoDB`의 id 형식인지 확인합니다.
	* `VALID.one({array:, value:})` 값이 배열에 포함되어 있는지 확인합니다.
	* `VALID.array(value)` 값이 배열인지 확인합니다.
	* `VALID.data(value)` 값이 데이터인지 확인합니다.
	* `VALID.element({array:, validData:})` 배열의 모든 값을 검증하여 모두 통과하는지 확인합니다.
	* `VALID.property({data:, validData:})` 데이터의 모든 요소들을 검증하여 모두 통과하는지 확인합니다.
	* `VALID.detail({data:, validDataSet:})` 데이터를 검증합니다.
	* `VALID.equal({value:, validValue:})` 값이 검증값과 같은지 확인합니다.
	
	VALID 클래스로 객체를 만들면, `check`와 `checkForUpdate`를 사용하여 데이터를 검증할 수 있습니다. `checkForUpdate`는 데이터의 값 중 `undefined`를 제외하고 검증을 수행하며, `''`와 같이 빈 값이 넘어올 때는 `TO_DELETE`로 값을 변경합니다.

	```javascript
	var
	// valid
	valid = VALID({
		name : {
			notEmpty : true,
			size : {
				min : 3,
				max : 20
			}
		},
		age : {
			integer : true
		}
	}),
	
	// valid result
	validResult;
	
	validResult = valid.check({
		name : 'YJ',
		age : 28
	});
	
	// true
	validResult.checkHasError()
	
	// { name : { type : 'size', validParams : { min : 3, max : 20 }, value : 'YJ' } }
	validResult.getErrors()
	
	validResult = valid.checkForUpdate({
		name : undefined,
		age : 28
	});
	
	// false
	validResult.checkHasError()
	```

* `URI_MATCHER(format)` `format`에 맞는 URI인지 확인하는 클래스입니다. [예제보기](../EXAMPLES/COMMON/UTIL/URI_MATCHER.js)

	```javascript
	var
	// matcher
	matcher = URI_MATCHER('book/{name}'),
	
	// match result
	matchResult;
	
	matchResult = matcher.check('book/TheLittlePrince');
	
	// match?
	matchResult.checkIsMatched()
	
	// { name : 'TheLittlePrince' }
	matchResult.getURIParams()
	```

# TO_DELETE
데이터베이스 등에서 **삭제되어야 할 값**임을 나타내기 위해 대입하는 값입니다.

```javascript
var
// data
data = {
	a : 1,
	b : 2
};

data.a = TO_DELETE
```

다음 문서: [UJS-BROWSER](UJS-BROWSER.md)
