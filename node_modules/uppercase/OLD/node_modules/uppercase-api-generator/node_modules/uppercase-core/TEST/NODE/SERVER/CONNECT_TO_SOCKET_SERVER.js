TEST('CONNECT_TO_SOCKET_SERVER', (check) => {
	
	// if you not want error listener.
	//
	//	CONNECT_TO_SOCKET_SERVER({
	//		host : 'localhost',
	//		port : 8124
	//	}, (on, off, send) => {
	//		...
	//	});

	CONNECT_TO_SOCKET_SERVER({
		host : 'localhost',
		port : 8124
	}, {
		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},
		success : (on, off, send, disconnect) => {

			on('message', (data, ret) => {

				check(CHECK_ARE_SAME([data, {
					msg : 'message from server.'
				}]));

				ret('Thanks!');
			});

			send({
				methodName : 'message',
				data : {
					msg : 'message from client.'
				}
			}, (retMsg) => {
				check(retMsg === 'Thanks!');
			});

			send({
				methodName : 'message',
				data : {
					msg : 'message from client.'
				}
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
			
			DELAY(3, disconnect);
		}
	});
});
