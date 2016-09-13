/*
 * server clustering work.
 */
global.SERVER_CLUSTERING = METHOD(function(m) {
	'use strict';

	return {

		run : function(params, work) {
			//REQUIRED: params
			//REQUIRED: params.hosts
			//REQUIRED: params.thisServerName
			//REQUIRED: params.port
			//OPTIONAL: work

			var
			// hosts
			hosts = params.hosts,

			// this server name
			thisServerName = params.thisServerName,

			// port
			port = params.port,

			// method map
			methodMap = {},

			// is connectings
			isConnectings = {},

			// server sends
			serverSends = {},

			// connect to clustering server.
			connectToClusteringServer,

			// socket server ons
			socketServeOns = [],

			// on.
			on,

			// off.
			off,

			// broadcast.
			broadcast;

			connectToClusteringServer = function(serverName) {

				if (isConnectings[serverName] !== true) {
					isConnectings[serverName] = true;

					CONNECT_TO_SOCKET_SERVER({
						host : hosts[serverName],
						port : port
					}, {
						error : function() {
							delete isConnectings[serverName];
						},

						success : function(on, off, send) {

							send({
								methodName : '__BOOTED',
								data : thisServerName
							});

							serverSends[serverName] = function(params) {
								//REQUIRED: params
								//REQUIRED: params.methodName
								//REQUIRED: params.data

								var
								// method name
								methodName = params.methodName,

								// data
								data = params.data;

								send({
									methodName : 'SERVER_CLUSTERING.' + methodName,
									data : data
								});
							};

							on('__DISCONNECTED', function() {
								delete serverSends[serverName];
								delete isConnectings[serverName];
								
								SHOW_ERROR('[SERVER_CLUSTERING] DISCONNECTED CLUSTERING SERVER. (SERVER NAME:' + serverName + ')');
							});

							console.log('[SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (SERVER NAME:' + serverName + ')');

							if (CPU_CLUSTERING.broadcast !== undefined) {

								CPU_CLUSTERING.broadcast({
									methodName : '__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER',
									data : serverName
								});
							}
						}
					});
				}
			};

			if (CPU_CLUSTERING.on !== undefined) {
				CPU_CLUSTERING.on('__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER', connectToClusteringServer);
			}

			// try connect to all clustering hosts.
			EACH(hosts, function(host, serverName) {
				if (serverName !== thisServerName) {
					connectToClusteringServer(serverName);
				}
			});

			SOCKET_SERVER(port, function(clientInfo, socketServeOn) {

				socketServeOns.push(socketServeOn);

				socketServeOn('__BOOTED', function(serverName) {
					connectToClusteringServer(serverName);
				});

				EACH(methodMap, function(methods, methodName) {
					EACH(methods, function(method) {
						socketServeOn('SERVER_CLUSTERING.' + methodName, method);
					});
				});

				socketServeOn('__DISCONNECTED', function() {
					
					REMOVE({
						array : socketServeOns,
						value : socketServeOn
					});
					
					SHOW_ERROR('[SERVER_CLUSTERING] DISCONNECTED CLUSTERING SERVER.');
				});
			});

			m.on = on = function(methodName, method) {

				var
				// methods
				methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);

				EACH(socketServeOns, function(socketServeOn) {
					socketServeOn('SERVER_CLUSTERING.' + methodName, method);
				});
			};

			// save shared value.
			on('__SHARED_STORE_SAVE', function(params) {

				SHARED_STORE.save(params);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_SAVE',
						data : params
					});
				}
			});

			// remove shared value.
			on('__SHARED_STORE_REMOVE', function(params) {

				SHARED_STORE.remove(params);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_REMOVE',
						data : params
					});
				}
			});

			// clear shared store.
			on('__SHARED_STORE_CLEAR', function(storeName) {

				SHARED_STORE.clear(storeName);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_CLEAR',
						data : storeName
					});
				}
			});

			// save shared data.
			on('__SHARED_DB_SAVE', function(params) {

				SHARED_DB.save(params);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_DB_SAVE',
						data : params
					});
				}
			});
			
			// update shared data.
			on('__SHARED_DB_UPDATE', function(params) {

				SHARED_DB.update(params);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_DB_UPDATE',
						data : params
					});
				}
			});

			// remove shared data.
			on('__SHARED_DB_REMOVE', function(params) {

				SHARED_DB.remove(params);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_DB_REMOVE',
						data : params
					});
				}
			});

			// clear shared db.
			on('__SHARED_DB_CLEAR', function(dbName) {

				SHARED_DB.clear(dbName);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_DB_CLEAR',
						data : dbName
					});
				}
			});

			m.off = off = function(methodName) {
				delete methodMap[methodName];
			};

			m.broadcast = broadcast = function(params) {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data

				EACH(serverSends, function(serverSend) {
					serverSend(params);
				});
			};

			if (work !== undefined) {
				work();
			}

			console.log(CONSOLE_BLUE('[SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER NAME:' + thisServerName + ', PORT:' + port + ')'));
		}
	};
});
