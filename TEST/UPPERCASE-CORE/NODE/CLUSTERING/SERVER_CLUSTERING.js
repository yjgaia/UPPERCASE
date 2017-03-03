TEST('SERVER_CLUSTERING', (check) => {

	SERVER_CLUSTERING({
		hosts : {
			serverA : '127.0.0.1',
			serverB : '127.0.0.1'
		},
		thisServerName : 'serverA',
		port : 8125
	}, () => {

		SERVER_CLUSTERING.on('receive', (data) => {
			check(CHECK_ARE_SAME([data, {
				msg : 'Hey!'
			}]));
		});

		DELAY(1, () => {

			SERVER_CLUSTERING.broadcast({
				methodName : 'receive',
				data : {
					msg : 'Hey!'
				}
			});
		});
	});
});
