/*
 * TCP 소켓 서버를 생성합니다.
 */
global.SOCKET_SERVER = METHOD({

	run : (port, connectionListener) => {
		//REQUIRED: port
		//REQUIRED: connectionListener

		let Net = require('net');
		
		let server = Net.createServer((conn) => {
			
			let methodMap = {};
			let sendKey = 0;
			
			let receivedStr = '';
			
			let clientInfo;

			let on;
			let off;
			let send;
			
			let runMethods = (methodName, data, sendKey) => {
				
				try {
					
					let methods = methodMap[methodName];

					if (methods !== undefined) {
	
						EACH(methods, (method) => {
	
							// run method.
							method(data,
	
							// ret.
							(retData) => {
	
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
			conn.on('data', (content) => {

				let index;

				receivedStr += content.toString();

				while ((index = receivedStr.indexOf('\r\n')) !== -1) {
					
					let params = PARSE_STR(receivedStr.substring(0, index));

					if (params !== undefined) {
						runMethods(params.methodName, params.data, params.sendKey);
					}

					receivedStr = receivedStr.substring(index + 1);
				}
				
				clientInfo.lastRecieveTime = new Date();
			});

			// when disconnected
			conn.on('close', () => {
				
				runMethods('__DISCONNECTED');
				
				// free method map.
				methodMap = undefined;
			});

			// when error
			conn.on('error', (error) => {
				
				if (error.code !== 'ECONNRESET' && error.code !== 'EPIPE' && error.code !== 'ETIMEDOUT' && error.code !== 'ENETUNREACH' && error.code !== 'EHOSTUNREACH' && error.code !== 'ECONNREFUSED' && error.code !== 'EINVAL') {
					
					let errorMsg = error.toString();
					
					SHOW_ERROR('SOCKET_SERVER', errorMsg);
					
					runMethods('__ERROR', errorMsg);
				}
			});
			
			let ip = conn.remoteAddress;
			
			// IPv6 to IPv4
			if (ip !== undefined && ip.substring(0, 7) === '::ffff:') {
				ip = ip.substring(7);
			}

			connectionListener(

			// client info
			clientInfo = {
				
				ip : ip,
				
				connectTime : new Date()
			},

			// on.
			on = (methodName, method) => {
				//REQUIRED: methodName
				//REQUIRED: method

				let methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			},

			// off.
			off = (methodName, method) => {
				//REQUIRED: methodName
				//OPTIONAL: method

				let methods = methodMap[methodName];

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
			send = (methodNameOrParams, callback) => {
				//REQUIRED: methodNameOrParams
				//REQUIRED: methodNameOrParams.methodName	클라이언트에 on으로 설정된 메소드 이름
				//REQUIRED: methodNameOrParams.data			전송할 데이터
				//OPTIONAL: callback

				let methodName;
				let data;
				
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
						
						let callbackName = '__CALLBACK_' + sendKey;
	
						// on callback.
						on(callbackName, (data) => {
	
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
			() => {
				if (conn !== undefined) {
					conn.end();
					conn = undefined;
				}
			});
		});

		// listen.
		server.listen(port);

		console.log('[SOCKET_SERVER] ' + MSG({
			ko : 'TCP 소켓 서버가 실행중입니다. (포트:' + port + ')'
		}));
	}
});
