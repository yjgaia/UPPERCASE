작성중

# 프로젝트 생성하기
이 문서는 UPPERCASE 기반 프로젝트를 생성하는 방법에 대해 설명합니다.

## 목차
* 프로젝트 폴더 생성
* 개발 시작
* 프로젝트 실행을 위한 코드 작성
* 프로젝트 실행
* UPPERCASE 기반 프로젝트 구조 살펴보기
* `.gitignore` 설정하기

## 프로젝트 폴더 생성
우선, 프로젝트의 모든 내용을 저장하기 위한 프로젝트 폴더를 생성해봅시다.

1. 적당한 위치에 프로젝트 폴더를 생성합니다.
2. 프로젝트 폴더 내에 BOX 폴더를 생성합니다. **BOX는 UPPERCASE에서 모듈과 같은 개념**입니다. BOX에 대한 자세한 설명은 [BOX 문서](BOX.md)를 참고해주시기 바랍니다. 이 문서에서는 BOX 폴더명을 `Sample`이라고 가정합니다.
2. Sample 폴더 내에 아래와 같은 서브 폴더들을 만듭니다.
	* `NODE` Node.js를 기반으로 동작할 코드들을 작성할 폴더입니다.
	* `BROWSER` 브라우저에서 동작할 코드들을 작성할 폴더입니다.
	* `COMMON` Node.js 및 브라우저 양쪽 모두에서 동작할 코드들을 작성할 폴더입니다.
	* `R` 웹 애플리케이션에서 사용할 리소스들을 저장할 폴더입니다.
3. 프로젝트 실행을 위한 JS 파일을 프로젝트 폴더 아래(BOX 폴더가 아닙니다!)에 생성합니다. 보통 프로젝트 폴더명과 동일하게 작성합니다. 여기서는 `Sample.js`로 가정합니다.

## 개발 시작
그럼 이제 개발을 시작해 볼까요?

1. 사용하는 JavaScript 개발툴을 엽니다.
2. [UPPERCASE의 코드 컨벤션 규칙](CONVENTION.md)을 익힙니다.
3. 프로젝트 실행을 위한 코드를 작성합니다.

### 간단한 화면 띄우기
이 과정을 진행하기 전에, [UPPERCASE-CORE](UPPERCASE-CORE.md)와 [BOX](BOX.md)에 대한 내용을 숙지하시기 바랍니다.

이제 간단한 화면을 생성하도록 하겠습니다. `BROWSER 폴더` 아래에 이하 두 파일을 만들어주기 바랍니다.

* `MAIN.js` UPPERCASE가 각 BOX에서 맨 처음 실행하는 코드입니다.

    ```javascript
    // MAIN 메소드를 생성합니다.
    Sample.MAIN = METHOD({
    
    	run : () => {
    	
    		// ''로 접속하면 Home 뷰를 생성합니다.
    		Sample.MATCH_VIEW({
    			uri : '',
    			target : Sample.Home
    		});
    	}
    });
    ```

* `Home.js` 화면을 담당하는 뷰 파일입니다.

    ```javascript
    Sample.Home = CLASS({
    
    	preset : () => {
    		return VIEW;
    	},
    
    	init : (inner, self) => {
    
    		let div = DIV({
    			c : 'Hello, UPPERCASE!'
    		}).appendTo(BODY);
    		
    		inner.on('close', () => {
    			div.remove();
    		});
    	}
    });
    ```


## 프로젝트 실행을 위한 코드 작성
아래와 같이 Sample.js 코드를 작성합니다. 코드를 작성하기에 앞서 `UPPERCASE_PATH 환경 변수`가 설정되어 있어야 합니다. 설정하는 방법은 [설치하기 문서](INSTALL.md)를 참고해주시기 바랍니다.

```javascript
// UPPERCASE의 LOAD.js를 import 합니다.
require(process.env.UPPERCASE_PATH + '/LOAD.js');

// UPPERCASE를 부팅합니다.
BOOT({
	CONFIG : {
		// 개발 모드로 부팅합니다.
        isDevMode : true,
        // 기본 BOX는 Sample BOX 입니다.
		defaultBoxName : 'Sample',
		// 프로젝트명은 Sample입니다.
        title : 'Sample',
        // 웹 서버 포트는 8888입니다.
		webServerPort : 8888
	}
});
```

BOOT.js를 import 하고, BOOT 메소드를 실행합니다. 이때 CONFIG라는 설정을 통해 UPPERCASE의 작동 방식을 설정합니다. CONFIG에 대한 자세한 내용은 [이 문서](CONFIG.md)를 참고해주세요.

## 프로젝트 실행
콘솔 혹은 터미널에서 프로젝트 폴더로 이동하여 다음과 같은 명령을 실행합니다.

```
node Sample.js
```

아래와 같은 화면이 출력된다면 정상적으로 프로젝트가 실행된 것입니다.

```
[BOOT] 부팅중...
[WEB_SERVER] 웹 서버가 실행중입니다. (HTTP 서버 포트:8888)
[WEB_SOCKET_SERVER] 웹 소켓 서버가 실행중입니다.
[BOOT] <2017-4-16 15:58:18> [UPPERCASE PROJECT] 부팅 완료 => http://localhost:8888
...
```

