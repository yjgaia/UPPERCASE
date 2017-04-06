작성중

# BOX
BOX란 UPPERCASE용 모듈을 지칭하는 말입니다.

## 목차
* [BOX 생성](#BOX-생성)
* [BOX에 기능 추가하기](#BOX에-기능-추가하기)
* [BOX의 일반적인 구성요소](#BOX의-일반적인-구성요소)
* [특수 파일](#특수-파일)
* [BOX 패키징](#BOX-패키징)
* [BOX 저장소 사이트](#BOX-저장소-사이트)

## BOX 생성
[UPPERCASE-CORE의 `BOX` 메소드](UPPERCASE-CORE-COMMON.md#uppercase의-모듈화-box)로 BOX를 생성할 수 있습니다.

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

UPPERCASE 기반 프로젝트에서는 폴더 구조를 읽어 자동으로 BOX들이 생성됩니다. **프로젝트 폴더의 이름**과, `BOX` 폴더 내부의 각 폴더들의 이름으로 BOX가 생성됩니다.

예를 들어 아래와 같이 폴더가 구성되어 있다면, `UUI`, `UANI`, `Yogurt`, `Sample` BOX가 생성됩니다. (`Sample`은 프로젝트 폴더의 이름입니다.)

```
Sample
    BOX
        UUI
            BROWSER.js
        UANI
            BROWSER.js
        Yogurt
            BROWSER.js
	Sample
        COMMON
    	BROWSER
    		MAIN.js
    		CONNECTED.js
    		DISCONNECTED.js
    		RECONNECT.js
        NODE
        	MAIN.js
        R
    Sample.js
```

## BOX의 일반적인 구성요소
* `{{프로젝트 이름}}` 프로젝트 이름에 해당하는 폴더입니다. 프로젝트의 모든 소스코드를 저장하는 곳입니다.
* `{{프로젝트 이름}}.js` 프로젝트를 실행하기 위한 설정 코드를 저장하는 곳입니다.
* `VERSION` 프로젝트의 버전 문자열을 저장하는 곳입니다.
* `DEPENDENCY` 프로젝트가 의존하고 있는 BOX들의 목록을 작성하는 곳입니다.

아래 폴더들을 프로젝트의 성격에 따라 프로젝트 폴더 내의 **프로젝트 이름에 해당하는 폴더**에 선택적으로 구성할 수 있습니다.
* `BROWSER` 웹 브라우저에서 구동되는 소스들을 저장하는 폴더입니다.
* `COMMON` 웹 브라우저와 Node.js에서 동시에 구동되는 소스들을 저장하는 폴더입니다.
* `NODE` Node.js 위에서 구동되는 소스들을 저장하는 폴더입니다.
* `R` 리소스 파일들을 저장하는 폴더입니다.

## 특수 파일
아래 파일들은 특수한 기능을 가진 파일들입니다.
* `MAIN.js`에는 `box.MAIN()` 함수를 정의합니다. 이 함수는 UPPERCASE가 각 BOX에서 맨 처음 실행하는 코드입니다. `BROWSER` 폴더나 `NODE` 폴더에 작성합니다.
* `CONNECTED.js`에는 `box.CONNECTED()` 함수를 정의합니다. 이 함수는 서버와 연결되었을 때 실행됩니다. `BROWSER` 폴더에 작성합니다.
* `DISCONNECTED.js`에는 `box.DISCONNECTED()` 함수를 정의합니다. 이 함수는 서버와의 연결이 끊어졌을 때 실행됩니다. `BROWSER` 폴더에 작성합니다.

## BOX 패키징
프로젝트 폴더를 패키징하여 다른 프로젝트에서 재사용 할 수 있습니다.

1. [`ubm`](https://www.npmjs.com/package/ubm)을 설치합니다.
    ```
    npm install -g ubm
    ```
2. ubm을 이용해 BOX를 패킹합니다.
    ```
    ubm pack SampleBox
    ```

패키징을 하게되면 각 폴더들의 JavaScript 코드들이 하나로 합쳐져 `__PACK` 폴더 내에 저장됩니다. 이를테면 `BROWSER` 폴더의 코드들은 `BROWSER.js`로 합쳐집니다. JavaScript 코드가 아닌 기타 파일 및 폴더는 그대로 복사됩니다.

아래는 예시입니다. 다음과 같은 폴더 구조가 있다고 가정합니다.

```
Sample
	Sample
        COMMON
    	    a.js
    	    b.js
    	    c.js
    	BROWSER
    	    a.js
    	    b.js
    	    c.js
        NODE
    	    a.js
    	    b.js
    	    c.js
        R
            a.png
            b.jpg
            c.txt
    Sample.js
```

PACK 명령을 실행합니다.

```
ubm pack Sample
```

패키징 된 폴더가 `__PACK` 폴더 이하에 생성됩니다.

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
    	BROWSER
    	    a.js
    	    b.js
    	    c.js
        NODE
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
여러 개발자들이 만든 UPPERCASE용 BOX들을 살펴보려면, [UPPERCASE BOX 저장소 사이트](http://box.uppercase.io)에 방문해 보시기 바랍니다.