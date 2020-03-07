# UPPERCASE-CORE-COMMON
UPPERCASE-CORE-COMMON은 모든 JavaScript 환경에서 사용할 수 있는 모듈입니다.
* [API 문서](../../API/UPPERCASE-CORE/COMMON/README.md)

## 목차
* [사용방법](#사용방법)
* [`TO_DELETE`](#to_delete)
* [`_`](#_)
* [`METHOD`](#method)
* [객체지향 관련 기능](#객체지향-관련-기능)
* [`CONFIG`](#config)
* [UPPERCASE의 모듈화, BOX](#uppercase의-모듈화-box)
* [숫자 관련 기능](#숫자-관련-기능)
* [날짜 관련 기능](#날짜-관련-기능)
* [데이터(`{...}`) 및 배열(`[...]`) 관련 기능](#데이터-및-배열-관련-기능)
* [반복 관련 기능](#반복-관련-기능)
* [시간 지연 관련 기능](#시간-지연-관련-기능)
* [즉시 실행 함수 기능](#즉시-실행-함수-기능)
* [`Callback Hell` 보완 기능](#callback-hell-보완-기능)
* [콘솔 로그 관련 기능](#콘솔-로그-관련-기능)
* [기타 기능](#기타-기능)

## 사용방법
UPPERCASE 프로젝트 내 `UPPERCASE-CORE` 폴더를 복사하여 사용하거나, `npm`으로 설치하여 사용합니다. UPPERCASE-CORE-NODE와 UPPERCASE-CORE-BROWSER가 UPPERCASE-CORE-COMMON을 포함하기 때문에, 각 환경에 맞는 모듈을 사용합니다.

### `UPPERCASE-CORE` 폴더를 복사하는 경우
Node.js 환경
```javascript
require('./UPPERCASE-CORE/NODE.js');
```

웹 브라우저 환경
```html
<script src="/UPPERCASE-CORE/BROWSER.js"></script>
```

### `npm`을 사용하는 경우
```
npm install uppercase-core
```
```javascript
require('uppercase-core');
```

## `TO_DELETE`
**UPPERCASE에서는 `null`을 사용하지 않습니다!**

[UPPERCASE 코드 컨벤션 규칙](CONVENTION.md)에서 밝힌 바와 같이 UPPERCASE에서는 `값이 없음`을 표현하기 위해 `null`을 사용하지 않고 `undefined`를 사용합니다. 그러나 유일하게 `null` 값을 갖고 있는 변수가 있는데, 바로 `TO_DELETE`입니다.
[MongoDB](http://www.mongodb.org)와 같은 시스템에서는 `update` 명령을 수행할 때 `null`을 대입하면 해당 값을 삭제합니다. 이런 경우에 **삭제될 값**을 표현하는데 있어 `null` 보다는 `TO_DELETE` 같은 변수명이 더욱 명시적입니다.
따라서 이런 경우에 `null`을 사용하지 말고, `TO_DELETE`를 사용하시기 바랍니다.

## `_`
`_`는 `undefined`의 축약형입니다.

## `METHOD`
UPPERCASE 기반 메소드를 생성합니다.

아래와 같이 메소드를 선언하고, 파일명 또한 메소드의 이름과 동일하게 `SomeMethod.js`로 저장합니다. 메소드에 어떤 파라미터가 필요한지 알기 위해 필수 파라미터는 `//REQUIRED: 파라미터명`, 필수가 아닌 파라미터는 `//OPTIONAL: 파라미터명`으로 주석을 작성합니다.
```javascript
let SomeMethod = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.name
		//REQUIRED: params.age
		//OPTIONAL: params.city
	
		let name = params.name;
		let age = params.age;
		let city = params.city;
		
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

또한 다음과 같이 메소드에 `static` 멤버들을 선언할 수 있습니다.

```javascript
let SomeMethod = METHOD((m) => {
	
	let callCount = 0;
	
	let getCallCount = m.getCallCount = () => {
		return callCount;
	};
	
	return {
	
		run : (params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.age
			//OPTIONAL: params.city
		
			let name = params.name;
			let age = params.age;
			let city = params.city;
			
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

선언한 `static` 멤버는 다음과 같이 메소드 이름에 `.`을 붙혀 실행합니다.
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
UPPERCASE는 객체지향 언어들과 비슷한 모습으로 객체지향 프로그래밍을 할 수 있도록 지원합니다. 자세한 내용은 [UPPERCASE에서의 객체지향 프로그래밍 문서](OOP.md)를 참고해주시기 바랍니다.

### `CLASS`
UPPERCASE 기반 클래스를 생성합니다. 생성된 클래스는 상속이 가능하고, `private` 및 `public`, `protected` 접근 제한 변수를 지정할 수 있습니다. 또한 생성자의 파라미터를 객체가 생성되기 이전에 변경할 수 있으며, 클래스에 `static` 멤버를 지정할 수도 있습니다.

아래와 같이 클래스를 선언하고, 파일명 또한 클래스의 이름과 동일하게 `SomeClass.js`로 저장합니다.

```javascript
let SomeClass = CLASS({
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.name
		//REQUIRED: params.age
		
		let name = params.name;
		let age = params.age;
		
		let introduce = self.introduce = () => {
			console.log(name + '은(는) ' + age + '살입니다.');
		};
	}
});
```

이후 아래와 같이 객체를 생성하고, 객체의 메소드를 실행합니다.
```javascript
let someObject = SomeClass({
	name: '하늘',
	age: 29
});

someObject.introduce(); // 하늘은(는) 29살입니다.
```

아래와 같이 클래스를 선언할 때 다양한 설정들을 사용할 수 있습니다.

```javascript
let SomeClass = CLASS({

	// 기본 생성자 파라미터를 지정합니다.
	// 파라미터가 없더라도, 이를 이용해 파라미터를 지정해 객체를 생성할 수 있습니다.
	params : () => {
	
		// 기본 생성자 파라미터
		return {
			a : 1,
			b : 2,
			c : 3
		};
	},

	// 생성자 파라미터를 수정하거나, 상속할 부모 클래스를 지정합니다.
	preset : (params, funcs) => {
	
		// 생성자 파라미터 수정
		params.a = 2;
		
		// 상속할 부모 클래스
		return ParentClass;
	},

	// 객체를 초기화합니다. (생성자)
	init : (inner, self, params, funcs) => {
		
		// 객체 내 변수 선언
		let a = 123; // 생성자 내에서만 사용할 수 있습니다. (private)
		
		// 객체 내 메소드 선언
		let b = () => {...} // 생성자 내에서만 사용할 수 있습니다. (private)
		let c = inner.c = () => {...} // 이 클래스를 상속한 자식 클래스에서도 사용할 수 있습니다. (protected)
		let d = self.d = () => {...} // 클래스 외부에서 사용할 수 있습니다. (public)
		
		...
	},

	// 객체를 초기화 한 이후에 실행됩니다.
	afterInit : (inner, self, params, funcs) => {...}
});
```

클래스 또한 메소드와 마찬가지로 `static` 멤버를 지정할 수 있습니다.

```javascript
let SomeClass = CLASS((cls) => {
	
	let initCount = 0;
	
	let getInitCount = m.getInitCount = () => {
		return initCount;
	};
	
	return {
		
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.age
			
			let name = params.name;
			let age = params.age;
			
			initCount += 1;
			
			let introduce = self.introduce = () => {
				console.log(name + '은(는) ' + age + '살입니다.');
			};
		}
	};
});
```

선언한 `static` 멤버는 다음과 같이 클래스 이름에 `.`을 붙혀 실행합니다.
```javascript
let someObject = SomeClass({
	name: '하늘',
	age: 29
});

let someObject2 = SomeClass({
	name: '다솜',
	age: 26
});

SomeClass.getInitCount(); // 2
```

### `OBJECT`
클래스를 만들지 않고 객체를 바로 선언합니다. 이를 싱글톤 객체라고 합니다. 설정 및 내용은 `CLASS`와 동일하지만, 만들어진 결과는 클래스가 아니라 객체입니다. 모든 싱글톤 객체가 선언된 이후에는 `INIT_OBJECTS()`로 초기화합니다.

* `INIT_OBJECTS`는 애플리케이션 전체에서 한번만 실행합니다. 이후에는 선언 즉시 초기화 됩니다. 이는 UPPERCASE-CORE를 따로 설치하여 사용하는 경우에 필요한 것으로써, UPPERCASE 기반으로 프로젝트는 프로젝트를 실행할 때 자동으로 실행되기 때문에 신경쓰지 않으셔도 됩니다.

아래와 같이 싱글톤 객체를 선언하고, 파일명 또한 객체의 이름과 동일하게 `SampleObject.js`로 저장합니다.
```javascript
let SomeObject = OBJECT({

	init : (inner, self) => {
		
		let hello = self.hello = () => {
			console.log('안녕하세요?');
		};
	}
});
```

`INIT_OBJECTS()`로 모든 싱글톤 객체를 초기화합니다.
```javascript
INIT_OBJECT();
```

이후 아래와 같이 객체의 메소드를 실행할 수 있습니다.
```javascript
SomeObject.hello(); // 안녕하세요?
```

## `CONFIG`
UPPERCASE 기반 프로젝트의 설정값들을 저장하는 데이터입니다. UPPERCASE의 다른 모듈들도 이를 확장하여 사용합니다. UPPERCASE-CORE-COMMON에서는 단 하나의 설정값을 가지고 있습니다.

* `isDevMode` 현재 애플리케이션이 개발 모드로 실행되었는지 설정합니다. 기본값은 `false`입니다.

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
FOR_BOX((box) => {
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
날짜를 처리할 때 Date형을 좀 더 쓰기 편하도록 개선한 `CALENDAR` 클래스입니다. `date` 파라미터를 입력하지 않으면, 현재 시각을 기준으로 생성합니다.

만약 오늘 날짜가 2016년 9월 2일이라고 한다면, JavaScript의 Date형에서 `getMonth()`를 하게되면 예상과는 다르게 `8`이라는 숫자가 출력됩니다.
```javascript
new Date().getMonth(); // 8
```
`CALENDAR` 클래스는 이런 부분을 해결하면서 동시에, `getMonth`, `getDate`, `getHour`, `getMinute`, `getSecond` 메소드에 파라미터로 `true`를 지정하면, `'0N'`과 같은 형식의 문자열을 반환합니다. (9월인 경우 `'09'`) 이는 `2016-09-02`과 같은 날짜 형태를 만들 때 유용하게 사용할 수 있습니다.

```javascript
// 2016년 1월 2일 3시 4분 5초인 경우

let cal = CALENDAR();

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

### `CREATE_DATE`
Date형 값을 생성합니다.

```javascript
let date = CREATE_DATE({
	year : 2016,
	month : 11,
	date : 29,
	hour : 18,
	minute : 8
});
```

사용 가능한 파라미터들은 다음과 같습니다.

- `year` 년
- `month` 월
- `date` 일
- `hour` 시
- `minute` 분
- `second` 초

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
}, (value, name) => {
	return value === 2;
}); // b
```
```javascript
FIND([1, 2, 3], (value, key) => {
	return value === 2;
}); // 1
```

### `REMOVE({data:, name:})` `REMOVE({data:, value:})` `REMOVE({array:, key:})` `REMOVE({array:, value:})` `REMOVE(data, filter)` `REMOVE(array, filter)`
데이터나 배열의 특정 값을 삭제합니다.

```javascript
let data = {
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
let array = [1, 2, 3];

REMOVE({
	array : array,
	key : 1
}); // [1, 2, 3] -> [1, 3]
```
```javascript
let data = {
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
let array = [1, 2, 3];

REMOVE({
	array : array,
	value : 2
}); // [1, 2, 3] -> [1, 3]
```
```javascript
let data = {
	a : 1,
	b : 2,
	c : 3
};

REMOVE(data, (value, name) => {
	return value === 2;
}); // { a : 1, b : 2, c : 3 } -> { a : 2, c : 3 }
```
```javascript
let array = [1, 2, 3];

REMOVE(array, (value, key) => {
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
let data = {
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
let array = [1, 2];

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

예를 들어 다음과 같은 데이터가 있다고 한다면,
```javascript
let data = {
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
let packedData = PACK_DATA(data);

let dataStr = JSON.stringify(packedData);
```

이후 데이터를 전달 받은 쪽에서 다음과 같은 방법으로 원래의 데이터를 온전히 얻을 수 있습니다.
```javascript
let packedData = JSON.parse(dataStr);

let data = UNPACK_DATA(packedData);
```

### `STRINGIFY(data)`, `PARSE_STR(dataStr)`
`STRINGIFY`와 `PARSE_STR`는 위에서 설명한 `PACK_DATA`와 `UNPACK_DATA`를 내부적으로 수행하여 `JSON.stringify`와 `JSON.parse`를 대체하는 메소드입니다.

다음과 같은 코드는,
```javascript
let packedData = PACK_DATA(data);

let dataStr = JSON.stringify(packedData);
```

다음과 같이 간단히 변경할 수 있습니다.
```javascript
STRINGIFY(data);
```

마찬가지로 다음과 같은 코드는,
```javascript
let packedData = JSON.parse(dataStr);

let data = UNPACK_DATA(packedData);
```

다음과 같이 간단히 변경할 수 있습니다.
```javascript
PARSE_STR(dataStr);
```

### `VALID(validDataSet)`
데이터를 검증하고, 어떤 부분이 잘못되었는지 오류를 확인할 수 있는 `VALID` 클래스입니다.

다음과 같이 검증 표현식을 선언합니다.
```javascript
let valid = VALID({

	// 이름은 반드시 입력되어야 하고, 최소 3글자, 최대 20글자로 입력되어야 합니다.
	name : {
		notEmpty : true,
		size : {
			min : 3,
			max : 20
		}
	},
	
	// 나이는 정수여야 합니다.
	age : {
		integer : true
	}
});
```

이후 데이터를 검증합니다.
```javascript
let validResult = valid.check({
	name : 'YJ Sim',
	age : 28
});
```

`checkHasError` 메소드를 통해 데이터에 오류가 있는지 확인합니다.
```javascript
validResult.checkHasError(); // false
```

문제가 있는 데이터를 검증합니다.
```javascript
validResult = valid.check({
	name : 'YJ',
	age : 28.5
});
```

`checkHasError` 메소드를 통해 데이터에 오류가 있는지 확인합니다.
```javascript
validResult.checkHasError(); // true
```

`getErrors` 메소드를 통해 어떤 오류가 있는지 확인합니다.
```javascript
/*
	{
		name : {
			type : 'size',
			validParams : {
				min : 3,
				max : 20
			},
			value : 'YJ'
		},
		age : {
			type : 'integer',
			value : 28.5
		}
	}
*/
validResult.getErrors();
```

또한 데이터를 검증함과 동시에 빈 값(`undefined`, `null`, `''`)과 표현식에 정의되지 않은 값을 삭제하는 `checkAndWash` 메소드가 존재합니다.
```javascript
let valid = VALID({

	// 이름은 반드시 입력되어야 하고, 최소 3글자, 최대 20글자로 입력되어야 합니다.
	name : {
		notEmpty : true,
		size : {
			min : 3,
			max : 20
		}
	},
	
	// 나이는 정수여야 합니다.
	age : {
		integer : true
	}
});

let data = {
	name : '', // 빈 값이므로 삭제 예정
	age : 28,
	city : 'Seoul' // 표현식에 정의되지 않은 값이므로 삭제 예정
};

valid.checkAndWash(data);

console.log(data); // { age : 28 }
```

추가로, 데이터를 검증함과 동시에 빈 문자열(`''`)을 `TO_DELETE`로 변경하고, 표현식에 정의되지 않은 값은 삭제하는 `checkForUpdate` 메소드가 존재합니다. 이를 이용해 [MongoDB](http://www.mongodb.org)와 같은 시스템에서 `update` 명령을 수행할 때, 빈 문자열에 해당되는 값은 삭제하도록 설정할 수 있습니다.
```javascript
let valid = VALID({

	// 이름은 반드시 입력되어야 하고, 최소 3글자, 최대 20글자로 입력되어야 합니다.
	name : {
		notEmpty : true,
		size : {
			min : 3,
			max : 20
		}
	},
	
	// 나이는 정수여야 합니다.
	age : {
		integer : true
	}
});

let data = {
	name : '', // 빈 값이므로 TO_DELETE로 변경될 예정
	age : 28,
	city : 'Seoul' // 표현식에 정의되지 않은 값이므로 삭제 예정
};

valid.checkForUpdate(data);

console.log(data); // { name : TO_DELETE, age : 28 }
```

사용 가능한 검증식들은 다음과 같습니다.
* `notEmpty` 값이 빈 값(`undefined`, `null`, `''`)인지 확인합니다.
* `regex` 값이 정규표현식을 통과하는지 확인합니다. 검증값으로 정규표현식이 필요합니다.
* `size` 값의 길이를 확인합니다. 검증값으로 최소값인 `min`이나 최대값인 `max`가 필요합니다.
* `integer` 값이 정수인지 확인합니다.
* `real` 값이 실수인지 확인합니다.
* `bool` 값이 `boolean`인지 확인합니다.
* `date` 값이 `Date` 형인지 확인합니다.
* `min` 값이 최소값 보다 크거나 같은지 확인합니다. 검증값으로 최소값이 필요합니다.
* `max` 값이 최대값 보다 작거나 같은지 확인합니다. 검증값으로 최대값이 필요합니다.
* `email` 값이 이메일 형식인지 확인합니다.
* `png` 값이 PNG [Data URI 형식](https://en.wikipedia.org/wiki/Data_URI_scheme)인지 확인합니다.
* `url` 값이 URL 형식인지 확인합니다.
* `username` 값이 일반적인 아이디 형식(영어 대소문자, 숫자, 하이픈, 언더바로 이루어진)인지 확인합니다. 이 검증은 영어 대문자를 포함하기 때문에, 소문자로만 이루어진 아이디를 입력받고 싶다면 `toLowerCase()`를 사용하여 대문자를 소문자로 바꾸어 처리하시기 바랍니다.
* `id` 혹은 `mongoId` 값이 [`MongoDB`의 `ObjectId` 클래스](https://docs.mongodb.com/manual/reference/method/ObjectId/)의 문자열 형태인지 확인합니다.
* `one` 값이 검증값으로 제공된 배열에 포함되어 있는지 확인합니다. 검증값으로 배열이 필요합니다.
* `array` 값이 배열인지 확인합니다.
* `data` 값이 데이터인지 확인합니다.
* `element` 배열의 모든 값을 검증하여 모두 통과하는지 확인합니다. 검증값으로 검증 표현식이 필요합니다.
* `property` 데이터의 모든 값을 검증하여 모두 통과하는지 확인합니다. 검증값으로 검증 표현식이 필요합니다.
* `detail` 데이터의 내부 데이터를 검증하여 통과하는지 확인합니다. 검증값으로 검증 표현식이 필요합니다.
* `equal` 값이 검증값과 같은지 확인합니다.

데이터를 검증하는 것이 아닌, 단일 값에 대해서는 다음과 같이 `VALID` 클래스의 `static` 메소드들을 사용할 수 있습니다.
* `VALID.notEmpty(value)` 값이 빈 값(`undefined`, `null`, `''`)인지 확인합니다.
* `VALID.regex({value:, pattern:})` 값이 정규표현식을 통과하는지 확인합니다.
* `VALID.size({value:, min:})` `VALID.size({value:, max:})` `VALID.size({value:, min:, max:})` 값의 길이를 확인합니다.
* `VALID.integer(value)` 값이 정수인지 확인합니다.
* `VALID.real(value)` 값이 실수인지 확인합니다.
* `VALID.bool(value)` 값이 `boolean`인지 확인합니다.
* `VALID.date(value)` 값이 `Date` 형인지 확인합니다.
* `VALID.min({value:, min:})` 값이 최소값 보다 크거나 같은지 확인합니다.
* `VALID.max({value:, max:})` 값이 최대값 보다 작거나 같은지 확인합니다.
* `VALID.email(value)` 값이 이메일 형식인지 확인합니다.
* `VALID.png(value)` 값이 PNG [Data URI 형식](https://en.wikipedia.org/wiki/Data_URI_scheme)인지 확인합니다.
* `VALID.url(value)` 값이 URL 형식인지 확인합니다.
* `VALID.username(value)` 값이 일반적인 아이디 형식(영어 대소문자, 숫자, 하이픈, 언더바로 이루어진)인지 확인합니다. 이 검증은 영어 대문자를 포함하기 때문에, 소문자로만 이루어진 아이디를 입력받고 싶다면 `toLowerCase()`를 사용하여 대문자를 소문자로 바꾸어 처리하시기 바랍니다.
* `VALID.mongoId(value)` 값이 [`MongoDB`의 `ObjectId` 클래스](https://docs.mongodb.com/manual/reference/method/ObjectId/)의 문자열 형태인지 확인합니다.
* `VALID.one({value:, array:})` 값이 검증값으로 제공된 배열에 포함되어 있는지 확인합니다.
* `VALID.array(value)` 값이 배열인지 확인합니다.
* `VALID.data(value)` 값이 데이터인지 확인합니다.
* `VALID.element({array:, validData:})` `VALID.element({array:, validData:, isToRemoveEmptyValue:})` 배열의 모든 값을 검증하여 모두 통과하는지 확인합니다. `isToRemoveEmptyValue`가 `true`면, 값이 데이터인 경우 해당 데이터의 빈 값(`undefined`, `null`, `''`)을 삭제합니다.
* `VALID.property({data:, validData:})` `VALID.property({data:, validData:, isToRemoveEmptyValue:})` 데이터의 모든 값을 검증하여 모두 통과하는지 확인합니다. `isToRemoveEmptyValue`가 `true`면 빈 값(`undefined`, `null`, `''`)을 삭제합니다.
* `VALID.detail({data:, validDataSet:})` `VALID.detail({data:, validDataSet:, isToRemoveEmptyValue:})` 데이터를 검증합니다. `isToRemoveEmptyValue`가 `true`면 빈 값(`undefined`, `null`, `''`)을 삭제합니다.
* `VALID.equal({value:, validValue:})` 값이 검증값과 같은지 확인합니다.

## 반복 관련 기능
### `REPEAT`
주어진 함수를 주어진 횟수만큼 반복해서 실행합니다. 주어진 함수에서 `false`를 반환하게 되면 도중에 멈춥니다. 주어진 횟수만큼 실행하였다면 `true`를, 도중에 멈추게 되면 `false`를 반환합니다.

사용 가능한 형태들은 다음과 같습니다.
* `REPEAT(count, (i) => {})`
* `REPEAT({start:, end:}, (i) => {})`
* `REPEAT({start:, end:, step:}, (i) => {})`
* `REPEAT({start:, limit:}, (i) => {})`
* `REPEAT({start:, limit:, step:}, (i) => {})`

```javascript
// 5번 실행합니다. 이 때 i는 0에서 4의 값을 가집니다.
REPEAT(5, (i) => {...});
```
```javascript
// 5번 실행합니다. 이 때 i는 1에서 5의 값을 가집니다.
REPEAT({
	start : 1,
	end : 5
}, (i) => {...});
```
```javascript
// 3번 실행합니다. 이 때 i는 1, 3, 5의 값을 가집니다.
REPEAT({
	start : 1,
	end : 5,
	step : 2
}, (i) => {...});
```
```javascript
// 4번 실행합니다. 이 때 i는 1에서 4의 값을 가집니다.
REPEAT({
	start : 1,
	limit : 5
}, (i) => {...});
```

### `EACH`
데이터나 배열, 문자열의 각 요소를 순서대로 대입하여 주어진 함수를 실행합니다. 주어진 함수에서 `false`를 반환하게 되면 도중에 멈춥니다. 모든 요소들을 처리하였다면 `true`를, 도중에 멈추게 되면 `false`를 반환합니다.

사용 가능한 형태들은 다음과 같습니다.
* `EACH(data, (value, name) => {})`
* `EACH(array, (value, key) => {})`
* `EACH((value) => {})(array)`

```javascript
// 1
// 2
EACH({
	a : 1,
	b : 2
}, (value) => {
	console.log(value);
});
```
```javascript
// a is 1.
// b is 2.
EACH({
	a : 1,
	b : 2,
	c : 3
}, (value, name) => {
	
	console.log(name + ' is ' + value + '.');
	
	if (value === 2) {
		// 도중에 멈춥니다.
		return false;
	}
});
```
```javascript
// 1
// 2
EACH([1, 2], (value) => {
	console.log(value);
});
```
```javascript
// array[0] is 1.
// array[1] is 2.
EACH([1, 2, 3], (value, key) => {
	
	console.log('array[' + key + '] is ' + value + '.');
	
	if (value === 2) {
		// 도중에 멈춥니다.
		return false;
	}
});
```
```javascript
// array[0] is 1.
// array[1] is 2.
EACH((value, key) => {
	
	console.log('array[' + key + '] is ' + value + '.');
	
	if (value === 2) {
		// 도중에 멈춥니다.
		return false;
	}
})([1, 2, 3]);
```

### `REVERSE_EACH`
데이터나 배열, 문자열의 각 요소를 역순으로 대입하여 주어진 함수를 실행합니다. 주어진 함수에서 `false`를 반환하게 되면 도중에 멈춥니다. 모든 요소들을 처리하였다면 `true`를, 도중에 멈추게 되면 `false`를 반환합니다.

사용 가능한 형태들은 다음과 같습니다.
* `REVERSE_EACH(array, (value, key) => {})`
* `REVERSE_EACH((value) => {})(array)`

```javascript
// 2
// 1
REVERSE_EACH([1, 2], (value) => {
	console.log(value);
});
```
```javascript
// array[2] is 3.
// array[1] is 2.
REVERSE_EACH([1, 2, 3], (value, key) => {
	
	console.log('array[' + key + '] is ' + value + '.');
	
	if (value === 2) {
		// 도중에 멈춥니다.
		return false;
	}
});
```
```javascript
// array[2] is 3.
// array[1] is 2.
REVERSE_EACH((value, key) => {
	
	console.log('array[' + key + '] is ' + value + '.');
	
	if (value === 2) {
		// 도중에 멈춥니다.
		return false;
	}
})([1, 2, 3]);
```

## 시간 지연 관련 기능
### `DELAY(seconds, () => {})`
주어진 초가 흐른 뒤에 함수를 실행하는 `DELAY` 클래스

아래와 같이 코드를 작성하게 되면, 함수가 3초 뒤에 실행됩니다.
```javascript
let delay = DELAY(3, () => {
	// 3초 뒤에 실행됩니다.
});
```

함수의 실행을 취소하고 싶으면, 3초가 지나기 전에 `remove` 메소드를 실행하면 됩니다.
```javascript
// 실행을 취소합니다.
delay.remove();
```

또한 `pause`와 `resume` 메소드를 통해 일시정지 및 재개할 수 있습니다. 예를 들어 1초가 지난 뒤 `pause`를 실행하고, 이후에 `resume`을 실행하게 되면 `resume`을 실행한 후 2초 뒤 함수가 실행됩니다.
```javascript
// 일시정지합니다.
delay.pause();

// 재개합니다.
delay.resume();
```

### `INTERVAL(seconds, (interval) => {})`
주어진 초 마다 함수를 반복해서 실행하는 `INTERVAL` 클래스

아래와 같이 코드를 작성하게 되면, 함수가 3초마다 실행됩니다.
```javascript
let interval = INTERVAL(3, (interval) => {
	// 3초마다 실행됩니다.
});
```

함수의 실행을 취소하고 싶으면, `remove` 메소드를 실행하면 됩니다.
```javascript
// 실행을 취소합니다.
interval.remove();
```

또한 `pause`와 `resume` 메소드를 통해 일시정지 및 재개할 수 있습니다. 예를 들어 1초가 지난 뒤 `pause`를 실행하고, 이후에 `resume`을 실행하게 되면 `resume`을 실행한 후 2초 뒤 함수가 실행되고, 다시 3초마다 함수가 실행됩니다.
```javascript
// 일시정지합니다.
interval.pause();

// 재개합니다.
interval.resume();
```

### `LOOP`
아주 짧은 시간동안 반복해서 실행하는 로직을 작성할때 사용하는 `LOOP` 클래스로, 게임 개발 등에 사용됩니다.

사용 가능한 형태들은 다음과 같습니다.
#### 로직만 존재하는 경우
```javascript
LOOP((seconds) => {
	...
});
```
함수가 가능한 빠르게 반복해서 수행됩니다. 파라미터로 제공되는 `seconds`는, 이전에 수행된 시간과 방금 수행된 시간의 차이를 초 단위로 제공합니다.

#### FPS(Frames Per Second)가 제공되는 경우
```javascript
LOOP(fps, (fps) => {
	...
});
```
`fps` 파라미터를 지정하게 되면, 1초에 몇번 함수를 수행할지 설정이 가능합니다.

#### 
```javascript
LOOP(fps, {

	start : () => {
		// 동시에 어려번 실행되기 전
		...
	},
	
	interval : (fps) => {
		...
	},
	
	end : (times) => {
		// 동시에 여러번 실행된 후
		...
	}
});
```
CPU의 한계로 인해, 지정된 `fps`마다 함수가 실행되지 않을 수 있습니다. `LOOP`는 이런 경우에도 초당 함수 실행수를 보장합니다. 다만 이런 경우에는 함수가 시간 간격을 두지 않고 동시에 여러번 실행될 수 있는데, 이 경우 여러번 실행되기 전에 `start` 함수를, 여러번 실행된 후 `end` 함수를 실행합니다.

`end` 함수에서 시간 간격을 알 수 있으므로, `fps`가 설정된 경우에 이전에 수행된 시간과 방금 수행된 시간의 차이를 알기 위해서 사용되기도 합니다.

## 즉시 실행 함수 기능
### `RUN(() => {})` `RUN((f) => {})`
주어진 함수를 즉시 실행합니다.

예를 들면 다음과 같이, 배열의 모든 내용을 출력하는 코드를
```javascript
let array = [1, 2, 3, 4, 5];

let str = '배열의 값은 ';

EACH(array, (value, i) => {
	if (i > 0) {
		str += ', ';
	}
	str += value;
});

str += '입니다.';

print(str);
```

다음과 같이 작성할 수 있습니다.
```javascript
let array = [1, 2, 3, 4, 5];

print('배열의 값은 ' + RUN(() => {

	let str = '';

	EACH(array, (value, i) => {
		if (i > 0) {
			str += ', ';
		}
		str += value;
	});
	
	return str;

}) + '입니다.');
```

### `RAR(() => {})` `RAR(params, (params) => {})`
주어진 함수를 즉시 실행하고, 함수를 반환합니다. 선언과 동시에 실행되어야 하는 함수를 선언할 때 유용합니다.

아래 선언된 함수는 선언과 동시에 실행됩니다.
```javascript
let func = RAR(() => {
	console.log('함수 실행!');
});
```

아래와 같이 파라미터를 설정할 수도 있습니다.
```javascript
let showAge = RAR({
	name : '철수',
	age : 20
}, (params) => {

	let name = params.name;
	let age = params.age;
	
	console.log(name + '은(는)' + age + '살 입니다.');
});

showAge({
	name : '영희',
	age : 24
});
```

## Callback Hell 보완 기능
JavaScript로 개발을 하다보면 수많은 Callback들이 중첩되어 코드의 복잡성이 증가하고 가독성이 떨어지는 경우가 자주 생깁니다. 이를 Callback Hell이라고 부릅니다. 이런 현상을 보완하기 위해서 UPPERCASE에서는 다음과 같은 기능들을 제공합니다.

### `NEXT`
주어진 비동기 함수들을 순서대로 실행합니다.

사용 가능한 형태들은 다음과 같습니다.
#### 중첩된 비동기 함수들을 차례대로 실행
```javascript
NEXT([
(next) => {
	...
},

(next) => {
	return () => {
		...
	};
},

(next) => {
	return () => {
		...
	};
},

...]);
```

#### 주어진 `count`만큼 함수를 실행하고, 맨 마지막에 `next` 함수를 실행
```javascript
NEXT(count, [
(i, next) => {
	...
},

() => {
	return () => {
		...
	};
}]);
```

#### 주어진 배열의 요소 개수만큼 함수를 실행하고, 맨 마지막에 `next` 함수를 실행
```javascript
NEXT(array, [
(element, next) => {
	...
},

() => {
	return () => {
		...
	};
}]);
```

예를 들어 다음과 같은 Callback들이 중첩되어 있는 복잡한 코드가 있을 경우, (출처: http://callbackhell.com)
```javascript
fs.readdir(source, (err, files) => {
	if (err) {
		console.log('Error finding files: ' + err);
	} else {
		files.forEach((filename, fileIndex) => {
			console.log(filename);
			gm(source + filename).size((err, values) => {
				if (err) {
					console.log('Error identifying file size: ' + err);
				} else {
					console.log(filename + ' : ' + values);
					aspect = (values.width / values.height);
					widths.forEach((width, widthIndex) => {
						height = Math.round(width / aspect);
						console.log('resizing ' + filename + 'to ' + height + 'x' + height);
						this.resize(width, height).write(dest + 'w' + width + '_' + filename, (err) => {
							if (err) {
								console.log('Error writing file: ' + err);
							}
						});
					}.bind(this));
				}
			});
		});
	}
});
```

다음과 같이 역할별로 깔끔하게 정리할 수 있습니다.
```javascript
NEXT([
(next) => {
	fs.readdir(source, next);
},

(next) => {
	return (err, files) => {
		if (err) {
			console.log('Error finding files: ' + err);
		} else {
			files.forEach(next);
		}
	};
},

(next) => {
	return (filename, fileIndex) => {
		console.log(filename);
		gm(source + filename).size(next);
	};
},

(next) => {
	return (err, values) => {
		if (err) {
			console.log('Error identifying file size: ' + err);
		} else {
			console.log(filename + ' : ' + values);
			aspect = (values.width / values.height);
			widths.forEach(next);
		}
	};
},

(next) => {
	return (width, widthIndex) => {
		height = Math.round(width / aspect);
		console.log('resizing ' + filename + 'to ' + height + 'x' + height);
		this.resize(width, height).write(dest + 'w' + width + '_' + filename, (err) => {
			if (err) {
				console.log('Error writing file: ' + err);
			}
		});
	}.bind(this);
}])
```

### `PARALLEL`
주어진 비동기 함수들을 병렬로 실행합니다.

사용 가능한 형태들은 다음과 같습니다.
#### 중첩된 비동기 함수들을 병렬로 실행하고, 맨 마지막에 최종적으로 실행될 함수를 실행
```javascript
PARALLEL([
(done) => {
	...
},

(done) => {
	...
},

...,

// 최종적으로 실행될 함수
() => {
	...
}]);
```

#### 주어진 `count`만큼 함수를 실행하고, 맨 마지막에 최종적으로 실행될 함수를 실행
```javascript
PARALLEL(count, [
(done) => {
	...
},

// 최종적으로 실행될 함수
() => {
	...
}]);
```

#### 주어진 배열의 요소 개수만큼 함수를 실행하고, 맨 마지막에 최종적으로 실행될 함수를 실행
```javascript
PARALLEL(array, [
(value, done) => {
	...
},

// 최종적으로 실행될 함수
() => {
	...
}]);
```

예를 들어 5개의 HTTP 요청을 보낸 뒤, 모든 요청에 답변이 온 이후에 추가적인 로직을 구성한다고 한다면, 일반적으로 다음과 같이 작성하게 됩니다.
```javascript
let successCount = 0;

let successAll = () => {
	if (successCount < 5) {
		successCount += 1;
	} else {
		console.log('모든 요청이 성공적으로 완료되었습니다.');
	}
};

request('http://abc.com/1', (result) => {
	...
	successAll();
});

request('http://abc.com/2', (result) => {
	...
	successAll();
});

request('http://abc.com/3', (result) => {
	...
	successAll();
});

request('http://abc.com/4', (result) => {
	...
	successAll();
});

request('http://abc.com/5', (result) => {
	...
	successAll();
});
```

위와 같은 코드를 다음과 같이 깔끔하게 정리할 수 있습니다.
```javascript
PARALLEL([
(done) => {
	request('http://abc.com/1', (result) => {
		...
		done();
	});
},

(done) => {
	request('http://abc.com/2', (result) => {
		...
		done();
	});
},

(done) => {
	request('http://abc.com/3', (result) => {
		...
		done();
	});
},

(done) => {
	request('http://abc.com/4', (result) => {
		...
		done();
	});
},

(done) => {
	request('http://abc.com/5', (result) => {
		...
		done();
	});
},

...,

// 최종적으로 실행될 함수
() => {
	console.log('모든 요청이 성공적으로 완료되었습니다.');
}]);
```

## 콘솔 로그 관련 기능
### `SHOW_ERROR(tag, errorMsg)` `SHOW_ERROR(tag, errorMsg, params)`
콘솔에 오류 메시지를 출력합니다.

다음 코드를 실행하면,
```javascript
SHOW_ERROR('샘플 오류', '엄청난 오류가 발생했습니다!');
```
콘솔에 다음과 같은 오류 메시지를 출력합니다.
```
[샘플 오류] 오류가 발생했습니다. 오류 메시지: 엄청난 오류가 발생했습니다!
```

다음 코드를 실행하면,
```javascript
SHOW_ERROR('샘플 오류', '엄청난 오류가 발생했습니다!', {
	a : 1,
	b : 2,
	c : 3
});
```
콘솔에 다음과 같은 오류 메시지를 출력합니다.
```
[샘플 오류] 오류가 발생했습니다. 오류 메시지: 엄청난 오류가 발생했습니다!
다음은 오류를 발생시킨 파라미터입니다.
{
	"a": 1,
	"b": 2,
	"c": 3
}
```

### `SHOW_WARNING(tag, warningMsg)` `SHOW_WARNING(tag, warningMsg, params)`
콘솔에 경고 메시지를 출력합니다.

다음 코드를 실행하면,
```javascript
SHOW_WARNING('샘플 경고', '당신에게 경고합니다!');
```
콘솔에 다음과 같은 경고 메시지를 출력합니다.
```
[샘플 경고] 경고가 발생했습니다. 경고 메시지: 당신에게 경고합니다!
```

## 기타 기능
### `OVERRIDE(origin, (origin) => {})`
[오버라이딩](https://ko.wikipedia.org/wiki/%EB%A9%94%EC%86%8C%EB%93%9C_%EC%98%A4%EB%B2%84%EB%9D%BC%EC%9D%B4%EB%94%A9)을 수행합니다. 함수나 클래스 등을 재지정 할 때 유용합니다.

예를 들어 주어진 두 수를 더하는 `calculate`라는 함수가 있습니다.
```javascript
let calculate = (a, b) => {
	return a + b;
};

calculate(2, 3); // 5
```

이를 주어진 두 수를 더해서, 그 결과를 다시 한번 더하는 함수로 만드려면 다음과 같이 재지정합니다.
```javascript
OVERRIDE(calculate, (origin) => {
	calculate = (a, b) => {
		return origin(a, b) + origin(a, b);
	};
});

calculate(2, 3); // 10
```

### `RANDOM_STR(length)`
알파벳 대, 소문자와 숫자로 이루어진 임의의 문자열을 생성합니다.
```javascript
RANDOM_STR(10); // 예) b9hSosKhvl
```

### `SHA256({password:, key:})`
비밀번호를 주어진 키를 이용하여 HMAC SHA256 알고리즘으로 암호화합니다.

```javascript
SHA256({
	password : '1234',
	key : 'test'
}); // '5471d39e681ffc00128c11b573f4a3356ceba766956bb928d562d2c7c0c2db6a'
```

### `SHA512({password:, key:})`
비밀번호를 주어진 키를 이용하여 HMAC SHA512 알고리즘으로 암호화합니다.

```javascript
SHA512({
	password : '1234',
	key : 'test'
}); // 'ae451e84ce797ab519f454e9e3c9220550a5119c1063f75837281e4157c91cf27ec3d7a38df3254cdbc4c108189ed4b8d904baf2320a23d5268b1e81c110343b'
```

### `ENCRYPT({password:, key:})`
비밀번호를 주어진 키를 암호화합니다. 같은 키로 한번 더 수행하면, 복호화됩니다.

```javascript
ENCRYPT({
	password : '1234',
	key : 'test'
}); // 'EW@@'
```

### `UUID()`
[범용 고유 식별자](https://ko.wikipedia.org/wiki/%EB%B2%94%EC%9A%A9_%EA%B3%A0%EC%9C%A0_%EC%8B%9D%EB%B3%84%EC%9E%90)를 생성합니다.

```javascript
UUID(); // '550e8400-e29b-41d4-a716-446655440000'
```

### `URI_MATCHER(format)`
URI가 주어진 포맷에 맞는지 확인하는 `URI_MATCHER` 클래스로, 포맷에 파라미터 구간을 지정할 수 있어 URI로부터 파라미터 값을 가져올 수 있습니다.

예를 들어 다음과 같이 객체를 생성합니다.
```javascript
let matcher = URI_MATCHER('book/{name}')
```

이후 원하는 URI를 체크합니다.
```javascript
let matchResult = matcher.check('book/TheLittlePrince');
```

`checkIsMatched` 메소드로 URI가 포맷에 맞는지 확인합니다.
```javascript
matchResult.checkIsMatched(); // true
```

`getURIParams` 메소드로 URI로부터 파라미터 값을 가져옵니다.
```javascript
matchResult.getURIParams(); // { name : 'TheLittlePrince' }
```

### `TEST`
테스트용 메소드입니다. 테스트에 성공하거나 실패하면 콘솔에 메시지를 출력합니다.

아래 코드는 테스트에 성공합니다.
```javascript
TEST('덧셈', (check) => {
	check(1 + 2 === 3);
});
```
```
[덧셈 테스트] 테스트를 통과하였습니다. 총 0개의 오류가 있습니다.
```

아래 코드는 테스트에 실패합니다.
```javascript
TEST('덧셈', (check) => {
	check(1 + 2 === 4);
});
```
```
at 파일 경로:2:5에서 오류가 발견되었습니다. 총 1개의 오류가 있습니다.
```

`at 파일 경로:2:5`에서 2는 오류가 발견된 코드의 `line`을, 5는 `column`을 나타냅니다.