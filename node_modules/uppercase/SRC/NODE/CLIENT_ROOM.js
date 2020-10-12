FOR_BOX((box) => {

	/*
	 * 룸 서버와 통신을 주고받는 CLIENT_ROOM 클래스
	 */
	box.CLIENT_ROOM = CLASS({

		init: (inner, self, nameOrParams) => {
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
				roomServerName: roomServerName,
				roomName: roomName
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
					roomServerName: roomServerName,
					methodName: roomName + '/' + methodName
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
							roomServerName: roomServerName,
							methodName: roomName + '/' + methodName
						}, method);

						REMOVE({
							array: methods,
							value: method
						});

						if (methods.length === 0) {
							delete methodMap[methodName];
						}

					} else {

						EACH(methods, (method) => {
							CONNECT_TO_ROOM_SERVER.off({
								roomServerName: roomServerName,
								methodName: roomName + '/' + methodName
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
						roomServerName: roomServerName,
						methodName: roomName + '/' + methodName,
						data: data
					}, callback);

				} else {
					SHOW_ERROR(box.boxName + '.' + roomName + 'Room.send', 'ROOM EXITED.');
				}
			};

			let exit = self.exit = () => {

				if (isExited !== true) {

					CONNECT_TO_ROOM_SERVER.exitRoom({
						roomServerName: roomServerName,
						roomName: roomName
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
