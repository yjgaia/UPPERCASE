# UPPERCASE에서의 객체지향 프로그래밍
UPPERCASE 기반 프로젝트를 작성할 때, [`CLASS`](UPPERCASE-CORE-COMMON.md#class)나 [`OBJECT`](UPPERCASE-CORE-COMMON.md#object)를 이용해 순수 JavaScript로는 하기 어려운 객체지향 프로그래밍을 쉽게 할 수 있습니다.

## 캡슐화
캡슐화란 객체가 데이터를 어떻게 처리하는지 외부에서 알 수 없도록 하는 것입니다.

클래스를 작성할 때 작성자는 숨겨야하는 정보와 공개해야하는 정보를 구분하여 기술할 수 있습니다. 따라서, 객체를 사용하는 사람은 객체로부터 공개된 정보에만 접근이 가능합니다.

이를 통해 정보의 손상과 오용을 막을 수 있습니다. 또한 데이터가 바뀌어도 다른 객체에 영향을 주지 않아 객체의 독립성이 유지됩니다.

```javascript
let Car = CLASS({
	
	init : (inner, self) => {
		
		let year;
		let maker;
		
		let engine;
		
		let ecu;
		let color;
		
		// year와 maker는 외부 접근 허용
		let getYear = self.getYear = () => {
			return year;
		};
		
		let setYear = self.setYear = (_year) => {
			year = _year;
		};
		
		let getMaker = self.getMaker = () => {
			return maker;
		};
		
		let setMaker = self.setMaker = (_maker) => {
			maker = _maker;
		};
		
		// engine은 상속 클래스에서만 접근 허용
		let getEngine = inner.getEngine = () => {
			return engine;
		};
		
		let setEngine = inner.setEngine = (_engine) => {
			engine = _engine;
		};
		
		// ecu와 color는 자기 클래스에서만 접근 허용
	}
});
```

### 접근지정

#### `Private`
자기 클래스 내부에서만 접근을 허용합니다.

```javascript
let Car = CLASS({
	
	init : (inner, self) => {
		
		let ecu;
		let color;
		
		// ecu와 color는 자기 클래스에서만 접근 허용
	}
});
```

#### `Protected`
자기 클래스 내부 또는 상속받은 자식 클래스에서만 접근을 허용합니다.

```javascript
let Car = CLASS({
	
	init : (inner, self) => {
		
		let engine;
		
		// engine은 상속 클래스에서만 접근 허용
		let getEngine = inner.getEngine = () => {
			return engine;
		};
		
		let setEngine = inner.setEngine = (_engine) => {
			engine = _engine;
		};
	}
});
```

#### `Public`
모든 접근을 허용합니다.

```javascript
let Car = CLASS({
	
	init : (inner, self) => {
		
		let year;
		let maker;
		
		// year와 maker는 외부 접근 허용
		let getYear = self.getYear = () => {
			return year;
		};
		
		let setYear = self.setYear = (_year) => {
			year = _year;
		};
		
		let getMaker = self.getMaker = () => {
			return maker;
		};
		
		let setMaker = self.setMaker = (_maker) => {
			maker = _maker;
		};
	}
});
```

## 상속
상속이란 새로운 클래스가 기존 클래스의 기능들을 그대로 이어받아 사용할 수 있도록 하는 기능입니다.

상속을 받는 새로운 클래스는 자식 클래스, 하위 클래스, 파생 클래스 등으로 부르며, 기존 클래스는 부모 클래스, 상위 클래스, 기반 클래스 등으로 부릅니다.

상속을 통해 설계의 요구에 맞추어 클래스를 수정할 수 있으며 클래스간의 종속 관계를 형성함으로써 객체들을 조직화 할 수 있습니다.

```javascript
let Car = CLASS({

	init : (inner, self) => {
		...
	}
});

let Bus = CLASS({

	preset : () => {
		// Bus는 Car를 상속합니다.
		return Car;
	},
	
	init : (inner, self) => {
		...
	}
});
```

## 메소드 오버라이딩
메소드 오버라이딩이란 자식 클래스에 부모 클래스의 메소드를 재정의 하는것을 말합니다.

```javascript
let Car = CLASS({

	init : (inner, self) => {
		
		let maker;
		
		let getMaker = self.getMaker = () => {
			return maker;
		};
	}
});

let Bus = CLASS({

	preset : () => {
		return Car;
	},
	
	init : (inner, self) => {
		
		let getMaker;
		OVERRIDE(self.getMaker, (origin) => {
		
			getMaker = self.getMaker = () => {
				return origin() + ' Bus';
			};
		});
	}
});
```

## 메소드 오버로딩
메소드 오버로딩이랑 메소드가 파라미터의 갯수나 자료형에 따라 다른 기능을 하는도록 구현하는 것을 말합니다.

```javascript
let Mathematics = CLASS({

	init : (inner, self) => {
		
		// 파라미터 중 exponent는 있을수도, 없을수도 있습니다.
		let pow = self.pow = (params) => {
			//REQUIRED: params
			//REQUIRED: params.base
			//OPTIONAL: params.exponent
			
			let base = params.base;
			let exponent = params.exponent;
			
			if (exponent === undefined) {
				exponent = 2;
			}
			
			let result = base;
			
			REPEAT(exponent, () => {
				result *= base;
			});
			
			return result;
		};
	}
});
```

메소드 오버로딩에 대한 자세한 내용은 [UPPERCASE 코드 컨벤션 규칙의 메소드의 형태 항목](CONVENTION.md#메소드의-형태)을 참고해주시기 바랍니다.