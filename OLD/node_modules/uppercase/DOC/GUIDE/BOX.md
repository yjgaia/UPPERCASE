# BOX
BOX란 UPPERCASE용 모듈을 지칭하는 말입니다.

## 목차
* [BOX 생성](#box-생성)
* [BOX에 기능 추가하기](#box에-기능-추가하기)
* [BOX의 일반적인 구성요소](#box의-일반적인-구성요소)
* [특수 파일](#특수-파일)
* [BOX 패키징](#box-패키징)
* [BOX 저장소 사이트](#box-저장소-사이트)

## BOX 생성
UPPERCASE 기반 프로젝트에서는 폴더 구조를 읽어 자동으로 BOX들이 생성됩니다. 프로젝트 BOX 폴더의 이름과, `BOX` 폴더 내 각 폴더들의 이름으로 BOX가 생성됩니다.

예를 들어 아래와 같이 폴더가 구성되어 있다면, `UUI`, `UANI`, `Yogurt`, `Sample` BOX가 생성됩니다. (`Sample`은 프로젝트 BOX 폴더의 이름입니다.)

```
Sample
	__PACK
	__RF
	BOX
		UUI
			BROWSER.js
		UANI
			BROWSER.js
		Yogurt
			BROWSER.js
	Sample --- 프로젝트 BOX 폴더
		COMMON
			SampleModel.js
		NODE
			MAIN.js
		BROWSER
			MAIN.js
			CONNECTED.js
			DISCONNECTED.js
		R
	Sample.js
	VERSION
	DEPENDENCY
```

UPPERCASE 기반 프로젝트를 생성하지 않고 [UPPERCASE의 모듈들](../GUIDE.md#모듈-별-문서)을 따로 사용하는 경우에는 [UPPERCASE-CORE의 `BOX` 메소드](UPPERCASE-CORE-COMMON.md#uppercase의-모듈화-box)로 BOX를 생성할 수 있습니다.

```javascript
BOX('SampleBox');
BOX('SmallBox');
BOX('BigBox');
```

## BOX에 기능 추가하기
만들어진 BOX에 기능을 추가해 보겠습니다. BOX 이름 뒤에 콤마(`.`)를, 그 뒤에 이름과 기능을 작성하면 됩니다.

```javascript
// 기능 추가하기
SomeBox.SomeMethod = METHOD(...
SomeBox.SomeClass = CLASS(...
SomeBox.SomeObject = OBJECT(...

// 기능 사용하기
SomeBox.SomeMethod();
```

혹은 다음과 같이, BOX 내의 또 다른 집합인 PACK을 추가하고, 만들어진 PACK에 기능을 추가할 수 있습니다. BOX를 함수 형태로 실행하며 PACK의 이름을 파라미터로 넣고, 콤마(`.`)를, 그 뒤에 이름과 기능을 작성하면 됩니다.

```javascript
// 기능 추가하기
SomeBox('SomePack.GoodPack').SomeMethod = METHOD(...
SomeBox('SomePack.GoodPack').SomeClass = CLASS(...
SomeBox('SomePack.GoodPack').SomeObject = OBJECT(...

// 기능 사용하기
SomeBox.SomePack.GoodPack.SomeMethod();
```

따라서 BOX 단위로 프로젝트를 나눌 수 있습니다. 이를 조합하여 큰 규모의 프로젝트를 제작할 수도 있습니다.

## BOX의 일반적인 구성요소
* `{{프로젝트 이름}}` 프로젝트의 기본 BOX 폴더입니다. 프로젝트의 모든 소스코드들이 저장되는 폴더입니다.
* [`{{프로젝트 실행을 위한 코드.js}}`](CREATE_PROJECT.md#프로젝트-실행을-위한-코드-작성) 프로젝트의 각종 설정을 지정하고, 프로젝트를 실행하는 코드입니다.
* `VERSION` 프로젝트의 버전 문자열을 저장하는 [VERSION 파일](DEPLOY.md#version-파일)입니다.
* `DEPENDENCY` 프로젝트가 의존하고 있는 BOX들의 목록을 작성하는 파일입니다.

아래의 폴더들을 성격에 따라 프로젝트 BOX 폴더에 선택적으로 구성할 수 있습니다.
* `COMMON` Node.js와 웹 브라우저 환경 양쪽에서 사용하는 소스들을 저장하는 폴더입니다.
* `NODE` Node.js 환경에서 사용하는 소스들을 저장하는 폴더입니다.
* `BROWSER` 웹 브라우저 환경에서 사용하는 소스들을 저장하는 폴더입니다.
* `R` 이미지 등 리소스 파일들을 저장하는 폴더입니다.

## 특수 파일
아래 파일들은 UPPERCASE 기반 프로젝트에서 특수한 기능을 가진 파일들입니다.
* `MAIN.js`에는 `box.MAIN()` 메소드를 정의합니다. 이 메소드는 UPPERCASE가 각 BOX에서 맨 처음 실행하는 코드입니다. `BROWSER` 폴더와 `NODE` 폴더에 작성할 수 있습니다.
* `CONNECTED.js`에는 `box.CONNECTED()` 메소드를 정의합니다. 이 메소드는 서버와 연결되었을 때 실행됩니다. `BROWSER` 폴더에 작성합니다.
* `DISCONNECTED.js`에는 `box.DISCONNECTED()` 메소드를 정의합니다. 이 메소드는 서버와의 연결이 끊어졌을 때 실행됩니다. `BROWSER` 폴더에 작성합니다.

## BOX 패키징
프로젝트 BOX 폴더를 패키징하여 다른 프로젝트에서 재사용 할 수 있습니다.

1. [`ubm`](https://www.npmjs.com/package/ubm)을 설치합니다.
	```
	npm install -g ubm
	```
2. `ubm`을 이용해 프로젝트를 BOX로 패킹합니다.
	```
	ubm pack SampleBox
	```

패키징 하게되면 각 폴더들의 JavaScript 코드들이 하나로 합쳐져 `__PACK` 폴더에 저장됩니다. 이를테면 `BROWSER` 폴더의 코드들은 `BROWSER.js`로 합쳐집니다. JavaScript 코드가 아닌 기타 파일들 및 폴더들은 그대로 복사됩니다.

아래는 예시입니다. 다음과 같은 폴더 구조가 있다고 가정했을때,

```
Sample
	Sample
		COMMON
			a.js
			b.js
			c.js
		NODE
			a.js
			b.js
			c.js
		BROWSER
			a.js
			b.js
			c.js
		R
			a.png
			b.jpg
			c.txt
	Sample.js
```

아래와 같이 `ubm pack` 명령을 실행하면

```
ubm pack Sample
```

패키징 된 BOX가 `__PACK` 폴더에 생성됩니다.

```
Sample
	__PACK
		Sample
			BROWSER.js	// COMMON.js 내용을 포함하고 있습니다.
			COMMON.js
			NODE.js		// COMMON.js 내용을 포함하고 있습니다.
			R
				a.png
				b.jpg
				c.txt
	Sample
		COMMON
			a.js
			b.js
			c.js
		NODE
			a.js
			b.js
			c.js
		BROWSER
			a.js
			b.js
			c.js
		R
			a.png
			b.jpg
			c.txt
	Sample.js
	PACK.js
```

## [BOX 저장소 사이트](http://box.uppercase.io) 
여러 개발자들이 만든 UPPERCASE용 BOX들을 살펴보려면, [BOX 저장소 사이트](http://box.uppercase.io)에 방문해 보시기 바랍니다.