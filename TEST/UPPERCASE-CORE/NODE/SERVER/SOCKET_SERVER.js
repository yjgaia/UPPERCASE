TEST('SOCKET_SERVER', function(ok) {
	'use strict';

	SOCKET_SERVER(8124, function(clientInfo, on, off, send, disconnect) {

		var
		// roles
		roles = [];

		on('message', function(data, ret) {

			ok(CHECK_ARE_SAME([data, {
				msg : 'message from client.'
			}]));

			ret('Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from server.'
			}
		}, function(retMsg) {
			ok(retMsg === 'Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from server.'
			}
		});

		on('login', function(data) {
			if (data !== undefined && data.username === 'test' && data.password === '1234') {
				roles.push('USER');
			}
		});

		on('checkRole', function(role) {

			if (role !== undefined && CHECK_IS_IN({
				data : roles,
				value : role
			}) === true) {
				ok(role === 'USER');
			}
		});

		// when disconnected
		on('__DISCONNECTED', function() {
			console.log('DISCONNECTED!');
		});
	});
});
