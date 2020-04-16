CONNECT_TO_WEB_SOCKET_SERVER(8125, {
	
	error : (error) => {
		console.log('ERROR!');
	},
	
	success : (on, off, send, disconnect) => {

		on('message', (data, ret) => {

			console.log('CLIENT!', data);

			ret('Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from client.'
			}
		}, (retMsg) => {

			console.log('RETURN MESSAGE:', retMsg);
		});

		send({
			methodName : 'login',
			data : {
				username : 'test',
				password : '1234'
			}
		});

		DELAY(1, () => {

			send({
				methodName : 'checkRole',
				data : 'USER'
			});
		});

		// when disconnected
		on('__DISCONNECTED', () => {
			console.log('DISCONNECTED!');
		});
	}
});
