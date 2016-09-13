# UPPERCASE + NSP

UPPERCASE의 파생 프로젝트이기도 한 NSP(Node Server Pages)와 연동할 수 있습니다.
단일 페이지 웹 애플리케이션을 제작하는데에 최적화 되어 있는 UPPERCASE에, JavaScript로 서버 사이드에서 웹 페이지를 생성할 수 있는 NSP를 연동하여 다목적 기능을 가진 웹 페이지를 만들 수 있습니다.

* [Node Server Pages](https://github.com/Hanul/NSP)

NSP.js 파일을 분석하여 UPPERCASE에 쉽게 삽입할 수 있습니다.

1. NSP-EMBED.js 파일을 NODE 폴더에 복사합니다.
2. NODE/MAIN.js 파일에 다음과 같은 내용을 작성합니다.
```javascript
NSPSample.MAIN = METHOD({

	run : function(addRequestListener) {
		'use strict';
		
		var
		// nsp core
		nspCore = NSP({
			rootPath : './NSPSample/view'
		});
		
		addRequestListener(function(requestInfo, response, onDisconnected, replaceRootPath, next) {
			return nspCore.requestListener(requestInfo, response, onDisconnected, replaceRootPath, next);
		});
		// or addRequestListener(nspCore.requestListener);
	}
});
```
3. `.nsp` 파일들을 `view` 폴더에 넣습니다.
4. 리소스들은 기존 UPPERCASE 프로젝트와 같이 `R` 폴더에 넣습니다.