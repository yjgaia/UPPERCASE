# UPPERCASE
UPPERCASE는 웹 어플리케이션 개발을 도와주는 JavaScript 기반 프레임워크입니다. 서버와 클라이언트를 부드럽게 연결는데 특화되어, 예를 들면 메신저나 SNS 같이 실시간 통신이 중요한 애플리케이션 개발에 유용합니다. 또한 서버 프레임워크로만으로 사용할 수 있으며, 반대로 서버가 불필요한 웹 애플리케이션 개발을 할 때도 유용하게 사용할 수 있습니다.

### 왜 이름이 UPPERCASE인가요?
UPPERCASE의 모든 기능들의 이름은 JavaScript의 키워드나 변수 이름, 다른 라이브러리들에서 사용하는 이름을 피하기 위해 대문자로 이루어져 있습니다. 비슷하게, [jQuery](https://jquery.com/)는 `$`를, [Underscore](http://underscorejs.org/)는 `_`를 접두사로 사용하고 있습니다.

```javascript
// UPPERCASE
EACH([52, 97], function(value, index) {
    alert(index + ': ' + value);
});

// jQuery
$.each([52, 97], function(index, value) {
    alert(index + ': ' + value);
});

// Underscore
_.each([52, 97], function(value, index) {
    alert(index + ': ' + value);
});
```

### UPPERCASE는 웹 개발의 모든 영역을 지원합니다.
웹 사이트, 웹 애플리케이션, 웹 게임 등 웹 개발의 모든 영역을 지원합니다.

### UPPERCASE는 서버가 필요한 모든 부분을 지원합니다.
웹 서비스가 아니더라도, UPPERCASE는 서버가 필요한 모든 곳에서 사용할 수 있습니다. 현재 지원하고 있는 클라이언트 목록은 [클라이언트](#클라이언트) 항목을 참고해주시기 바랍니다.

### UPPERCASE는 웹 표준을 지원합니다.
따라서 웹 표준이 지원되는 모든 브라우저에서 구동됩니다.

### UPPERCASE는 Node.js를 제외한 다른 네이티브 모듈의 의존성이 없습니다.
따라서 Node.js가 구동되는 모든 운영체제와 시스템에서 구동됩니다.

## 설치하기

1. UPPERCASE의 기반 시스템들을 설치합니다. 기반 시스템들은 다음과 같습니다.

    * [Node.js](http://nodejs.org)
    * [ImageMagick](http://www.imagemagick.org)
    * [MongoDB](http://www.mongodb.org)

2. `Git`을 이용하여 UPPERCASE를 적당한 곳에 `clone`합니다. [git 간편 안내서](http://rogerdudler.github.io/git-guide/index.ko.html)

	```
    git clone https://github.com/Hanul/UPPERCASE.git
    ```

3. UPPERCASE의 위치를 환경 변수에 등록합니다.

    ##### 운영체제가 Windows인 경우
	`내 컴퓨터 - 속성 - 고급 시스템 설정 - 환경 변수`에서 `UPPERCASE_PATH`에 UPPERCASE의 위치를 등록합니다. (CMD가 켜져 있는 경우, 환경 변수를 적용하기 위해서는 환경 변수 등록 후에 CMD를 종료했다가 다시 실행해야 합니다.)
	
	##### 운영체제가 Mac인 경우
	터미널에서 아래와 같이 입력합니다. 이후 터미널을 다시 실행하면 반영됩니다.
    ```
    vi .profile
    export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
    ```
	
	##### 운영체제가 Linux인 경우
	터미널에서 아래와 같이 입력합니다. 이후 터미널을 다시 실행하면 반영됩니다.
    ```
    vi .bash_profile
    혹은
    vi .profile
    export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
    ```

UPPERCASE의 전체 기능을 모두 사용하기 위해서는 전부 설치해야합니다. 그러나 부분적인 기능만 사용하는 경우에는, 아래 설명에 맞게 선택적으로 설치할 수 있습니다.

* [Node.js](http://nodejs.org) - 웹 브라우저 관련 기능들만 사용하는 등 Node.js 관련 기능을 전혀 사용하지 않는 경우에는 설치하지 않아도 됩니다.
* [ImageMagick](http://www.imagemagick.org) - [이미지 처리 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-NODE.md#%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B2%98%EB%A6%AC-%EA%B8%B0%EB%8A%A5) 혹은 [업로드 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-NODE.md#업로드-기능을-제공하는-웹-서버)을 사용하지 않는 경우에는 설치하지 않아도 됩니다.
* [MongoDB](http://www.mongodb.org) - 데이터를 저장할 필요가 없는 경우에는 설치하지 않아도 됩니다.

## 업데이트
UPPERCASE가 설치된 폴더로 이동하여 `git push` 명령을 실행합니다.
```
cd UPPERCASE
git push
```

## Hello, UPPERCASE!
1. `Hello`라는 폴더를 만든 후, 그 아래에 다음 내용을 포함하는 `Hello.js` 파일을 생성합니다.
    ```javascript
    require(process.env.UPPERCASE_PATH + '/LOAD.js');
    
    BOOT({
    	CONFIG : {
    		isDevMode : true,
    		defaultBoxName : 'Hello',
    		webServerPort : 8888
    	}
    });
    ```

2. `Hello` 폴더 내에 `Hello` 폴더를 만든 후, 그 아래에 `BROWSER` 폴더를 만듭니다.
3. `BROWSER` 폴더 내에 다음 내용을 포함하는 `MAIN.js` 파일을 생성합니다.
    ```javascript
    Hello.MAIN = METHOD({
    
    	run : function(params) {
    		'use strict';
    
    		Hello.MATCH_VIEW({
    			uri : '',
    			target : CLASS({
    				preset : function() {
    					return VIEW;
    				},
    				init : function(inner, self) {
    					P({
    						c : 'Hello, UPPERCASE!'
    					}).appendTo(BODY);
    				}
    			})
    		});
    	}
    });
    ```

3. 프로젝트를 실행합니다.
    ```
    node Hello.js
    ```

4. 웹 브라우저로 http://localhost:8888/ 에 접속합니다.

## 문서
* [튜토리얼](DOC/TUTORIAL.md)
* [가이드](DOC/GUIDE.md)
* [API 문서](API/README.md)
* [릴리즈 노트](DOC/RELEASE.md)

## 클라이언트
UPPERCASE가 공식 지원하는 클라이언트 목록은 다음과 같습니다.
* 웹 브라우저 - UPPERCASE는 자체적으로 웹 브라우저용 클라이언트를 지원하고 있습니다. 테스트가 완료된 웹 브라우저의 종류는 다음과 같습니다.
	- Chrome PC 버전
	- Firefox
	- Edge
	- Safari Mac 버전
	- Chrome Android 버전
	- Safari iOS 버전
* Android
* iOS

곧 지원할 예정인 클라이언트 목록은 다음과 같습니다.
* Unity
* Unreal
* Xamarin

비공식 클라이언트 목록은 다음과 같습니다.
* GameMaker: Studio

기타 클라이언트 라이브러리를 지원받고 싶은 플랫폼이 있으면, [GitHub Issues](https://github.com/Hanul/UPPERCASE/issues)에 글을 남겨주시기 바랍니다.

## 커뮤니티
* [GitHub Issues](https://github.com/Hanul/UPPERCASE/issues)
* [UPPERCASE 페이스북 유저 그룹](https://www.facebook.com/groups/uppercase/)

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)