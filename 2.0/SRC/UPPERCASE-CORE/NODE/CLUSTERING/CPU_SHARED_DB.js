/**
 * CPU clustering shared db class
 */
global.CPU_SHARED_DB = CLASS(function(cls) {
	'use strict';

	var
	// storages
	storages = {},

	// remove delay map
	removeDelayMap = {},

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

	cls.save = save = function(params, remove) {
		//REQUIRED: params
		//REQUIRED: params.dbName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: remove

		var
		// db name
		dbName = params.dbName,
		
		// id
		id = params.id,

		// data
		data = params.data,

		// remove after seconds
		removeAfterSeconds = params.removeAfterSeconds,
		
		// storage
		storage = storages[dbName],
		
		// remove delays
		removeDelays = removeDelayMap[dbName];
		
		if (storage === undefined) {
			storage = storages[dbName] = {};
		}

		storage[id] = data;
		
		if (removeDelays === undefined) {
			removeDelays = removeDelayMap[dbName] = {};
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
		//REQUIRED: params.dbName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.data.$inc
		//OPTIONAL: params.data.$push
		//OPTIONAL: params.data.$addToSet
		//OPTIONAL: params.data.$pull
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: remove

		var
		// db name
		dbName = params.dbName,
		
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
		storage = storages[dbName],
		
		// remove delays
		removeDelays = removeDelayMap[dbName],
		
		// saved data
		savedData;
		
		if (storage === undefined) {
			storage = storages[dbName] = {};
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
				removeDelays = removeDelayMap[dbName] = {};
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
		//REQUIRED: params.dbName
		//REQUIRED: params.id
		
		var
		// db name
		dbName = params.dbName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[dbName];
		
		if (storage !== undefined) {
			return storage[id];
		}
	};

	cls.remove = remove = function(params) {
		//REQUIRED: params
		//REQUIRED: params.dbName
		//REQUIRED: params.id
		
		var
		// db name
		dbName = params.dbName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[dbName],
		
		// remove delays
		removeDelays = removeDelayMap[dbName];
		
		if (storage !== undefined) {
			delete storage[id];
		}

		if (removeDelays !== undefined && removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}
	};
	
	cls.list = list = function(dbName) {
		//REQUIRED: dbName
		
		var
		// storage
		storage = storages[dbName];
		
		return storage === undefined ? {} : storage;
	};
	
	cls.count = count = function(dbName) {
		//REQUIRED: dbName
		
		return COUNT_PROPERTIES(list(dbName));
	};
	
	cls.clear = clear = function(dbName) {
		//REQUIRED: dbName
		
		delete storages[dbName];
	};

	return {

		init : function(inner, self, dbName) {
			//REQUIRED: dbName

			var
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

			self.save = save = function(params) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.removeAfterSeconds

				var
				// id
				id = params.id,

				// data
				data = params.data,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds;

				cls.save({
					dbName : dbName,
					id : id,
					data : data,
					removeAfterSeconds : removeAfterSeconds
				}, function() {
					remove(id);
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_DB_SAVE',
						data : {
							dbName : dbName,
							id : id,
							data : data
						}
					});
				}
			};
			
			self.update = update = function(params) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.data.$inc
				//OPTIONAL: params.data.$push
				//OPTIONAL: params.data.$addToSet
				//OPTIONAL: params.data.$pull
				//OPTIONAL: params.removeAfterSeconds

				var
				// id
				id = params.id,

				// data
				data = params.data,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds;

				cls.update({
					dbName : dbName,
					id : id,
					data : data,
					removeAfterSeconds : removeAfterSeconds
				}, function() {
					remove(id);
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_DB_UPDATE',
						data : {
							dbName : dbName,
							id : id,
							data : data
						}
					});
				}
			};

			self.get = get = function(id) {
				//REQUIRED: id
				
				return cls.get({
					dbName : dbName,
					id : id
				});
			};

			self.remove = remove = function(id) {
				//REQUIRED: id

				cls.remove({
					dbName : dbName,
					id : id
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_DB_REMOVE',
						data : {
							dbName : dbName,
							id : id
						}
					});
				}
			};
			
			self.list = list = function() {
				return cls.list(dbName);
			};
			
			self.count = count = function() {
				return cls.count(dbName);
			};
			
			self.clear = clear = function() {
				
				cls.clear(dbName);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_DB_CLEAR',
						data : dbName
					});
				}
			};
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.CPU_SHARED_DB = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// shared db
			sharedDB = CPU_SHARED_DB(box.boxName + '.' + name),

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

			self.save = save = sharedDB.save;

			self.update = update = sharedDB.update;

			self.get = get = sharedDB.get;

			self.remove = remove = sharedDB.remove;
			
			self.list = list = sharedDB.list;

			self.count = count = sharedDB.count;

			self.clear = clear = sharedDB.clear;
		}
	});
});
