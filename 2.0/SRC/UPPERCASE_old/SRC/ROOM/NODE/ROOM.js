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
