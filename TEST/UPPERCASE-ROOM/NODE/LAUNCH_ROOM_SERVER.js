TEST('LAUNCH_ROOM_SERVER', (check) => {
	
	LAUNCH_ROOM_SERVER({
		socketServerPort : 9126,
		webServer : WEB_SERVER(9127)
	}, (clientInfo, on, off, send) => {

		let roles = [];

		console.log('CONNECTED!', clientInfo);

		on('message', (data, ret) => {

			console.log('SERVER!', data, CPU_CLUSTERING.getWorkerId());

			ret('Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from server. ' + CPU_CLUSTERING.getWorkerId()
			}
		}, (retMsg) => {

			console.log('RETURN MESSAGE:', retMsg);
		});

		on('login', (data) => {
			if (data.username === 'test' && data.password === '1234') {
				roles.push('USER');
			}
		});

		on('checkRole', (role) => {

			if (CHECK_IS_IN({
				data : roles,
				value : role
			}) === true) {

				console.log('SINGED!', role);
			}
		});

		// when disconnected
		on('__DISCONNECTED', () => {
			console.log('DISCONNECTED!');
		});
	});
});
