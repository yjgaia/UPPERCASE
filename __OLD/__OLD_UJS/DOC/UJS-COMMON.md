
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

### 기타 기능

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

다음 문서: [UJS-BROWSER](UJS-BROWSER.md)
