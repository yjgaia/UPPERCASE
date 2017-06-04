/*

Welcome to UPPERCASE-ROOM! (http://uppercase.io)

*/

FOR_BOX((box) => {
	
	/*
	 * 주어진 이름을 가진 룸에 접속한 모든 클라이언트에게 데이터를 전송합니다.
	 */
	box.BROADCAST = METHOD({

		run : (params) => {
			//REQUIRED: params
			//REQUIRED: params.roomName
			//REQUIRED: params.methodName
			//OPTIONAL: params.data

			let roomName = box.boxName + '/' + params.roomName;
			let methodName = params.methodName;
			let data = params.data;
			
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

FOR_BOX((box) => {

	/*
	 * 룸 서버와 통신을 주고받는 CLIENT_ROOM 클래스
	 */
	box.CLIENT_ROOM = CLASS({

		init : (inner, self, nameOrParams) => {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.roomServerName
			//REQUIRED: nameOrParams.name

			let roomServerName;
			let roomName;

			let methodMap = {};

			let isExited;
			
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

			let getRoomName = inner.getRoomName = () => {
				return roomName;
			};

			let checkIsExited = inner.checkIsExited = () => {
				return isExited;
			};

			let on = self.on = (methodName, method) => {
				//REQUIRED: methodName
				//REQUIRED: method

				let methods = methodMap[methodName];

				CONNECT_TO_ROOM_SERVER.on({
					roomServerName : roomServerName,
					methodName : roomName + '/' + methodName
				}, method);

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			};

			let off = self.off = (methodName, method) => {
				//REQUIRED: methodName
				//OPTIONAL: method

				let methods = methodMap[methodName];

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

						EACH(methods, (method) => {
							CONNECT_TO_ROOM_SERVER.off({
								roomServerName : roomServerName,
								methodName : roomName + '/' + methodName
							}, method);
						});
						
						delete methodMap[methodName];
					}
				}
			};

			let send = self.send = (methodNameOrParams, callback) => {
				//REQUIRED: methodNameOrParams
				//REQUIRED: methodNameOrParams.methodName
				//REQUIRED: methodNameOrParams.data
				//OPTIONAL: callback
				
				let methodName;
				let data;
				
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

			let exit = self.exit = () => {

				if (isExited !== true) {

					CONNECT_TO_ROOM_SERVER.exitRoom({
						roomServerName : roomServerName,
						roomName : roomName
					});

					EACH(methodMap, (methods, methodName) => {
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
global.CONNECT_TO_ROOM_SERVER = METHOD((m) => {

	const DEFAULT_ROOM_SERVER_NAME = '__';
	
	let enterRoomNameMap = {};
	let onInfoMap = {};
	let waitingSendInfoMap = {};
	let isConnecteds = {};
	let innerOns = {};
	let innerOffs = {};
	let innerSends = {};
	
	let checkIsConnected = m.checkIsConnected = (roomServerName) => {
		//OPTIONAL: roomServerName
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		if (isConnecteds[roomServerName] === undefined) {
			isConnecteds[roomServerName] = false;
		}
		
		return isConnecteds[roomServerName];
	};

	let enterRoom = m.enterRoom = (params) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.roomName
		
		let roomServerName = params.roomServerName;
		let roomName = params.roomName;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		let enterRoomNames = enterRoomNameMap[roomServerName];
		
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

	let on = m.on = (params, method) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//REQUIRED: method
		
		let roomServerName = params.roomServerName;
		let methodName = params.methodName;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		let onInfos = onInfoMap[roomServerName];
		
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

	let off = m.off = (params, method) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//OPTIONAL: method
		
		let roomServerName = params.roomServerName;
		let methodName = params.methodName;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		let onInfos = onInfoMap[roomServerName];
		
		if (innerOffs[roomServerName] !== undefined) {
			innerOffs[roomServerName](methodName, method);
		}
		
		if (onInfos !== undefined) {

			if (method !== undefined) {
	
				REMOVE(onInfos, (onInfo) => {
					return onInfo.methodName === methodName && onInfo.method === method;
				});
	
			} else {
	
				REMOVE(onInfos, (onInfo) => {
					return onInfo.methodName === methodName;
				});
			}
			
			if (onInfos.length === 0) {
				delete onInfoMap[roomServerName];
			}
		}
	};

	let send = m.send = (params, callback) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.methodName
		//REQUIRED: params.data
		//OPTIONAL: callback
		
		let roomServerName = params.roomServerName;
		let methodName = params.methodName;
		let data = params.data;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}

		if (innerSends[roomServerName] === undefined) {
			
			let waitingSendInfos = waitingSendInfoMap[roomServerName];
		
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

	let exitRoom = m.exitRoom = (params) => {
		//REQUIRED: params
		//OPTIONAL: params.roomServerName
		//REQUIRED: params.roomName
		
		let roomServerName = params.roomServerName;
		let roomName = params.roomName;
		
		if (roomServerName === undefined) {
			roomServerName = DEFAULT_ROOM_SERVER_NAME;
		}
		
		let enterRoomNames = enterRoomNameMap[roomServerName];
		
		if (enterRoomNames === undefined) {
			enterRoomNames = enterRoomNameMap[roomServerName] = [];
		}

		if (innerSends[roomServerName] !== undefined) {
			innerSends[roomServerName]({
				methodName : '__EXIT_ROOM',
				data : roomName
			});
		}
		
		EACH(enterRoomNames, (enterRoomName, key) => {

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

		run : (params, connectionListenerOrListeners) => {
			//REQUIRED: params
			//OPTIONAL: params.roomServerName
			//REQUIRED: params.host
			//REQUIRED: params.port
			//OPTIONAL: connectionListenerOrListeners
			//OPTIONAL: connectionListenerOrListeners.success
			//OPTIONAL: connectionListenerOrListeners.error

			let roomServerName = params.roomServerName;
			
			let connectionListener;
			let errorListener;
			
			if (roomServerName === undefined) {
				roomServerName = DEFAULT_ROOM_SERVER_NAME;
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

				success : (on, off, send) => {
					
					let enterRoomNames = enterRoomNameMap[roomServerName];
					let onInfos = onInfoMap[roomServerName];
					let waitingSendInfos = waitingSendInfoMap[roomServerName];

					innerOns[roomServerName] = on;
					innerOffs[roomServerName] = off;
					innerSends[roomServerName] = send;

					if (enterRoomNames !== undefined) {
						EACH(enterRoomNames, (roomName) => {
							send({
								methodName : '__ENTER_ROOM',
								data : roomName
							});
						});
					}

					if (onInfos !== undefined) {
						EACH(onInfos, (onInfo) => {
							on(onInfo.methodName, onInfo.method);
						});
					}
					
					if (waitingSendInfos !== undefined) {
						EACH(waitingSendInfos, (sendInfo) => {
							send(sendInfo.params, sendInfo.callback);
						});
					}
					delete waitingSendInfoMap[roomServerName];

					if (connectionListener !== undefined) {
						connectionListener(on, off, send);
					}
					
					isConnecteds[roomServerName] = true;

					// when disconnected, rewait.
					on('__DISCONNECTED', () => {

						delete innerOns[roomServerName];
						delete innerOffs[roomServerName];
						delete innerSends[roomServerName];
						
						isConnecteds[roomServerName] = false;
					});
				}
			});
		}
	};
});

/*
 * 룸 서버를 생성하는 클래스
 */
global.LAUNCH_ROOM_SERVER = CLASS((cls) => {

	let initRoomFuncMap = {};
	let sendMap = {};
	
	let addInitRoomFunc = cls.addInitRoomFunc = (roomName, initRoomFunc) => {
		//REQUIRED: roomName
		//REQUIRED: initRoomFunc

		if (initRoomFuncMap[roomName] === undefined) {
			initRoomFuncMap[roomName] = [];
		}

		initRoomFuncMap[roomName].push(initRoomFunc);
	};

	let broadcast = cls.broadcast = (params, toExceptSend) => {
		//REQUIRED: params
		//REQUIRED: params.roomName
		//REQUIRED: params.methodName
		//OPTIONAL: params.data
		//OPTIONAL: toExceptSend

		let roomName = params.roomName;

		let sends = sendMap[roomName];

		if (sends !== undefined) {

			EACH(sends, (send) => {
				
				if (send !== toExceptSend) {
					
					send({
						methodName : roomName + '/' + params.methodName,
						data : params.data
					});
				}
			});
		}
	};

	return {

		init : (inner, self, params) => {
			//REQUIRED: params
			//OPTIONAL: params.socketServerPort	TCP 소켓 기반으로 룸 서버를 생성하기 위한 포트 번호
			//OPTIONAL: params.webServer		웹소켓 기반으로 룸 서버를 생성하기 위한 웹 서버
			
			if (CPU_CLUSTERING.on !== undefined) {

				CPU_CLUSTERING.on('__LAUNCH_ROOM_SERVER__MESSAGE', broadcast);
			}

			if (SERVER_CLUSTERING.on !== undefined) {

				SERVER_CLUSTERING.on('__LAUNCH_ROOM_SERVER__MESSAGE', (params) => {

					broadcast(params);

					if (CPU_CLUSTERING.broadcast !== undefined) {

						CPU_CLUSTERING.broadcast({
							methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
							data : params
						});
					}
				});
			}

			MULTI_PROTOCOL_SOCKET_SERVER(params, (clientInfo, on, off, send, disconnect) => {

				let roomCounts = {};
				let methodMaps = {};

				on('__ENTER_ROOM', (roomName) => {

					let initRoomFuncs = initRoomFuncMap[roomName];
					let sends = sendMap[roomName];
					
					if (roomCounts[roomName] === undefined) {
						roomCounts[roomName] = 1;
						
						let methodMap = methodMaps[roomName] = {};

						if (initRoomFuncs !== undefined) {

							EACH(initRoomFuncs, (initRoomFunc) => {
								
								initRoomFunc(clientInfo,

								// on.
								(methodName, method) => {
									//REQUIRED: methodName
									//REQUIRED: method
									
									let realMethodName = methodName === '__DISCONNECTED' ? methodName : roomName + '/' + methodName;
									
									let methods = methodMap[realMethodName];
					
									if (methods === undefined) {
										methods = methodMap[realMethodName] = [];
									}
					
									methods.push(method);
									
									on(realMethodName, method);
								},

								// off.
								(methodName, method) => {
									//REQUIRED: methodName
									//OPTIONAL: method
									
									let realMethodName = methodName === '__DISCONNECTED' ? methodName : roomName + '/' + methodName;
									
									let methods = methodMap[realMethodName];
					
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
								(params, callback) => {
									//REQUIRED: params
									//OPTIONAL: params.methodName
									//OPTIONAL: params.data
									//OPTIONAL: callback
									
									let methodName = params.methodName;
									let data = params.data;
									
									send({
										methodName : roomName + '/' + methodName,
										data : data
									}, callback);
								},
								
								// broadcast except me.
								(params) => {
									//REQUIRED: params
									//OPTIONAL: params.methodName
									//OPTIONAL: params.data
									
									let methodName = params.methodName;
									let data = params.data;
									
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

				on('__EXIT_ROOM', (roomName) => {
					
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
							EACH(methodMaps[roomName], (methods, methodName) => {
								EACH(methods, (method) => {
									
									if (methodName === '__DISCONNECTED') {
										method();
									}
									
									off(methodName, method);
								});
							});
						}
					}
				});

				on('__DISCONNECTED', () => {

					EACH(roomCounts, (roomCount, roomName) => {

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

FOR_BOX((box) => {

	/*
	 * 룸을 생성합니다.
	 */
	box.ROOM = METHOD({

		run : (name, connectionListener) => {
			//REQUIRED: name
			//REQUIRED: connectionListener

			LAUNCH_ROOM_SERVER.addInitRoomFunc(box.boxName + '/' + name, connectionListener);
		}
	});
});
