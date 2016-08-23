/**
 * Check still alive object
 */
global.CHECK_STILL_ALIVE = OBJECT({

	init : function() {
		'use strict';

		UPPERCASE.ROOM('checkStillAliveRoom', function(clientInfo, on, off, send) {
			
			// I'm still alive!!
			on('check', function(notUsing, ret) {
				ret('__ALIVE');
			});
			
			// I'm still alive!! (string mode)
			on('checkStr', function(notUsing, ret) {
				send({
					str : '__ALIVE'
				});
			});
		});
	}
});
