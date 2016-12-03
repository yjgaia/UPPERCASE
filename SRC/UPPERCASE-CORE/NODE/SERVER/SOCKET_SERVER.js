/*
 * TCP 소켓 서버를 생성합니다.
 */
global.SOCKET_SERVER = METHOD({

	run : function(port, connectionListener) {
		'use strict';
		//REQUIRED: port
		//REQUIRED: connectionListener

		var
		// net
		net = require('net'),

		// server
		server = net.createServer(function(conn) {

			var
			// method map
			methodMap = {},

			// send key
			sendKey = 0,

			// received string
			receivedStr = '',
			
			// client info
			clientInfo,

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
					
					SHOW_ERROR('SOCKET_SERVER', error.toString(), {
						methodName : methodName,
						data : data
					});
				}
			};

			// when receive data
			conn.on('data', function(content) {

				var
				// str
				str,

				// index
				index,

				// params
				params;

				receivedStr += content.toString();

				while (( index = receivedStr.indexOf('\r\n')) !== -1) {

					str = receivedStr.substring(0, index);

					params = PARSE_STR(str);

					if (params !== undefined) {
						runMethods(params.methodName, params.data, params.sendKey);
					}

					receivedStr = receivedStr.substring(index + 1);
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
				errorMsg;
				
				if (error.code !== 'ECONNRESET' && error.code !== 'EPIPE' && error.code !== 'ETIMEDOUT' && error.code !== 'ENETUNREACH' && error.code !== 'EHOSTUNREACH' && error.code !== 'ECONNREFUSED' && error.code !== 'EINVAL') {
					
					errorMsg = error.toString();
					
					SHOW_ERROR('SOCKET_SERVER', errorMsg);
					
					runMethods('__ERROR', errorMsg);
				}
			});

			connectionListener(

			// client info
			clientInfo = {
				
				ip : conn.remoteAddress,
				
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
				//REQUIRED: methodNameOrParams.methodName	클라이언트에 on 함수로 설정된 메소드 이름
				//REQUIRED: methodNameOrParams.data			전송할 데이터
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
				
				if (conn !== undefined && conn.writable === true) {
					
					if (callback === undefined) {
						
						conn.write(STRINGIFY({
							methodName : methodName,
							data : data
						}) + '\r\n');
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
						
						conn.write(STRINGIFY({
							methodName : methodName,
							data : data,
							sendKey : sendKey
						}) + '\r\n');
						
						sendKey += 1;
					}
					
					clientInfo.lastSendTime = new Date();
				}
			},

			// disconnect.
			function() {
				if (conn !== undefined) {
					conn.end();
					conn = undefined;
				}
			});
		});

		// listen.
		server.listen(port);

		console.log('[SOCKET_SERVER] TCP 소켓 서버가 실행중입니다. (포트:' + port + ')');
	}
});
