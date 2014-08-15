// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-TRANSPORT.
require('../../../../UPPERCASE.IO-TRANSPORT/NODE.js');

INIT_OBJECTS();

CPU_CLUSTERING(function(workerData, on, off, broadcast) {

	MULTI_PROTOCOL_SOCKET_SERVER({

		socketServerPort : 8124,

		webSocketServerPort : 8125,
		webSocketFixServerPort : 8126

	}, function(clientInfo, on, off, send) {

		var
		// roles
		roles = [];

		console.log('CONNECTED!', clientInfo);

		on('message', function(data, ret) {

			console.log('SERVER!', data, workerData.id);

			ret('Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from server. ' + workerData.id
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
