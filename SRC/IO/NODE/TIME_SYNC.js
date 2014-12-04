/**
 * Time sync object (Server-side)
 */
global.TIME_SYNC = TIME_SYNC = OBJECT({

	init : function() {
		'use strict';

		UPPERCASE.IO.ROOM('timeSyncRoom', function(clientInfo, on) {

			// return diff. (diff: client time - server time)
			on('sync', function(clientNow, ret) {
				ret(clientNow - new Date());
			});
		});
	}
});
