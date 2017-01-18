/*

Welcome to UPPERCASE-ROOM! (http://uppercase.io)

*/

FOR_BOX(function(box) {
	'use strict';

	/**
	 * 주어진 이름을 가진 모든 룸에 데이터를 전송합니다.
	 */
	box.BROADCAST = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.roomName
			//OPTIONAL: params.methodName
			//OPTIONAL: params.data

			var
			// room name
			roomName = box.boxName + '/' + params.roomName,

			// method name
			methodName = params.methodName,

			// data
			data = params.data;
			
			LAUNCH_ROOM_SERVER.broadcast({
				roomName : roomName,
				methodName : methodName,
				data : data
			});

			if (CPU_CLUSTERING.broadcast !== undefined) {

				CPU_CLUSTERING.broadcast({
					methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
					data : {
						roomName : roomName,
						methodName : methodName,
						data : data
					}
				});
			}

			if (SERVER_CLUSTERING.broadcast !== undefined) {

				SERVER_CLUSTERING.broadcast({
					methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
					data : {
						roomName : roomName,
						methodName : methodName,
						data : data
					}
				});
			}
		}
	});
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * 룸 서버와 통신을 주고받는 CLIENT_ROOM 클래스
	 */
	box.CLIENT_ROOM = CLASS({

		init : function(inner, self, nameOrParams) {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.roomServerName
			//REQUIRED: nameOrParams.name

			var
			// room server name
			roomServerName,
			
			// room name
			roomName,

			// method map
			methodMap = {},

			// is exited
			isExited,

			// get room name.
			getRoomName,

			// check is exited.
			checkIsExited,

			// on.
			on,

			// off.
			off,

			// send.
			send,

			// exit.
			exit;
			
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				roomName = box.boxName + '/' + nameOrParams;
			} else {
				roomServerName = nameOrParams.roomServerName;
				roomName = box.boxName + '/' + nameOrParams.name;
			}

			CONNECT_TO_ROOM_SERVER.enterRoom({
				roomServerName : roomServerName,
				roomName : roomName
			});

			inner.getRoomName = getRoomName = function() {
				return roomName;
			};

			inner.checkIsExited = checkIsExited = function() {
				return isExited;
			};

			self.on = on = function(methodName, method) {
				//REQUIRED: methodName
				//REQUIRED: method

				var
				// methods
				methods = methodMap[methodName];

				CONNECT_TO_ROOM_SERVER.on({
					roomServerName : roomServerName,
					methodName : roomName + '/' + methodName
				}, method);

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			};

			self.off = off = function(methodName, method) {
				//REQUIRED: methodName
				//OPTIONAL: method

				var
				// methods
				methods = methodMap[methodName];

				if (methods !== undefined) {

					if (method !== undefined) {

						CONNECT_TO_ROOM_SERVER.off({
							roomServerName : roomServerName,
							methodName : roomName + '/' + methodName
						}, method);

						REMOVE({
							array : methods,
							value : method
						});

						if (methods.length === 0) {
							delete methodMap[methodName];
						}

					} else {

						EACH(methods, function(method) {
							CONNECT_TO_ROOM_SERVER.off({
								roomServerName : roomServerName,
								methodName : roomName + '/' + methodName
							}, method);
						});
						delete methodMap[methodName];
					}
				}
			};

			self.send = send = function(methodNameOrParams, callback) {
				//REQUIRED: methodNameOrParams
				//REQUIRED: methodNameOrParams.methodName
				//REQUIRED: methodNameOrParams.data
				//OPTIONAL: callback
				
				var
				// method name
				methodName,
				
				// data
				data;
				
				if (CHECK_IS_DATA(methodNameOrParams) !== true) {
					methodName = methodNameOrParams;
				} else {
					methodName = methodNameOrParams.methodName;
					data = methodNameOrParams.data;
				}

				if (isExited !== true) {

					CONNECT_TO_ROOM_SERVER.send({
						roomServerName : roomServerName,
						methodName : roomName + '/' + methodName,
						data : data
					}, callback);

				} else {
					SHOW_ERROR(box.boxName + '.' + roomName + 'Room.send', 'ROOM EXITED.');
				}
			};

			self.exit = exit = function() {

				if (isExited !== true) {

					CONNECT_TO_ROOM_SERVER.exitRoom({
						roomServerName : roomServerName,
						roomName : roomName
					});

					EACH(methodMap, function(methods, methodName) {
						off(methodName);
					});

					// free method map.
					methodMap = undefined;

					isExited = true;
				}
			};
		}
	});
});

