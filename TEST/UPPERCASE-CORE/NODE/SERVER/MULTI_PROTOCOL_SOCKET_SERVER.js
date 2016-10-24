TEST('MULTI_PROTOCOL_SOCKET_SERVER', function(ok) {
	'use strict';
	
	MULTI_PROTOCOL_SOCKET_SERVER({
		socketServerPort : 8124,
		webServer : WEB_SERVER(8125)
	}, function(clientInfo, on, off, send) {

		var
		// roles
		roles = [];

		console.log('CONNECTED!', clientInfo);

		on('message', function(data, ret) {

			console.log('SERVER!', data, CPU_CLUSTERING.getWorkerId());

			ret('Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from server. ' + CPU_CLUSTERING.getWorkerId()
			}
		}, function(retMsg) {

			console.log('RETURN MESSAGE:', retMsg);
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

				console.log('SINGED!', role);
			}
		});

		// when disconnected
		on('__DISCONNECTED', function() {
			console.log('DISCONNECTED!');
		});
	});
});
