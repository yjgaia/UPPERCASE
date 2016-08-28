# METHOD
UPPERCASE 기반 메소드를 생성합니다. [예제보기](../EXAMPLE/CORE/METHOD.js)

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