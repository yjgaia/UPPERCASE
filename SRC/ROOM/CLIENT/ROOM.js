FOR_BOX(function(box) {'use strict';

	/**
	 * Connection room class
	 */
	box.ROOM = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// room name
			roomName = box.boxName + '/' + name,

			// method map
			methodMap = {},

			// is exited
			isExited,

			// on.
			on,

			// off.
			off,

			// send.
			send,

			// exit.
			exit;

			CONNECT_TO_ROOM_SERVER.enterRoom(roomName);

			self.on = on = function(methodName, method) {

				var
				// methods
				methods = methodMap[methodName];

				CONNECT_TO_ROOM_SERVER.on(roomName + '/' + methodName, method);

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			};

			self.off = off = function(methodName, method) {

				var
				// methods
				methods = methodMap[methodName];

				if (methods !== undefined) {

					if (method !== undefined) {

						CONNECT_TO_ROOM_SERVER.off(roomName + '/' + methodName, method);

						REMOVE({
							data : methods,
							value : method
						});

						if (methods.length === 0) {
							delete methodMap[methodName];
						}

					} else {

						EACH(methods, function(method) {
							CONNECT_TO_ROOM_SERVER.off(roomName + '/' + methodName, method);
						});
						delete methodMap[methodName];
					}
				}
			};

			self.send = send = function(params, callback) {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data
				//OPTIONAL: callback

				if (isExited !== true) {

					CONNECT_TO_ROOM_SERVER.send({
						methodName : roomName + '/' + params.methodName,
						data : params.data
					}, callback);

				} else {
					console.log(CONSOLE_RED('[UPPERCASE.IO-ROOM] `ROOM.send` ERROR! ROOM EXITED!'));
				}
			};

			self.exit = exit = function() {

				if (isExited !== true) {

					CONNECT_TO_ROOM_SERVER.exitRoom(roomName);

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
