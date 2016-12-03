/*
 * CPU 코어 간 클러스터링을 수행합니다.
 */
global.CPU_CLUSTERING = METHOD(function(m) {
	'use strict';

	var
	//IMPORT: cluster
	cluster = require('cluster'),
	
	// cpu count
	cpuCount = require('os').cpus().length,

	// this worker id
	thisWorkerId = 1,

	// get worker id.
	getWorkerId;
	
	cluster.schedulingPolicy = cluster.SCHED_RR;

	m.getWorkerId = getWorkerId = function() {
		return thisWorkerId;
	};

	return {

		run : function(work) {
			//REQUIRED: work

			// when master
			if (cluster.isMaster) {

				RUN(function() {

					var
					// fork.
					fork = function() {

						var
						// new worker
						newWorker = cluster.fork();
						
						// receive data from new worker.
						newWorker.on('message', function(data) {
							
							// send data to all workers except new worker.
							EACH(cluster.workers, function(worker) {
								if (worker !== newWorker) {
									worker.send(data);
								}
							});
						});
					};

					// fork workers.
					REPEAT(cpuCount, function() {
						fork();
					});

					cluster.on('exit', function(worker, code, signal) {
						SHOW_ERROR('CPU_CLUSTERING', '워커 ID:' + worker.id + '가 작동을 중지하였습니다. (코드:' + (signal !== undefined ? signal : code) + '). 재시작합니다.');
						fork();
					});
				});
			}

			// when worker
			else {

				RUN(function() {

					var
					// method map
					methodMap = {},
					
					// send key
					sendKey = 0,

					// run methods.
					runMethods = function(methodName, data, sendKey, fromWorkerId) {
		
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
												workerId : fromWorkerId,
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
							
							SHOW_ERROR('CPU_CLUSTERING', error.toString(), {
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

					thisWorkerId = cluster.worker.id;

					// receive data.
					process.on('message', function(paramsStr) {

						var
						// params
						params = PARSE_STR(paramsStr);
						
						if (params !== undefined && (params.workerId === undefined || params.workerId === thisWorkerId)) {
							runMethods(params.methodName, params.data, params.sendKey, params.fromWorkerId);
						}
					});

					m.on = on = function(methodName, method) {

						var
						// methods
						methods = methodMap[methodName];

						if (methods === undefined) {
							methods = methodMap[methodName] = [];
						}

						methods.push(method);
					};

					// save shared data.
					on('__SHARED_STORE_SAVE', SHARED_STORE.save);
					
					// update shared data.
					on('__SHARED_STORE_UPDATE', SHARED_STORE.update);

					// get shared data.
					on('__SHARED_STORE_GET', SHARED_STORE.get);

					// remove shared data.
					on('__SHARED_STORE_REMOVE', SHARED_STORE.remove);
					
					// get all shared data.
					on('__SHARED_STORE_ALL', SHARED_STORE.all);
					
					// count shared data.
					on('__SHARED_STORE_COUNT', SHARED_STORE.count);

					// clear shared store.
					on('__SHARED_STORE_CLEAR', SHARED_STORE.clear);

					m.off = off = function(methodName) {
						delete methodMap[methodName];
					};

					m.send = send = function(params, callback) {
						//REQUIRED: params
						//REQUIRED: params.workerId
						//REQUIRED: params.methodName
						//REQUIRED: params.data
						//OPTIONAL: callback
						
						var
						// worker id
						workerId = params.workerId,
						
						// method name
						methodName = params.methodName,
						
						// data
						data = params.data,
						
						// callback name
						callbackName;
						
						if (callback === undefined) {
							
							if (workerId === thisWorkerId) {
								runMethods(methodName, data);
							} else {
								process.send(STRINGIFY({
									workerId : workerId,
									methodName : methodName,
									data : data
								}));
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
							
							if (workerId === thisWorkerId) {
								runMethods(methodName, data, sendKey - 1, thisWorkerId);
							} else {
								process.send(STRINGIFY({
									workerId : workerId,
									methodName : methodName,
									data : data,
									sendKey : sendKey - 1,
									fromWorkerId : thisWorkerId
								}));
							}
						}
					};

					m.broadcast = broadcast = function(params) {
						//REQUIRED: params
						//REQUIRED: params.methodName
						//REQUIRED: params.data

						process.send(STRINGIFY(params));
					};
					
					work();

					console.log('[CPU_CLUSTERING] 클러스터링 워커가 실행중입니다. (워커 ID:' + thisWorkerId + ')');
				});
			}
		}
	};
});
