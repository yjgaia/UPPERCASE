TEST('TIME', (check) => {
	
	let timeSyncRoom = UPPERCASE.ROOM('timeSyncRoom');
	
	timeSyncRoom.send({
		methodName : 'sync',
		data : new Date()
	},

	(diff) => {
		
		
		// The local time = The server time + diff (diff: client time - server time)
		TIME.setDiff(diff);
		
		// The server time = The local time - diff (diff: client time - server time)
		SERVER_TIME.setDiff(diff);
		
		console.log(diff);
		
		let now = new Date();
		
		console.log(now.getTime());
		console.log(TIME(now).getTime());
		console.log(SERVER_TIME(now).getTime());
	});
});
