# UPPERCASE-CORE-COMMON
UPPERCASE-CORE-COMMON은 어떠한 JavaScript 환경에서도 사용할 수 있는 모듈입니다.

## 목차
* 사용방법
* `TO_DELETE`
* `METHOD`
* 객체지향 관련 기능
* UPPERCASE의 모듈화, BOX
* 숫자 관련 기능
* 날짜 관련 기능
* 데이터(`{...}`) 및 배열(`[...]`) 관련 기능
* 반복 관련 기능
* 시간 지연 관련 기능
* `Callback Hell` 보완 기능
* 암호화 관련 기능

## 사용방법
`UPPERCASE-CORE` 폴더 내의 `COMMON.js` 파일을 복사하여 사용하거나, `npm`을 사용합니다.

### `COMMON.js` 파일을 복사하는 경우
```javascript
require('./UPPERCASE-CORE/COMMON.js');
```
```html
<script src="/UPPERCASE-CORE/COMMON.js"></script>
```

### `npm`을 사용하는 경우
```
npm install uppercase-core-common
```
```javascript
require('uppercase-core-common');
```

## `TO_DELETE`
**UPPERCASE에서는 `null`을 사용하지 않습니다!**

[UPPERCASE 코드 컨벤션 규칙](CONVENTION.md)에서 밝힌 바와 같이 UPPERCASE에서는 `값이 없음`을 표현하기 위해 `null`을 사용하지 않고 `undefined`를 사용합니다. 그러나 유일하게 `null` 값을 갖고 있는 변수가 있는데, 바로 `TO_DELETE`입니다.
[MongoDB](http://www.mongodb.org)와 같은 시스템에서는 `update` 명령을 수행할 때 `null`을 대입하면 해당 값을 삭제합니다. 이런 경우에 **삭제될 값**을 표현하는데 있어 `null` 보다는 `TO_DELETE` 같은 변수명이 더욱 명시적입니다.
따라서 이런 경우에 `null`을 사용하지 말고, `TO_DELETE`를 사용하시기 바랍니다.

## `METHOD`
UPPERCASE 기반 메소드를 생성합니다.

아래와 같이 메소드를 선언하고, 파일명 또한 메소드의 이름과 동일하게 `SomeMethod.js`로 저장합니다. 메소드에 어떤 파라미터가 필요한지 알기 위해 필수 파라미터는 `//REQUIRED: 파라미터명`, 필수가 아닌 파라미터는 `//OPTIONAL: 파라미터명`으로 주석을 작성합니다.
```javascript
SomeMethod = METHOD({

	run : function(params) {
	    'use strict';
	    //REQUIRED: params
	    //REQUIRED: params.name
	    //REQUIRED: params.age
	    //OPTIONAL: params.city
	
	    var
		// name
		name = params.name,
		
		// age
		age = params.age,
		
		// city
		city = params.city;
	    
	    if (city === undefined) {
		    console.log(name + '은(는) ' + age + '살입니다.');
		} else {
		    console.log(name + '은(는) ' + age + '살이고, ' + city + '에 살고 있습니다.');
		}
	}
});
```

이후 아래와 같이 메소드를 실행합니다.
```javascript
SomeMethod({
    name: '하늘',
    age: 29,
    city : '서울'
});

SomeMethod({
    name: '다솜',
    age: 26
});
```

또한 다음과 같이 메소드에 `static` 변수와 함수를 선언할 수 있습니다.

```javascript
SomeMethod = METHOD(function(m) {
	'use strict';
	
	var
	// call count
	callCount = 0,
	
	// get call count.
	getCallCount;
	
	m.getCallCount = getCallCount = function() {
		return callCount;
	};
	
	return {
	
		run : function(params) {
		    //REQUIRED: params
		    //REQUIRED: params.name
		    //REQUIRED: params.age
		    //OPTIONAL: params.city
		
		    var
			// name
			name = params.name,
			
			// age
			age = params.age,
			
			// city
			city = params.city;
			
			// static 변수 변동
			callCount += 1;
		    
		    if (city === undefined) {
			    console.log(name + '은(는) ' + age + '살입니다.');
			} else {
			    console.log(name + '은(는) ' + age + '살이고, ' + city + '에 살고 있습니다.');
			}
		}
	};
});
```

선언한 `static` 함수는 다음과 같이 메소드 이름에 `.`을 붙혀 실행합니다.
```javascript
SomeMethod({
    name: '하늘',
    age: 29,
    city : '서울'
});

SomeMethod({
    name: '다솜',
    age: 26
});

SomeMethod.getCallCount(); // 2
```

## 객체지향 관련 기능
비록 JavaScript에서 Prototype 기반 객체지향 프로그래밍이 가능하다고 하나, 표현력에 한계가 있어 [JSFace](https://github.com/tnhu/jsface)나 [oolib.js](http://idya.github.io/oolib/)와 같은 객체지향 프로그래밍을 지원하는 라이브러리를 사용하고는 합니다.
UPPERCASE는 객체지향 언어들과 비슷한 모습으로 객체지향 프로그래밍을 할 수 있도록 지원합니다.

### `CLASS`
UPPERCASE 기반 클래스를 생성합니다. 생성된 클래스는 상속이 가능하고, `private` 및 `public`, `protected` 접근 제한 변수를 지정할 수 있습니다. 또한 생성자의 파라미터를 객체가 생성되기 이전에 변경할 수 있으며, 클래스에 `static` 함수를 지정할 수도 있습니다.

아래와 같이 클래스를 선언하고, 파일명 또한 클래스의 이름과 동일하게 `SomeClass.js`로 저장합니다.

```javascript
SomeClass = CLASS({
	
	init : function(inner, self, params) {
	    'use strict';
	    //REQUIRED: params
	    //REQUIRED: params.name
	    //REQUIRED: params.age
		
		var
		// name
		name = params.name,
		
		// age
		age = params.age,
		
		// introduce.
		introduce;
		
		self.introduce = introduce = function() {
	        console.log(name + '은(는) ' + age + '살입니다.');
		};
	}
});
```

이후 아래와 같이 객체를 생성하고, 객체의 함수를 실행합니다.
```javascript
var
// some object
someObject = SomeClass({
	name: '하늘',
	age: 29
});

someObject.introduce(); // 하늘은(는) 29살입니다.
```

아래와 같이 클래스를 선언할 때 다양한 설정들을 사용할 수 있습니다.

```javascript
SomeClass = CLASS({

	// 기본 생성자 파라미터를 지정합니다.
	// 파라미터가 없더라도, 이를 이용해 파라미터를 지정해 객체를 생성할 수 있습니다.
	params : function() {
	
        // 기본 생성자 파라미터
		return {
		    a : 1,
		    b : 2,
		    c : 3
		};
	},

	// 생성자 파라미터를 수정하거나, 상속할 부모 클래스를 지정합니다.
	preset : function(params, funcs) {
	
		// 생성자 파라미터 수정
		params.a = 2;
		
		// 상속할 부모 클래스
		return ParentClass;
	},

	// 객체를 초기화합니다. (생성자)
	init : function(inner, self, params, funcs) {
	    
	    // 객체 내 변수 선언
	    var a // 생성자 내에서만 사용할 수 있습니다. (private)
		inner.b // 이 클래스를 상속한 자식 클래스에서도 사용할 수 있습니다. (protected)
		self.c // 클래스 외부에서 사용할 수 있습니다. (public)
		
		...
	},

	// 객체를 초기화 한 이후에 실행됩니다.
	afterInit : function(inner, self, params, funcs) {...}
});
```

클래스 또한 메소드와 마찬가지로 `static` 함수를 지정할 수 있습니다.

```javascript
SomeClass = CLASS(function(cls) {
	'use strict';
	
	var
	// init count
	initCount = 0,
	
	// get init count.
	getInitCount;
	
	m.getInitCount = getInitCount = function() {
		return initCount;
	};
	
	return {
		
		init : function(inner, self, params) {
		    //REQUIRED: params
		    //REQUIRED: params.name
		    //REQUIRED: params.age
			
			var
			// name
			name = params.name,
			
			// age
			age = params.age,
			
			// introduce.
			introduce;
			
			initCount += 1;
			
			self.introduce = introduce = function() {
		        console.log(name + '은(는) ' + age + '살입니다.');
			};
		}
	};
});
```

선언한 `static` 함수는 다음과 같이 클래스 이름에 `.`을 붙혀 실행합니다.
```javascript
var
// some object
someObject = SomeClass({
	name: '하늘',
	age: 29
}),

// some object2
someObject2 = SomeClass({
	name: '다솜',
	age: 26
});

SomeClass.getInitCount(); // 2
```

### `OBJECT`
클래스를 만들지 않고 객체를 바로 선언합니다. 이를 싱글톤 객체라고 합니다. 설정 및 내용은 `CLASS`와 동일하지만, 만들어진 결과는 클래스가 아니라 객체입니다. 모든 싱글톤 객체가 선언된 이후에는 `INIT_OBJECTS()`로 초기화합니다.

* `INIT_OBJECTS`는 애플리케이션 전체에서 한번만 실행합니다. 이후에는 선언 즉시 초기화 됩니다.

아래와 같이 싱글톤 객체를 선언하고, 파일명 또한 객체의 이름과 동일하게 `SampleObject.js`로 저장합니다.
```javascript
SomeObject = OBJECT({

	init : function(inner, self) {
	    'use strict';
	
	    var
	    // hello.
	    hello;
	
		self.hello = hello = function() {
			console.log('안녕하세요?');
		};
	}
});
```

`INIT_OBJECTS()`로 모든 싱글톤 객체를 초기화합니다.
```javascript
INIT_OBJECT();
```

이후 아래와 같이 객체의 함수를 실행할 수 있습니다.
```javascript
SomeObject.hello(); // 안녕하세요?
```

## UPPERCASE의 모듈화, BOX
UPPERCASE 기반 프로젝트에서는 모듈을 BOX라고 부릅니다. BOX에 대한 자세한 내용은 [BOX 문서](BOX.md)를 참고해주시기 바랍니다. 여기서는 코드 내에 BOX 패키지를 만들수 있는 BOX 메소드를 소개합니다.

### `BOX(boxName)`
BOX를 생성합니다.
```javascript
BOX('SampleBox');
```

이후 아래와 같이 BOX에 기능들을 추가할 수 있습니다.
```javascript
SampleBox.SomeClass = CLASS(...
```

### `FOR_BOX(func)`
모든 박스를 대상으로 하는 메소드와 클래스, 싱글톤 객체를 선언할 때 사용합니다.
아래 코드를 실행하면, 모든 BOX에 `SomeClass`가 생성됩니다.
```javascript
FOR_BOX(function(box) {
    box.SomeClass = CLASS(...
});
```

## 숫자 관련 기능
### `INTEGER(integerString)`
정수 문자열을 정수 값으로 변환합니다.
```javascript
INTEGER('7');
```

### `REAL(realNumberString)`
실수 문자열을 실수 값으로 변환합니다.
```javascript
REAL('7.7');
```

### `RANDOM(limit)` `RANDOM({min:, max:})` `RANDOM({min:, limit:})`
임의의 정수를 생성합니다.

```javascript
// 0 ~ 4 중 임의의 정수
RANDOM(5);
```
```javascript
// -5 ~ 10 중 임의의 정수
RANDOM({
    min : -5,
    max : 10
});
```
```javascript
// -5 ~ 9 중 임이의 정수
RANDOM({
    min : -5,
    limit : 10
});
```

## 날짜 관련 기능
### `CALENDAR()` `CALENDAR(date)`
날짜를 처리할 때 Date형을 좀 더 쓰기 편하도록 개선한 CALENDAR 클래스입니다. `date` 파라미터를 입력하지 않으면, 현재 시각을 기준으로 생성합니다.

만약 오늘 날짜가 2016년 9월 2일이라고 한다면, JavaScript의 Date형에서 `getMonth()`를 하게되면 예상과는 다르게 `8`이라는 숫자가 출력됩니다.
```javascript
new Date().getMonth(); // 8
```
`CALENDAR` 클래스는 이런 부분을 해결하면서 동시에, `getMonth`, `getDate`, `getHour`, `getMinute`, `getSecond` 함수에 파라미터로 `true`를 지정하면, `'0N'`과 같은 형식의 문자열을 반환합니다. (9월인 경우 `'09'`) 이는 `2016-09-02`과 같은 날짜 형태를 만들 때 유용하게 사용할 수 있습니다.

```javascript
var
// calendar - 2016년 1월 2일 3시 4분 5초인 경우
cal = CALENDAR();

cal.getYear(); // 2016

cal.getMonth(); // 1
cal.getMonth(true); // '01'

cal.getDate(); // 2
cal.getDate(true); // '02'

// 일요일은 0, 월요일은 1, 화요일은 2...
cal.getDay(); // 6

cal.getHour(); // 3
cal.getHour(true); // '03'

cal.getMinute(); // 4
cal.getMinute(true); // '04'

cal.getSecond(); // 5
cal.getSecond(true); // '05'
```

## 데이터(`{...}`) 및 배열(`[...]`) 관련 기능
UPPERCASE 기반 프로젝트에서는 `{...}`로 표현되는 값을 데이터라 부르고, `[...]`로 표현되는 값을 배열이라 부릅니다.

### `CHECK_IS_DATA(target)`
`target`이 데이터인지 확인합니다.
```javascript
CHECK_IS_DATA({
    name : '하늘',
    age : 29
});
```

### `CHECK_IS_ARRAY(target)`
`target`이 배열인지 확인합니다.
```javascript
CHECK_IS_ARRAY([1, 2, 3]);
```

### `CHECK_IS_ARGUMENTS(target)`
`target`이 JavaScript `arguments`인지 확인합니다.
```javascript
function() {
    CHECK_IS_ARGUMENTS(arguments);
}
```

### `CHECK_IS_EMPTY_DATA(data)`
데이터가 아무런 값이 없는 빈 데이터(`{}`)인지 확인합니다.
```javascript
CHECK_IS_EMPTY_DATA({});
```

### `CHECK_IS_IN({data:, value:})` `CHECK_IS_IN({array:, value:})`
특정 값이 데이터나 배열에 존재하는지 확인합니다.

```javascript
CHECK_IS_IN({
    data : {
        a : 1,
        b : 2
    },
    value : 1
});
```
```javascript
CHECK_IS_IN({
    array : [1, 2],
    value : 1
});
```

### `CHECK_ARE_SAME(array)`
배열 안의 모든 요소들이 동일한지 확인합니다.

```javascript
CHECK_ARE_SAME([1, 1, 1]);
```
```javascript
CHECK_ARE_SAME([[2, 3], [2, 3], [2, 3]);
```
```javascript
CHECK_ARE_SAME([{
    a : 1,
    b : 2
}, {
    a : 1,
    b : 2
}, {
    a : 1,
    b : 2
});
```

### `COUNT_PROPERTIES(data)`
데이터의 모든 요소들의 개수를 반환합니다.

```javascript
COUNT_PROPERTIES({
	a : 1,
	b : 2,
	c : 3
}); // 3
```

### `FIND({data:, value:})` `FIND({array:, value:})` `FIND(data, filter)` `FIND(array, filter)`
데이터나 배열의 특정 값을 찾아, 데이터인 경우 그 값에 해당하는 이름을, 배열인 경우 그 값에 해당하는 키(index)를 반환합니다.

```javascript
FIND({
    data : {
        a : 1,
        b : 2,
        c : 3
    },
    value : 2
}); // b
```
```javascript
FIND({
    array : [1, 2, 3],
    value : 2
}); // 1
```
```javascript
FIND({
    a : 1,
    b : 2,
    c : 3
}, function(value, name) {
    return value === 2;
}); // b
```
```javascript
FIND([1, 2, 3], function(value, key) {
    return value === 2;
}); // 1
```

### `REMOVE({data:, name:})` `REMOVE({data:, value:})` `REMOVE({array:, key:})` `REMOVE({array:, value:})` `REMOVE(data, filter)` `REMOVE(array, filter)`
데이터나 배열의 특정 값을 삭제합니다.

```javascript
var 
// data
data = {
    a : 1,
    b : 2,
    c : 3
};

REMOVE({
    data : data,
    name : 'b'
}); // { a : 1, b : 2, c : 3 } -> { a : 2, c : 3 }
```
```javascript
var
// array
array = [1, 2, 3];

REMOVE({
    array : array,
    key : 1
}); // [1, 2, 3] -> [1, 3]
```
```javascript
var 
// data
data = {
    a : 1,
    b : 2,
    c : 3
};

REMOVE({
    data : data,
    value : 2
}); // { a : 1, b : 2, c : 3 } -> { a : 2, c : 3 }
```
```javascript
var
// array
array = [1, 2, 3];

REMOVE({
    array : array,
    value : 2
}); // [1, 2, 3] -> [1, 3]
```
```javascript
var 
// data
data = {
    a : 1,
    b : 2,
    c : 3
};

REMOVE(data, function(value, name) {
    return value === 2;
}); // { a : 1, b : 2, c : 3 } -> { a : 2, c : 3 }
```
```javascript
var
// array
array = [1, 2, 3];

REMOVE(array, function(value, key) {
    return value === 2;
}); // [1, 2, 3] -> [1, 3]
```

### `COPY(data)` `COPY(array)`
데이터나 배열을 복사합니다.

```javascript
COPY({
    a : 1,
    b : 2
});
```
```javascript
COPY([1, 2])
```

### `EXTEND({origin:, extend:})`
데이터나 배열을 덧붙혀 확장합니다.

```javascript
var
// data
data = {
    a : 1,
    b : 2
};

EXTEND({
    origin : data,
    extend : {
        b : 3,
        c : 4
    }
}); // { a : 1, b : 2 } -> { a : 1, b : 2, c : 3, d : 4 }
```
```javascript
var
// array
array = [1, 2];

EXTEND({
    origin : array,
    extend : [2, 3]
}); // [1, 2] -> [1, 2, 2, 3]
```

### `COMBINE(dataSet)` `COMBINE(arrays)`
데이터들이나 배열들을 하나의 데이터나 배열로 합칩니다.

```javascript
COMBINE([{
    a : 1,
    b : 2
}, {
    b : 3,
    c : 4
}]); // { a : 1, b : 2, c : 3, d : 4 }
```
```javascript
COMBINE([[1, 2], [2, 3]]); // [1, 2, 2, 3]
```

### `PACK_DATA(data)`, `UNPACK_DATA(packedData)`
JSON 양식의 데이터를 전송할때, 일반적으로 사용하는 `JSON.stringify` 메소드를 사용하게 되면 `Date`형은 문자열 형태(예: `"2016-09-20T10:55:11.111Z"`)로, `RegExp`형은 단순히 빈 JavaScript 오브젝트인 `{}`로 변경됩니다. 이를 방지하기 위해, UPPERCASE에서는 `PACK_DATA`와 `UNPACK_DATA`를 제공합니다.

`PACK_DATA`를 거친 데이터를 `JSON.stringify`로 변환 후 전송하고, 전송 받는 쪽에서 `JSON.parse`를 수행 한 후 `UNPACK_DATA`를 거치면 원래 데이터를 얻을 수 있게 됩니다.

예를들어 다음과 같은 데이터가 있다고 한다면,
```javascript
var
// data
data = {
	number : 123,
	now : new Date(),
	o : {
		date : new Date()
	},
	regex : new RegExp('test', 'g')
};
```

데이터를 전달하기 전에 다음과 같이 문자열로 변환합니다.
```javascript
var
// packed data
packedData = PACK_DATA(data),

// data string
dataStr = JSON.stringify(packedData);
```

이후 데이터를 전달 받은 쪽에서 다음과 같은 방법으로 원래의 데이터를 온전히 얻을 수 있습니다.
```javascript
var
// packed data
packedData = JSON.parse(dataStr),

// data
data = UNPACK_DATA(packedData);
```

### `STRINGIFY(data)`, `PARSE_STR(dataStr)`
`STRINGIFY`와 `PARSE_STR`는 위에서 설명한 `PACK_DATA`와 `UNPACK_DATA`를 내부적으로 수행하여 `JSON.stringify`아 `JSON.parse` 메소드를 대체하는 함수입니다.

다음과 같은 코드는,
```javascript
var
// packed data
packedData = PACK_DATA(data),

// data string
dataStr = JSON.stringify(packedData);
```

다음과 같이 간단히 변경할 수 있습니다.
```javascript
STRINGIFY(data);
```

마찬가지로 다음과 같은 코드는,
```javascript
var
// packed data
packedData = JSON.parse(dataStr),

// data
data = UNPACK_DATA(packedData);
```

다음과 같이 간단히 변경할 수 있습니다.
```javascript
PARSE_STR(dataStr);
```

### VALID
TODO:

## 반복 관련 기능
TODO:

## 시간 지연 관련 기능
TODO:

## Callback Hell 보완 기능
TODO:

## 암호화 관련 기능
TODO: