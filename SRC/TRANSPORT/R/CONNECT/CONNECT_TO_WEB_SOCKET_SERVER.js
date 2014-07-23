OVERRIDE(CONNECT_TO_WEB_SOCKET_SERVER, function(origin) {'use strict';

	/*
	 * connect to web socket fix server (using jsonp long-polling).
	 */
	global.CONNECT_TO_WEB_SOCKET_SERVER = CONNECT_TO_WEB_SOCKET_SERVER = METHOD(function(m) {

		var
		// MAX_LENGTH
		MAX_LENGTH = 1000,

		// RESPONSE_ERROR_DELAY_TIME
		RESPONSE_ERROR_DELAY_TIME = 7,

		// connection count
		connectionCount = 0,

		// request count
		requestCount = 0,

		// response listeners
		responseListeners = {},

		// request infos
		requestInfos = {},

		// request.
		request,

		// remove request info.
		removeRequestInfo,

		// response.
		response;

		m.request = request = function(requestKey, errorListener) {
			//REQUIRED: requestKey
			//OPTIONAL: errorListener

			var
			// request info
			requestInfo = requestInfos[requestKey],

			// content pieces
			contentPieces = requestInfo.contentPieces,

			// path
			path = 'http://' + requestInfo.host + ':' + requestInfo.port + (requestInfo.clientId === undefined ? '?' : '?clientId=' + requestInfo.clientId + '&') + 'connectionKey=' + requestInfo.connectionKey + '&requestKey=' + requestKey;

			// remove existed script.
			if (requestInfo.script !== undefined) {
				requestInfo.script.remove();
			}

			// when not exists content piece.
			if (contentPieces.length === 0) {

				// with end flag.
				path += '&isEnd=true';
			}

			// when exists content piece.
			else {

				// with content piece
				path += '&content=' + contentPieces[0];

				// remove first content piece.
				REMOVE({
					data : contentPieces,
					key : 0
				});
			}

			requestInfo.script = LOAD(path);

			try {
				requestInfo.script.getEl().onerror = errorListener;
			} catch (e) {
				// ignore.
			}
		};

		m.removeRequestInfo = removeRequestInfo = function(requestKey) {
			//REQUIRED: requestKey

			var
			// request info
			requestInfo = requestInfos[requestKey];

			// remove script tag.
			requestInfo.script.remove();
			delete requestInfo.script;

			// remove request info.
			delete requestInfos[requestKey];
		};

		m.response = response = function(paramsStr) {
			//REQUIRED: paramsStr

			//REQUIRED: params
			//REQUIRED: params.connectionKey
			//REQUIRED: params.clientId
			//OPTIONAL: params.params
			//REQUIRED: params.requestKey

			var
			// params
			params = PARSE_STR(paramsStr);

			// run response listener.
			responseListeners[params.connectionKey](params.clientId, params.params);

			// remove request info.
			removeRequestInfo(params.requestKey);
		};

		return {

			run : function(params, connectionListenerOrListeners) {
				//REQUIRED: params
				//OPTIONAL: params.host
				//OPTIONAL: params.port
				//REQUIRED: params.fixServerPort
				//REQUIRED: connectionListenerOrListeners

				var
				// host
				host = params.host === undefined ? global.location.hostname : host,

				// port
				port = params.fixServerPort,

				// connection listener
				connectionListener,

				// error listener
				errorListener,

				// connection key
				connectionKey = connectionCount,

				// connection error delay
				connectionErrorDelay,

				// response error delay
				responseErrorDelay,

				// method map
				methodMap = {},

				// is disconnected
				isDisconnected,

				// inner send.
				innerSend = function(clientId, connectionKey, data) {

					var
					// content
					content,

					// content pieces
					contentPieces;

					// create request info.
					requestInfos[requestCount] = {
						host : host,
						port : port,
						clientId : clientId,
						connectionKey : connectionKey,
						contentPieces : contentPieces = []
					};

					if (data !== undefined) {

						// create content (data string).
						content = encodeURIComponent(STRINGIFY(data));

						// split content pieces.
						while (content !== '') {
							contentPieces.push(content.substring(0, MAX_LENGTH));
							content = content.substring(MAX_LENGTH);
						}
					}

					request(requestCount, function() {
						runMethods('__DISCONNECTED');
					});

					// increase requset count.
					requestCount += 1;
				},

				// on.
				on,

				// off.
				off,

				// send.
				send,

				// run methods.
				runMethods = function(methodName, data) {

					var
					// methods
					methods;

					if (isDisconnected !== true) {

						methods = methodMap[methodName];

						if (methods !== undefined) {

							EACH(methods, function(method) {

								// run method.
								method(data,

								// ret.
								function(retData) {

									if (send !== undefined) {

										send({
											methodName : '__CALLBACK_' + methodName,
											data : retData
										});
									}
								});
							});
						}

						if (methodName === '__DISCONNECTED') {

							// remove response error delay.
							if (responseErrorDelay !== undefined) {
								responseErrorDelay.remove();
							}

							isDisconnected = true;
						}
					}
				};

				if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
					connectionListener = connectionListenerOrListeners;
				} else {
					connectionListener = connectionListenerOrListeners.success;
					errorListener = connectionListenerOrListeners.error;
				}

				// create connection error delay.
				connectionErrorDelay = DELAY(5, function() {

					console.log('[UPPERCASE.IO-CONNECT_TO_WEB_SOCKET_SERVER (FIX)] CONNECT TO WEB SOCKET FIX SERVER FAILED.');

					if (errorListener !== undefined) {
						errorListener('CONNECT TO WEB SOCKET FIX SERVER FAILED.');
					}
				});

				// resiger response listener.
				responseListeners[connectionKey] = function(clientId, params) {

					// when first time, run connection listener.
					if (connectionErrorDelay !== undefined) {

						// remove connection error delay.
						connectionErrorDelay.remove();
						connectionErrorDelay = undefined;

						// run connection listener.
						connectionListener(

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
										data : methods,
										value : method
									});

								} else {
									delete methodMap[methodName];
								}
							}
						},

						// send to server.
						send = function(params, callback) {
							//REQUIRED: params
							//REQUIRED: params.methodName
							//REQUIRED: params.data
							//OPTIONAL: callback

							var
							// method name
							methodName = params.methodName;

							innerSend(clientId, connectionKey, params);

							if (callback !== undefined) {

								// on callback.
								on('__CALLBACK_' + methodName, function(data) {

									// run callback.
									callback(data);

									// off callback.
									off('__CALLBACK_' + methodName);
								});
							}
						},

						// disconnect.
						function() {

							innerSend(clientId, connectionKey, {
								methodName : '__DISCONNECTED'
							});

							isDisconnected = true;
						});
					}

					// when not first time, run methods.
					else if (params !== undefined) {
						runMethods(params.methodName, params.data);
					}

					// remove response error delay.
					if (responseErrorDelay !== undefined) {
						responseErrorDelay.remove();
					}

					// create response error delay (when not disconnected).
					if (isDisconnected !== true) {

						responseErrorDelay = DELAY(RESPONSE_ERROR_DELAY_TIME, function() {
							runMethods('__DISCONNECTED');
						});

						innerSend(clientId, connectionKey);
					}
				};

				// firt send, get client id.
				innerSend(undefined, connectionKey);

				// increase connection count.
				connectionCount += 1;
			}
		};
	});
});
