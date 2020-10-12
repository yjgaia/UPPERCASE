/*
 * Sync time object (Server-side)
 */
global.SYNC_TIME = OBJECT({

	init: () => {

		if (global.UPPERCASE !== undefined) {

			global.UPPERCASE.ROOM('timeSyncRoom', (clientInfo, on) => {

				// return diff. (diff: client time - server time)
				on('sync', (clientNow, ret) => {
					ret(clientNow - new Date());
				});
			});
		}
	}
});
