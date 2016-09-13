# UPPERCASE-CORE-COMMON
UPPERCASE-CORE-COMMON은 어떠한 JavaScript 환경에서도 사용할 수 있는 모듈입니다.

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

## TO_DELETE
**UPPERCASE에서는 `null`을 사용하지 않습니다!**

[UPPERCASE 코드 컨벤션 규칙](CONVENTION.md)에서 밝힌 바와 같이 UPPERCASE에서는 `값이 없음`을 표현하기 위해 `null`을 사용하지 않고 `undefined`를 사용합니다. 그러나 유일하게 `null` 값을 갖고 있는 변수가 있는데, 바로 `TO_DELETE`입니다.
[MongoDB](http://www.mongodb.org)와 같은 시스템에서는 `update` 명령을 수행할 때 `null`을 대입하면 해당 값을 삭제합니다. 이런 경우에 **삭제될 값**을 표현하는데 있어 `null` 보다는 `TO_DELETE` 같은 변수명이 더욱 명시적입니다.
따라서 이런 경우에 `null`을 사용하지 말고, `TO_DELETE`를 사용하시기 바랍니다.

## METHOD
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

## 객체지향 기능
비록 JavaScript에서 Prototype 기반 객체지향 프로그래밍이 가능하다고 하나, 표현력에 한계가 있어 [JSFace](https://github.com/tnhu/jsface)나 [oolib.js](http://idya.github.io/oolib/)와 같은 객체지향 프로그래밍을 지원하는 라이브러리를 사용하고는 합니다.
UPPERCASE는 객체지향 언어들과 비슷한 모습으로 객체지향 프로그래밍을 할 수 있도록 지원합니다.

### CLASS
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

### OBJECT
클래스를 만들지 않고 객체를 바로 선언합니다. 이를 싱글톤 객체라고 합니다. 설정 및 내용은 `CLASS`와 동일하지만, 만들어진 결과는 클래스가 아니라 객체입니다. 모든 싱글톤 객체가 선언된 이후에는 `INIT_OBJECTS()`로 초기화합니다.

* `INIT_OBJECTS`는 애플리케이션 전체에서 한번만 실행합니다. 이후에는 선언 즉시 초기화 됩니다.

아래와 같이 싱글톤 객체를 선언하고, 파일명 또한 객체의 이름과 동일하게 `SampleObject.js`로 저장합니다.
```javascript
SampleObject = OBJECT({

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
SampleObject.hello(); // 안녕하세요?
```