TEST('SOCKET_SERVER', (check) => {

	SOCKET_SERVER(8124, (clientInfo, on, off, send, disconnect) => {
		
		console.log('client connected.', clientInfo);

		let roles = [];

		on('message', (data, ret) => {

			check(CHECK_ARE_SAME([data, {
				msg : 'message from client.'
			}]));

			ret('Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from server.'
			}
		}, (retMsg) => {
			check(retMsg === 'Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from server.'
			}
		});

		on('login', (data) => {
			if (data !== undefined && data.username === 'test' && data.password === '1234') {
				roles.push('USER');
			}
		});

		on('checkRole', (role) => {

			if (role !== undefined && CHECK_IS_IN({
				data : roles,
				value : role
			}) === true) {
				check(role === 'USER');
			}
		});

		// when disconnected
		on('__DISCONNECTED', () => {
			console.log('client disconnected.', clientInfo);
		});
	});
});
