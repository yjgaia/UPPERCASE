'use strict';

/*

Welcome to UPPERCASE-BOOT! (http://uppercase.io)

*/

/*
 * Configuration
 */
OVERRIDE(CONFIG, (origin) => {

	global.CONFIG = COMBINE([{
		
		defaultBoxName : 'UPPERCASE',
		
		title : 'UPPERCASE PROJECT'
		
		// description
		
		// maxThumbWidth
		// or
		// maxThumbHeight
		
	}, origin]);
});

OVERRIDE(BROWSER_CONFIG, (origin) => {

	global.BROWSER_CONFIG = COMBINE([{
		
		// 서버에 접속하는 것을 원치 않은 경우 true로 설정
		// isNotToConnectToServer
		
	}, origin]);
});

/*
 * UPPERCASE 서버에 접속합니다.
 */
global.CONNECT_TO_UPPERCASE_SERVER = METHOD({

	run : (params, connectionListenerOrListeners) => {
		//OPTIONAL: params
		//OPTIONAL: params.roomServerName
		//OPTIONAL: params.isSecure
		//OPTIONAL: params.webServerHost
		//OPTIONAL: params.webServerPort
		//OPTIONAL: connectionListenerOrListeners
		//OPTIONAL: connectionListenerOrListeners.success
		//OPTIONAL: connectionListenerOrListeners.error

		let roomServerName;
		let webServerHost;
		let webServerPort;
		let isSecure;
		
		let connectionListener;
		let errorListener;
		
		if (connectionListenerOrListeners === undefined) {
			
			if (params !== undefined) {
				
				if (CHECK_IS_DATA(params) !== true) {
					connectionListener = params;
				} else {
					roomServerName = params.roomServerName;
					webServerHost = params.webServerHost;
					webServerPort = params.webServerPort;
					isSecure = params.isSecure;
					connectionListener = params.success;
					errorListener = params.error;
				}
			}
		}
		
		else {
			
			if (params !== undefined) {
				roomServerName = params.roomServerName;
				webServerHost = params.webServerHost;
				webServerPort = params.webServerPort;
				isSecure = params.isSecure;
			}
			
			if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
				connectionListener = connectionListenerOrListeners;
			} else {
				connectionListener = connectionListenerOrListeners.success;
				errorListener = connectionListenerOrListeners.error;
			}
		}
		
		if (webServerHost === undefined) {
			webServerHost = BROWSER_CONFIG.host;
		}
		
		if (webServerPort === undefined) {
			webServerPort = BROWSER_CONFIG.port;
		}
		
		if (isSecure === undefined) {
			isSecure = BROWSER_CONFIG.isSecure;
		}
		
		GET({
			isSecure : isSecure,
			host : webServerHost,
			port : webServerPort,
			uri : '__WEB_SERVER_HOST',
			paramStr : 'defaultHost=' + webServerHost
		}, {
			error : errorListener,
			success : (host) => {

				CONNECT_TO_ROOM_SERVER({
					roomServerName : roomServerName,
					isSecure : isSecure,
					host : host,
					port : webServerPort
				}, (on, off, send) => {
					
					FOR_BOX((box) => {
						EACH(box.MODEL.getOnNewInfos(), (onNewInfo) => {
							onNewInfo.findMissingDataSet();
						});
					});
					
					on('__DISCONNECTED', () => {
						FOR_BOX((box) => {
							EACH(box.MODEL.getOnNewInfos(), (onNewInfo) => {
								onNewInfo.lastCreateTime = SERVER_TIME(new Date());
							});
						});
					});
					
					if (connectionListener !== undefined) {
						connectionListener(on, off, send);
					}
				});
			}
		});
	}
});

FOR_BOX((box) => {

	/*
	 * 프로젝트 폴더 내 R 폴더에 저장되어 있는 리소스의 경로를 가져오거나, callback을 지정하여 리소스의 내용을 가져옵니다.
	 */
	box.R = METHOD((m) => {
		
		let basePath;
		
		let setBasePath = m.setBasePath = (_basePath) => {
			basePath = _basePath;
		};
		
		return {

			run : (path, callback) => {
				//REQUIRED: path
				//OPTIONAL: callback
	
				let uri = box.boxName + '/R/' + path;
	
				if (CONFIG.version !== undefined) {
					uri += '?version=' + CONFIG.version;
				}
					
				if (basePath !== undefined) {
					uri = basePath + '/' + uri;
				}
				
				if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
					if (box.boxName !== CONFIG.defaultBoxName) {
						uri = 'BOX/' + uri;
					}
				} else {
					uri = '/' + uri;
				}
	
				if (callback !== undefined) {
					GET(uri, callback);
				}
	
				return uri;
			}
		};
	});
});

FOR_BOX((box) => {

	/*
	 * 업로드한 파일의 경로를 가져옵니다.
	 */
	box.RF = METHOD({

		run : (path) => {
			//REQUIRED: path
			
			if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
				return (BROWSER_CONFIG.isSecure === true ? 'https://' : 'http://') + BROWSER_CONFIG.host + ':' + BROWSER_CONFIG.port + '/__RF/' + box.boxName + '/' + path;
			} else {
				return '/__RF/' + box.boxName + '/' + path;
			}
		}
	});
});
/*
 * TIME과 반대 역할을 합니다. 웹 브라우저에서 생성된 시간을 서버 시간대의 시간으로 변경합니다.
 */
global.SERVER_TIME = METHOD((m) => {

	let diff = 0;

	let setDiff = m.setDiff = (_diff) => {
		diff = _diff;
	};

	return {

		run : (date) => {
			//REQUIRED: date

			return new Date(date.getTime() - diff);
		}
	};
});

/*
 * Sync time. (Client-side)
 */
global.SYNC_TIME = METHOD({

	run : () => {
		
		let timeSyncRoom = UPPERCASE.ROOM('timeSyncRoom');
		
		timeSyncRoom.send({
			methodName : 'sync',
			data : new Date()
		},

		(diff) => {
			
			// The local time = The server time + diff (diff: client time - server time)
			TIME.setDiff(diff);
			
			// The server time = The local time - diff (diff: client time - server time)
			SERVER_TIME.setDiff(diff);
			
			timeSyncRoom.exit();
		});
	}
});

/*
 * 웹 브라우저의 시간과 서버 시간의 차이를 계산하여, 서버로부터 넘어온 시간을 웹 브라우저 시간대의 시간으로 변경합니다.
 */
global.TIME = METHOD((m) => {

	let diff = 0;
	
	let setDiff = m.setDiff = (_diff) => {
		diff = _diff;
	};

	return {

		run : (date) => {
			//REQUIRED: date

			return new Date(date.getTime() + diff);
		}
	};
});
