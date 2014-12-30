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
