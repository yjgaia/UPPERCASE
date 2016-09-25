
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
