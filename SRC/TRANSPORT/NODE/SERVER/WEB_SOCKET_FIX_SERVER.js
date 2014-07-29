/*
 * create web socket fix server (using jsonp long-polling).
 */
global.WEB_SOCKET_FIX_SERVER = WEB_SOCKET_FIX_SERVER = METHOD(function(m) {'use strict';

	var
	// HANDSHAKE_DELAY_TIME
	HANDSHAKE_DELAY_TIME = 5,

	// LIFE_DELAY_TIME
	LIFE_DELAY_TIME = 2;

	return {

		run : function(port, connectionListener) {
			//REQUIRED: port
			//REQUIRED: connectionListener

			var
			// content map
			contentMap = {},

			// method maps
			methodMaps = {},

			// send key
			sendKey = 0,

			// inner sends
			innerSends = {},

			// waiting param map
			waitingParamMap = {},

			// handshake delays
			handshakeDelays = {},

			// life delays
			lifeDelays = {},

			// add content.
			addContent = function(clientId, requestKey, content, isToBroadcast) {

				if (contentMap[clientId] === undefined) {
					contentMap[clientId] = {};
				}

				if (contentMap[clientId][requestKey] === undefined) {
					contentMap[clientId][requestKey] = content;
				} else {
					contentMap[clientId][requestKey] += content;
				}

				if (isToBroadcast === true && CPU_CLUSTERING.broadcast !== undefined) {
					CPU_CLUSTERING.broadcast({
						methodName : '__WEB_SOCKET_FIX_SERVER__ADD_CONTENT',
						data : {
							clientId : clientId,
							requestKey : requestKey,
							content : content
						}
					});
				}
			},

			// remove content.
			removeContent = function(clientId, requestKey, isToBroadcast) {

				if (contentMap[clientId] !== undefined) {
					delete contentMap[clientId][requestKey];
				}

				// broadcast.
				if (isToBroadcast === true && CPU_CLUSTERING.broadcast !== undefined) {
					CPU_CLUSTERING.broadcast({
						methodName : '__WEB_SOCKET_FIX_SERVER__REMOVE_CONTENT',
						data : {
							clientId : clientId,
							requestKey : requestKey
						}
					});
				}
			},

			// send.
			send = function(clientId, params) {

				// inner send.
				if (innerSends[clientId] !== undefined) {
					innerSends[clientId](params);
				}

				// when not exists send
				else {
					addWaitingParams(clientId, params, true);
				}
			},

			// run methods.
			runMethods = function(clientId, methodName, data, sendKey) {

				var
				// methods
				methods = methodMaps[clientId][methodName];

				if (methods !== undefined) {

					EACH(methods, function(method) {

						// run method.
						method(data,

						// ret.
						function(retData) {

							if (sendKey !== undefined) {

								send(clientId, {
									methodName : '__CALLBACK_' + sendKey,
									data : retData
								});
							}
						});
					});
				}
			},

			// remove send.
			removeSend = function(clientId) {

				// remove handshake delay.
				if (handshakeDelays[clientId] !== undefined) {
					handshakeDelays[clientId].remove();
					delete handshakeDelays[clientId];
				}

				// remove inner send.
				delete innerSends[clientId];
			},

			// add waiting params.
			addWaitingParams = function(clientId, params, isToBroadcast) {

				if (waitingParamMap[clientId] === undefined) {
					waitingParamMap[clientId] = [];
				}

				waitingParamMap[clientId].push(params);

				// broadcast send.
				if (isToBroadcast === true && CPU_CLUSTERING.broadcast !== undefined) {
					CPU_CLUSTERING.broadcast({
						methodName : '__WEB_SOCKET_FIX_SERVER__SEND',
						data : {
							clientId : clientId,
							params : params
						}
					});
				}
			},

			// remove first waiting params.
			removeFirstWaitingParams = function(clientId, isToBroadcast) {

				REMOVE({
					data : waitingParamMap[clientId],
					key : 0
				});

				if (waitingParamMap[clientId].length === 0) {
					delete waitingParamMap[clientId];
				}

				// broadcast.
				if (isToBroadcast === true && CPU_CLUSTERING.broadcast !== undefined) {
					CPU_CLUSTERING.broadcast({
						methodName : '__WEB_SOCKET_FIX_SERVER__REMOVE_FIRST_WATING_PARAMS',
						data : clientId
					});
				}
			},

			// remove life delay.
			removeLifeDelay = function(clientId, isToBroadcast) {

				if (lifeDelays[clientId] !== undefined) {
					lifeDelays[clientId].remove();
					delete lifeDelays[clientId];
				}

				// broadcast.
				if (isToBroadcast === true && CPU_CLUSTERING.broadcast !== undefined) {
					CPU_CLUSTERING.broadcast({
						methodName : '__WEB_SOCKET_FIX_SERVER__REMOVE_LIFE_DELAY',
						data : clientId
					});
				}
			},

			// remove all.
			removeAll = function(clientId, isToBroadcast) {

				removeSend(clientId);

				// remove method map.
				if (methodMaps[clientId] !== undefined) {
					delete methodMaps[clientId];
				}

				// remove waiting params.
				if (waitingParamMap[clientId] !== undefined) {
					delete waitingParamMap[clientId];
				}

				// remove life delay.
				removeLifeDelay(clientId);

				// remove contents.
				if (contentMap[clientId] !== undefined) {
					delete contentMap[clientId];
				}

				// broadcast.
				if (isToBroadcast === true && CPU_CLUSTERING.broadcast !== undefined) {
					CPU_CLUSTERING.broadcast({
						methodName : '__WEB_SOCKET_FIX_SERVER__REMOVE_ALL',
						data : clientId
					});
				}
			};

			if (CPU_CLUSTERING.on !== undefined) {

				CPU_CLUSTERING.on('__WEB_SOCKET_FIX_SERVER__RUN_METHODS', function(params) {

					var
					// client id
					clientId = params.clientId;

					if (methodMaps[clientId] !== undefined) {
						runMethods(clientId, params.methodName, params.data, params.sendKey);
					}
				});

				CPU_CLUSTERING.on('__WEB_SOCKET_FIX_SERVER__REMOVE_FIRST_WATING_PARAMS', function(clientId) {

					if (waitingParamMap[clientId] !== undefined) {
						removeFirstWaitingParams(clientId);
					}
				});

				CPU_CLUSTERING.on('__WEB_SOCKET_FIX_SERVER__SEND', function(_params) {

					var
					// client id
					clientId = _params.clientId,

					// params
					params = _params.params;

					// inner send.
					if (innerSends[clientId] !== undefined) {

						innerSends[clientId](params);

						// broadcast remove first waiting params.
						if (CPU_CLUSTERING.broadcast !== undefined) {
							CPU_CLUSTERING.broadcast({
								methodName : '__WEB_SOCKET_FIX_SERVER__REMOVE_FIRST_WATING_PARAMS',
								data : clientId
							});
						}
					}

					// when not exists send
					else {
						addWaitingParams(clientId, params);
					}
				});

				CPU_CLUSTERING.on('__WEB_SOCKET_FIX_SERVER__REMOVE_LIFE_DELAY', function(clientId) {
					removeLifeDelay(clientId);
				});

				CPU_CLUSTERING.on('__WEB_SOCKET_FIX_SERVER__REMOVE_ALL', function(clientId) {
					removeAll(clientId);
				});

				CPU_CLUSTERING.on('__WEB_SOCKET_FIX_SERVER__ADD_CONTENT', function(params) {
					addContent(params.clientId, params.requestKey, params.content);
				});

				CPU_CLUSTERING.on('__WEB_SOCKET_FIX_SERVER__REMOVE_CONTENT', function(params) {
					removeContent(params.clientId, params.requestKey);
				});
			}

			WEB_SERVER(port, function(requestInfo, response, onDisconnected) {

				var
				// params
				params = requestInfo.params,

				// client id
				clientId = params.clientId,

				// connection key (integer)
				connectionKey = INTEGER(params.connectionKey),

				// request key (integer)
				requestKey = INTEGER(params.requestKey),

				// content
				content = params.content,

				// is end (boolean)
				isEnd = params.isEnd === 'true',

				// method map
				methodMap,

				// on.
				on,

				// off.
				off,

				// run methods or broadcast.
				runMethodsOrBroadcast = function(methodName, data, sendKey) {

					// when exists methodMap
					if (methodMaps[clientId] !== undefined) {
						runMethods(clientId, methodName, data);
					}

					// when not exists methodMap
					else if (CPU_CLUSTERING.broadcast !== undefined) {

						// pass other cpus.
						CPU_CLUSTERING.broadcast({
							methodName : '__WEB_SOCKET_FIX_SERVER__RUN_METHODS',
							data : {
								clientId : clientId,
								methodName : methodName,
								data : data,
								sendKey : sendKey
							}
						});
					}

					if (methodName === '__DISCONNECTED') {
						removeAll(clientId, true);
					}
				};

				// create connection.
				if (clientId === undefined) {

					// create client id.
					clientId = RANDOM_STR(40);

					// create method map.
					methodMap = methodMaps[clientId] = {};

					// run connection listener.
					connectionListener(

					// client info
					{
						ip : requestInfo.ip,

						headers : requestInfo.headers
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
									data : methods,
									value : method
								});

							} else {
								delete methodMap[methodName];
							}
						}
					},

					// send to client.
					function(params, callback) {
						//REQUIRED: params
						//REQUIRED: params.methodName
						//REQUIRED: params.data
						//OPTIONAL: callback

						var
						// callback name
						callbackName = '__CALLBACK_' + sendKey;

						params.sendKey = sendKey;

						sendKey += 1;

						send(clientId, params);

						if (callback !== undefined) {

							// on callback.
							on('__CALLBACK_' + sendKey, function(data) {

								// run callback.
								callback(data);

								// off callback.
								off('__CALLBACK_' + sendKey);
							});
						}
					},

					// disconnect.
					function() {
						runMethodsOrBroadcast('__DISCONNECTED');
					});

					// response.
					response({
						contentType : 'application/javascript',
						content : 'CONNECT_TO_WEB_SOCKET_SERVER.response(\'' + STRINGIFY({
							clientId : clientId,
							connectionKey : connectionKey,
							requestKey : requestKey
						}) + '\')'
					});
				}

				// done request (content complete).
				else if (isEnd === true) {

					RUN(function() {

						var
						// params
						params = contentMap[clientId] === undefined ? undefined : PARSE_STR(contentMap[clientId][requestKey]),

						// method name
						methodName = params === undefined ? undefined : params.methodName,

						// data
						data = params === undefined ? undefined : params.data,

						// send key
						sendKey = params === undefined ? undefined : params.sendKey,

						// connection info
						connectionInfo,

						// die.
						die;

						// run methods or broadcast.
						if (methodName !== undefined) {

							runMethodsOrBroadcast(methodName, data, sendKey);

							// response empty.
							response({
								contentType : 'application/javascript',
								content : 'CONNECT_TO_WEB_SOCKET_SERVER.removeRequestInfo(' + requestKey + ')'
							});
						}

						// when aleady exists inner send, inner send. (and remove inner send)
						else if (innerSends[clientId] !== undefined) {
							innerSends[clientId]();
						}

						// register send.
						else {

							// I'm still alive!
							removeLifeDelay(clientId, true);

							die = function() {
								runMethodsOrBroadcast('__DISCONNECTED');
							};

							innerSends[clientId] = function(params) {

								// response.
								response({
									contentType : 'application/javascript',
									content : 'CONNECT_TO_WEB_SOCKET_SERVER.response(\'' + STRINGIFY({
										connectionKey : connectionKey,
										clientId : clientId,
										params : params,
										requestKey : requestKey
									}) + '\')'
								});

								removeSend(clientId);

								// create life delay.
								lifeDelays[clientId] = DELAY(LIFE_DELAY_TIME, die);
							};

							// on disconnected, die!
							onDisconnected(die);

							// create handshake delay.
							handshakeDelays[clientId] = DELAY(HANDSHAKE_DELAY_TIME, function() {
								if (innerSends[clientId] !== undefined) {
									innerSends[clientId]();
								}
							});

							if (waitingParamMap[clientId] !== undefined) {

								// send first waiting params.
								innerSends[clientId](waitingParamMap[clientId][0]);

								removeFirstWaitingParams(clientId, true);
							}
						}
					});

					removeContent(clientId, requestKey, true);
				}

				// continue request.
				else {

					addContent(clientId, requestKey, content, true);

					// response.
					response({
						contentType : 'application/javascript',
						content : 'CONNECT_TO_WEB_SOCKET_SERVER.request(' + requestKey + ')'
					});
				}
			});

			console.log('[UPPERCASE.IO-WEB_SOCKET_FIX_SERVER] RUNNING WEB SOCKET FIX SERVER... (PORT:' + port + ')');
		}
	};
});
