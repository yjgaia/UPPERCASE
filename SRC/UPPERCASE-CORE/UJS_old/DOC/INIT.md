# 초기화 하기
UJS를 기반으로 프로젝트를 제작할 때는, 네 부분으로 코드를 나눕니다.

1. `UJS를 불러오는 부분`
2. `선언부` 모든 METHOD와 CLASS, OBJECT들을 선언합니다.
3. `OBJECT 초기화 부분` OBJECT는 초기화가 필요하기 때문에, `INIT_OBJECTS` 메소드로 위에서 선언한 OBJECT들을 모두 초기화 합니다. **초기화는 프로젝트 전체에서 *단 한번만* 수행해야 합니다.**
4. `실행부` 여기서부터 코드가 시작됩니다.

## 웹 페이지에서
```html
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>UJS Example</title>
	</head>
	<body>
    	<!-- UJS를 불러오는 부분 -->
		<script src="/UJS-BROWSER.js"></script>
		<script>
			BROWSER_CONFIG.fixScriptsFolderPath = '/UJS-BROWSER-FIX';
			LOAD('/UJS-BROWSER-FIX/FIX.js');
		</script>
		<script>
			READY(function() {

				// 선언부
				var
				// some method
				someMethod = METHOD({
					run : function() {
						console.log('HELLO UJS!');
					}
				});

				// OBJECT 초기화 부분
				INIT_OBJECTS();

				// 실행부
				someMethod();
			});
		</script>
	</body>
</html>
```

## Node.js기반 프로젝트에서
```javascript
// UJS를 불러오는 부분
require('UJS-NODE.js');

// 선언부
var
// some method
someMethod = METHOD({
	run : function() {
		console.log('HELLO UJS!');
	}
});

// OBJECT 초기화 부분
INIT_OBJECTS();

// 실행부
someMethod();
```

다음 문서: [코드 컨벤션 규칙 익히기](CONVENTION.md)