/*
 * CPU 코어 간 클러스터링을 수행합니다.
 */
global.CPU_CLUSTERING = METHOD(function(m) {
	'use strict';

	var
	//IMPORT: cluster
	cluster = require('cluster'),
	
	// worker count (클러스터링을 수행하지 않을 경우 기본적으로 1개)
	workerCount = 1,
	
	// this worker id (클러스터링을 수행하지 않을 경우 기본적으로 1)
	thisWorkerId = 1,

	// get worker id.
	getWorkerId,
	
	// get worker count.
	getWorkerCount;
	
	cluster.schedulingPolicy = cluster.SCHED_RR;

	m.getWorkerId = getWorkerId = function() {
		return thisWorkerId;
	};
	
	m.getWorkerCount = getWorkerCount = function() {
		return workerCount;
	};

	return {

		run : function(work) {
			//REQUIRED: work
			
			var
			// inner send.
			innerSend,
			
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
			
			// 워커 개수 (CPU 개수보다 하나 적음, 하나는 마스터에게 배분)
			workerCount = require('os').cpus().length - 1;
			
			// 최소한 한개의 워커는 필요
			if (workerCount < 1) {
				workerCount = 1;
			}
			
			m.on = on = function(methodName, method) {

				var
				// methods
				methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			};
			
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
						innerSend({
							workerId : workerId,
							methodName : methodName,
							data : data
						});
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
						innerSend({
							workerId : workerId,
							methodName : methodName,
							data : data,
							sendKey : sendKey - 1,
							fromWorkerId : thisWorkerId
						});
					}
				}
			};
			
			m.broadcast = broadcast = function(params) {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data

				innerSend({
					methodName : params.methodName,
					data : params.data
				});
			};

			// when master
			if (cluster.isMaster) {
				
				// 마스터용 아이디
				thisWorkerId = '~';
				
				innerSend = function(params) {
					//REQUIRED: params
					//OPTIONAL: params.workerId
					//REQUIRED: params.methodName
					//REQUIRED: params.data
					//OPTIONAL: params.sendKey
					//OPTIONAL: params.fromWorkerId
					
					var
					// worker
					worker;
					
					// send.
					if (params.workerId !== undefined) {
						
						worker = cluster.workers[params.workerId];
						
						if (worker !== undefined) {
							worker.send(PACK_DATA(params));
						}
					}
					
					// broadcast.
					else {
						
						// send params to all workers except new worker.
						EACH(cluster.workers, function(worker) {
							worker.send(PACK_DATA(params));
						});
					}
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
				
				// check is exists shared data.
				on('__SHARED_STORE_CHECK_IS_EXISTS', SHARED_STORE.checkIsExists);

				// clear shared store.
				on('__SHARED_STORE_CLEAR', SHARED_STORE.clear);
				
				RUN(function() {

					var
					// fork.
					fork = function() {

						var
						// new worker
						newWorker = cluster.fork();
						
						// receive params from new worker.
						newWorker.on('message', function(params) {
							
							var
							// worker
							worker;
							
							// send.
							if (params.workerId !== undefined) {
								
								// for master
								if (params.workerId === '~') {
									
									params = UNPACK_DATA(params);
									
									runMethods(params.methodName, params.data, params.sendKey, params.fromWorkerId);
								}
								
								else {
									
									worker = cluster.workers[params.workerId];
									
									if (worker !== undefined) {
										worker.send(params);
									}
								}
							}
							
							// broadcast.
							else {
								
								// send params to all workers except new worker.
								EACH(cluster.workers, function(worker) {
									if (worker !== newWorker) {
										worker.send(params);
									}
								});
							}
						});
					};

					// 워커 생성
					REPEAT(workerCount, function() {
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
				
				thisWorkerId = cluster.worker.id;
				
				innerSend = function(params) {
					//REQUIRED: params
					//OPTIONAL: params.workerId
					//REQUIRED: params.methodName
					//REQUIRED: params.data
					//OPTIONAL: params.sendKey
					//OPTIONAL: params.fromWorkerId
					
					process.send(PACK_DATA(params));
				};
				
				// receive data.
				process.on('message', function(params) {
					
					params = UNPACK_DATA(params);
					
					runMethods(params.methodName, params.data, params.sendKey, params.fromWorkerId);
				});
				
				work();

				console.log('[CPU_CLUSTERING] 클러스터링 워커가 실행중입니다. (워커 ID:' + thisWorkerId + ')');
			}
		}
	};
});
