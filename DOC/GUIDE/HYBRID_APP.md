# 하이브리드 앱 만들기
UPPERCASE 기반 프로젝트는 [Hybrid App 프로젝트](https://github.com/Hanul/HybridApp)를 이용하여 모바일 및 PC 애플리케이션을 만들 수 있습니다.

* [앱에 모든 리소스를 내장하는 경우](#앱에-모든-리소스를-내장하는-경우)
* [웹 페이지를 그대로 앱에 띄우는 경우](#웹-페이지를-그대로-앱에-띄우는-경우)

## 앱에 모든 리소스를 내장하는 경우
애플리케이션에 프로젝트의 모든 리소스를 내장하여 실행 파일을 생성하고자 하는 경우에는 다음과 같은 방법을 따릅니다.

1. [`ubm`의 `fullpack` 기능](https://github.com/Hanul/ubm#%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C-%EC%95%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%92%80-%ED%8C%A8%ED%82%A4%EC%A7%95)을 사용하여 프로젝트에서 사용하는 모든 리소스를 패키징합니다.
```
ubm fullpack Sample.js SampleApp/android/www
```

2. `index.html` 파일을 다음과 같이 작성합니다. 가장 하단의 스크립트는 [UPPERCASE-BOOT의 `BROWSER_INIT.js` 파일](https://github.com/Hanul/UPPERCASE/blob/master/UPPERCASE-BOOT/BROWSER_INIT.js)을 참고하여 애플리케이션의 성격에 맞게 작성합니다.
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
		<title>Asteroid Girl</title>
		<link rel="stylesheet" type="text/css" href="__CSS.css" />
	</head>
	<body>
		<script src="__SCRIPT"></script>
		<script src="__R"></script>
		<!-- 아래 두 파일은 Hybrid App 관련 파일입니다. -->
		<script src="config.js"></script>
		<script src="Native.js"></script>
		<!-- 아래 코드는 UPPERCASE-BOOT의 BROWSER_INIT.js 코드를 참고하여 작성합니다. -->
		<script>
		RUN(() => {
		
			// host와 port를 서버 정보를 바탕으로 작성합니다.
			BROWSER_CONFIG.host = 'sample.com';
			BROWSER_CONFIG.port = 8206;
			
			let isConnecting = false;
			
			FOR_BOX((box) => {
				if (box.OVERRIDE !== undefined) {
					box.OVERRIDE();
				}
			});
		
			INIT_OBJECTS();
		
			FOR_BOX((box) => {
				if (box.MAIN !== undefined) {
					box.MAIN();
				}
			});
			
			if (BROWSER_CONFIG.isNotConnectToServer !== true) {
				
				// TIME 및 SERVER_TIME 메소드를 사용하기 위해 서버의 시간을 가져옵니다.
				SYNC_TIME();
			
				let connect = RAR(() => {
					
					if (isConnecting !== true) {
						isConnecting = true;
						
						CONNECT_TO_UPPERCASE_SERVER((on) => {
							
							FOR_BOX((box) => {
								if (box.CONNECTED !== undefined) {
									box.CONNECTED();
								}
							});
						
							on('__DISCONNECTED', () => {
								
								FOR_BOX((box) => {
									if (box.DISCONNECTED !== undefined) {
										box.DISCONNECTED();
									}
								});
								
								isConnecting = false;
								
								let reloadInterval = INTERVAL(1, RAR(() => {
					
									GET({
										port : CONFIG.webServerPort,
										uri : '__VERSION'
									}, (version) => {
										
										if (reloadInterval !== undefined) {
											reloadInterval.remove();
											reloadInterval = undefined;
											
											if ((document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT')
											|| BROWSER_CONFIG.beforeUnloadMessage === undefined
											|| confirm(BROWSER_CONFIG.beforeUnloadMessage) === true) {
												
												if (BROWSER_CONFIG.reconnect === undefined || BROWSER_CONFIG.reconnect(CONFIG.version === version, connect) !== false) {
													REFRESH();
													connect();
												}
											}
										}
									});
								}));
							});
						});
					}
				});
			}
		});
		</script>
	</body>
</html>
```

`index.html` 작성시 추가해야 할 설정은 다음과 같습니다. 원래 이 값들은 서버에서 실행되는 애플리케이션의 경우에는 자동으로 설정되지만, 웹 페이지가 애플리케이션에 내장되는 하이브리드 앱의 경우에는 기본값이 지정되어 있지 않습니다. 따라서 반드시 서버 정보를 작성해주어야 합니다. 그러나 서버 기술을 전혀 사용하지 않는 경우에는 작성하지 않아도 무관합니다.
* `BROWSER_CONFIG.host` 서버의 호스트
* `BROWSER_CONFIG.port` 서버의 포트

## 웹 페이지를 그대로 앱에 띄우는 경우
애플리케이션에 웹 페이지를 그대로 띄우는 경우에는 애플리케이션 업데이트가 필요 없이 웹 페이지를 수정하는 것만으로도 업데이트와 같은 효과를 낼 수 있습니다.

또한 [앱에 모든 리소스를 내장하는 경우](#앱에-모든-리소스를-내장하는-경우)와는 다르게 `index.html`을 작성하거나, 설정을 추가할 필요가 없습니다.

애플리케이션에 웹 페이지를 띄우는 방법에 대해서는 [Hybrid App 프로젝트](https://github.com/Hanul/HybridApp)의 각 폴더들의 문서를 참고하시기 바랍니다.