/*
 * WEB_SOCKET_SERVER로 생성한 웹소켓 서버에 연결합니다.
 */
global.CONNECT_TO_WEB_SOCKET_SERVER = METHOD({

	run : (params, connectionListenerOrListeners) => {
		//REQUIRED: params
		//OPTIONAL: params.isSecure
		//REQUIRED: params.host
		//REQUIRED: params.port
		//REQUIRED: connectionListenerOrListeners
		//REQUIRED: connectionListenerOrListeners.success
		//OPTIONAL: connectionListenerOrListeners.error

		let isSecure = params.isSecure;
		let host = params.host;
		let port = params.port;

		let connectionListener;
		let errorListener;
		
		let isConnected;

		let methodMap = {};
		let sendKey = 0;
		
		let on;
		let off;
		let send;

		if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
			connectionListener = connectionListenerOrListeners;
		} else {
			connectionListener = connectionListenerOrListeners.success;
			errorListener = connectionListenerOrListeners.error;
		}

		let runMethods = (methodName, data, sendKey) => {

			let methods = methodMap[methodName];

			if (methods !== undefined) {

				EACH(methods, (method) => {

					// run method.
					method(data,

					// ret.
					(retData) => {

						if (send !== undefined && sendKey !== undefined) {

							send({
								methodName : '__CALLBACK_' + sendKey,
								data : retData
							});
						}
					});
				});
			}
		};
		
		let WebSocket = require('ws');

		let conn = new WebSocket((isSecure === true ? 'wss://': 'ws://') + host + ':' + port);

		conn.on('open', () => {

			isConnected = true;

			connectionListener(

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

			// send to server.
			send = (methodNameOrParams, callback) => {
				//REQUIRED: methodNameOrParams
				//REQUIRED: methodNameOrParams.methodName
				//OPTIONAL: methodNameOrParams.data
				//OPTIONAL: callback
				
				let methodName;
				let data;
				let callbackName;
				
				if (CHECK_IS_DATA(methodNameOrParams) !== true) {
					methodName = methodNameOrParams;
				} else {
					methodName = methodNameOrParams.methodName;
					data = methodNameOrParams.data;
				}
				
				if (conn !== undefined) {
					
					conn.send(STRINGIFY({
						methodName : methodName,
						data : data,
						sendKey : sendKey
					}));
	
					if (callback !== undefined) {
						
						callbackName = '__CALLBACK_' + sendKey;
	
						// on callback.
						on(callbackName, (data) => {
	
							// run callback.
							callback(data);
	
							// off callback.
							off(callbackName);
						});
					}
	
					sendKey += 1;
				}
			},

			// disconnect.
			() => {
				if (conn !== undefined) {
					conn.close();
					conn = undefined;
				}
			});
		});

		// receive data.
		conn.on('message', (data) => {

			let params = PARSE_STR(data);

			if (params !== undefined) {
				runMethods(params.methodName, params.data, params.sendKey);
			}
		});

		// when disconnected
		conn.on('close', () => {
			runMethods('__DISCONNECTED');
		});

		// when error
		conn.on('error', (error) => {

			let errorMsg = error.toString();

			if (isConnected !== true) {

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					SHOW_ERROR('CONNECT_TO_WEB_SOCKET_SERVER', errorMsg);
				}

			} else {
				runMethods('__ERROR', errorMsg);
			}
		});
	}
});