http://localhost:8888 으로 접속하여 까만 화면이 뜬다면 프로젝트 개발의 모든 준비가 끝났습니다. (왜 까만 화면이 뜨는지는 [UPPERCASE의 기본 스타일](BASE_STYLE.md)을 참고하시기 바랍니다.)

그런 뒤에 `Ctrl + C` 등으로 실행중인 Sample.js를 종료하고 다시 실행한 후, http://localhost:8080 으로 접속하시면 `Hello, UPPERCASE!` 라는 문구를 보실 수 있습니다.

축하합니다! 첫 UPPERCASE 프로젝트를 생성하셨습니다! 이제 UPPERCASE 프로젝트의 기본이 되는 [모델 생성](CREATE_MODEL.md)에 대해 알아보도록 하겠습니다.

## UPPERCASE 기반 프로젝트 구조 살펴보기
예를들어, 아래와 같은 프로젝트 구조가 있다고 가정합니다.

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

* `Sample` 프로젝트 폴더입니다. 프로젝트의 소스코드 및 설정 파일, 프로젝트가 사용하는 BOX들, 업로드 파일 등 프로젝트를 구성하는 모든 요소들이 들어 있는 폴더입니다.
* `Sample/__PACK` 프로젝트의 BOX 폴더를 패키징 하면 이 곳에 저장됩니다. 자세한 내용은 [BOX 패키징](BOX.md#BOX-패키징) 문서를 참고하시기 바랍니다.
* `Sample/__RF` 업로드 파일들이 저장되는 폴더입니다.
* `Sample/BOX` 프로젝트가 사용하는 BOX들이 저장되는 폴더입니다.
* `Sample/BOX/UUI` UUI BOX입니다.
* `Sample/BOX/UUI/BROWSER.js` UUI BOX의 웹 브라우저 환경 용 소스코드가 압축되어 있는 파일입니다.
* `Sample/Sample` 프로젝트의 BOX 폴더입니다. 프로젝트의 모든 소스코드를 저장하는 곳입니다.
* `Sample/Sample/COMMON` Node.js 환경 및 웹 브라우저 환경 모두에서 사용되는 소스코드가 저장되어 있는 폴더입니다.
* `Sample/Sample/COMMON/SampleModel.js` [UPPERCASE 모델](UPPERCASE-MODEL.md)의 경우, Node.js 환경 및 웹 브라우저 환경 모두에서 사용될 수 있습니다.
* `Sample/Sample/NODE` Node.js 환경에서 사용되는 소스코드가 저장되어 있는 폴더입니다.
* `Sample/Sample/NODE/MAIN.js` 아래 특수 파일 설명을 참고하시기 바랍니다.
* `Sample/Sample/BROWSER` 웹 브라우저 환경에서 사용되는 소스코드가 저장되어 있는 폴더입니다.
* `Sample/Sample/BROWSER/MAIN.js` 아래 특수 파일 설명을 참고하시기 바랍니다.
* `Sample/Sample/BROWSER/CONNECTED.js` 아래 특수 파일 설명을 참고하시기 바랍니다.
* `Sample/Sample/BROWSER/DISCONNECTED.js` 아래 특수 파일 설명을 참고하시기 바랍니다.
* `Sample/Sample.js`
* `Sample/VERSION`
* `Sample/DEPENDENCY`

### 특수 파일
아래 파일들은 UPPERCASE 기반 프로젝트에서 특수한 기능을 가진 파일들입니다.
* `MAIN.js`에는 `box.MAIN()` 함수를 정의합니다. 이 함수는 UPPERCASE가 각 BOX에서 맨 처음 실행하는 코드입니다. `BROWSER` 폴더와 `NODE` 폴더에 작성할 수 있습니다.
* `CONNECTED.js`에는 `box.CONNECTED()` 함수를 정의합니다. 이 함수는 서버와 연결되었을 때 실행됩니다. `BROWSER` 폴더에 작성합니다.
* `DISCONNECTED.js`에는 `box.DISCONNECTED()` 함수를 정의합니다. 이 함수는 서버와의 연결이 끊어졌을 때 실행됩니다. `BROWSER` 폴더에 작성합니다.

#### `MAIN.js`
`MAIN`은 프로젝트가 실행될 때 맨 처음 실행되는 메소드입니다. `NODE` 폴더의 `MAIN`은 프로젝트 자체를 실행할 때, `BROWSER` 폴더의 `MAIN`은 브라우저로 최초 접속 시 실행됩니다.

참고로 `NODE`의 `MAIN` 메소드에는 파라미터로 `requestHandler`를 지정할 수 있는 함수를 받습니다. 이를 통해 특정 `URI`에 대한 행동을 정의할 수 있습니다.

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

#### `DISCONNECTED.js`

## `.gitignore` 설정
프로젝트를 Git으로 관리하는 경우 `.gitignore` 파일에 다음과 같은 내용을 추가하여 주시기 바랍니다.
```.gitignore
__RF/
```

* `__RF` 업로드 파일이 이 폴더에 저장됩니다. 업로드 파일을 Git으로 관리할 필요가 없으므로, 무시 목록에 추가합니다.