/*
 * 클러스터링 공유 저장소를 생성하는 클래스
 */
global.SHARED_STORE = CLASS((cls) => {
	
	let Sift = require('sift').default;

	let storages = {};
	let removeDelayMap = {};
	
	let getStorages = cls.getStorages = () => {
		return storages;
	};

	let save = cls.save = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: callback

		let storeName = params.storeName;
		let id = params.id;
		let data = params.data;
		let removeAfterSeconds = params.removeAfterSeconds;
		
		let storage = storages[storeName];
		let removeDelays = removeDelayMap[storeName];
		
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
			removeDelays[id] = DELAY(removeAfterSeconds, () => {
				remove({
					storeName : storeName,
					id : id
				});
			});
		}
		
		if (callback !== undefined) {
			callback(data);
		}
	};
	
	let update = cls.update = (params, callback) => {
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

		let storeName = params.storeName;
		let id = params.id;
		let data = COPY(params.data);
		let $inc = data.$inc;
		let $push = data.$push;
		let $addToSet = data.$addToSet;
		let $pull = data.$pull;
		let removeAfterSeconds = params.removeAfterSeconds;
		
		let storage = storages[storeName];
		let removeDelays = removeDelayMap[storeName];
		let savedData;
		
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
			
			EACH(data, (value, name) => {
				if (value === TO_DELETE) {
					delete savedData[name];
				}
			});
			
			if ($inc !== undefined) {
				EACH($inc, (value, name) => {
					savedData[name] += value;
				});
			}
			
			if ($push !== undefined) {
				
				EACH($push, (value, name) => {
					
					if (CHECK_IS_ARRAY(savedData[name]) === true) {
						
						if (CHECK_IS_DATA(value) === true) {
							
							if (value.$each !== undefined) {
								
								EACH(value.$each, (v, i) => {
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
				
				EACH($addToSet, (value, name) => {
					
					if (CHECK_IS_ARRAY(savedData[name]) === true) {
						
						if (CHECK_IS_DATA(value) === true) {
							
							if (value.$each !== undefined) {
								
								EACH(value.$each, (value) => {
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
				
				EACH($pull, (value, name) => {
					
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
				removeDelays[id] = DELAY(removeAfterSeconds, () => {
					remove({
						storeName : storeName,
						id : id
					});
				});
			}
		}
		
		if (callback !== undefined) {
			callback(savedData);
		}
	};

	let get = cls.get = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: callback
		
		let storeName = params.storeName;
		let id = params.id;
		let storage = storages[storeName];
		
		let savedData;
		
		if (storage !== undefined) {
			savedData = storage[id];
		}
		
		callback(savedData);
	};

	let remove = cls.remove = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//OPTIONAL: callback
		
		let storeName = params.storeName;
		let id = params.id;
		
		let storage = storages[storeName];
		let removeDelays = removeDelayMap[storeName];
		
		let originData;
		
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
	
	let all = cls.all = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//OPTIONAL: params.filter
		//REQUIRED: callback
		
		let storeName = params.storeName;
		let filter = params.filter;
		
		let storage = storages[storeName];
		
		if (storage === undefined) {
			callback({});
		}
		
		else if (filter === undefined) {
			callback(storage);
		}
		
		else {
			
			let result = {};
			
			EACH(storage, (data, id) => {
				if (Sift(filter)(data) === true) {
					result[id] = data;
				}
			});
			
			callback(result);
		}
	};
	
	let count = cls.count = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//OPTIONAL: params.filter
		//REQUIRED: callback
		
		all(params, (dataSet) => {
			callback(COUNT_PROPERTIES(dataSet));
		});
	};

	let checkExists = cls.checkExists = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//OPTIONAL: params.id
		//OPTIONAL: params.filter
		//REQUIRED: callback
		
		let storeName = params.storeName;
		let id = params.id;
		let filter = params.filter;
		
		let storage = storages[storeName];
		
		if (storage === undefined) {
			callback(false);
		}
		
		else if (id !== undefined) {
			callback(storage[id] !== undefined);
		}
		
		else if (filter !== undefined) {
			
			// 중간에 멈추면, 해당하는 값이 존재한다.
			callback(EACH(storage, (data) => {
				if (Sift(filter)(data) === true) {
					return false;
				}
			}) !== true);
		}
		
		else {
			callback(false);
		}
	};
	
	let clear = cls.clear = (storeName, callback) => {
		//REQUIRED: storeName
		//OPTIONAL: callback
		
		delete storages[storeName];
		
		if (callback !== undefined) {
			callback();
		}
	};

	return {

		init : (inner, self, storeName) => {
			//REQUIRED: storeName
			
			let serverName;
			
			let a = 0;
			
			REPEAT(storeName.length, (i) => {
				a += storeName.charCodeAt(i);
			});
			
			if (SERVER_CLUSTERING.getHosts !== undefined) {
				
				let serverNames = [];
				
				EACH(SERVER_CLUSTERING.getHosts(), (host, serverName) => {
					serverNames.push(serverName);
				});
				
				serverName = serverNames[a % serverNames.length];
			}

			let save = self.save = (params, callback) => {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.removeAfterSeconds
				//OPTIONAL: callback

				let id = params.id;
				let data = params.data;
				let removeAfterSeconds = params.removeAfterSeconds;
				
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
			
			let update = self.update = (params, callbackOrHandlers) => {
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

				let id = params.id;
				let data = params.data;
				let removeAfterSeconds = params.removeAfterSeconds;
				
				let notExistsHandler;
				let callback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						notExistsHandler = callbackOrHandlers.notExists;
						callback = callbackOrHandlers.success;
					}
				}
				
				let innerCallback = (savedData) => {
					if (savedData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', MSG({
								ko : '수정할 데이터가 존재하지 않습니다.'
							}), params);
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

			let get = self.get = (id, callbackOrHandlers) => {
				//REQUIRED: id
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success
				
				let notExistsHandler;
				let callback;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					callback = callbackOrHandlers.success;
				}
				
				let innerCallback = (savedData) => {
					if (savedData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', MSG({
								ko : '가져올 데이터가 존재하지 않습니다.'
							}), id);
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

			let remove = self.remove = (id, callbackOrHandlers) => {
				//REQUIRED: id
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success
				
				let notExistsHandler;
				let callback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						notExistsHandler = callbackOrHandlers.notExists;
						callback = callbackOrHandlers.success;
					}
				}
				
				let innerCallback = (originData) => {
					if (originData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', MSG({
								ko : '삭제할 데이터가 존재하지 않습니다.'
							}), id);
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
			
			let all = self.all = (filter, callback) => {
				//OPTIONAL: filter
				//REQUIRED: callback
				
				if (callback === undefined) {
					callback = filter;
					filter = undefined;
				}
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_ALL',
						data : {
							storeName : storeName,
							filter : filter
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_ALL',
						data : {
							storeName : storeName,
							filter : filter
						}
					}, callback);
				}
				
				else {
					cls.all({
						storeName : storeName,
						filter : filter
					}, callback);
				}
			};
			
			let count = self.count = (filter, callback) => {
				//OPTIONAL: filter
				//REQUIRED: callback
				
				if (callback === undefined) {
					callback = filter;
					filter = undefined;
				}
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_COUNT',
						data : {
							storeName : storeName,
							filter : filter
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_COUNT',
						data : {
							storeName : storeName,
							filter : filter
						}
					}, callback);
				}
				
				else {
					cls.count({
						storeName : storeName,
						filter : filter
					}, callback);
				}
			};
			
			let checkExists = self.checkExists = (idOrFilter, callback) => {
				//REQUIRED: idOrFilter
				//REQUIRED: callback
				
				let id;
				let filter;
				
				if (CHECK_IS_DATA(idOrFilter) !== true) {
					id = idOrFilter;
				} else {
					filter = idOrFilter;
				}
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_CHECK_EXISTS',
						data : {
							storeName : storeName,
							id : id,
							filter : filter
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_CHECK_EXISTS',
						data : {
							storeName : storeName,
							id : id,
							filter : filter
						}
					}, callback);
				}
				
				else {
					cls.checkExists({
						storeName : storeName,
						id : id,
						filter : filter
					}, callback);
				}
			};
			
			let clear = self.clear = (callback) => {
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

FOR_BOX((box) => {

	box.SHARED_STORE = CLASS({

		init : (inner, self, name) => {
			//REQUIRED: name

			let sharedStore = SHARED_STORE(box.boxName + '.' + name);

			let save = self.save = sharedStore.save;
			
			let update = self.update = sharedStore.update;
			
			let get = self.get = sharedStore.get;
			
			let remove = self.remove = sharedStore.remove;
			
			let all = self.all = sharedStore.all;
			
			let count = self.count = sharedStore.count;
			
			let checkExists = self.checkExists = sharedStore.checkExists;
			
			let clear = self.clear = sharedStore.clear;
		}
	});
});
