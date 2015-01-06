/**
 * Check still alive object
 */
global.CHECK_STILL_ALIVE = OBJECT({

	init : function() {
		'use strict';

		UPPERCASE.IO.ROOM('checkStillAliveRoom', function(clientInfo, on, off, send) {
			
			// I'm still alive!!
			on('check', function(notUsing, ret) {
				ret('ALIVE!');
			});
		});
	}
});

/**
 * Sync time object (Server-side)
 */
global.SYNC_TIME = OBJECT({

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
