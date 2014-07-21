// if you not want error listener.
//
//	CONNECT_TO_WEB_SOCKET_SERVER({
//		port : 8125
//	}, function(on, send) {
//		...
//	});

CONNECT_TO_WEB_SOCKET_SERVER({
	port : 8125,
	fixServerPort : 8126
}, {
	error : function(error) {
		console.log('ERROR!');
	},
	success : function(on, off, send, disconnect) {

		on('message', function(data, ret) {

			console.log('CLIENT!', data);

			ret('Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from client.'
			}
		}, function(retMsg) {

			console.log('RETURN MESSAGE:', retMsg);
		});

		send({
			methodName : 'login',
			data : {
				username : 'test',
				password : '1234'
			}
		});

		DELAY(1, function() {

			send({
				methodName : 'checkRole',
				data : 'USER'
			});
		});

		// when disconnected
		on('__DISCONNECTED', function() {
			console.log('DISCONNECTED!');
		});
	}
});
