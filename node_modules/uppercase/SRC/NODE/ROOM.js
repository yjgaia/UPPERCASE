FOR_BOX((box) => {

	/*
	 * 룸을 생성합니다.
	 */
	box.ROOM = METHOD({

		run: (name, connectionListener) => {
			//REQUIRED: name
			//REQUIRED: connectionListener

			LAUNCH_ROOM_SERVER.addInitRoomFunc(box.boxName + '/' + name, connectionListener);
		}
	});
});
