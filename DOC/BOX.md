# BOX 이해하기

UJS 기반 프로젝트에서, BOX는 모듈과 같은 개념입니다. 자세한 내용은 UJS의 [UJS-COMMON](https://github.com/Hanul/UJS/blob/master/DOC/KR/UJS-COMMON.md) 문서의 `BOX` 항목을 참고해주세요.

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
        NODE
        R
    Sample.js
```

## BOX의 일반적인 구성요소
아래 내용들은 필수가 아닙니다. 프로젝트의 성격에 따라 선택적으로 구성할 수 있습니다.
* `BROWSER` 웹 브라우저에서 구동되는 소스들을 저장하는 폴더입니다.
* `COMMON` 웹 브라우저와 node.js에서 동시에 구동되는 소스들을 저장하는 폴더입니다.
* `NODE` node.js 위에서 구동되는 소스들을 저장하는 폴더입니다.
* `R` 리소스 파일들을 저장하는 폴더입니다.

## BOX 패키징
프로젝트 폴더를 패키징하여 다른 프로젝트에서 재사용 할 수 있습니다.

1. PACK.js를 다운로드합니다. (오른쪽 클릭 후 다른 이름으로 저장)
	https://raw.githubusercontent.com/Hanul/UPPERCASE/master/PACK.js
2. PACK.js를 아래와 같이 실행합니다.
	`node PACK {{패키징 할 프로젝트 폴더 이름}}`

패키징을 하게되면 각 폴더들의 js 파일들이 하나로 합쳐져 `__PACK` 폴더 내에 복사됩니다. 이를테면 BROWSER 폴더의 내용들은 BROWSER.js로 합쳐집니다. 기타 폴더 및 파일들은 그대로 복사됩니다.

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
    PACK.js
```

PACK 명령을 실행합니다.

```
node PACK Sample
```

패키징 된 폴더가 __PACK 폴더 이하에 생성됩니다.

```
Sample
    __PACK
        Sample
            BROWSER.js
            COMMON.js
            NODE.js
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