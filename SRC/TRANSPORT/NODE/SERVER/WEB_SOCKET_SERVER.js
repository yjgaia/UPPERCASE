/*
 * create web socket server.
 */
global.WEB_SOCKET_SERVER = WEB_SOCKET_SERVER = METHOD({

	run : function(portOrPorts, connectionListener) {'use strict';
		//REQUIRED: portOrPorts
		//OPTIONAL: portOrPorts.port
		//OPTIONAL: portOrPorts.fixServerPort
		//REQUIRED: connectionListener

		var
		//IMPORT: WebSocketServer
		WebSocketServer = require('ws').Server,

		// port
		port,

		// fix server port
		fixServerPort,

		// server
		server;

		// run with fix server.
		if (CHECK_IS_DATA(portOrPorts) === true) {
			port = portOrPorts.port;
			fixServerPort = portOrPorts.fixServerPort;
		}

		// only run web socket server.
		else {
			port = portOrPorts;
		}

		server = new WebSocketServer({
			port : port
		});

		server.on('connection', function(conn) {

			var
			// method map
			methodMap = {},

			// ip
			ip,

			// is force disconnecting
			isForceDisconnecting,

			// on.
			on,

			// off.
			off,

			// send.
			send,

			// run methods.
			runMethods = function(methodName, data) {

				var
				// methods
				methods = methodMap[methodName];

				if (methods !== undefined) {

					EACH(methods, function(method) {

						// run method.
						method(data,

						// ret.
						function(retData) {

							send({
								methodName : '__CALLBACK_' + methodName,
								data : retData
							});
						});
					});
				}
			};

			// when receive data
			conn.on('message', function(str) {

				var
				// params
				params = PARSE_STR(str);

				if (params !== undefined) {
					runMethods(params.methodName, params.data);
				}
			});

			// when disconnected
			conn.on('close', function() {

				if (isForceDisconnecting !== true) {
					runMethods('__DISCONNECTED');
				}

				// free method map.
				methodMap = undefined;
			});

			// when error
			conn.on('error', function(error) {
				runMethods('__ERROR', error);
			});

			ip = conn.upgradeReq.headers['x-forwarded-for'];

			if (ip === undefined) {
				ip = conn.upgradeReq.connection.remoteAddress;
			}

			connectionListener(

			// info
			{
				ip : ip
			},

			// on.
			on = function(methodName, method) {
				//REQUIRED: methodName
				//REQUIRED: method

				var
				// methods
				methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			},

			// off.
			off = function(methodName, method) {
				//REQUIRED: methodName
				//OPTIONAL: method

				var
				// methods
				methods = methodMap[methodName];

				if (methods !== undefined) {

					if (method !== undefined) {

						REMOVE({
							data : methods,
							value : method
						});

					} else {
						delete methodMap[methodName];
					}
				}
			},

			// send to client.
			send = function(params, callback) {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data
				//OPTIONAL: callback

				var
				// method name
				methodName = params.methodName;

				conn.send(STRINGIFY(params));

				if (callback !== undefined) {

					// on callback.
					on('__CALLBACK_' + methodName, function(data) {

						// run callback.
						callback(data);

						// off callback.
						off('__CALLBACK_' + methodName);
					});
				}
			},

			// disconnect.
			function() {

				isForceDisconnecting = true;

				conn.close();
			});
		});

		console.log('[UPPERCASE.IO-WEB_SOCKET_SERVER] RUNNING WEB SOCKET SERVER... (PORT:' + port + ')');

		if (fixServerPort !== undefined) {

			// run fix server.
			WEB_SOCKET_FIX_SERVER(fixServerPort, connectionListener);
		}
	}
});
