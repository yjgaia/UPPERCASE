# Less 사용하기
이 문서에서는 JavaScript 기반 CSS 프리프로세서인 Less를 사용하는 방법에 대해 다룹니다.
Less의 문법에 대해서는 아래 경로를 살펴보시기 바랍니다.
* http://lesscss.org/features/

우선 NODE 폴더에 Less를 설치합니다.
```
npm install less
```

이후 `MAIN.js`에 다음과 같이 Less 프리프로세서를 추가합니다.
```javascript
Sample.MAIN = METHOD({

	run : function(addRequestListener) {
		'use strict';
		
		var
		//IMPORT: Less
		Less = require('less');
		
		RESOURCE_SERVER.addPreprocessor({
			extension : 'less',
			preprocessor : function(content, response) {
				
				Less.render(content, function(error, output) {
					response({
						content : output.css,
						contentType : 'text/css',
						version : CONFIG.version
					});
				});
			}
		});
	}
});
```

비슷한 방법으로 [Sass](http://www.sass-lang.com) 또한 쉽게 사용할 수 있습니다.
