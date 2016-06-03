# 프로젝트 생성하기
이 문서는 독자가 JavaScript와 웹 개발의 전반적인 내용을 알고 있다고 가정합니다. 이 문서에서 생성된 Sample 프로젝트는 UPPERCASE 저장소의 최상단의 [Sample 폴더](https://github.com/Hanul/UPPERCASE/tree/master/Sample)에 만들어져 있습니다. 참고하시기 바랍니다.

## 프로젝트 폴더 생성
1. 적당한 위치에 프로젝트 폴더를 생성합니다.
2. 프로젝트 폴더 내에 프로젝트 BOX 폴더를 생성합니다. **BOX는 UPPERCASE에서 모듈과 같은 개념**입니다. BOX에 대한 자세한 설명은 [이 문서](BOX.md)를 참고해주세요. 여기서는 BOX 폴더명을 `Sample`이라고 가정합니다.
2. Sample 폴더 내에 아래와 같은 서브 폴더들을 만듭니다.
	* `NODE` Node.js를 기반으로 동작할 코드들을 작성할 폴더입니다.
	* `BROWSER` 브라우저에서 동작할 코드들을 작성할 폴더입니다.
	* `COMMON` Node.js 및 브라우저 양쪽 모두에서 동작할 코드들을 작성할 폴더입니다.
	* `R` 웹 애플리케이션에서 사용할 리소스들을 저장할 폴더입니다.
3. 프로젝트 실행을 위한 JS 파일을 프로젝트 폴더 아래(BOX 폴더가 아닙니다!)에 생성합니다. 보통 프로젝트 폴더명과 동일하게 작성합니다. 여기서는 `Sample.js`로 가정합니다.

완성된 폴더 구조는 다음과 같습니다.

```
Sample
	Sample
    	BROWSER
        COMMON
        NODE
        R
    Sample.js
```

## 개발 시작
1. 사용하는 JavaScript 개발툴을 엽니다. 사용하는 툴이 없다면, [Aptana Studio](http://www.aptana.com)나 [Sublime Text](http://www.sublimetext.com)를 추천합니다.
2. 코드 컨벤션 규칙을 익힙니다. 코드 컨벤션 규칙은 [UJS의 방식](https://github.com/Hanul/UJS/blob/master/DOC/CONVENTION.md)을 따릅니다.
3. 코드 컨벤션 규칙을 모두 익혔다면, 프로젝트 실행을 위한 코드를 작성합니다.

## 프로젝트 실행을 위한 코드(Sample.js) 작성
아래와 같이 Sample.js 코드를 작성합니다. 코드를 작성하기에 앞서 `UPPERCASE_PATH 환경 변수`가 설정되어 있어야 합니다. 설정하는 방법은 [설치하기 문서](INSTALL.md)를 참고해주시기 바랍니다.

```javascript
// UPPERCASE의 BOOT.js를 import 합니다.
require(process.env.UPPERCASE_PATH + '/BOOT.js');

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
[UJS-WEB_SERVER] RUNNING WEB SERVER... (PORT:8888)
[UJS-RESOURCE_SERVER] RUNNING RESOURCE SERVER... (PORT:8888)
[UPPERCASE-WEB_SOCKET_SERVER] RUNNING WEB SOCKET SERVER...
[UPPERCASE-WEB_SOCKET_FIX_REQUEST_MANAGER] RUNNING WEB SOCKET FIX REQUEST MANAGER...
[UPPERCASE] <2015-3-8 18:25:53> `Sample` WORKER #1 BOOTed! => http://localhost:8888
[UJS-CPU_CLUSTERING] RUNNING WORKER... (ID:1)
...
```

http://localhost:8888 으로 접속하여 까만 화면이 뜬다면 프로젝트 개발의 모든 준비가 끝났습니다. (까반 배경화면은 UPPERCASE의 기본 스타일입니다.)

## 간단한 화면 띄우기
이 과정을 진행하기 전에, [UJS](UJS.md)와 [BOX](BOX.md)에 대한 내용을 숙지하시기 바랍니다.

이제 간단한 화면을 생성하도록 하겠습니다. `BROWSER 폴더` 아래에 이하 두 파일을 만들어주기 바랍니다.

* `MAIN.js` UPPERCASE가 각 BOX에서 맨 처음 실행하는 코드입니다.

    ```javascript
    // MAIN 메소드를 생성합니다.
    Sample.MAIN = METHOD({
    
    	run : function() {
    		'use strict';
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
    
    	preset : function() {
    		'use strict';
    
    		return VIEW;
    	},
    
    	init : function(inner, self) {
    		'use strict';
    
    		var
    		// div
    		div = DIV({
    			c : 'Hello, UPPERCASE!'
    		}).appendTo(BODY);
    		
    		inner.on('close', function() {
    			div.remove();
    		});
    	}
    });
    ```

그런 뒤에 `Ctrl + C` 등으로 실행중인 Sample.js를 종료하고 다시 실행한 후, http://localhost:8080 으로 접속하시면 `Hello, UPPERCASE!` 라는 문구를 보실 수 있습니다.

축하합니다! 첫 UPPERCASE 프로젝트를 생성하셨습니다! 이제 UPPERCASE 프로젝트의 기본이 되는 [모델 생성](CREATE_MODEL.md)에 대해 알아보도록 하겠습니다.

## MAIN 메소드
`MAIN`은 프로젝트가 실행될 때 맨 처음 실행되는 메소드입니다. `NODE` 폴더의 `MAIN`은 프로젝트 자체를 실행할 때, `BROWSER` 폴더의 `MAIN`은 브라우저로 최초 접속 시 실행됩니다.

참고로 `NODE`의 `MAIN` 메소드에는 파라미터로 `requestHandler`를 지정할 수 있는 함수를 받습니다. 이를 통해 특정 `URI`에 대한 행동을 정의할 수 있습니다.

```javascript
Sample.MAIN = METHOD({
	
	run : function(addRequestListener) {
		'use strict';
		
		addRequestListener(function(requestInfo, response) {

			var
			// uri
			uri = requestInfo.uri,
			
			// user agent
			userAgent = requestInfo.headers['user-agent'];
			
			...
		});
	}
});
```

## 만약 index.html 파일을 따로 만들고 싶다면
기본적으로 UPPERCASE가 index.html을 생성하기에 일반적으로 이 내용이 필요하지는 않을 것입니다. 그러나 특정한 사유로 인해 index.html을 따로 만들고 싶을 수 있습니다. 그럴 때는 프로젝트의 BOX 폴더 이하에 index.html을 만들면 자동으로 이를 인식해 사용하게 됩니다. UPPERCASE와 연동하기 위한 기본적인 index.html의 틀은 다음과 같습니다. 이를 수정해서 사용하시기 바랍니다.

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
		<meta name="fragment" content="!">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
		<link href="/favicon.ico" rel="shortcut icon">
		<title>샘플 페이지</title>
		<link rel="stylesheet" type="text/css" href="/__CSS">
	</head>
	<body>
		<script src="/__SCRIPT"></script>
	</body>
</html>
```

다음 문서: [모델 생성](CREATE_MODEL.md)