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
