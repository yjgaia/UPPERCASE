# 튜토리얼

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

2. `Hello` 폴더 내에 다시 `Hello` 폴더를 만든 후, 그 아래에 `BROWSER` 폴더를 만듭니다.
3. `BROWSER` 폴더 내에 다음 내용을 포함하는 `MAIN.js` 파일을 생성합니다.
    ```javascript
    Hello.MAIN = METHOD({
    
    	run : (params) => {
    
    		Hello.MATCH_VIEW({
    			uri : '',
    			target : CLASS({
    				preset : () => {
    					return VIEW;
    				},
    				init : (inner, self) => {
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

4. 웹 브라우저로 [http://localhost:8888/](http://localhost:8888/)에 접속합니다.

## [채팅 튜토리얼](https://github.com/Hanul/UPPERCASE-Chat-Tutorial)
웹기반 채팅 애플리케이션을 만들어 봅시다.

## [업로드 튜토리얼](https://github.com/Hanul/UPPERCASE-Upload-Tutorial)
업로드 기능을 만들어 봅시다.

## [SNS 튜토리얼](https://github.com/Hanul/UPPERCASE-SNS-Tutorial)
실시간 SNS를 만들어 봅시다.

## [웹 게임 튜토리얼](https://github.com/Hanul/UPPERCASE-Game-Tutorial)
HTML5 Canvas를 이용한 간단한 웹 게임을 만들어 봅시다.

## 다른 기술과 섞어 쓰는 튜토리얼

### [웹 사이트 튜토리얼](https://github.com/Hanul/UPPERCASE-Site-Tutorial)
UPPERCASE와 [SML](https://github.com/Hanul/SML)을 섞어 간단한 웹 사이트를 만들어 봅시다.

### [블로그 튜토리얼](https://github.com/Hanul/UPPERCASE-Blog-Tutorial)
UPPERCASE와 [SML](https://github.com/Hanul/SML), [NSP](https://github.com/Hanul/NSP)를 섞어 블로그를 만들어 봅시다.

### [모바일 네이티브 앱 튜토리얼](https://github.com/Hanul/UPPERCASE-Native-App-Tutorial)
UPPERCASE의 서버사이드 기술을 이용하여 네이티브 앱을 만들어 봅시다.

### [소셜 서비스 연동 튜토리얼](https://github.com/Hanul/UPPERCASE-Social-Login-Tutorial)
UPPERCASE 기반 프로젝트에 소셜 서비스를 연동해 봅시다.
