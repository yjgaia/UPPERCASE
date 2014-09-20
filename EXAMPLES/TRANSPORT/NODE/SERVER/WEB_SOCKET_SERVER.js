// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-TRANSPORT.
require('../../../../UPPERCASE.IO-TRANSPORT/NODE.js');

TEST('WEB_SOCKET_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function() {

		var
		// connection listener
		connectionListener,

		// web socket fix request manager
		webSocketFixRequestManager;

		connectionListener = function(clientInfo, on, off, send, disconnect) {

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
					array : roles,
					value : role
				}) === true) {

					console.log('SINGED!', role, CPU_CLUSTERING.getWorkerId());
				}
			});

			// when disconnected
			on('__DISCONNECTED', function() {
				console.log('DISCONNECTED!', CPU_CLUSTERING.getWorkerId());
			});
		};

		webSocketFixRequestManager = WEB_SOCKET_FIX_REQUEST_MANAGER(connectionListener);

		webServer = WEB_SERVER(8125, function(requestInfo, response, onDisconnected) {

			// serve web socket fix request
			if (requestInfo.uri === '__WEB_SOCKET_FIX') {

				webSocketFixRequestManager.request(requestInfo, {
					response : response,
					onDisconnected : onDisconnected
				});
			}
		});

		WEB_SOCKET_SERVER(webServer, connectionListener);
	});
});
