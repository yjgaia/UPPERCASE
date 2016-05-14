/*
 * create web socket server.
 */
global.WEB_SOCKET_SERVER = METHOD({

	run : function(webServer, connectionListener) {
		'use strict';
		//REQUIRED: webServer
		//REQUIRED: connectionListener

		var
		//IMPORT: WebSocketServer
		WebSocketServer = require('ws').Server,
		
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
					console.log(CONSOLE_RED('[UPPERCASE-WEB_SOCEKT_SERVER] ERROR:'), error.toString());
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
				
				conn = undefined;
			});

			// when error
			conn.on('error', function(error) {

				var
				// error msg
				errorMsg = error.toString();

				console.log(CONSOLE_RED('[UPPERCASE-WEB_SOCEKT_SERVER] ERROR:'), errorMsg);

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
			send = function(params, callback) {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//OPTIONAL: params.data
				//OPTIONAL: callback
				
				var
				// callback name
				callbackName;
				
				if (conn !== undefined) {
					
					try {
						
						conn.send(STRINGIFY({
							methodName : params.methodName,
							data : params.data,
							sendKey : sendKey
						}));
						
					} catch(error) {
						console.log('[UPPERCASE-WEB_SOCEKT_SERVER] ERROR:', error.toString());
					}
	
					if (callback !== undefined) {
						
						callbackName = '__CALLBACK_' + sendKey;
	
						// on callback.
						on(callbackName, function(data) {
	
							// run callback.
							callback(data);
	
							// off callback.
							off(callbackName);
						});
					}
	
					sendKey += 1;
					
					clientInfo.lastReceiveTime = new Date();
				}
			},

			// disconnect.
			function() {
				
				conn.close();
				
				conn = undefined;
			});
		};
		
		if (webServer.getNativeHTTPServer() !== undefined) {
		
			new WebSocketServer({
				server : webServer.getNativeHTTPServer()
			}).on('connection', nativeConnectionListener);
		}
		
		if (webServer.getNativeHTTPSServer() !== undefined) {
		
			new WebSocketServer({
				server : webServer.getNativeHTTPSServer()
			}).on('connection', nativeConnectionListener);
		}

		console.log('[UPPERCASE-WEB_SOCKET_SERVER] RUNNING WEB SOCKET SERVER...');
	}
});
