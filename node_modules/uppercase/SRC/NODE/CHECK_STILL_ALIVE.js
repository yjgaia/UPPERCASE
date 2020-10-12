/*
 * Check still alive object
 */
global.CHECK_STILL_ALIVE = OBJECT({

	init: () => {

		if (global.UPPERCASE !== undefined) {

			global.UPPERCASE.ROOM('checkStillAliveRoom', (clientInfo, on, off, send) => {

				// I'm still alive!!
				on('check', (notUsing, ret) => {
					ret('__ALIVE');
				});

				// I'm still alive!! (string mode for native clients)
				on('checkStr', (notUsing, ret) => {
					send({
						str: '__ALIVE'
					});
				});
			});
		}
	}
});
