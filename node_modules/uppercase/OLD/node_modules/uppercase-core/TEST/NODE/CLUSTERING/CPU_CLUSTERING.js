TEST('CPU_CLUSTERING', (check) => {
	
	CPU_CLUSTERING(() => {

		console.log('WORK, WORKER!: ', CPU_CLUSTERING.getWorkerId());

		CPU_CLUSTERING.on('receive', (data) => {
			check(CHECK_ARE_SAME([data, {
				msg : 'Hey!'
			}]));
		});

		if (CPU_CLUSTERING.getWorkerId() === 1) {

			CPU_CLUSTERING.broadcast({
				methodName : 'receive',
				data : {
					msg : 'Hey!'
				}
			});
		}
	});
});
