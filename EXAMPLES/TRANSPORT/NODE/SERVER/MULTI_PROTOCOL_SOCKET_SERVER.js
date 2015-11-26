// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE-TRANSPORT.
require('../../../../UPPERCASE-TRANSPORT/NODE.js');

TEST('MULTI_PROTOCOL_SOCKET_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function() {

		var
		// web server
		webServer,

		// socket server
		socketServer,

		// web socket fix request
		webSocketFixRequest;

		webServer = WEB_SERVER(8125, function(requestInfo, response, onDisconnected) {

			// serve web socket fix request
			if (requestInfo.uri === '__WEB_SOCKET_FIX') {

				webSocketFixRequest(requestInfo, {
					response : response,
					onDisconnected : onDisconnected
				});
			}
		});

		socketServer = MULTI_PROTOCOL_SOCKET_SERVER({
			socketServerPort : 8124,
			webServer : webServer,
			isCreateWebSocketFixRequestManager : true
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

		webSocketFixRequest = socketServer.getWebSocketFixRequest();
	});
});
