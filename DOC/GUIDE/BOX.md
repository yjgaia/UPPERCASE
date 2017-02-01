작성중

# BOX
BOX는 UPPERCASE용 모듈을 지칭합니다.

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
SomeBox.SomeMethod = METHOD(...
SomeBox.SomeClass = CLASS(...
SomeBox.SomeObject = OBJECT(...

SomeBox.SomeMethod();
```

혹은 다음과 같이, BOX 내 집합인 PACK을 추가하고, 만들어진 PACK에 기능을 추가할 수 있습니다. BOX를 함수 형태로 하여 PACK의 이름을 넣고, 콤마(`.`)를, 그 뒤에 이름과 기능을 작성하면 됩니다.

```javascript
SomeBox('SomePack.GoodPack').SomeMethod = METHOD(...
SomeBox('SomePack.GoodPack').SomeClass = CLASS(...
SomeBox('SomePack.GoodPack').SomeObject = OBJECT(...

SomeBox.SomePack.GoodPack.SomeMethod();
```

BOX 시스템을 통해 BOX 단위로 프로젝트를 나눌 수 있습니다. 이를 조합하여 큰 규모의 프로젝트를 제작할 수 있습니다.

UPPERCASE 기반 프로젝트에서는 *프로젝트 폴더*와 BOX폴더 내부의 각 폴더들의 이름으로 BOX가 생성됩니다.
예를 들어, 아래와 같이 폴더가 구성되어 있다면 `UUI`, `UANI`, `Yogurt`, `Sample` BOX들이 생성됩니다. (`Sample`은 프로젝트 폴더)

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
아래 내용들은 필수가 아닙니다. 프로젝트의 성격에 따라 선택적으로 구성할 수 있습니다.
* `BROWSER` 웹 브라우저에서 구동되는 소스들을 저장하는 폴더입니다.
* `COMMON` 웹 브라우저와 Node.js에서 동시에 구동되는 소스들을 저장하는 폴더입니다.
* `NODE` Node.js 위에서 구동되는 소스들을 저장하는 폴더입니다.
* `R` 리소스 파일들을 저장하는 폴더입니다.

## 특수 파일
아래 파일들은 특수한 기능을 가진 파일들입니다.
* `MAIN.js`에는 `box.MAIN()` 함수를 정의합니다. 이 함수는 UPPERCASE가 각 BOX에서 맨 처음 실행하는 코드입니다.
* `CONNECTED.js`에는 `box.CONNECTED()` 함수를 정의합니다. 이 함수는 서버와 연결되었을 때 실행됩니다.
* `DISCONNECTED.js`에는 `box.DISCONNECTED()` 함수를 정의합니다. 이 함수는 서버와의 연결이 끊어졌을 때 실행됩니다.
* `RECONNECT.js`에는 `box.RECONNECT(isVersionSame, reconnect)` 함수를 정의합니다. 이 함수는 서버와의 연결이 끊어진 이후 서버에 다시 접속하려 할 때 실행됩니다. 서버의 버젼이 달라지면 `isVersionSame`이 `false`로 설정됩니다. 또한 `false`를 `return`하면, 서버에 재접속 되지 않습니다. 그러나 파라미터로 설정된 `reconnect` 함수로 서버에 재접속하는 코드를 작성할 수 있습니다. `reconnect` 하기 전 페이지를 새로고침 하고자 할 때는 `REFRESH` 메소드를 사용합니다. 인증 등을 사용할 때에는 **서버와의 접속이 끊어지면 인증이 풀리**기 때문에, 재접속 시 인증을 수행하는 코드를 작성해주시기 바랍니다. (로그인 화면으로 넘어가는 방법도 있습니다.)

	```javascript
	box.RECONNECT = function(isVersionSame, reconnect) {
		
		// if versions are same, REFRESH.
		if (isVersionSame === true) {
			REFRESH();
			reconnect();
		}
		
		// if versions are not same, reload page.
		else {
			location.reload();
		}
	};
	```
	```javascript
	box.RECONNECT = function(isVersionSame, reconnect) {
		
		// if versions are same, reconnect.
		if (isVersionSame === true) {
			
			Sample.UserModel.login({
				username : rememberMeStore.get('username'),
				password : rememberMeStore.get('password')
			});
			
			reconnect(false);
		}
		
		// if versions are not same, reload page.
		else {
			location.reload();
		}
	};
	```

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

## [UPPERCASE BOX 저장소 사이트](http://box.uppercase.io)
여러 개발자들이 만든 UPPERCASE용 BOX들을 살펴보려면, [UPPERCASE BOX 저장소 사이트](http://box.uppercase.io)에 방문해 보시기 바랍니다.