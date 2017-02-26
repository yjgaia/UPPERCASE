/*
 * Sync time object (Server-side)
 */
global.SYNC_TIME = OBJECT({

	init : () => {
		
		UPPERCASE.ROOM('timeSyncRoom', (clientInfo, on) => {

			// return diff. (diff: client time - server time)
			on('sync', (clientNow, ret) => {
				ret(clientNow - new Date());
			});
		});
	}
});
