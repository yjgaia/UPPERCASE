/**
 * 클러스터링 공유 저장소를 생성하는 클래스
 */
global.SHARED_STORE = CLASS(function(cls) {
	'use strict';

	var
	// cpu count
	cpuCount = require('os').cpus().length,
	
	// worker ids
	workerIds = {},
	
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
	
	// list.
	list,
	
	// count.
	count,
	
	// clear.
	clear;
	
	cls.getWorkerIdByStoreName = getWorkerIdByStoreName = function(storeName) {
		//REQUIRED: storeName
		
		return workerIds[storeName];
	};
	
	cls.getStorages = getStorages = function() {
		return storages;
	};

	cls.save = save = function(params, remove) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: remove

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
	};
	
	cls.update = update = function(params, remove) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.data.$inc
		//OPTIONAL: params.data.$push
		//OPTIONAL: params.data.$addToSet
		//OPTIONAL: params.data.$pull
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: remove

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
	};

	cls.get = get = function(params) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		
		var
		// store name
		storeName = params.storeName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[storeName];
		
		if (storage !== undefined) {
			return storage[id];
		}
	};

	cls.remove = remove = function(params) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		
		var
		// store name
		storeName = params.storeName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[storeName],
		
		// remove delays
		removeDelays = removeDelayMap[storeName];
		
		if (storage !== undefined) {
			delete storage[id];
		}

		if (removeDelays !== undefined && removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}
	};
	
	cls.list = list = function(storeName) {
		//REQUIRED: storeName
		
		var
		// storage
		storage = storages[storeName];
		
		return storage === undefined ? {} : storage;
	};
	
	cls.count = count = function(storeName) {
		//REQUIRED: storeName
		
		return COUNT_PROPERTIES(list(storeName));
	};
	
	cls.clear = clear = function(storeName) {
		//REQUIRED: storeName
		
		delete storages[storeName];
	};

	return {

		init : function(inner, self, storeName) {
			//REQUIRED: storeName

			var
			// a, b
			a = 0, b = 0,
			
			// server names
			serverNames,
			
			// server name
			serverName,
			
			// worker id
			workerId,
			
			// save.
			save,
			
			// update.
			update,

			// get.
			get,

			// remove.
			remove,
			
			// list.
			list,
			
			// count.
			count,
			
			// clear.
			clear;
			
			REPEAT(storeName.length, function(i) {
				if (i % 2 === 0) {
					a += storeName.charCodeAt(i);
				} else {
					b += storeName.charCodeAt(i);
				}
			});
			
			if (SERVER_CLUSTERING.getHosts !== undefined) {
				
				serverNames = [];
				
				EACH(SERVER_CLUSTERING.getHosts(), function(host, serverName) {
					serverNames.push(serverName);
				});
				
				serverName = serverNames[a % serverNames.length];
			}
			
			workerIds[storeName] = workerId = (b % cpuCount.length) + 1;

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
						methodName : '__SHARED_STORE_UPDATE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					});
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : workerId,
						methodName : '__SHARED_STORE_UPDATE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					});
				}
				
				else {
					
					cls.save({
						storeName : storeName,
						id : id,
						data : data,
						removeAfterSeconds : removeAfterSeconds
					});
				}
			};
			
			self.update = update = function(params, callback) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.data.$inc
				//OPTIONAL: params.data.$push
				//OPTIONAL: params.data.$addToSet
				//OPTIONAL: params.data.$pull
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
					});
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : workerId,
						methodName : '__SHARED_STORE_SAVE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					});
				}
				
				else {
					
					cls.update({
						storeName : storeName,
						id : id,
						data : data,
						removeAfterSeconds : removeAfterSeconds
					});
				}
			};

			self.get = get = function(id, callback) {
				//REQUIRED: id
				//OPTIONAL: callback
				
				return cls.get({
					storeName : storeName,
					id : id
				});
			};

			self.remove = remove = function(id, callback) {
				//REQUIRED: id
				//OPTIONAL: callback

				cls.remove({
					storeName : storeName,
					id : id
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_REMOVE',
						data : {
							storeName : storeName,
							id : id
						}
					});
				}

				if (SERVER_CLUSTERING.broadcast !== undefined) {

					SERVER_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_REMOVE',
						data : {
							storeName : storeName,
							id : id
						}
					});
				}
			};
			
			self.list = list = function(callback) {
				//OPTIONAL: callback
				
				return cls.list(storeName);
			};
			
			self.count = count = function(callback) {
				//OPTIONAL: callback
				
				return cls.count(storeName);
			};
			
			self.clear = clear = function(callback) {
				//OPTIONAL: callback
				
				cls.clear(storeName);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_CLEAR',
						data : storeName
					});
				}

				if (SERVER_CLUSTERING.broadcast !== undefined) {

					SERVER_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_CLEAR',
						data : storeName
					});
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
			
			// list.
			list,
			
			// count.
			count,
			
			// clear.
			clear;

			self.save = save = sharedStore.save;

			self.update = update = sharedStore.update;

			self.get = get = sharedStore.get;

			self.remove = remove = sharedStore.remove;
			
			self.list = list = sharedStore.list;

			self.count = count = sharedStore.count;

			self.clear = clear = sharedStore.clear;
		}
	});
});
