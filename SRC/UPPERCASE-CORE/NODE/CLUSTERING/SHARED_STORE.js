/**
 * 클러스터링 공유 저장소를 생성하는 클래스
 */
global.SHARED_STORE = CLASS(function(cls) {
	'use strict';

	var
	// storages
	storages = {},

	// remove delay map
	removeDelayMap = {},
	
	// get worker id by store name.
	getWorkerIdByStoreName,
	
	// get storages.
	getStorages,

	// save.
	save,
	
	// update.
	update,

	// get.
	get,

	// remove.
	remove,
	
	// all.
	all,
	
	// count.
	count,
	
	// check is exists.
	checkIsExists,
	
	// clear.
	clear;
	
	cls.getStorages = getStorages = function() {
		return storages;
	};

	cls.save = save = function(params, callback) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: callback

		var
		// store name
		storeName = params.storeName,
		
		// id
		id = params.id,

		// data
		data = params.data,

		// remove after seconds
		removeAfterSeconds = params.removeAfterSeconds,
		
		// storage
		storage = storages[storeName],
		
		// remove delays
		removeDelays = removeDelayMap[storeName];
		
		if (storage === undefined) {
			storage = storages[storeName] = {};
		}

		storage[id] = data;
		
		if (removeDelays === undefined) {
			removeDelays = removeDelayMap[storeName] = {};
		}

		if (removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}

		if (removeAfterSeconds !== undefined) {
			removeDelays[id] = DELAY(removeAfterSeconds, remove);
		}
		
		if (callback !== undefined) {
			callback(data);
		}
	};
	
	cls.update = update = function(params, callback) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.data.$inc
		//OPTIONAL: params.data.$push
		//OPTIONAL: params.data.$addToSet
		//OPTIONAL: params.data.$pull
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: callback

		var
		// store name
		storeName = params.storeName,
		
		// id
		id = params.id,

		// data
		data = COPY(params.data),
		
		// $inc
		$inc = data.$inc,
		
		// $push
		$push = data.$push,
		
		// $addToSet
		$addToSet = data.$addToSet,
		
		// $pull
		$pull = data.$pull,

		// remove after seconds
		removeAfterSeconds = params.removeAfterSeconds,
		
		// storage
		storage = storages[storeName],
		
		// remove delays
		removeDelays = removeDelayMap[storeName],
		
		// saved data
		savedData;
		
		if (storage === undefined) {
			storage = storages[storeName] = {};
		}
		
		delete data.$inc;
		delete data.$push;
		delete data.$addToSet;
		delete data.$pull;
		
		savedData = storage[id];
		
		if (savedData !== undefined) {
			
			EXTEND({
				origin : savedData,
				extend : data
			});
			
			if ($inc !== undefined) {
				EACH($inc, function(value, name) {
					savedData[name] += value;
				});
			}
			
			if ($push !== undefined) {
				
				EACH($push, function(value, name) {
					
					if (CHECK_IS_ARRAY(savedData[name]) === true) {
						
						if (CHECK_IS_DATA(value) === true) {
							
							if (value.$each !== undefined) {
								
								EACH(value.$each, function(v, i) {
									if (value.$position !== undefined) {
										savedData[name].splice(value.$position + i, 0, v);
									} else {
										savedData[name].push(v);
									}
								});
								
							} else {
								savedData[name].push(value);
							}
							
						} else {
							savedData[name].push(value);
						}
					}
				});
			}
			
			if ($addToSet !== undefined) {
				
				EACH($addToSet, function(value, name) {
					
					if (CHECK_IS_ARRAY(savedData[name]) === true) {
						
						if (CHECK_IS_DATA(value) === true) {
							
							if (value.$each !== undefined) {
								
								EACH(value.$each, function(value) {
									if (CHECK_IS_IN({
										array : savedData[name],
										value : value
									}) !== true) {
										savedData[name].push(value);
									}
								});
								
							} else if (CHECK_IS_IN({
								array : savedData[name],
								value : value
							}) !== true) {
								savedData[name].push(value);
							}
							
						} else if (CHECK_IS_IN({
							array : savedData[name],
							value : value
						}) !== true) {
							savedData[name].push(value);
						}
					}
				});
			}
			
			if ($pull !== undefined) {
				
				EACH($pull, function(value, name) {
					
					if (CHECK_IS_ARRAY(savedData[name]) === true) {
						
						REMOVE({
							array : savedData[name],
							value : value
						});
					}
				});
			}
			
			if (removeDelays === undefined) {
				removeDelays = removeDelayMap[storeName] = {};
			}
	
			if (removeDelays[id] !== undefined) {
				removeDelays[id].remove();
				delete removeDelays[id];
			}
	
			if (removeAfterSeconds !== undefined) {
				removeDelays[id] = DELAY(removeAfterSeconds, remove);
			}
		}
		
		if (callback !== undefined) {
			callback(savedData);
		}
	};

	cls.get = get = function(params, callback) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: callback
		
		var
		// store name
		storeName = params.storeName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[storeName],
		
		// saved data
		savedData;
		
		if (storage !== undefined) {
			savedData = storage[id];
		}
		
		callback(savedData);
	};

	cls.remove = remove = function(params, callback) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//OPTIONAL: callback
		
		var
		// store name
		storeName = params.storeName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[storeName],
		
		// remove delays
		removeDelays = removeDelayMap[storeName],
		
		// orign data
		originData;
		
		if (storage !== undefined) {
			originData = storage[id];
			
			delete storage[id];
		}

		if (removeDelays !== undefined && removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}
		
		if (callback !== undefined) {
			callback(originData);
		}
	};
	
	cls.all = all = function(storeName, callback) {
		//REQUIRED: storeName
		//REQUIRED: callback
		
		var
		// storage
		storage = storages[storeName];
		
		callback(storage === undefined ? {} : storage);
	};
	
	cls.count = count = function(storeName, callback) {
		//REQUIRED: storeName
		//REQUIRED: callback
		
		all(storeName, function(dataSet) {
			callback(COUNT_PROPERTIES(dataSet));
		});
	};

	cls.checkIsExists = checkIsExists = function(params, callback) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: callback
		
		var
		// store name
		storeName = params.storeName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[storeName];
		
		if (storage === undefined) {
			callback(false);
		} else {
			callback(storage[id] !== undefined);
		}
	};
	
	cls.clear = clear = function(storeName, callback) {
		//REQUIRED: storeName
		//OPTIONAL: callback
		
		delete storages[storeName];
		
		if (callback !== undefined) {
			callback();
		}
	};

	return {

		init : function(inner, self, storeName) {
			//REQUIRED: storeName

			var
			// a
			a = 0,
			
			// server names
			serverNames,
			
			// server name
			serverName,
			
			// save.
			save,
			
			// update.
			update,

			// get.
			get,

			// remove.
			remove,
			
			// all.
			all,
			
			// count.
			count,
			
			// check is exists.
			checkIsExists,
			
			// clear.
			clear;
			
			REPEAT(storeName.length, function(i) {
				a += storeName.charCodeAt(i);
			});
			
			if (SERVER_CLUSTERING.getHosts !== undefined) {
				
				serverNames = [];
				
				EACH(SERVER_CLUSTERING.getHosts(), function(host, serverName) {
					serverNames.push(serverName);
				});
				
				serverName = serverNames[a % serverNames.length];
			}

			self.save = save = function(params, callback) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.removeAfterSeconds
				//OPTIONAL: callback

				var
				// id
				id = params.id,

				// data
				data = params.data,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds;
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_SAVE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_SAVE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					}, callback);
				}
				
				else {
					
					cls.save({
						storeName : storeName,
						id : id,
						data : data,
						removeAfterSeconds : removeAfterSeconds
					}, callback);
				}
			};
			
			self.update = update = function(params, callbackOrHandlers) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.data.$inc
				//OPTIONAL: params.data.$push
				//OPTIONAL: params.data.$addToSet
				//OPTIONAL: params.data.$pull
				//OPTIONAL: params.removeAfterSeconds
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success

				var
				// id
				id = params.id,

				// data
				data = params.data,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds,
				
				// not exists handler.
				notExistsHandler,
				
				// callback.
				callback,
				
				// inner callback.
				innerCallback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						notExistsHandler = callbackOrHandlers.notExists;
						callback = callbackOrHandlers.success;
					}
				}
				
				innerCallback = function(savedData) {
					if (savedData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', '수정할 데이터가 존재하지 않습니다.', params);
						}
					} else if (callback !== undefined) {
						callback(savedData);
					}
				};
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_UPDATE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					}, innerCallback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_UPDATE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					}, innerCallback);
				}
				
				else {
					
					cls.update({
						storeName : storeName,
						id : id,
						data : data,
						removeAfterSeconds : removeAfterSeconds
					}, innerCallback);
				}
			};

			self.get = get = function(id, callbackOrHandlers) {
				//REQUIRED: id
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success
				
				var
				// not exists handler.
				notExistsHandler,
				
				// callback.
				callback,
				
				// inner callback.
				innerCallback;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					callback = callbackOrHandlers.success;
				}
				
				innerCallback = function(savedData) {
					if (savedData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', '가져올 데이터가 존재하지 않습니다.', id);
						}
					} else if (callback !== undefined) {
						callback(savedData);
					}
				};
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_GET',
						data : {
							storeName : storeName,
							id : id
						}
					}, innerCallback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_GET',
						data : {
							storeName : storeName,
							id : id
						}
					}, innerCallback);
				}
				
				else {
					
					cls.get({
						storeName : storeName,
						id : id
					}, innerCallback);
				}
			};

			self.remove = remove = function(id, callbackOrHandlers) {
				//REQUIRED: id
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success
				
				var
				// not exists handler.
				notExistsHandler,
				
				// callback.
				callback,
				
				// inner callback.
				innerCallback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						notExistsHandler = callbackOrHandlers.notExists;
						callback = callbackOrHandlers.success;
					}
				}
				
				innerCallback = function(originData) {
					if (originData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', '삭제할 데이터가 존재하지 않습니다.', id);
						}
					} else if (callback !== undefined) {
						callback(originData);
					}
				};

				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_REMOVE',
						data : {
							storeName : storeName,
							id : id
						}
					}, innerCallback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_REMOVE',
						data : {
							storeName : storeName,
							id : id
						}
					}, innerCallback);
				}
				
				else {
					
					cls.remove({
						storeName : storeName,
						id : id
					}, innerCallback);
				}
			};
			
			self.all = all = function(callback) {
				//REQUIRED: callback
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_ALL',
						data : storeName
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_ALL',
						data : storeName
					}, callback);
				}
				
				else {
					cls.all(storeName, callback);
				}
			};
			
			self.count = count = function(callback) {
				//REQUIRED: callback
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_COUNT',
						data : storeName
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_COUNT',
						data : storeName
					}, callback);
				}
				
				else {
					cls.count(storeName, callback);
				}
			};
			
			self.checkIsExists = checkIsExists = function(id, callback) {
				//REQUIRED: id
				//REQUIRED: callback
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_CHECK_IS_EXISTS',
						data : {
							storeName : storeName,
							id : id
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_CHECK_IS_EXISTS',
						data : {
							storeName : storeName,
							id : id
						}
					}, callback);
				}
				
				else {
					cls.checkIsExists({
						storeName : storeName,
						id : id
					}, callback);
				}
			};
			
			self.clear = clear = function(callback) {
				//OPTIONAL: callback
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_CLEAR',
						data : storeName
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_CLEAR',
						data : storeName
					}, callback);
				}
				
				else {
					cls.clear(storeName, callback);
				}
			};
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.SHARED_STORE = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// shared store
			sharedStore = SHARED_STORE(box.boxName + '.' + name),

			// save.
			save,
			
			// update.
			update,

			// get.
			get,

			// remove.
			remove,
			
			// all.
			all,
			
			// count.
			count,
			
			// check is exists.
			checkIsExists,
			
			// clear.
			clear;

			self.save = save = sharedStore.save;

			self.update = update = sharedStore.update;

			self.get = get = sharedStore.get;

			self.remove = remove = sharedStore.remove;
			
			self.all = all = sharedStore.all;

			self.count = count = sharedStore.count;
			
			self.checkIsExists = checkIsExists = sharedStore.checkIsExists;

			self.clear = clear = sharedStore.clear;
		}
	});
});
