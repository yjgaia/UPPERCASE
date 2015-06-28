/*
 * connect to UPPERCASE.IO server.
 */
global.CONNECT_TO_IO_SERVER = METHOD({

	run : function(params, connectionListenerOrListeners) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.roomServerName
		//OPTIONAL: params.webServerHost
		//OPTIONAL: params.webServerPort
		//OPTIONAL: connectionListenerOrListeners
		//OPTIONAL: connectionListenerOrListeners.success
		//OPTIONAL: connectionListenerOrListeners.error

		var
		// room server name
		roomServerName,
		
		// web server host
		webServerHost,
		
		// web server port
		webServerPort,
		
		// connection listener
		connectionListener,

		// error listener
		errorListener;
		
		if (connectionListenerOrListeners === undefined) {
			
			if (params !== undefined) {
				
				if (CHECK_IS_DATA(params) !== true) {
					connectionListener = params;
				} else {
					roomServerName = params.roomServerName;
					webServerHost = params.webServerHost;
					webServerPort = params.webServerPort;
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
			webServerPort = CONFIG.webServerPort;
		}

		GET({
			host : webServerHost,
			port : webServerPort,
			uri : '__WEB_SOCKET_SERVER_HOST',
			paramStr : 'defaultHost=' + webServerHost
		}, {
			error : errorListener,
			success : function(host) {

				CONNECT_TO_ROOM_SERVER({
					name : roomServerName,
					host : host,
					port : webServerPort,
					fixRequestURI : '__WEB_SOCKET_FIX'
				}, function(on, off, send) {
					
					FOR_BOX(function(box) {
						EACH(box.MODEL.getOnNewInfos(), function(onNewInfo) {
							onNewInfo.findMissingDataSet();
						});
					});
					
					on('__DISCONNECTED', function() {
						FOR_BOX(function(box) {
							EACH(box.MODEL.getOnNewInfos(), function(onNewInfo) {
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
