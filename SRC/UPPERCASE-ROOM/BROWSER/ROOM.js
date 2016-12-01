FOR_BOX(function(box) {
	'use strict';

	/**
	 * 룸 서버와 통신을 주고받는 ROOM 클래스
	 */
	box.ROOM = CLASS({

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
				//OPTIONAL: methodNameOrParams.data
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
					console.log('[UPPERCASE-ROOM] `ROOM.send` ERROR! ROOM EXITED!');
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
