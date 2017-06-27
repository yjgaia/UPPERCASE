작성중

# UPPERCASE에서의 객체지향 프로그래밍
UPPERCASE 기반 프로젝트를 작성할 때, [`CLASS`](UPPERCASE-CORE-COMMON.md#class)나 [`OBJECT`](UPPERCASE-CORE-COMMON.md#object)를 이용해 순수 JavaScript로는 작성하기 어려운 객체지향 프로그래밍이 가능합니다.

## 캡슐화
객체가 실제 데이터를 어떻게 처리하는지 알 수 없도록 합니다.

클래스를 작성할 때 작성자는 숨겨야하는 정보와 공개해야하는 정보를 구분하여 기술할 수 있습니다. 따라서, 객체를 사용하는 사람은 객체 중에 공개된 정보에만 접근이 가능합니다.

이를 통해 객체를 포함한 정보의 손상과 오용을 막을 수 있습니다. 또한 데이터가 바뀌어도 다른 객체에 영향을 주지 않아 독립성이 유지됩니다.

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

### 접근지정자

#### private 접근 지정자
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

#### protected
자기 클래스 내부 또는 상속받은 자식 클래스에서 접근을 허용합니다.

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

#### public
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
상속은 새로운 클래스가 기존의 클래스의 자료와 연산을 이용할 수 있게 하는 기능이다. 상속을 받는 새로운 클래스를 부클래스, 파생 클래스, 하위 클래스, 자식 클래스라고 하며 새로운 클래스가 상속하는 기존의 클래스를 기반 클래스, 상위 클래스, 부모 클래스라고 한다. 상속을 통해서 기존의 클래스를 상속받은 하위 클래스를 이용해 프로그램의 요구에 맞추어 클래스를 수정할 수 있고 클래스 간의 종속 관계를 형성함으로써 객체를 조직화할 수 있다.

```javascript
let Car = CLASS({

    init : (inner, self) => {
        ...
    }
});

let Bus = CLASS({

    preset : () => {
		return Car;
	},
	
    init : (inner, self) => {
        ...
    }
});
```

## 오버라이딩
메소드가 여러 클래스에서 다른 기능을 하는 것

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

## 오버로딩
메소드가 인자의 갯수나 자료형에 따라서 다른 기능을 하는 것

```javascript
let Mathematics = CLASS({

    init : (inner, self) => {
        
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