/*
 * 룸 서버에 접속합니다.
 */
global.CONNECT_TO_ROOM_SERVER = METHOD(function(m) {
	'use strict';

	var
	// DEFAULT_ROOM_SERVER_NAME
	DEFAULT_ROOM_SERVER_NAME = '__',
	
	// enter room name map
	enterRoomNameMap = {},

	// on info map
	onInfoMap = {},

	// waiting send info map
	waitingSendInfoMap = {},

	// is connecteds
	isConnecteds = {},

	// inner ons
	innerOns = {},

	// inner offs
	innerOffs = {},

	// inner sends
	innerSends = {},
	
	// check is connected.
	checkIsConnected,

	// enter room.
	enterRoom,

	// on.
	on,

	// off.
	off,

	// send.
	send,

	// exit room.
	exitRoom;
	
	m.checkIsConnected = checkIsConnected = function(roomServerName) {
		//OPTIONAL: roomServerName
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		if (isConnecteds[roomServerName] === undefined) {
			isConnecteds[roomServerName] = false;
		}
		
		return isConnecteds[roomServerName];
	};

	m.enterRoom = enterRoom = function(params) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.roomName
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// room name
		roomName = params.roomName,
		
		// enter room names
		enterRoomNames;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		enterRoomNames = enterRoomNameMap[roomServerName];
		
		if (enterRoomNames === undefined) {
			enterRoomNames = enterRoomNameMap[roomServerName] = [];
		}

		enterRoomNames.push(roomName);

		if (innerSends[roomServerName] !== undefined) {
			innerSends[roomServerName]({
				methodName : '__ENTER_ROOM',
				data : roomName
			});
		}
	};

	m.on = on = function(params, method) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//REQUIRED: method
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// method name
		methodName = params.methodName,
		
		// on infos
		onInfos;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		onInfos = onInfoMap[roomServerName];
		
		if (onInfos === undefined) {
			onInfos = onInfoMap[roomServerName] = [];
		}

		onInfos.push({
			methodName : methodName,
			method : method
		});

		if (innerOns[roomServerName] !== undefined) {
			innerOns[roomServerName](methodName, method);
		}
	};

	m.off = off = function(params, method) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//OPTIONAL: method
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// method name
		methodName = params.methodName,
		
		// on infos
		onInfos;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		onInfos = onInfoMap[roomServerName];
		
		if (innerOffs[roomServerName] !== undefined) {
			innerOffs[roomServerName](methodName, method);
		}
		
		if (onInfos !== undefined) {

			if (method !== undefined) {
	
				REMOVE(onInfos, function(onInfo) {
					return onInfo.methodName === methodName && onInfo.method === method;
				});
	
			} else {
	
				REMOVE(onInfos, function(onInfo) {
					return onInfo.methodName === methodName;
				});
			}
			
			if (onInfos.length === 0) {
				delete onInfoMap[roomServerName];
			}
		}
	};

	m.send = send = function(params, callback) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//REQUIRED: params.data
		//OPTIONAL: callback
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// method name
		methodName = params.methodName,
		
		// data
		data = params.data,
		
		// waiting send infos
		waitingSendInfos;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		if (innerSends[roomServerName] === undefined) {
			
			waitingSendInfos = waitingSendInfoMap[roomServerName];
		
			if (waitingSendInfos === undefined) {
				waitingSendInfos = waitingSendInfoMap[roomServerName] = [];
			}

			waitingSendInfos.push({
				params : {
					methodName : methodName,
					data : data
				},
				callback : callback
			});

		} else {

			innerSends[roomServerName]({
				methodName : methodName,
				data : data
			}, callback);
		}
	};

	m.exitRoom = exitRoom = function(params) {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.roomName
		
		var
		// room server name
		roomServerName = params.roomServerName,
		
		// room name
		roomName = params.roomName,
		
		// enter room names
		enterRoomNames;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		enterRoomNames = enterRoomNameMap[roomServerName];
		
		if (enterRoomNames === undefined) {
			enterRoomNames = enterRoomNameMap[roomServerName] = [];
		}

		if (innerSends[roomServerName] !== undefined) {
			innerSends[roomServerName]({
				methodName : '__EXIT_ROOM',
				data : roomName
			});
		}
		
		EACH(enterRoomNames, function(enterRoomName, key) {

			if (enterRoomName === roomName) {

				REMOVE({
					array : enterRoomNames,
					key : key
				});
				
				return false;
			}
		});
	};

	return {

		run : function(params, connectionListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.name
			//REQUIRED: params.host
			//REQUIRED: params.port
			//OPTIONAL: connectionListenerOrListeners
			//OPTIONAL: connectionListenerOrListeners.success
			//OPTIONAL: connectionListenerOrListeners.error

			var
			// name
			name = params.name,
			
			// connection listener
			connectionListener,

			// error listener
			errorListener;
			
			if (name === undefined) {
				name = DEFAULT_ROOM_SERVER_NAME;
			}

			if (connectionListenerOrListeners !== undefined) {
				if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
					connectionListener = connectionListenerOrListeners;
				} else {
					connectionListener = connectionListenerOrListeners.success;
					errorListener = connectionListenerOrListeners.error;
				}
			}

			CONNECT_TO_SOCKET_SERVER({
				host : params.host,
				port : params.port
			}, {

				error : errorListener,

				success : function(on, off, send) {
					
					var
					// enter room names
					enterRoomNames = enterRoomNameMap[name],
					
					// on infos
					onInfos = onInfoMap[name],
					
					// waiting send infos
					waitingSendInfos = waitingSendInfoMap[name];

					innerOns[name] = on;
					innerOffs[name] = off;
					innerSends[name] = send;

					if (enterRoomNames !== undefined) {
						EACH(enterRoomNames, function(roomName) {
							send({
								methodName : '__ENTER_ROOM',
								data : roomName
							});
						});
					}

					if (onInfos !== undefined) {
						EACH(onInfos, function(onInfo) {
							on(onInfo.methodName, onInfo.method);
						});
					}
					
					if (waitingSendInfos !== undefined) {
						EACH(waitingSendInfos, function(sendInfo) {
							send(sendInfo.params, sendInfo.callback);
						});
					}
					delete waitingSendInfoMap[name];

					if (connectionListener !== undefined) {
						connectionListener(on, off, send);
					}
					
					isConnecteds[name] = true;

					// when disconnected, rewait.
					on('__DISCONNECTED', function() {

						delete innerOns[name];
						delete innerOffs[name];
						delete innerSends[name];
						
						isConnecteds[name] = false;
					});
				}
			});
		}
	};
});

