# BOX
※ 이 문서는 작성중인 문서입니다.


## BOX
BOX는 UPPERCASE.IO에서의 모듈을 칭합니다.
프로젝트 폴더와 BOX폴더 내부의 각 폴더들의 이름으로 BOX들이 생성됩니다.
예를 들어, 아래와 같이 폴더가 구성되어 있다면 `UUI`, `UANI`, `Yogurt`, `Sample` BOX들이 생성됩니다.
![ScreenShot](https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.IO/master/SampleBOXes.png)

`UUI`, `UANI` 등의 UPPERCASE.IO의 공식 BOX 저장소는 다음 경로에 있습니다.
* [UPPERCASE.IO Official BOX Repositories](https://github.com/UIO-BOX)

#### BOX의 일반적인 구성요소
아래 내용들은 필수가 아닙니다. 프로젝트의 성격에 따라 선택적으로 구성할 수 있습니다.
* `BROWSER` 웹 브라우저에서 구동되는 소스들을 저장하는 폴더입니다.
* `COMMON` 웹 브라우저와 node.js에서 동시에 구동되는 소스들을 저장하는 폴더입니다.
* `NODE` node.js 위에서 구동되는 소스들을 저장하는 폴더입니다.
* `R` 리소스 파일들을 저장하는 폴더입니다.

#### BOX 패키징
패키징을 하게되면 각 폴더들의 js 파일들이 하나로 합쳐집니다. 이를테면 BROWSER 폴더의 내용들은 BROWSER.js로 합쳐집니다. 기타 폴더 및 파일들은 그대로 복사됩니다.
1. PACK.js를 다운로드합니다. (오른쪽 클릭 후 다른 이름으로 저장)
	https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.IO/master/PACK.js
2. PACK.js를 아래와 같이 실행합니다.
	`node PACK {{BOX 이름}}`