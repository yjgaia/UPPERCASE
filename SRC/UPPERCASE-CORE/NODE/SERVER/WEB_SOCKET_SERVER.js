/*
 * 웹 소켓 서버를 생성합니다.
 */
global.WEB_SOCKET_SERVER = METHOD({

	run : function(webServer, connectionListener) {
		'use strict';
		//REQUIRED: webServer
		//REQUIRED: connectionListener

		var
		//IMPORT: WebSocket
		WebSocket = require('ws'),
		
		//IMPORT: WebSocketServer
		WebSocketServer = WebSocket.Server,
		
		// native connection listener.
		nativeConnectionListener = function(conn) {

			var
			// headers
			headers = conn.upgradeReq.headers,

			// method map
			methodMap = {},

			// send key
			sendKey = 0,
			
			// client info
			clientInfo,

			// ip
			ip,
			
			// on.
			on,

			// off.
			off,

			// send.
			send,

			// run methods.
			runMethods = function(methodName, data, sendKey) {

				var
				// methods
				methods;
				
				try {
					
					methods = methodMap[methodName];
	
					if (methods !== undefined) {
	
						EACH(methods, function(method) {
	
							// run method.
							method(data,
	
							// ret.
							function(retData) {
	
								if (sendKey !== undefined) {
	
									send({
										methodName : '__CALLBACK_' + sendKey,
										data : retData
									});
								}
							});
						});
					}
				}
				
				// if catch error
				catch(error) {
					SHOW_ERROR('WEB_SOCKET_SERVER', error.toString());
				}
			};

			// when receive data
			conn.on('message', function(str) {

				var
				// params
				params = PARSE_STR(str);

				if (params !== undefined) {
					runMethods(params.methodName, params.data, params.sendKey);
				}
			});

			// when disconnected
			conn.on('close', function() {

				runMethods('__DISCONNECTED');

				// free method map.
				methodMap = undefined;
			});

			// when error
			conn.on('error', function(error) {

				var
				// error msg
				errorMsg = error.toString();

				SHOW_ERROR('WEB_SOCKET_SERVER', errorMsg);

				runMethods('__ERROR', errorMsg);
			});

			ip = headers['x-forwarded-for'];

			if (ip === undefined) {
				ip = conn.upgradeReq.connection.remoteAddress;
			}

			connectionListener(

			// client info
			clientInfo = {
				
				ip : ip,

				headers : headers,
				
				connectTime : new Date()
			},

			// on.
			on = function(methodName, method) {
				//REQUIRED: methodName
				//REQUIRED: method

				var
				// methods
				methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			},

			// off.
			off = function(methodName, method) {
				//REQUIRED: methodName
				//OPTIONAL: method

				var
				// methods
				methods = methodMap[methodName];

				if (methods !== undefined) {

					if (method !== undefined) {

						REMOVE({
							array : methods,
							value : method
						});

					} else {
						delete methodMap[methodName];
					}
				}
			},

			// send to client.
			send = function(methodNameOrParams, callback) {
				//REQUIRED: methodNameOrParams
				//OPTIONAL: methodNameOrParams.methodName
				//OPTIONAL: methodNameOrParams.data
				//OPTIONAL: callback
				
				var
				// method name
				methodName,
				
				// data
				data,
				
				// callback name
				callbackName;
				
				if (CHECK_IS_DATA(methodNameOrParams) !== true) {
					methodName = methodNameOrParams;
				} else {
					methodName = methodNameOrParams.methodName;
					data = methodNameOrParams.data;
				}
				
				if (conn !== undefined && conn.readyState === WebSocket.OPEN) {
					
					try {
						
						if (callback === undefined) {
							
							conn.send(STRINGIFY({
								methodName : methodName,
								data : data
							}));
						}
	
						else {
							
							callbackName = '__CALLBACK_' + sendKey;
		
							// on callback.
							on(callbackName, function(data) {
		
								// run callback.
								callback(data);
		
								// off callback.
								off(callbackName);
							});
							
							conn.send(STRINGIFY({
								methodName : methodName,
								data : data,
								sendKey : sendKey
							}));

							sendKey += 1;
						}
						
					} catch(error) {
						SHOW_ERROR('WEB_SOCKET_SERVER', error.toString(), methodNameOrParams);
					}
					
					clientInfo.lastSendTime = new Date();
				}
			},

			// disconnect.
			function() {
				if (conn !== undefined) {
					conn.close();
					conn = undefined;
				}
			});
		};
		
		new WebSocketServer({
			server : webServer.getNativeServer()
		}).on('connection', nativeConnectionListener);
		
		console.log('[WEB_SOCKET_SERVER] 웹 소켓 서버가 실행중입니다...');
	}
});
