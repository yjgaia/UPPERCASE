# 프로젝트 생성하기
이 문서는 UPPERCASE 기반 프로젝트를 생성하는 방법에 대해 설명합니다. 지금 바로 프로젝트를 생성하고자 하는 경우에는 [`ubm`을 이용한 프로젝트 초기화](#ubm을-이용한-프로젝트-초기화)를 통해 빠르게 시작할 수 있습니다.

## 목차
* [프로젝트 폴더 생성](#프로젝트-폴더-생성)
* [개발 시작](#개발-시작)
* [`DEPENDENCY` 파일 작성](#dependency-파일-작성)
* [프로젝트 실행을 위한 코드 작성](#프로젝트-실행을-위한-코드-작성)
* [프로젝트 실행](#프로젝트-실행)
* [UPPERCASE 기반 프로젝트 구조 살펴보기](#uppercase-기반-프로젝트-구조-살펴보기)
* [`.gitignore` 설정하기](#gitignore-설정)
* [`ubm`을 이용한 프로젝트 초기화](#ubm을-이용한-프로젝트-초기화)

## 프로젝트 폴더 생성
우선, 프로젝트의 모든 내용을 저장하기 위한 *프로젝트 폴더*를 생성해봅시다.

1. 적당한 위치에 폴더를 생성합니다. 해당 폴더가 프로젝트 폴더가 됩니다. 여기서는 `SampleProject`라는 폴더를 생성하겠습니다.
2. 프로젝트 폴더 내에 `Sample` 폴더를 생성합니다. 이 폴더는 프로젝트 BOX 폴더로써, 프로젝트의 모든 소스코드가 저장됩니다. BOX에 대한 자세한 설명은 [BOX 문서](BOX.md)를 참고해주시기 바랍니다.

## 개발 시작
그럼 이제 개발을 시작해 볼까요?

1. 개발에 앞서 [UPPERCASE의 코드 컨벤션 규칙](CONVENTION.md)을 익힙니다.
2. 사용하는 JavaScript 개발툴을 엽니다.

### 간단한 뷰 생성하기
간단한 뷰를 생성해 보도록 하겠습니다. `Sample` 폴더 내에 `BROWSER` 폴더를 생성하고, `BROWSER` 폴더에 이하 두 파일을 만들어주시기 바랍니다.

* `MAIN.js` 맨 처음 실행되는 코드입니다.

	```javascript
	Sample.MAIN = METHOD({
	
		run : () => {
		
			// http://localhost:8888/ 로 접속하면 Home 뷰를 보여줍니다.
			Sample.MATCH_VIEW({
				uri : '',
				target : Sample.Home
			});
		}
	});
	```

* `Home.js` 초기 화면을 담당하는 뷰 파일입니다.

	```javascript
	Sample.Home = CLASS({
	
		preset : () => {
			return VIEW;
		},
	
		init : (inner, self) => {
		
			let div = DIV({
				c : 'Hello, UPPERCASE!'
			}).appendTo(BODY);
			
			// 경로가 달라지면 div를 제거합니다.
			inner.on('close', () => {
				div.remove();
			});
		}
	});
	```

뷰에 대한 자세한 내용은 [뷰 기능 문서](UPPERCASE-CORE-BROWSER.md#%EB%B7%B0-%EA%B8%B0%EB%8A%A5)를 참고해주시기 바랍니다.

## `DEPENDENCY` 파일 작성
`DEPENDENCY`는 프로젝트가 의존하고 있는 BOX들의 목록을 작성하는 파일입니다. 이후 [프로젝트를 실행](프로젝트-실행)하면 자동으로 BOX들을 다운로드하고 설치한 후 실행합니다.

예를들어 [UUI BOX](https://box.uppercase.io/Hanul/UUI)와 [UANI BOX](https://box.uppercase.io/Hanul/UANI)를 사용하고자 하는 경우 다음과 같이 `DEPENDENCY`를 작성하고 프로젝트를 실행하면 됩니다.
```
Hanul/UUI
Hanul/UANI
```

## 프로젝트 실행을 위한 코드 작성
이제 프로젝트 폴더(`SampleProject` 폴더)에 다음과 같이 `Sample.js` 코드를 작성합니다. `Sample.js` 코드는 프로젝트의 각종 설정을 지정하고, 프로젝트를 실행하는 코드입니다. 코드를 작성하기에 앞서 `UPPERCASE_PATH` 환경 변수가 설정되어 있어야 합니다. 환경 변수에 대해서는 [설치하기 문서](../INSTALL.md)를 참고해주시기 바랍니다.

```javascript
require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		// 개발 모드
		isDevMode : true,
		
		// 기본 BOX는 Sample 입니다.
		defaultBoxName : 'Sample',
		
		// 프로젝트명은 Sample입니다.
		title : 'Sample',
		
		// 웹 서버 포트를 8888로 지정합니다.
		webServerPort : 8888
	},
	
	// 웹 브라우저 환경에서 사용하는 설정
	BROWSER_CONFIG : {
		...
	},
	
	// Node.js 환경에서 사용하는 설정
	NODE_CONFIG : {
		...
	}
});
```

프로젝트 설정에 대한 자세한 내용은 [프로젝트 설정 문서](CONFIGURATION.md)를 참고해주시기 바랍니다.

## 프로젝트 실행
CMD나 터미널에서 프로젝트 폴더로 이동하여 다음 명령을 실행합니다.

```
node Sample.js
```

아래와 같은 화면이 출력된다면 정상적으로 프로젝트가 실행된 것입니다.

```
[BOOT] 부팅중...
[WEB_SERVER] 웹 서버가 실행중입니다. (HTTP 서버 포트:8888)
[WEB_SOCKET_SERVER] 웹소켓 서버가 실행중입니다.
[BOOT] <2017-4-16 15:58:18> [UPPERCASE PROJECT] 부팅 완료 => http://localhost:8888
...
```

http://localhost:8888 으로 접속하여 까만 화면에 흰 글씨로 `Hello, UPPERCASE!`가 뜬다면 모든 준비가 끝났습니다. (왜 까만 화면에 흰 글씨가 뜨는지는 [UPPERCASE의 기본 스타일](BASE_STYLE.md)을 참고하시기 바랍니다.)

축하합니다! 첫 UPPERCASE 프로젝트를 생성하셨습니다! 다음 단계로는 [모델 생성 문서](CREATE_MODEL.md)를 살펴보시기 바랍니다.

## UPPERCASE 기반 프로젝트 구조 살펴보기
아래와 같은 프로젝트 구조가 있다고 가정합니다.

```
SampleProject
	__PACK
	__RF
	BOX
		UUI
			BROWSER.js
		UANI
			BROWSER.js
		Yogurt
			BROWSER.js
	Sample
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

이하는 각 폴더 및 파일에 대한 설명입니다.

* `SampleProject` *프로젝트 폴더*입니다. 프로젝트의 소스코드 및 설정 파일, 프로젝트가 사용하는 각종 BOX들, 업로드 파일 등 프로젝트를 구성하는 모든 요소들이 들어있는 폴더입니다.
* `SampleProject/__PACK` 프로젝트의 BOX 폴더를 패키징 하면 이 곳에 저장됩니다. 자세한 내용은 [BOX 패키징 문서](BOX.md#BOX-패키징)를 참고하시기 바랍니다.
* `SampleProject/__RF` 업로드 파일들이 저장되는 폴더입니다.
* `SampleProject/BOX` 프로젝트가 사용하는 각종 BOX들이 저장되는 폴더입니다.
* `SampleProject/BOX/UUI` [UUI BOX](https://box.uppercase.io/Hanul/UUI)입니다.
* `SampleProject/BOX/UUI/BROWSER.js` [UUI BOX](https://box.uppercase.io/Hanul/UUI)의 웹 브라우저 환경에서 동작하는 코드들이 압축되어있는 파일입니다.
* `SampleProject/Sample` 프로젝트 BOX 폴더입니다. 프로젝트의 모든 소스코드들이 저장되는 폴더입니다.
* `SampleProject/Sample/COMMON` Node.js 환경 및 웹 브라우저 환경 모두에서 동작할 코드들을 작성할 폴더입니다.
* `SampleProject/Sample/COMMON/SampleModel.js` [UPPERCASE 모델](UPPERCASE-MODEL.md)의 경우, Node.js 환경 및 웹 브라우저 환경 모두에서 사용될 수 있기 때문에 `COMMON` 폴더에 정의합니다.
* `SampleProject/Sample/NODE` Node.js 환경에서 동작할 코드들을 작성할 폴더입니다.
* `SampleProject/Sample/NODE/MAIN.js` [아래의 특수 파일 설명](#특수-파일)을 참고하시기 바랍니다.
* `SampleProject/Sample/BROWSER` 웹 브라우저 환경에서 동작할 코드들을 작성할 폴더입니다.
* `SampleProject/Sample/BROWSER/MAIN.js` [아래의 특수 파일 설명](#특수-파일)을 참고하시기 바랍니다.
* `SampleProject/Sample/BROWSER/CONNECTED.js` [아래의 특수 파일 설명](#특수-파일)을 참고하시기 바랍니다.
* `SampleProject/Sample/BROWSER/DISCONNECTED.js` [아래의 특수 파일 설명](#특수-파일)을 참고하시기 바랍니다.
* `SampleProject/Sample/R` 웹 애플리케이션이 제공할 리소스(이미지, 사운드 등)들을 저장할 폴더입니다.
* `SampleProject/Sample.js` 프로젝트의 각종 설정을 지정하고, 프로젝트를 실행하는 코드입니다.
* `SampleProject/VERSION` 프로젝트의 버전 문자열을 저장하는 [VERSION 파일](DEPLOY.md#version-파일)입니다.
* `SampleProject/DEPENDENCY` 프로젝트가 의존하고 있는 BOX들의 목록을 작성하는 파일입니다.

### 특수 파일
아래 파일들은 UPPERCASE 기반 프로젝트에서 특수한 기능을 가진 파일들입니다.

#### `MAIN.js`
`MAIN.js` 파일에 작성되어 있는 각 BOX 별 `MAIN` 메소드는, 프로젝트가 실행될 때 맨 처음 실행되는 메소드입니다. `NODE` 폴더의 `MAIN.js`는 프로젝트를 실행할 때 처음으로 실행되며 `BROWSER` 폴더의 `MAIN.js`는 웹 브라우저로 접속할 때 처음으로 실행됩니다.

또한 `NODE`의 `MAIN` 메소드는 `requestHandler`를 지정할 수 있는 함수를 파라미터로 받습니다. 이를 통해 특정 `URI`에 대한 로직을 작성할 수 있습니다.

```javascript
Sample.MAIN = METHOD({
	
	run : (addRequestListener) => {
		
		addRequestListener((requestInfo, response) => {

			let uri = requestInfo.uri;
			let userAgent = requestInfo.headers['user-agent'];
			
			...
		});
	}
});
```

#### `CONNECTED.js`
`CONNECTED.js` 파일에 작성되어 있는 각 BOX 별 `CONNECTED` 메소드는, `BROWSER` 폴더에만 작성 가능하며, 웹 브라우저에서 프로젝트에 접속한 이후 서버에 연결되었을 때 실행됩니다.

```javascript
Sample.CONNECTED = METHOD({
	
	run : () => {
		// 서버에 연결되었습니다.
		...
	}
});
```

#### `DISCONNECTED.js`
`DISCONNECTED.js` 파일에 작성되어 있는 각 BOX 별 `DISCONNECTED` 메소드는, `BROWSER` 폴더에만 작성 가능하며, 서버와의 연결이 끊어졌을 때 실행됩니다.

```javascript
Sample.DISCONNECTED = METHOD({
	
	run : () => {
		// 서버와의 연결이 끊어졌습니다.
		...
	}
});
```

## `.gitignore` 설정
프로젝트를 Git으로 관리하는 경우 `.gitignore` 파일에 다음과 같은 내용을 추가하여 주시기 바랍니다.
```.gitignore
__RF/
```

* `__RF` 업로드 파일들이 이 폴더에 저장됩니다. 업로드 파일을 Git으로 관리할 필요는 없으므로, 무시 목록에 추가합니다.

## `ubm`을 이용한 프로젝트 초기화
[`ubm`](https://www.npmjs.com/package/ubm)을 이용하여 쉽게 프로젝트 폴더를 생성하고 초기화할 수 있습니다.

1. [`ubm`](https://www.npmjs.com/package/ubm)을 설치합니다.
	```
	npm install -g ubm
	```
2. 프로젝트 폴더로 이동합니다.
	```
	cd SampleBox
	```
3. `ubm`을 이용하여 프로젝트 폴더를 초기화합니다.
	```
	ubm init SampleBox
	```