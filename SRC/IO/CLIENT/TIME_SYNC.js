/**
 * Time sync object (Client-side)
 */
global.TIME_SYNC = TIME_SYNC = OBJECT({

	init : function() {
		'use strict';

		var
		// time sync room
		timeSyncRoom = UPPERCASE.IO.ROOM('timeSyncRoom'),

		// now time
		now = new Date();

		timeSyncRoom.send({
			methodName : 'sync',
			data : now
		},

		// The local time = The server time + diff (diff: client time - server time)
		TIME.setDiff);
	}
});
