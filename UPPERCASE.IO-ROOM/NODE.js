FOR_BOX(function(box) {
	'use strict';

	/**
	 * broadcast to rooms.
	 */
	box.BROADCAST = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.roomName
			//REQUIRED: params.methodName
			//REQUIRED: params.data

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
	 * create room.
	 */
	box.ROOM = METHOD({

		run : function(name, connectionListener) {
			//REQUIRED: name
			//REQUIRED: connectionListener

			LAUNCH_ROOM_SERVER.addInitRoomFunc(box.boxName + '/' + name, connectionListener);
		}
	});
});

/*
 * Launch room server class
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

	cls.broadcast = broadcast = function(params) {
		//REQUIRED: params
		//REQUIRED: params.roomName
		//REQUIRED: params.methodName
		//REQUIRED: params.data

		var
		// room name
		roomName = params.roomName,

		// sends
		sends = sendMap[roomName];

		if (sends !== undefined) {

			EACH(sends, function(send) {

				send({
					methodName : roomName + '/' + params.methodName,
					data : params.data
				});
			});
		}
	};

	return {

		init : function(inner, self, params) {
			//REQUIRED: params
			//OPTIONAL: params.socketServerPort
			//OPTIONAL: params.webSocketServerPort
			//OPTIONAL: params.webServer
			//OPTIONAL: params.isCreateWebSocketFixRequestManager

			var
			// multi protocol socket server
			multiProtocolSocketServer,

			// get web socket fix request.
			getWebSocketFixRequest;

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

			multiProtocolSocketServer = MULTI_PROTOCOL_SOCKET_SERVER(params, function(clientInfo, on, off, send) {

				var
				// room counts
				roomCounts = {};

				on('__ENTER_ROOM', function(roomName) {

					var
					// init room funcs
					initRoomFuncs = initRoomFuncMap[roomName],

					// sends
					sends = sendMap[roomName];

					if (roomCounts[roomName] === undefined) {
						roomCounts[roomName] = 1;

						if (initRoomFuncs !== undefined) {

							EACH(initRoomFuncs, function(initRoomFunc) {
								initRoomFunc(clientInfo,

								// on.
								function(methodName, method) {
									//REQUIRED: methodName
									//REQUIRED: method
									
									on(methodName === '__DISCONNECTED' ? methodName : roomName + '/' + methodName, method);
								},

								// off.
								function(methodName, method) {
									//REQUIRED: methodName
									//OPTIONAL: method

									off(methodName === '__DISCONNECTED' ? methodName : roomName + '/' + methodName, method);
								},

								// send.
								function(params, callback) {
									//REQUIRED: params
									//REQUIRED: params.methodName
									//REQUIRED: params.data
									//OPTIONAL: callback

									send({
										methodName : roomName + '/' + params.methodName,
										data : params.data
									}, callback);
								});
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

					roomCounts = undefined;
				});
			});

			self.getWebSocketFixRequest = getWebSocketFixRequest = function() {
				return multiProtocolSocketServer.getWebSocketFixRequest();
			};
		}
	};
});
