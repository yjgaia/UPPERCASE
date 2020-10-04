FOR_BOX((box) => {

	/*
	 * 주어진 이름을 가진 룸에 접속한 모든 클라이언트에게 데이터를 전송합니다.
	 */
	box.BROADCAST = METHOD({

		run: (params) => {
			//REQUIRED: params
			//REQUIRED: params.roomName
			//REQUIRED: params.methodName
			//OPTIONAL: params.data

			let roomName = box.boxName + '/' + params.roomName;
			let methodName = params.methodName;
			let data = params.data;

			if (LAUNCH_ROOM_SERVER.checkIsInited() === true) {

				LAUNCH_ROOM_SERVER.__broadcast({
					roomName: roomName,
					methodName: methodName,
					data: data
				});

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
			}
		}
	});
});
