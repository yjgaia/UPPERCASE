// load UJS.
require('../../../UJS-NODE.js');

TEST('SOCKET_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	SOCKET_SERVER(8124, function(clientInfo, on, off, send, disconnect) {

		var
		// roles
		roles = [];

		ok(CHECK_ARE_SAME([clientInfo, {
			ip : '127.0.0.1'
		}]));

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
			if (data.username === 'test' && data.password === '1234') {
				roles.push('USER');
			}
		});

		on('checkRole', function(role) {

			if (CHECK_IS_IN({
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
