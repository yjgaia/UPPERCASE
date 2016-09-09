# 코드 컨벤션 규칙 익히기
기본적으로 UJS 기반 프로젝트는 [Douglas Crockford의 코드 컨벤션 규칙](http://javascript.crockford.com/code.html)을 따르지만, 몇가지 차이점이 있습니다.

## 세미콜론
문장의 끝에 세미콜론을 생략하지 마십시오. 다음의 예를 보면, 세미콜론의 생략으로 발생하는 문제를 알 수 있습니다.

```javascript
var func = function(something) {
	console.log(something);
} // 세미콜론 생략

(function(msg) {
	console.log(msg);
})('good!'); // 오류 발생!
```
위의 예에서는 세미콜론이 생략되어 func에 선언되어야 할 함수가 그냥 실행되어 버리고 맙니다. 이와 같은 오류를 사전에 방지하고자 모든 문장의 끝에는 세미콜론을 추가합니다.

```javascript
var func = function(something) {
	console.log(something);
}; // 세미콜론 추가

(function(msg) {
	console.log(msg);
})('good!'); // good!
```
위와 같이 세미콜론을 추가하면 잘 동작하는 것을 확인할 수 있습니다.

## 들여쓰기
코드 들여쓰기는 `탭`을 사용합니다. 두 칸의 스페이스나, 네 칸의 스페이스를 사용하지 않습니다.

## 줄 길이
한 줄에 들어갈 수 있는 글자수의 제한이 없습니다.

## 주석
* 주석은 설명하고자 하는 코드의 바로 위 줄에 작성합니다.

    ```javascript
    // do something.
    something();
    ```

* 즉시 알 수 있는 코드에 대해서는 주석을 작성하지 않습니다. 코드를 읽는 사람의 시간을 낭비하지 마세요. 예외적으로 아래의 변수 선언에서는 주석을 사용합니다.

    ```javascript
    // a is 3. (X)
    a = 3;
    ```

## 변수 선언
* 변수명은 [Camel Case 방식](http://en.wikipedia.org/wiki/CamelCase)으로 짓습니다.
* 변수명은 일반적으로 특수문자를 사용하지 않습니다. 그러나 특수한 경우 또는 상수를 표현할 때는 `_`를 사용하여 다른 변수명과 구분지을 수는 있습니다.

    ```
    var
    // constant value
    CONSTANT_VALUE = '!@#';
    ```

* boolean 변수는 is로 시작합니다.

    ```
    var
    // is human
    isHuman = true;
    ```

* 변수는 var 이후에 한줄에 하나씩 선언합니다. 첫째 줄에 주석으로 이름이나 설명을 작성하고, 두번째 줄에 변수명과 값을 작성합니다.
* 변수는 코드 블록 맨 위에 선언합니다.

```javascript
var
// first name
firstName = 'Young Jae',

// age
age = 28,

// sex
sex = 'male';
```

## 함수 선언
* 함수명은 [Camel Case 방식](http://en.wikipedia.org/wiki/CamelCase)으로 짓습니다.
* 함수명은 특수문자를 사용하지 않습니다.
* 함수는 var 이후에 한줄에 하나씩 선언합니다. 첫째 줄에 주석으로 이름이나 설명을 작성하고, 두번째 줄에 함수명과 함수를 작성합니다. 주석에 이름을 쓸 때는 함수라는 것을 나타내기 위해 점(.)을 찍습니다.
* 함수는 코드 블록 맨 위에 선언합니다.

```javascript
var
// bark.
bark = function() {
	console.log('bow-wow!');
};
```

## for 문은 다음과 같은 방식을 따릅니다.
```javascript
for (i = 0; i < 10; i += 1) {
	...
}
```

## 코드 블록의 시작을 나타내는 중괄호는 줄은 넘기지 않습니다.
```javascript
var
// func.
func = function() {
	...
};

if (isTrue === true) {
	...
}

for (i = 0; i < 10; i += 1) {
	...
}
```

## `++`와 `--`를 쓰지 않습니다.
`++` 대신 `+= 1`, `--` 대신 `-= 1`을 사용합니다.

## `==`와 `!=`를 쓰지 않습니다.
정확한 비교를 위해 `==` 대신 `===`, `!=` 대신 `!==`을 사용합니다.

## `switch`는 사용하지 않습니다.
코드 블록을 헷갈리게 만드는 `switch`는 사용하지 않습니다. `switch` 대신 `if`, `else if`, `else`로 표현합니다.

## `continue`를 사용하지 않습니다.
`continue`를 사용하지 않도록 알고리즘을 작성합니다.

## `new Object()`와 `new Array()`를 사용하지 않습니다.
`new Object()` 대신 `{}`, `new Array()` 대신 `[]`을 사용합니다.

## 비교 구문이나 데이터 구조에서 false를 사용하지 않습니다.
변수 선언이나 `return false;`를 제외하고는 false를 사용하지 않습니다. 비교구문을 작성 할 때에도, `=== false` 보다는 `!== true`를 사용하시기 바랍니다. ~는 거짓이다. 보다 ~는 참이 아니다. 가 더 직관적으로 와닿는것 이외에도 다양한 이유가 존재합니다.

1. 데이터 구조를 조금이나마 단순화시키기 위해서 사용합니다.

	```javascript
	var data = {
		a : 1,
		b : 'abc',
		c : false
	};
	
	if (c !== true) {
		console.log('c is not true.');
	}
	
	var data = {
		a : 1,
		b : 'abc'
	};
	
	if (c !== true) {
		console.log('c is not true.');
	}
	```

2. 다른 자료형과 달리 화면에서 직접 표현할 일이 없습니다. 직접 표현하고자 하는 경우에도, JavaScript에는 삼항 연산자가 있어 다음과 같이 쉽게 표현이 가능합니다.

	```javascript
	isGood === true ? 'true' : 'false';
	```

## null을 사용하지 않습니다.
JavaScript에는 `값이 존재하지 않음`을 표현하는 두가지 방식이 있습니다. 바로 `null`과 `undefined` 입니다. 그러나 `null`은 엄밀히 말하면 빈 값이 아닙니다. `값이 존재하지 않음`이라는 정보를 지니는 특수한 `값`인 것 입니다. 어떤 변수에 아무런 값도 대입하지 않은 상태가 `undefined` 이므로, UJS 기반 프로젝트에서는 `undefined`만을 사용합니다.

```javascript
var value = null; // X
var value; // O, value is undefined.

if (value === undefined) {
	console.log('value is undefined!');
}
```

## OBJECT로 생성한 객체의 이름은 대문자로, 클래스로 생성한 객체의 이름은 소문자로 시작합니다.

```javascript
// 대문자로 시작합니다.
var SomeObject = OBJECT(...

var SomeClass = CLASS(...
// 소문자로 시작합니다.
var someObject = SomeClass();
```

## METHOD로 생성한 메소드의 이름은 대문자로, 클래스로 내부 함수의 이름은 소문자로 시작합니다.

```javascript
// 대문자로 시작합니다.
var SomeMethod = METHOD(...

// 소문자로 시작합니다.
var someFunc = function() {...
```

## METHOD, CLASS, OBJECT는 한 파일에 하나씩 생성합니다. 이 때, 파일명도 동일하게 작성합니다.

```javascript
// file name is SomeClass.js.
var SomeClass = CLASS(...
```

다음 문서: [UJS-COMMON](UJS-COMMON.md)