TEST('MULTI_PROTOCOL_SOCKET_SERVER', (check) => {
	
	MULTI_PROTOCOL_SOCKET_SERVER({
		socketServerPort : 8124,
		webServer : WEB_SERVER(8125)
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
