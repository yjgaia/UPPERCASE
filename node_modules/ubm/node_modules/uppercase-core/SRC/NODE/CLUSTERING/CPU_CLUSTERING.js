/*
 * CPU 코어 간 클러스터링을 수행합니다.
 */
global.CPU_CLUSTERING = METHOD((m) => {
	
	const CPU_COUNT = require('os').cpus().length;

	let Cluster = require('cluster');
	
	// 클러스터링을 수행하지 않을 경우 기본적으로 1개
	let workerCount = 1;
	
	// 클러스터링을 수행하지 않을 경우 기본적으로 1
	let thisWorkerId = 1;
	
	Cluster.schedulingPolicy = Cluster.SCHED_RR;
	
	let getWorkerCount = m.getWorkerCount = () => {
		return workerCount;
	};

	let getWorkerId = m.getWorkerId = () => {
		return thisWorkerId;
	};

	let checkIsMaster = m.checkIsMaster = () => {
		return Cluster.isMaster;
	};

	return {

		run : (work) => {
			//REQUIRED: work
			
			if (CPU_COUNT <= 1) {
				work();
			}
			
			else {
				
				let methodMap = {};
				let sendKey = 0;
				
				let innerSend;
	
				let runMethods = (methodName, data, sendKey, fromWorkerId) => {
					
					try {
						
						let methods = methodMap[methodName];
	
						if (methods !== undefined) {
		
							EACH(methods, (method) => {
		
								// run method.
								method(data,
		
								// ret.
								(retData) => {
		
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
				};
				
				// 워커 개수 (CPU 코어 개수보다 하나 적음, 하나는 마스터에게 배분)
				workerCount = CPU_COUNT - 1;
				
				// CPU 개수가 2개일 땐 워커 개수도 2개
				if (CPU_COUNT === 2) {
					workerCount = 2;
				}
				
				// 최소한 한개의 워커는 필요
				if (workerCount < 1) {
					workerCount = 1;
				}
				
				let on = m.on = (methodName, method) => {
	
					let methods = methodMap[methodName];
	
					if (methods === undefined) {
						methods = methodMap[methodName] = [];
					}
	
					methods.push(method);
				};
				
				let off = m.off = (methodName) => {
					delete methodMap[methodName];
				};
	
				let send = m.send = (params, callback) => {
					//REQUIRED: params
					//REQUIRED: params.workerId
					//REQUIRED: params.methodName
					//REQUIRED: params.data
					//OPTIONAL: callback
					
					let workerId = params.workerId;
					let methodName = params.methodName;
					let data = params.data;
					
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
						
						let callbackName = '__CALLBACK_' + sendKey;
						
						// on callback.
						on(callbackName, (data) => {
	
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
				
				let broadcast = m.broadcast = (params) => {
					//REQUIRED: params
					//REQUIRED: params.methodName
					//REQUIRED: params.data
	
					innerSend({
						methodName : params.methodName,
						data : params.data
					});
				};
	
				// when master
				if (Cluster.isMaster === true) {
					
					// 마스터용 아이디
					thisWorkerId = '~';
					
					innerSend = (params) => {
						//REQUIRED: params
						//OPTIONAL: params.workerId
						//REQUIRED: params.methodName
						//REQUIRED: params.data
						//OPTIONAL: params.sendKey
						//OPTIONAL: params.fromWorkerId
						
						// send.
						if (params.workerId !== undefined) {
							
							let worker = Cluster.workers[params.workerId];
							
							if (worker !== undefined) {
								worker.send(PACK_DATA(params));
							}
						}
						
						// broadcast.
						else {
							
							// send params to all workers except new worker.
							EACH(Cluster.workers, (worker) => {
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
					
					// check exists shared data.
					on('__SHARED_STORE_CHECK_EXISTS', SHARED_STORE.checkExists);
	
					// clear shared store.
					on('__SHARED_STORE_CLEAR', SHARED_STORE.clear);
					
					// 워커 생성
					REPEAT(workerCount, () => {
						
						let newWorker = Cluster.fork();
						
						// receive params from new worker.
						newWorker.on('message', (params) => {
							
							// send.
							if (params.workerId !== undefined) {
								
								// for master
								if (params.workerId === '~') {
									
									params = UNPACK_DATA(params);
									
									runMethods(params.methodName, params.data, params.sendKey, params.fromWorkerId);
								}
								
								else {
									
									let worker = Cluster.workers[params.workerId];
									
									if (worker !== undefined) {
										worker.send(params);
									}
								}
							}
							
							// broadcast.
							else {
								
								// send params to all workers except new worker.
								EACH(Cluster.workers, (worker) => {
									if (worker !== newWorker) {
										worker.send(params);
									}
								});
							}
						});
					});
	
					Cluster.on('exit', (worker, code, signal) => {
						
						SHOW_ERROR('CPU_CLUSTERING', MSG({
							ko : '워커 ID:' + worker.id + '가 작동을 중지하였습니다. (코드:' + (signal !== undefined ? signal : code) + ')'
						}));
					});
				}
	
				// when worker
				else {
					
					thisWorkerId = Cluster.worker.id;
					
					innerSend = (params) => {
						//REQUIRED: params
						//OPTIONAL: params.workerId
						//REQUIRED: params.methodName
						//REQUIRED: params.data
						//OPTIONAL: params.sendKey
						//OPTIONAL: params.fromWorkerId
						
						process.send(PACK_DATA(params));
					};
					
					// receive data.
					process.on('message', (params) => {
						
						params = UNPACK_DATA(params);
						
						runMethods(params.methodName, params.data, params.sendKey, params.fromWorkerId);
					});
					
					work();
	
					console.log('[CPU_CLUSTERING] ' + MSG({
						ko : '클러스터링 워커가 실행중입니다. (PID: ' + process.pid + ' / 워커 ID:' + thisWorkerId + ')'
					}));
				}
			}
		}
	};
});
