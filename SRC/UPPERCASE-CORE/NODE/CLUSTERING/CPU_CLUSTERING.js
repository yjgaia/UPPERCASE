/*
 * CPU clustering work.
 */
global.CPU_CLUSTERING = METHOD(function(m) {
	'use strict';

	var
	//IMPORT: cluster
	cluster = require('cluster'),
	
	// cpu count
	cpuCount = require('os').cpus().length,

	// worker id
	workerId = 1,

	// get worker id.
	getWorkerId;
	
	cluster.schedulingPolicy = cluster.SCHED_RR;

	m.getWorkerId = getWorkerId = function() {
		return workerId;
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
						SHOW_ERROR('[CPU_CLUSTERING] WORKER #' + worker.id + ' died. (' + (signal !== undefined ? signal : code) + '). restarting...');
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

					// run methods.
					runMethods = function(methodName, data) {

						var
						// methods
						methods = methodMap[methodName];

						if (methods !== undefined) {

							EACH(methods, function(method) {

								// run method.
								method(data);
							});
						}
					},

					// on.
					on,

					// off.
					off,

					// broadcast.
					broadcast;

					workerId = cluster.worker.id;

					// receive data.
					process.on('message', function(paramsStr) {

						var
						// params
						params = PARSE_STR(paramsStr);

						if (params !== undefined) {
							runMethods(params.methodName, params.data);
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

					// save shared value.
					on('__SHARED_STORE_SAVE', SHARED_STORE.save);

					// remove shared value.
					on('__SHARED_STORE_REMOVE', SHARED_STORE.remove);

					// clear shared store.
					on('__SHARED_STORE_CLEAR', SHARED_STORE.clear);

					// save cpu shared value.
					on('__CPU_SHARED_STORE_SAVE', CPU_SHARED_STORE.save);

					// remove cpu shared value.
					on('__CPU_SHARED_STORE_REMOVE', CPU_SHARED_STORE.remove);

					// clear cpu shared store.
					on('__CPU_SHARED_STORE_CLEAR', CPU_SHARED_STORE.clear);

					// save shared data.
					on('__SHARED_DB_SAVE', SHARED_DB.save);
					
					// update shared data.
					on('__SHARED_DB_UPDATE', SHARED_DB.update);

					// remove shared data.
					on('__SHARED_DB_REMOVE', SHARED_DB.remove);

					// clear shared db.
					on('__SHARED_DB_CLEAR', SHARED_DB.clear);

					// save cpu shared data.
					on('__CPU_SHARED_DB_SAVE', CPU_SHARED_DB.save);
					
					// update cpu shared data.
					on('__CPU_SHARED_DB_UPDATE', CPU_SHARED_DB.update);

					// remove cpu shared data.
					on('__CPU_SHARED_DB_REMOVE', CPU_SHARED_DB.remove);

					// clear cpu shared db.
					on('__CPU_SHARED_DB_CLEAR', CPU_SHARED_DB.clear);

					m.off = off = function(methodName) {
						delete methodMap[methodName];
					};

					m.broadcast = broadcast = function(params) {
						//REQUIRED: params
						//REQUIRED: params.methodName
						//REQUIRED: params.data

						process.send(STRINGIFY(params));
					};
					
					work();

					console.log(CONSOLE_GREEN('[CPU_CLUSTERING] RUNNING WORKER... (ID:' + workerId + ')'));
				});
			}
		}
	};
});
