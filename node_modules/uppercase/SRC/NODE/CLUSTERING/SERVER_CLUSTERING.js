/*
 * 서버 간 클러스터링을 수행합니다.
 */
global.SERVER_CLUSTERING = METHOD((m) => {

	return {

		run: (params, work) => {
			//REQUIRED: params
			//REQUIRED: params.hosts
			//REQUIRED: params.thisServerName
			//REQUIRED: params.port
			//OPTIONAL: work

			let hosts = params.hosts;
			let thisServerName = params.thisServerName;
			let port = params.port;

			let methodMap = {};
			let isConnectings = {};
			let waitingSendInfoMap = {};
			let serverSends = {};
			let socketServeOns = [];

			let runMethods = (methodName, data, callback) => {

				try {

					let methods = methodMap[methodName];

					if (methods !== undefined) {

						EACH(methods, (method) => {
							method(data, callback);
						});
					}
				}

				// if catch error
				catch (error) {

					SHOW_ERROR('SERVER_CLUSTERING', error.toString(), {
						methodName: methodName,
						data: data
					});
				}
			};

			let connectToClusteringServer = (serverName) => {

				if (isConnectings[serverName] !== true) {
					isConnectings[serverName] = true;

					if (waitingSendInfoMap[serverName] === undefined) {
						waitingSendInfoMap[serverName] = [];
					}

					CONNECT_TO_SOCKET_SERVER({
						host: hosts[serverName],
						port: port
					}, {
						error: () => {
							delete isConnectings[serverName];
						},

						success: (on, off, send) => {

							send({
								methodName: '__BOOTED',
								data: thisServerName
							});

							serverSends[serverName] = (params, callback) => {
								//REQUIRED: params
								//REQUIRED: params.methodName
								//REQUIRED: params.data

								let methodName = params.methodName;
								let data = params.data;

								send({
									methodName: 'SERVER_CLUSTERING.' + methodName,
									data: data
								}, callback);
							};

							on('__DISCONNECTED', () => {
								delete serverSends[serverName];
								delete isConnectings[serverName];

								SHOW_ERROR('SERVER_CLUSTERING', MSG({
									ko: '클러스터링 서버와의 연결이 끊어졌습니다. (끊어진 서버 이름:' + serverName + ')'
								}));

								connectToClusteringServer(serverName);
							});

							console.log('[SERVER_CLUSTERING] ' + MSG({
								ko: '클러스터링 서버와 연결되었습니다. (연결된 서버 이름:' + serverName + ')'
							}));

							if (CPU_CLUSTERING.broadcast !== undefined) {

								CPU_CLUSTERING.broadcast({
									methodName: '__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER',
									data: serverName
								});
							}

							EACH(waitingSendInfoMap[serverName], (info) => {
								serverSends[serverName]({
									methodName: info.methodName,
									data: info.data
								}, info.callback);
							});

							delete waitingSendInfoMap[serverName];
						}
					});
				}
			};

			if (CPU_CLUSTERING.on !== undefined) {
				CPU_CLUSTERING.on('__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER', connectToClusteringServer);
			}

			// try connect to all clustering hosts.
			EACH(hosts, (host, serverName) => {
				if (serverName !== thisServerName) {
					connectToClusteringServer(serverName);
				}
			});

			SOCKET_SERVER(port, (clientInfo, socketServeOn) => {

				let serverName;

				socketServeOns.push(socketServeOn);

				socketServeOn('__BOOTED', (_serverName) => {

					serverName = _serverName;

					connectToClusteringServer(serverName);
				});

				EACH(methodMap, (methods, methodName) => {
					EACH(methods, (method) => {
						socketServeOn('SERVER_CLUSTERING.' + methodName, method);
					});
				});

				socketServeOn('__DISCONNECTED', () => {

					REMOVE({
						array: socketServeOns,
						value: socketServeOn
					});

					SHOW_ERROR('SERVER_CLUSTERING', MSG({
						ko: '클러스터링 서버와의 연결이 끊어졌습니다. (끊어진 서버 이름:' + serverName + ')'
					}));

					connectToClusteringServer(serverName);
				});
			});

			let getHosts = m.getHosts = () => {
				return hosts;
			};

			let getThisServerName = m.getThisServerName = () => {
				return thisServerName;
			};

			let on = m.on = (methodName, method) => {

				let methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);

				EACH(socketServeOns, (socketServeOn) => {
					socketServeOn('SERVER_CLUSTERING.' + methodName, method);
				});
			};

			// save shared data.
			on('__SHARED_STORE_SAVE', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId: '~',
						methodName: '__SHARED_STORE_SAVE',
						data: params
					}, ret);
				}

				else {
					SHARED_STORE.save(params, ret);
				}
			});

			// update shared data.
			on('__SHARED_STORE_UPDATE', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId: '~',
						methodName: '__SHARED_STORE_UPDATE',
						data: params
					}, ret);
				}

				else {
					SHARED_STORE.update(params, ret);
				}
			});

			// get shared data.
			on('__SHARED_STORE_GET', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId: '~',
						methodName: '__SHARED_STORE_GET',
						data: params
					}, ret);
				}

				else {
					SHARED_STORE.get(params, ret);
				}
			});

			// remove shared data.
			on('__SHARED_STORE_REMOVE', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId: '~',
						methodName: '__SHARED_STORE_REMOVE',
						data: params
					}, ret);
				}

				else {
					SHARED_STORE.remove(params, ret);
				}
			});

			// get all shared data.
			on('__SHARED_STORE_ALL', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId: '~',
						methodName: '__SHARED_STORE_ALL',
						data: params
					}, ret);
				}

				else {
					SHARED_STORE.all(params, ret);
				}
			});

			// count shared data.
			on('__SHARED_STORE_COUNT', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId: '~',
						methodName: '__SHARED_STORE_COUNT',
						data: params
					}, ret);
				}

				else {
					SHARED_STORE.count(params, ret);
				}
			});

			// check exists shared data.
			on('__SHARED_STORE_CHECK_EXISTS', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId: '~',
						methodName: '__SHARED_STORE_CHECK_EXISTS',
						data: params
					}, ret);
				}

				else {
					SHARED_STORE.checkExists(params, ret);
				}
			});

			// clear shared store.
			on('__SHARED_STORE_CLEAR', (storeName, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId: '~',
						methodName: '__SHARED_STORE_CLEAR',
						data: storeName
					}, ret);
				}

				else {
					SHARED_STORE.clear(storeName, ret);
				}
			});

			let off = m.off = (methodName) => {
				delete methodMap[methodName];
			};

			let send = m.send = (params, callback) => {
				//REQUIRED: params
				//REQUIRED: params.serverName
				//REQUIRED: params.methodName
				//REQUIRED: params.data
				//OPTIONAL: callback

				let serverName = params.serverName;
				let methodName = params.methodName;
				let data = params.data;

				if (callback === undefined) {

					if (serverName === thisServerName) {
						runMethods(methodName, data);
					}

					else if (serverSends[serverName] === undefined) {
						if (waitingSendInfoMap[serverName] !== undefined) {
							waitingSendInfoMap[serverName].push({
								methodName: methodName,
								data: data
							});
						} else {
							SHOW_ERROR('SERVER_CLUSTERING', MSG({
								ko: '[' + serverName + ']라는 서버는 존재하지 않습니다.'
							}));
						}
					}

					else {
						serverSends[serverName]({
							methodName: methodName,
							data: data
						});
					}
				}

				else {

					if (serverName === thisServerName) {
						runMethods(methodName, data, callback);
					}

					else if (serverSends[serverName] === undefined) {
						if (waitingSendInfoMap[serverName] !== undefined) {
							waitingSendInfoMap[serverName].push({
								methodName: methodName,
								data: data,
								callback: callback
							});
						} else {
							SHOW_ERROR('SERVER_CLUSTERING', MSG({
								ko: '[' + serverName + ']라는 서버는 존재하지 않습니다.'
							}));
						}
					}

					else {
						serverSends[serverName]({
							methodName: methodName,
							data: data
						}, callback);
					}
				}
			};

			let broadcast = m.broadcast = (params) => {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data

				EACH(serverSends, (serverSend) => {
					serverSend(params);
				});
			};

			if (work !== undefined) {
				work();
			}

			console.log(CONSOLE_BLUE('[SERVER_CLUSTERING] ' + MSG({
				ko: '클러스터링 서버가 실행중입니다. (현재 서버 이름:' + thisServerName + ', 포트:' + port + ')'
			})));
		}
	};
});
