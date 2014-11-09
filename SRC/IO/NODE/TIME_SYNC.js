/**
 * Time sync object (Server-side)
 */
global.TIME_SYNC = TIME_SYNC = OBJECT({

	init : function() {
		'use strict';

		UPPERCASE.IO.ROOM('timeSyncRoom', function(clientInfo, on) {

			on('sync', function(clientNow, ret) {

				ret(clientNow - new Date());
			});
		});
	}
});
