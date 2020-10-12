/*
 * 룸 서버를 생성하는 클래스
 */
global.LAUNCH_ROOM_SERVER = CLASS((cls) => {

	let initRoomFuncMap = {};
	let sendMap = {};
	let isInited = false;

	let addInitRoomFunc = cls.addInitRoomFunc = (roomName, initRoomFunc) => {
		//REQUIRED: roomName
		//REQUIRED: initRoomFunc

		if (initRoomFuncMap[roomName] === undefined) {
			initRoomFuncMap[roomName] = [];
		}

		initRoomFuncMap[roomName].push(initRoomFunc);
	};

	let __broadcast = cls.__broadcast = (params, toExceptSend) => {
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
						methodName: roomName + '/' + params.methodName,
						data: params.data
					});
				}
			});
		}
	};

	let checkIsInited = cls.checkIsInited = () => {
		return isInited;
	};

	return {

		init: (inner, self, params) => {
			//REQUIRED: params
			//OPTIONAL: params.socketServerPort	TCP 소켓 기반으로 룸 서버를 생성하기 위한 포트 번호
			//OPTIONAL: params.webServer		웹소켓 기반으로 룸 서버를 생성하기 위한 웹 서버

			if (CPU_CLUSTERING.on !== undefined) {

				CPU_CLUSTERING.on('__LAUNCH_ROOM_SERVER__MESSAGE', __broadcast);
			}

			if (SERVER_CLUSTERING.on !== undefined) {

				SERVER_CLUSTERING.on('__LAUNCH_ROOM_SERVER__MESSAGE', (params) => {

					__broadcast(params);

					if (CPU_CLUSTERING.broadcast !== undefined) {

						CPU_CLUSTERING.broadcast({
							methodName: '__LAUNCH_ROOM_SERVER__MESSAGE',
							data: params
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
													array: methods,
													value: method
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
											methodName: roomName + '/' + methodName,
											data: data
										}, callback);
									},

									// broadcast except me.
									(params) => {
										//REQUIRED: params
										//OPTIONAL: params.methodName
										//OPTIONAL: params.data

										let methodName = params.methodName;
										let data = params.data;

										__broadcast({
											roomName: roomName,
											methodName: methodName,
											data: data
										}, send);

										if (CPU_CLUSTERING.broadcast !== undefined) {

											CPU_CLUSTERING.broadcast({
												methodName: '__LAUNCH_ROOM_SERVER__MESSAGE',
												data: {
													roomName: roomName,
													methodName: methodName,
													data: data
												}
											});
										}

										if (SERVER_CLUSTERING.broadcast !== undefined) {

											SERVER_CLUSTERING.broadcast({
												methodName: '__LAUNCH_ROOM_SERVER__MESSAGE',
												data: {
													roomName: roomName,
													methodName: methodName,
													data: data
												}
											});
										}
									},

									disconnect
								);
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
								array: sendMap[roomName],
								value: send
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
							array: sendMap[roomName],
							value: send
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

			isInited = true;
		}
	};
});
