/*
 * launch room server.
 */
global.LAUNCH_ROOM_SERVER = LAUNCH_ROOM_SERVER = METHOD(function(m) {'use strict';

	var
	// init room func map
	initRoomFuncMap = {},

	// send map
	sendMap = {},

	// add init room func.
	addInitRoomFunc,

	// broadcast.
	broadcast;

	m.addInitRoomFunc = addInitRoomFunc = function(roomName, initRoomFunc) {
		//REQUIRED: roomName
		//REQUIRED: initRoomFunc

		if (initRoomFuncMap[roomName] === undefined) {
			initRoomFuncMap[roomName] = [];
		}

		initRoomFuncMap[roomName].push(initRoomFunc);
	};

	m.broadcast = broadcast = function(params) {
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

		run : function(params) {
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

			MULTI_PROTOCOL_SOCKET_SERVER(params, function(clientInfo, on, off, send) {

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

									on(roomName + '/' + methodName, method);
								},

								// off.
								function(methodName, method) {
									//REQUIRED: methodName
									//OPTIONAL: method

									off(roomName + '/' + methodName, method);
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
								data : sendMap[roomName],
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
							data : sendMap[roomName],
							value : send
						});

						if (sendMap[roomName].length === 0) {
							delete sendMap[roomName];
						}
					});

					roomCounts = undefined;
				});
			});
		}
	};
});
