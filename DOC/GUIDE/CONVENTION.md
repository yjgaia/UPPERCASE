# UPPERCASE 코드 컨벤션 규칙
UPPERCASE 코드 컨벤션 규칙은 기본적으로  [Douglas Crockford의 코드 컨벤션 규칙](http://javascript.crockford.com/code.html)을 따릅니다. 그러나 몇 가지 중요한 차이점과 추가사항들이 있으니 아래 내용을 꼭 숙지하시고 사용하시기 바랍니다.

## 세미콜론
문장의 끝에 세미콜론을 생략하지 마십시오. 다음의 예를 보면, 세미콜론의 생략으로 발생하는 문제를 알 수 있습니다.

```javascript
let func = (something) => {
	console.log(something);
} // 세미콜론 생략

((msg) => {
	console.log(msg);
})('good!'); // 오류 발생!
```
위의 예에서는 세미콜론이 생략되어 `func`에 선언되어야 할 함수가 그냥 실행되어 버리고 맙니다. 이와 같은 오류를 사전에 방지하고자 모든 문장의 끝에는 세미콜론을 추가합니다.

```javascript
let func = (something) => {
	console.log(something);
}; // 세미콜론 추가

((msg) => {
	console.log(msg);
})('good!'); // good!
```
위와 같이 세미콜론을 추가하면 잘 동작하는 것을 확인할 수 있습니다.

## 들여쓰기
코드 들여쓰기에는 `탭`을 사용합니다. 두 칸의 `스페이스`나, 네 칸의 `스페이스`는 사용하지 않습니다.

## 줄 길이
한 줄에 들어갈 수 있는 글자수에는 제한이 없습니다.

## 주석
* 주석은 설명하고자 하는 코드의 바로 위 줄에 작성합니다.

	```javascript
	// do something.
	something();
	```

* 즉시 알 수 있는 코드에 대해서는 주석을 작성하지 않습니다. 코드를 읽는 사람의 시간이 낭비되도록 하지 마시기 바랍니다.

	```javascript
	// a is 3. (X)
	a = 3;
	```

## for 문
`for` 문은 다음과 같이 작성합니다.
```javascript
for (let i = 0; i < 10; i += 1) {
	...
}
```

## 중괄호
코드 블록의 시작을 나타내는 중괄호(`{`)는 같은 줄에 작성합니다.
```javascript
let func = () => {
	...
};

if (isTrue === true) {
	...
}

for (let i = 0; i < 10; i += 1) {
	...
}
```

## `var`을 쓰지 않습니다.
`var` 대신 `let` 및 `const`를 사용합니다.

## `this`를 쓰지 않습니다.
UPPERCASE의 OOP 시스템으로 인해 `this` 키워드를 쓸 필요가 전혀 없습니다.

## `function`을 쓰지 않습니다.
UPPERCASE는 ECMAScript6을 지원합니다. 따라서 화살표 함수(`() => {}`)를 사용할 수 있습니다. `this`를 쓸 필요도 없기 때문에, 통일성을 위하여 함수는 `function`을 쓰지 고 화살표 함수를 사용하여 표현합니다.

## `null`을 사용하지 않습니다.
JavaScript에는 `값이 존재하지 않음`을 표현하는 두가지 방식이 있습니다. `null`과 `undefined` 입니다. 그러나 `null`은 엄밀히 따지면 `빈 값`이 아닙니다. `값이 존재하지 않음`이라는 정보를 지닌 특수한 `값`인 것 입니다. 어떤 변수에 아무런 값도 대입하지 않은 상태가 `undefined` 이기 때문에, UPPERCASE 기반 프로젝트에서는 값이 없음을 나타낼 때 `undefined`만을 사용합니다.

```javascript
let value = null; // X
let value; // O, value is undefined.

if (value === undefined) {
	console.log('value is undefined!');
}
```

## `++`와 `--`를 사용하지 않습니다.
가독성을 위해 `++` 대신 `+= 1`, `--` 대신 `-= 1`을 사용합니다.

## `==`와 `!=`를 사용하지 않습니다.
JavaScript 특성 상 정확한 값 비교를 위해 `==` 대신 `===`, `!=` 대신 `!==`을 사용합니다.

## `switch`는 사용하지 않습니다.
코드 블록이 헷갈릴 수 있는 `switch`는 사용하지 않습니다. `switch` 대신 `if`, `else if`, `else`로 표현합니다.

## `continue`를 사용하지 않습니다.
`continue`를 사용하지 않도록 로직을 작성합니다.

## `new Object()`와 `new Array()`를 사용하지 않습니다.
`new Object()` 대신 `{}`, `new Array()` 대신 `[]`을 사용합니다.

## `false`를 사용하지 않습니다.
변수를 선언할 때나 `return false;`를 제외하고는 `false`를 사용하지 않습니다. 비교구문을 작성할 때도, `=== false` 보다는 `!== true`를 사용하시기 바랍니다. `~는 거짓이다.` 보다 `~는 참이 아니다.`가 더 직관적으로 와닿는것 이외에도 다음과 같은 이유들이 존재합니다.

1. 데이터가 굳이 명시적인 `false` 값을 가지지 않아도 되므로 데이터 구조를 조금이나마 단순화시킬 수 있습니다.

	```javascript
	let data = {
		a : 1,
		b : 'abc',
		c : false
	};
	
	if (c !== true) {
		console.log('c is not true.');
	}
	
	let data = {
		a : 1,
		b : 'abc'
	};
	
	if (c !== true) {
		console.log('c is not true.');
	}
	```

2. 다른 자료형과 달리 직접 값을 출력할 일이 없습니다. 값을 출력하고자 하는 경우에도, JavaScript에는 삼항 연산자가 있어 다음과 같이 쉽게 표현이 가능합니다.

	```javascript
	isGood === true ? 'true' : 'false';
	```

## 변수 선언
* 변수명은 [Camel Case 방식](http://en.wikipedia.org/wiki/CamelCase)으로 짓습니다.
* 초기화 이후 값이 변경되지 않는 상수명은 대문자로 짓습니다.

	```
	const CONSTANT_VALUE = '!@#';
	```

* `boolean` 변수명은 `is`로 시작합니다. (`exists`는 예외)

	```
	let isHuman = true;
	```

## 함수 선언
* 함수명 또한 변수명과 마찬가지로 [Camel Case 방식](http://en.wikipedia.org/wiki/CamelCase)으로 짓습니다.

## 메소드와 함수의 이름
`METHOD`로 생성한 메소드의 이름은 대문자로, 기타 함수들의 이름은 소문자로 시작합니다.

```javascript
// 대문자로 시작합니다.
let SomeMethod = METHOD(...

// 소문자로 시작합니다.
let someFunc = () => {...
```

## 메소드의 형태
객체 내부에서만 사용되는 `private` 메소드를 제외하고는, 모든 메소드의 형태는 아래 네가지 형태를 따릅니다.
* `() => {`
* `(data) => {`
* `(funcs) => {`
* `(data, funcs) => {`

JavaScript에서는 [메소드 오버로딩](https://en.wikipedia.org/wiki/Method_overloading)을 지원하지 않습니다.
```javascript
method = (a) => { ... };
method = (a, b) => { ... };
method = (a, b, c) => { ... };
method(1); // 세번째 메소드인 method(a, b, c)가 실행됩니다.
```
그러나, 메소드를 [UPPERCASE에서 제안한 네가지 형태](#메소드의-형태)로만 작성한다면 다음과 같이 굳이 메소드 오버로딩을 하지 않더라도 메소드의 다양성을 충족시킬 수 있습니다.
```javascript
let method = (data) => {
	if (CHECK_IS_DATA(data) !== true) { ... }
	else if (data.c === undefined) { ... }
	else { ... }
};

method(1);
method({
	a : 1,
	b : 2
});
method({
	a : 1,
	b : 2,
	c : 3
});
```

## 객체의 이름
`OBJECT`로 생성한 객체의 이름은 대문자로, 클래스로 생성한 객체의 이름은 소문자로 시작합니다.

```javascript
// 대문자로 시작합니다.
let SomeObject = OBJECT(...

let SomeClass = CLASS(...
// 소문자로 시작합니다.
let someObject = SomeClass();
```

## 하나의 파일에 하나의 기능
UPPERCASE를 기반으로 프로젝트를 구성할 때는 하나의 파일에 하나의 기능을 저장하는 것을 원칙으로 합니다. 기능이란 메소드, 클래스, 실글톤 객체로 구현될 수 있습니다. 이 때, 파일명을 동일하게 작성합니다.

```javascript
// file name is SomeClass.js.
let SomeClass = CLASS(...
```
