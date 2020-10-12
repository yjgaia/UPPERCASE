TEST('WEB_SOCKET_SERVER', (check) => {
	
	WEB_SOCKET_SERVER(WEB_SERVER(8125), (clientInfo, on, off, send, disconnect) => {

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
				array : roles,
				value : role
			}) === true) {

				console.log('SINGED!', role, CPU_CLUSTERING.getWorkerId());
			}
		});

		// when disconnected
		on('__DISCONNECTED', () => {
			console.log('DISCONNECTED!', CPU_CLUSTERING.getWorkerId());
		});
	});
});
