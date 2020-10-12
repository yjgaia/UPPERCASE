# 튜토리얼

## 목차
* [Hello, UPPERCASE!](#hello-uppercase)
* [채팅 튜토리얼](#채팅-튜토리얼)
* [업로드 튜토리얼](#업로드-튜토리얼)
* [SNS 튜토리얼](#sns-튜토리얼)
* [웹 게임 튜토리얼](#웹-게임-튜토리얼)
* [다른 기술과 함께 사용하는 튜토리얼](#다른-기술과-함께-사용하는-튜토리얼)

## Hello, UPPERCASE!
화면에 `Hello, UPPERCASE!`를 출력하는 간단한 튜토리얼입니다. 이 튜토리얼에 대한 자세한 설명은 [프로젝트 생성하기 문서](GUIDE/CREATE_PROJECT.md)를 참고해 주시기 바랍니다.

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

2. `Hello` 폴더에 다시 `Hello` 폴더를 만든 후, 그 아래에 `BROWSER` 폴더를 만듭니다.
3. `BROWSER` 폴더에 다음 내용을 포함하는 `MAIN.js` 파일을 생성합니다.
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
5. `Hello, UPPERCASE!`

## [채팅 튜토리얼](https://github.com/Hanul/UPPERCASE-Chat-Tutorial) - 개발중
웹 기반 채팅 애플리케이션을 만들어 봅시다.

## [업로드 튜토리얼](https://github.com/Hanul/UPPERCASE-Upload-Tutorial) - 개발중
업로드 기능을 만들어 봅시다.

## [SNS 튜토리얼](https://github.com/Hanul/UPPERCASE-SNS-Tutorial) - 개발중
실시간 SNS를 만들어 봅시다.

## [웹 게임 튜토리얼](https://github.com/Hanul/UPPERCASE-Game-Tutorial) - 개발중
HTML5 Canvas를 이용해 간단한 웹 게임을 만들어 봅시다.

## 다른 기술과 함께 사용하는 튜토리얼
이하 튜토리얼들은 UPPERCASE와 다른 기술을 함께 사용하는 방법에 대해 다룹니다.

### [웹 사이트 튜토리얼](https://github.com/Hanul/UPPERCASE-Site-Tutorial) - 개발중
UPPERCASE와 [SML](https://github.com/Hanul/SML)을 사용하여 간단한 웹 사이트를 만들어 봅시다.

### [블로그 튜토리얼](https://github.com/Hanul/UPPERCASE-Blog-Tutorial) - 개발중
UPPERCASE와 [SML](https://github.com/Hanul/SML), [NSP](https://github.com/Hanul/NSP)를 사용하여 블로그를 만들어 봅시다.

### [네이티브 앱 튜토리얼](https://github.com/Hanul/UPPERCASE-Native-App-Tutorial) - 개발중
UPPERCASE의 서버사이드 기술로 네이티브 앱의 백엔드를 만들어 봅시다.

### [소셜 서비스 연동 튜토리얼](https://github.com/Hanul/UPPERCASE-Social-Login-Tutorial) - 개발중
UPPERCASE 기반 프로젝트에 소셜 서비스를 연동해 봅시다.
