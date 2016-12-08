TEST('CONNECT_TO_SOCKET_SERVER', function(check) {
	'use strict';
	
	// if you not want error listener.
	//
	//	CONNECT_TO_SOCKET_SERVER({
	//		host : 'localhost',
	//		port : 8124
	//	}, function(on, off, send) {
	//		...
	//	});

	CONNECT_TO_SOCKET_SERVER({
		host : 'localhost',
		port : 8124
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},
		success : function(on, off, send, disconnect) {

			on('message', function(data, ret) {

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
			}, function(retMsg) {
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
			
			DELAY(3, disconnect);
		}
	});
});
