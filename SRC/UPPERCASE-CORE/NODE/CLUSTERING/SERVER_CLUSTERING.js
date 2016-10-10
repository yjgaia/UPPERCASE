/*
 * 서버 간 클러스터링을 수행합니다.
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
			
			// send key
			sendKey = 0,

			// is connectings
			isConnectings = {},

			// server sends
			serverSends = {},

			// socket server ons
			socketServeOns = [],

			// connect to clustering server.
			connectToClusteringServer,
			
			// get hosts.
			getHosts,
			
			// get this server name.
			getThisServerName,

			// run methods.
			runMethods = function(methodName, data, sendKey, serverName) {

				var
				// methods
				methods;
				
				try {
					
					methods = methodMap[methodName];

					if (methods !== undefined) {
	
						EACH(methods, function(method) {
	
							// run method.
							method(data,
	
							// ret.
							function(retData) {
	
								if (sendKey !== undefined) {
	
									send({
										serverName : serverName,
										methodName : '__CALLBACK_' + sendKey,
										data : retData
									});
								}
							});
						});
					}
				}
				
				// if catch error
				catch(error) {
					
					SHOW_ERROR('SERVER_CLUSTERING', error.toString(), {
						methodName : methodName,
						data : data
					});
				}
			},

			// on.
			on,

			// off.
			off,
			
			// send.
			send,

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
								
								SHOW_ERROR('SERVER_CLUSTERING', '클러스터링 서버와의 연결이 끊어졌습니다. (끊어진 서버 이름:' + serverName + ')');
							});

							console.log('[SERVER_CLUSTERING] 클러스터링 서버와 연결되었습니다. (연결된 서버 이름:' + serverName + ')');

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
				
				var
				// server name
				serverName;

				socketServeOns.push(socketServeOn);

				socketServeOn('__BOOTED', function(_serverName) {
					
					serverName = _serverName;
					
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
					
					SHOW_ERROR('SERVER_CLUSTERING', '클러스터링 서버와의 연결이 끊어졌습니다. (끊어진 서버 이름:' + serverName + ')');
				});
			});

			m.getHosts = getHosts = function() {
				return hosts;
			};
			
			m.getThisServerName = getThisServerName = function() {
				return thisServerName;
			};
			
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

			// save shared data.
			on('__SHARED_STORE_SAVE', function(params) {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : SHARED_STORE.getWorkerIdByStoreName(params.storeName),
						methodName : '__SHARED_STORE_SAVE',
						data : params
					});
				}
				
				else {
					SHARED_STORE.save(params);
				}
			});
			
			// update shared data.
			on('__SHARED_STORE_UPDATE', function(params) {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : SHARED_STORE.getWorkerIdByStoreName(params.storeName),
						methodName : '__SHARED_STORE_UPDATE',
						data : params
					});
				}
				
				else {
					SHARED_STORE.update(params);
				}
			});

			// remove shared data.
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

			m.off = off = function(methodName) {
				delete methodMap[methodName];
			};

			m.send = send = function(params) {
				//REQUIRED: params
				//REQUIRED: params.serverName
				//REQUIRED: params.methodName
				//REQUIRED: params.data
				//OPTIONAL: callback
				
				var
				// server name
				serverName = params.serverName,
				
				// method name
				methodName = params.methodName,
				
				// data
				data = params.data,
				
				// callback name
				callbackName;
				
				if (callback === undefined) {
					
					if (serverName === thisServerName) {
						runMethods(methodName, data);
					}
					
					else if (serverSends[serverName] === undefined) {
						SHOW_ERROR('SERVER_CLUSTERING', '[' + serverName + ']라는 서버는 존재하지 않습니다.');
					}
					
					else {
						serverSends[serverName](params);
					}
				}
				
				else {
					
					callbackName = '__CALLBACK_' + sendKey;
					
					// on callback.
					on(callbackName, function(data) {

						// run callback.
						callback(data);

						// off callback.
						off(callbackName);
					});
					
					sendKey += 1;
					
					if (serverName === thisServerName) {
						runMethods(methodName, data, sendKey - 1, thisServerName);
					}
					
					else if (serverSends[serverName] === undefined) {
						SHOW_ERROR('SERVER_CLUSTERING', '[' + serverName + ']라는 서버는 존재하지 않습니다.');
					}
					
					else {
						serverSends[serverName](params);
					}
				}
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

			console.log(CONSOLE_BLUE('[SERVER_CLUSTERING] 클러스터링 서버가 실행중입니다.... (현재 서버 이름:' + thisServerName + ', 포트:' + port + ')'));
		}
	};
});
