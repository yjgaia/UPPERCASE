# UPPERCASE-CORE-COMMON
UPPERCASE-CORE-COMMON는 어떠한 JavaScript 환경에서도 사용할 수 있는 모듈입니다.

## TO_DELETE
**UPPERCASE에서는 `null`을 사용하지 않습니다!**

[UPPERCASE 코드 컨벤션 규칙](CONVENTION.md)에서 밝힌 바와 같이 UPPERCASE에서는 `null`을 사용하지 않습니다. 그러나 유일하게 `null` 값을 갖고 있는 변수가 있는데, 바로 `TO_DELETE`입니다.
[MongoDB](http://www.mongodb.org)와 같은 시스템에서는 `update` 명령을 수행할 때, `null`을 대입하면 해당 값을 삭제하는 기능을 제공합니다. 이런 경우에 **삭제될 값**을 표현하는데 있어 `null` 보다는 `TO_DELETE`와 같은 변수를 사용하는것이 더욱 명시적인 코드가 될것이라 판단하어 만들어진 변수입니다.
따라서 이런 경우에도 [UPPERCASE 코드 컨벤션 규칙](CONVENTION.md)과 동일하게 `null`을 사용하지 말고, `TO_DELETE`를 사용하시기 바랍니다.

## METHOD
UPPERCASE 기반 메소드를 생성합니다. [예제보기](../EXAMPLE/UPPERCASE-CORE-COMMON/METHOD.js)

아래와 같이 선언합니다. 파일 명 또한 메소드의 이름과 동일하게 `SomeMethod.js`로 정합니다.
```javascript
SomeMethod = METHOD({

	run : function(params, callback) {
	    'use strict';
	
	    var
		// name
		name = params.name,
		
		// age
		age = params.age;
	
		callback(name + ' is ' + age + ' years old.');
	}
});
```

이후 아래와 같이 실행할 수 있습니다.
```javascript
SomeMethod({
    name: 'YJ Sim',
    age: 28
}, function(content) {
    
    // YJ Sim is 28 years old.
	console.log(content);
});
```

또한 다음과 같이 메소드 자체에 `static` 함수를 지정할 수 있습니다.

```javascript
SomeMethod = METHOD(function(m) {
    'use strict';
    
    var
    // get string. this is static function.
    getString;
    
	m.getString = getString = function() {
        return 'Static!';
    };
	
	return {
		run : function(params, callback) {...}
	};
});
```

```javascript
// run static function.
SomeMethod.getString();
```

## 객체지향 관련 기능
### CLASS


### OBJECT


## 숫자 관련 기능

## 날짜 관련 기능

## 배열 관련 기능

## 데이터(JavaScript Object) 관련 기능
- PARSE_STR 등의 내용도 추가

### 데이터 검증 기능

## 시간 지연 관련 기능

## callback hell 보완 기능

## 반복 관련 기능

## 암호화 관련 기능

## BOX 관련 기능