OVERRIDE(BROWSER_CONFIG, (origin) => {

	global.BROWSER_CONFIG = COMBINE([{
		
		// 서버에 접속하는 것을 원치 않은 경우 true로 설정
		// isNotToConnectToServer
		
	}, origin]);
});