/*
 * 룸 서버를 생성하는 클래스
 */
global.LAUNCH_ROOM_SERVER = CLASS(function(cls) {
	'use strict';

	var
	// init room func map
	initRoomFuncMap = {},

	// send map
	sendMap = {},

	// add init room func.
	addInitRoomFunc,

	// broadcast.
	broadcast;

	cls.addInitRoomFunc = addInitRoomFunc = function(roomName, initRoomFunc) {
		//REQUIRED: roomName
		//REQUIRED: initRoomFunc

		if (initRoomFuncMap[roomName] === undefined) {
			initRoomFuncMap[roomName] = [];
		}

		initRoomFuncMap[roomName].push(initRoomFunc);
	};

	cls.broadcast = broadcast = function(params, _send) {
		//REQUIRED: params
		//REQUIRED: params.roomName
		//OPTIONAL: params.methodName
		//OPTIONAL: params.data
		//OPTIONAL: _send

		var
		// room name
		roomName = params.roomName,

		// sends
		sends = sendMap[roomName];

		if (sends !== undefined) {

			EACH(sends, function(send) {
				
				if (send !== _send) {
					
					send({
						methodName : roomName + '/' + params.methodName,
						data : params.data
					});
				}
			});
		}
	};

	return {

		init : function(inner, self, params) {
			//REQUIRED: params
			//OPTIONAL: params.socketServerPort
			//OPTIONAL: params.webSocketServerPort
			//OPTIONAL: params.webServer
			
			if (CPU_CLUSTERING.on !== undefined) {

				CPU_CLUSTERING.on('__LAUNCH_ROOM_SERVER__MESSAGE', broadcast);
			}

			if (SERVER_CLUSTERING.on !== undefined) {

				SERVER_CLUSTERING.on('__LAUNCH_ROOM_SERVER__MESSAGE', function(params) {

					broadcast(params);

					if (CPU_CLUSTERING.broadcast !== undefined) {

						CPU_CLUSTERING.broadcast({
							methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
							data : params
						});
					}
				});
			}

			MULTI_PROTOCOL_SOCKET_SERVER(params, function(clientInfo, on, off, send, disconnect) {

				var
				// room counts
				roomCounts = {},
				
				// method maps
				methodMaps = {};

				on('__ENTER_ROOM', function(roomName) {

					var
					// init room funcs
					initRoomFuncs = initRoomFuncMap[roomName],
					
					// sends
					sends = sendMap[roomName],
					
					// method map
					methodMap;
					
					if (roomCounts[roomName] === undefined) {
						roomCounts[roomName] = 1;
						
						methodMap = methodMaps[roomName] = {};

						if (initRoomFuncs !== undefined) {

							EACH(initRoomFuncs, function(initRoomFunc) {
								initRoomFunc(clientInfo,

								// on.
								function(methodName, method) {
									//REQUIRED: methodName
									//REQUIRED: method
									
									var
									// real method name
									realMethodName = methodName === '__DISCONNECTED' ? methodName : roomName + '/' + methodName,
									
									// methods
									methods = methodMap[realMethodName];
					
									if (methods === undefined) {
										methods = methodMap[realMethodName] = [];
									}
					
									methods.push(method);
									
									on(realMethodName, method);
								},

								// off.
								function(methodName, method) {
									//REQUIRED: methodName
									//OPTIONAL: method
									
									var
									// real method name
									realMethodName = methodName === '__DISCONNECTED' ? methodName : roomName + '/' + methodName,
									
									// methods
									methods = methodMap[realMethodName];
					
									if (methods !== undefined) {
					
										if (method !== undefined) {
					
											REMOVE({
												array : methods,
												value : method
											});
					
										} else {
											delete methodMap[realMethodName];
										}
									}

									off(realMethodName, method);
								},

								// send.
								function(params, callback) {
									//REQUIRED: params
									//OPTIONAL: params.methodName
									//OPTIONAL: params.data
									//OPTIONAL: callback
									
									var
									// method name
									methodName = params.methodName,
									
									// data
									data = params.data;
									
									send({
										methodName : roomName + '/' + methodName,
										data : data
									}, callback);
								},
								
								// broadcast except me
								function(params) {
									//REQUIRED: params
									//OPTIONAL: params.methodName
									//OPTIONAL: params.data
									
									var
									// method name
									methodName = params.methodName,
									
									// data
									data = params.data;
									
									LAUNCH_ROOM_SERVER.broadcast({
										roomName : roomName,
										methodName : methodName,
										data : data
									}, send);
						
									if (CPU_CLUSTERING.broadcast !== undefined) {
						
										CPU_CLUSTERING.broadcast({
											methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
											data : {
												roomName : roomName,
												methodName : methodName,
												data : data
											}
										});
									}
						
									if (SERVER_CLUSTERING.broadcast !== undefined) {
						
										SERVER_CLUSTERING.broadcast({
											methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
											data : {
												roomName : roomName,
												methodName : methodName,
												data : data
											}
										});
									}
								},
								
								disconnect);
							});
						}

						if (sends === undefined) {
							sends = sendMap[roomName] = [];
						}

						sends.push(send);

					} else {
						roomCounts[roomName] += 1;
					}
				});

				on('__EXIT_ROOM', function(roomName) {
					
					if (roomCounts[roomName] !== undefined) {
						roomCounts[roomName] -= 1;

						if (roomCounts[roomName] === 0) {

							REMOVE({
								array : sendMap[roomName],
								value : send
							});

							if (sendMap[roomName].length === 0) {
								delete sendMap[roomName];
							}
							delete roomCounts[roomName];
							
							// off all room's methods.
							EACH(methodMaps[roomName], function(methods, methodName) {
								EACH(methods, function(method) {
									
									if (methodName === '__DISCONNECTED') {
										method();
									}
									
									off(methodName, method);
								});
							});
						}
					}
				});

				on('__DISCONNECTED', function() {

					EACH(roomCounts, function(roomCount, roomName) {

						REMOVE({
							array : sendMap[roomName],
							value : send
						});

						if (sendMap[roomName].length === 0) {
							delete sendMap[roomName];
						}
					});

					// free memory.
					roomCounts = undefined;
					methodMaps = undefined;
				});
			});
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * 룸을 생성합니다.
	 */
	box.ROOM = METHOD({

		run : function(name, connectionListener) {
			//REQUIRED: name
			//REQUIRED: connectionListener

			LAUNCH_ROOM_SERVER.addInitRoomFunc(box.boxName + '/' + name, connectionListener);
		}
	});
});
