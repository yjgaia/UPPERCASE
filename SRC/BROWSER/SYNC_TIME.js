/*
 * Sync time. (Client-side)
 */
global.SYNC_TIME = METHOD({

	run: () => {

		let timeSyncRoom = UPPERCASE.ROOM('timeSyncRoom');

		timeSyncRoom.send({
			methodName: 'sync',
			data: new Date()
		}, (diff) => {

			// The local time = The server time + diff (diff: client time - server time)
			TIME.setDiff(diff);

			// The server time = The local time - diff (diff: client time - server time)
			SERVER_TIME.setDiff(diff);

			timeSyncRoom.exit();
		});
	}
});
