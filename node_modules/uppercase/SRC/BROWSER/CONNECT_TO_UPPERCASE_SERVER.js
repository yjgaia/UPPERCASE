/*
 * UPPERCASE 서버에 접속합니다.
 */
global.CONNECT_TO_UPPERCASE_SERVER = METHOD({

	run: (params, connectionListenerOrListeners) => {
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
			isSecure: isSecure,
			host: webServerHost,
			port: webServerPort,
			uri: '__WEB_SERVER_HOST',
			paramStr: 'defaultHost=' + webServerHost
		}, {
			error: errorListener,
			success: (host) => {

				CONNECT_TO_ROOM_SERVER({
					roomServerName: roomServerName,
					isSecure: isSecure,
					host: host,
					port: webServerPort
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
