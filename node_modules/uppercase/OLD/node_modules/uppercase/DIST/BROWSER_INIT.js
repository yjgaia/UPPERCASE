'use strict';

/*

Welcome to UPPERCASE-BOOT! (http://uppercase.io)

*/

RUN(() => {
	
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
											
											// 버전이 같으면 코드가 변경된 부분이 없으므로, 화면만 다시 새로고침합니다.
											if (CONFIG.version === version) {
												REFRESH();
												connect();
											}
											
											// 버전이 다르면 코드가 변경되었을 수 있으므로, 페이지 자체를 새로고침하여 코드를 새로 불러옵니다.
											else {
												location.reload();
											}
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
