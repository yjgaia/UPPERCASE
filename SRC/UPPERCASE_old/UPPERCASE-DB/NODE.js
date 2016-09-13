/*

Welcome to UPPERCASE! (http://uppercase.io)

*/

/**
 * connect to MongoDB server.
 */
global.CONNECT_TO_DB_SERVER = METHOD(function(m) {
	'use strict';

	var
	// DEFAULT_DB_SERVER_NAME
	DEFAULT_DB_SERVER_NAME = '__',
	
	// native dbs
	nativeDBs = {},

	// init db func map
	initDBFuncMap = {},

	// add init db func.
	addInitDBFunc;

	m.addInitDBFunc = addInitDBFunc = function(dbServerName, initDBFunc) {
		//OPTIONAL: dbServerName
		//REQUIRED: initDBFunc
		
		if (initDBFunc === undefined) {
			initDBFunc = dbServerName;
			dbServerName = undefined;
		}
		
		if (dbServerName === undefined) {
			dbServerName = DEFAULT_DB_SERVER_NAME;
		}

		if (nativeDBs[dbServerName] === undefined) {
			
			if (initDBFuncMap[dbServerName] === undefined) {
				initDBFuncMap[dbServerName] = [];
			}
			
			initDBFuncMap[dbServerName].push(initDBFunc);
			
		} else {
			initDBFunc(nativeDBs[dbServerName]);
		}
	};

	return {

		run : function(params, callback) {
			//REQUIRED: params
			//OPTIONAL: params.dbServerName
			//OPTIONAL: params.username
			//OPTIONAL: params.password
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.name
			//OPTIONAL: callback

			var
			// db server name
			dbServerName = params.dbServerName === undefined ? DEFAULT_DB_SERVER_NAME : params.dbServerName,
			
			// username
			username = params.username,

			// password
			password = params.password,

			// host
			host = params.host === undefined ? '127.0.0.1' : params.host,

			// port
			port = params.port === undefined ? 27017 : params.port,

			// name
			name = params.name;

			require('mongodb').MongoClient.connect('mongodb://' + (username !== undefined && password !== undefined ? username + ':' + password.replace(/@/g, '%40') + '@' : '') + host + ':' + port + '/' + name, function(error, nativeDB) {

				if (error !== TO_DELETE) {

					SHOW_ERROR('[UPPERCASE-DB] CONNECT TO DB SERVER FAILED: ' + error.toString());

				} else {

					nativeDBs[dbServerName] = nativeDB;

					if (initDBFuncMap[dbServerName] !== undefined) {
						
						EACH(initDBFuncMap[dbServerName], function(initDBFunc) {
							initDBFunc(nativeDB);
						});
						
						delete initDBFuncMap[dbServerName];
					}

					if (callback !== undefined) {
						callback();
					}
				}
			});
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	var
	//IMPORT: MongoDB ObjectID
	ObjectID = require('mongodb').ObjectID,
	
	//IMPORT: sift.js
	sift = require('sift');

	/**
	 * MongoDB collection wrapper class
	 */
	box.DB = CLASS(function(cls) {
		
		var
		// remove empty values.
		removeEmptyValues;
		
		cls.removeEmptyValues = removeEmptyValues = function(data) {
			//REQUIRED: data

			EACH(data, function(value, name) {

				if (value === undefined || value === TO_DELETE) {

					REMOVE({
						data : data,
						name : name
					});

				} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {

					removeEmptyValues(value);
				}
			});
		};
		
		return {

			init : function(inner, self, nameOrParams) {
				//REQUIRED: nameOrParams
				//OPTIONAL: nameOrParams.dbServerName
				//REQUIRED: nameOrParams.name
				//OPTIONAL: nameOrParams.isNotUsingObjectId
				//OPTIONAL: nameOrParams.isNotUsingHistory
	
				var
				// name
				name,
				
				// db server name
				dbServerName,
				
				// is not using object id
				isNotUsingObjectId,
				
				// is not using history
				isNotUsingHistory,
	
				// waiting create infos
				waitingCreateInfos = [],
	
				// waiting get infos
				waitingGetInfos = [],
	
				// waiting update infos
				waitingUpdateInfos = [],
	
				// waiting remove infos
				waitingRemoveInfos = [],
	
				// waiting find infos
				waitingFindInfos = [],
	
				// waiting count infos
				waitingCountInfos = [],
	
				// waiting check is exists infos
				waitingCheckIsExistsInfos = [],
	
				// waiting aggregate infos
				waitingAggregateInfos = [],
	
				// waiting create index infos
				waitingCreateIndexInfos = [],
	
				// waiting remove index infos
				waitingRemoveIndexInfos = [],
				
				// waiting find all indexes infos
				waitingFindAllIndexesInfos = [],
	
				// generate _id.
				gen_id = function(id) {
					//REQUIRED: id
					
					if (isNotUsingObjectId === true) {
						return id;
					} else {
						return VALID.id(id) === true ? new ObjectID(id) : -1;
					}
				},
	
				// clean data.
				cleanData = function(data) {
					//REQUIRED: data
	
					// convert _id (object) to id (string).
					if (data._id !== undefined) {
						data.id = data._id.toString();
					}
	
					// delete _id.
					delete data._id;
	
					// delete __RANDOM_KEY.
					delete data.__RANDOM_KEY;
				},
	
				// make up filter.
				makeUpFilter = function(filter) {
	
					var
					// f.
					f = function(filter) {
	
						if (filter.id !== undefined) {
	
							if (CHECK_IS_DATA(filter.id) === true) {
	
								EACH(filter.id, function(values, i) {
									if (CHECK_IS_DATA(values) === true || CHECK_IS_ARRAY(values) === true) {
										EACH(values, function(value, j) {
											values[j] = gen_id(value);
										});
									} else {
										filter.id[i] = gen_id(values);
									}
								});
	
								filter._id = filter.id;
	
							} else {
								filter._id = gen_id(filter.id);
							}
							delete filter.id;
						}
	
						EACH(filter, function(value, name) {
							if (value === undefined) {
								delete filter[name];
							}
						});
					};
	
					if (filter.$and !== undefined) {
	
						EACH(filter.$and, function(filter) {
							f(filter);
						});
	
					} else if (filter.$or !== undefined) {
	
						EACH(filter.$or, function(filter) {
							f(filter);
						});
	
					} else {
						f(filter);
					}
				},
	
				// clean filter.
				cleanFilter = function(filter) {
	
					var
					// cleaned filter
					cleanedFilter = {},
					
					// f.
					f = function(cleanedFilter, filter) {
	
						if (filter._id !== undefined) {
							
							if (filter._id instanceof ObjectID === true) {
								cleanedFilter.id = filter._id.toString();
							} else if (CHECK_IS_DATA(filter.id) === true) {
								
								cleanedFilter.id = {};
	
								EACH(filter._id, function(values, i) {
									
									if (CHECK_IS_DATA(values) === true) {
										
										cleanedFilter.id[i] = {};
										
										EACH(values, function(value, j) {
											cleanedFilter.id[i][j] = value.toString();
										});
										
									} else if (CHECK_IS_ARRAY(values) === true) {
										
										cleanedFilter.id[i] = [];
										
										EACH(values, function(value) {
											cleanedFilter.id[i].push(value.toString());
										});
										
									} else {
										cleanedFilter.id[i] = values.toString();
									}
								});
								
							} else {
								cleanedFilter.id = filter._id;
							}
						}
						
						EACH(filter, function(value, name) {
							if (name !== '_id') {
								cleanedFilter[name] = value;
							}
						});
					};
	
					if (filter.$and !== undefined) {
						
						cleanedFilter.$and = [];
	
						EACH(filter.$and, function(filter) {
							
							var
							// sub cleaned filter
							subCleanedFilter = {};
							
							cleanedFilter.$and.push(subCleanedFilter);
							
							f(subCleanedFilter, filter);
						});
	
					} else if (filter.$or !== undefined) {
	
						cleanedFilter.$or = [];
	
						EACH(filter.$or, function(filter) {
							
							var
							// sub cleaned filter
							subCleanedFilter = {};
							
							cleanedFilter.$or.push(subCleanedFilter);
							
							f(subCleanedFilter, filter);
						});
	
					} else {
						f(cleanedFilter, filter);
					}
					
					return cleanedFilter;
				},
	
				// create data.
				// if success, callback saved data.
				// if error, run error handler.
				create,
	
				// get data.
				// if success, callback saved data.
				// if not exists, callback undefined.
				// if error, run error handler.
				get,
	
				// update data.
				// if success, callback saved data.
				// if not exists, callback undefined.
				// if error, run error handler.
				update,
				
				// update data, but not save history
				// if success, callback saved data.
				// if not exists, callback undefined.
				// if error, run error handler.
				updateNoHistory,
				
				// update data, but not save record
				// if success, callback saved data.
				// if not exists, callback undefined.
				// if error, run error handler.
				updateNoRecord,
	
				// remove data.
				// if success, callback saved data.
				// if not exists, callback undefined.
				// if error, run error handler.
				remove,
	
				// find data set.
				// if success, callback saved data set.
				// if error, run error handler.
				find,
	
				// count data set.
				// if success, callback count.
				// if error, run error handler.
				count,
	
				// check is exists.
				// if success, callback true or false.
				// if error, run error handler.
				checkIsExists,
	
				// aggregate.
				aggregate,
				
				// create index.
				createIndex,
				
				// remove index.
				removeIndex,
				
				// find all indexes
				findAllIndexes;
	
				if (CHECK_IS_DATA(nameOrParams) !== true) {
					name = nameOrParams;
				} else {
					name = nameOrParams.name;
					dbServerName = nameOrParams.dbServerName;
					isNotUsingObjectId = nameOrParams.isNotUsingObjectId;
					isNotUsingHistory = nameOrParams.isNotUsingHistory;
				}
	
				self.create = create = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingCreateInfos.push({
						data : data,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				self.get = get = function(idOrParams, callbackOrHandlers) {
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.isToCache
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
	
					waitingGetInfos.push({
						idOrParams : idOrParams,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				self.update = update = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: data.$inc
					//OPTIONAL: data.$push
					//OPTIONAL: data.$addToSet
					//OPTIONAL: data.$pull
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
	
					waitingUpdateInfos.push({
						data : data,
						callbackOrHandlers : callbackOrHandlers
					});
				};
				
				self.updateNoHistory = updateNoHistory = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: data.$inc
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
	
					waitingUpdateInfos.push({
						data : data,
						callbackOrHandlers : callbackOrHandlers,
						isNotToSaveHistory : true
					});
				};
				
				self.remove = remove = function(id, callbackOrHandlers) {
					//REQUIRED: id
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
	
					waitingRemoveInfos.push({
						id : id,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				self.find = find = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//OPTIONAL: params.isToCache
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingFindInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				self.count = count = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingCountInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				self.checkIsExists = checkIsExists = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingCheckIsExistsInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				self.aggregate = aggregate = function(params, callbackOrHandlers) {
					//REQUIRED: params
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingAggregateInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
				
				self.createIndex = createIndex = function(keys, callbackOrHandlers) {
					//REQUIRED: keys
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
					
					waitingCreateIndexInfos.push({
						keys : keys,
						callbackOrHandlers : callbackOrHandlers
					});
				};
				
				self.removeIndex = removeIndex = function(index, callbackOrHandlers) {
					//REQUIRED: index
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
					
					waitingRemoveIndexInfos.push({
						index : index,
						callbackOrHandlers : callbackOrHandlers
					});
				};
				
				self.findAllIndexes = findAllIndexes = function(callbackOrHandlers) {
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
					
					waitingFindAllIndexesInfos.push({
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				CONNECT_TO_DB_SERVER.addInitDBFunc(dbServerName, function(nativeDB) {
					
					var
					// MongoDB collection
					collection = nativeDB.collection(box.boxName + '.' + name),
	
					// MongoDB collection for history
					historyCollection,
	
					// MongoDB collection for error log
					errorLogCollection,
				
					// cached get db
					cachedGetDB = box.SHARED_DB(box.boxName + '.' + name + '.cachedGetDB'),
					
					// cached find db
					cachedFindDB = box.SHARED_DB(box.boxName + '.' + name + '.cachedFindDB'),
					
					// cached count db
					cachedCountDB = box.SHARED_DB(box.boxName + '.' + name + '.cachedCountDB'),
					
					// add history.
					addHistory = function(method, id, change, time) {
						//REQUIRED: method
						//REQUIRED: id
						//OPTIONAL: change
						//REQUIRED: time
						
						var
						// history data
						historyData = {
							docId : id,
							method : method,
							time : time
						};
						
						if (change !== undefined) {
							historyData.change = change;
						}
						
						if (historyCollection === undefined) {
							
							historyCollection = nativeDB.collection(box.boxName + '.' + name + '__HISTORY');
							
							// create history index.
							historyCollection.createIndex({
								docId : 1
							});
						}
	
						historyCollection.insertOne(historyData);
	
						if (NODE_CONFIG.isDBLogMode === true) {
							
							if (method === 'remove') {
								console.log('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` DATA(' + id + ') REMOVED.');
							} else {
								console.log('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` DATA(' + id + ') SAVED:', change);
							}
						}
					},
	
					// log error.
					logError = function(errorInfo, errorHandler) {
						//REQUIRED: errorInfo
						//REQUIRED: errorInfo.errorMsg
						//OPTIONAL: errorHandler
						
						if (errorLogCollection === undefined) {
							errorLogCollection = nativeDB.collection(box.boxName + '.' + name + '__ERROR');
						}
	
						// now
						errorInfo.time = new Date();
	
						try {
							errorLogCollection.insert(errorInfo);
						}
	
						// if catch error
						catch (error) {
							// this case, ignore.
						}
	
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.errorMsg);
						} else {
							SHOW_ERROR('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` ERROR:', errorInfo);
						}
					},
					
					// inner recache data.
					innerRecacheData = function(cachedGetInfos, cachedFindInfos, cachedCountInfos, callback) {
						
						PARALLEL([
						function(done) {
							
							PARALLEL(cachedGetInfos, [
							function(info, done) {
								
								var
								// params str
								paramsStr = info.paramsStr;
							
								get(PARSE_STR(paramsStr), {
									
									notExists : function() {
										cachedGetDB.remove(paramsStr);
										done();
									},
									error : function() {
										cachedGetDB.remove(paramsStr);
										done();
									},
									
									success : function(savedData) {
										
										cachedGetDB.save({
											id : paramsStr,
											data : {
												filter : info.filter,
												data : savedData
											}
										});
										
										done();
									}
								});
							},
							
							function() {
								done();
							}]);
						},
						
						function(done) {
							
							PARALLEL(cachedFindInfos, [
							function(info, done) {
								
								var
								// params str
								paramsStr = info.paramsStr;
							
								find(PARSE_STR(paramsStr), {
									
									error : function() {
										cachedFindDB.remove(paramsStr);
										done();
									},
									
									success : function(savedDataSet) {
										
										cachedFindDB.save({
											id : paramsStr,
											data : {
												filter : info.filter,
												dataSet : savedDataSet
											}
										});
										
										done();
									}
								});
							},
							
							function() {
								done();
							}]);
						},
						
						function(done) {
							
							PARALLEL(cachedCountInfos, [
							function(info, done) {
								
								var
								// params str
								paramsStr = info.paramsStr;
							
								count(PARSE_STR(paramsStr), {
									
									error : function() {
										cachedCountDB.remove(paramsStr);
										done();
									},
									
									success : function(count) {
										
										cachedCountDB.save({
											id : paramsStr,
											data : {
												filter : info.filter,
												count : count
											}
										});
										
										done();
									}
								});
							},
							
							function() {
								done();
							}]);
						},
						
						function() {
							callback();
						}]);
					},
					
					// recache data.
					recacheData = function(originData, callback) {
						//REQUIRED: originData
						//REQUIRED: callback
						
						var
						// cached get infos
						cachedGetInfos = [],
						
						// cached find infos
						cachedFindInfos = [],
						
						// cached count infos
						cachedCountInfos = [];
						
						EACH(cachedGetDB.list(), function(info, paramsStr) {
							
							var
							// filter
							filter = info.filter;
							
							if (sift(filter)(originData) === true) {
							
								cachedGetInfos.push({
									filter : filter,
									paramsStr : paramsStr
								});
							}
						});
						
						EACH(cachedFindDB.list(), function(info, paramsStr) {
							
							var
							// filter
							filter = info.filter;
							
							if (sift(filter)(originData) === true) {
							
								cachedFindInfos.push({
									filter : filter,
									paramsStr : paramsStr
								});
							}
						});
						
						EACH(cachedCountDB.list(), function(info, paramsStr) {
							
							var
							// filter
							filter = info.filter;
							
							if (sift(filter)(originData) === true) {
							
								cachedCountInfos.push({
									filter : filter,
									paramsStr : paramsStr
								});
							}
						});
						
						innerRecacheData(cachedGetInfos, cachedFindInfos, cachedCountInfos, callback);
					},
					
					// recache data for update.
					recacheDataForUpdate = function(originData, savedData, callback) {
						//REQUIRED: originData
						//REQUIRED: savedData
						//REQUIRED: callback
						
						var
						// cached get infos
						cachedGetInfos = [],
						
						// cached find infos
						cachedFindInfos = [],
						
						// cached count infos
						cachedCountInfos = [];
						
						EACH(cachedGetDB.list(), function(info, paramsStr) {
							
							var
							// filter
							filter = info.filter;
							
							if (sift(filter)(originData) === true || sift(filter)(savedData) === true) {
							
								cachedGetInfos.push({
									filter : filter,
									paramsStr : paramsStr
								});
							}
						});
						
						EACH(cachedFindDB.list(), function(info, paramsStr) {
							
							var
							// filter
							filter = info.filter;
							
							if (sift(filter)(originData) === true || sift(filter)(savedData) === true) {
							
								cachedFindInfos.push({
									filter : filter,
									paramsStr : paramsStr
								});
							}
						});
						
						EACH(cachedCountDB.list(), function(info, paramsStr) {
							
							var
							// filter
							filter = info.filter;
							
							if (sift(filter)(originData) === true || sift(filter)(savedData) === true) {
							
								cachedCountInfos.push({
									filter : filter,
									paramsStr : paramsStr
								});
							}
						});
						
						innerRecacheData(cachedGetInfos, cachedFindInfos, cachedCountInfos, callback);
					},
	
					// inner get.
					innerGet,
	
					// inner update.
					innerUpdate;
	
					self.create = create = function(data, callbackOrHandlers) {
						//REQUIRED: data
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// callback
						callback,
	
						// error handler
						errorHandler,
	
						// error message
						errorMsg,
	
						// f.
						f;
	
						try {
	
							removeEmptyValues(data);
	
							// set random key.
							data.__RANDOM_KEY = Math.random();
	
							// set create time.
							data.createTime = new Date();
	
							// remove _id.
							delete data._id;
							
							if (isNotUsingObjectId === true) {
								data._id = data.id;
							}
	
							// remove id.
							delete data.id;
	
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									errorHandler = callbackOrHandlers.error;
								}
							}
	
							collection.insertOne(data, {
								w : 1
							}, function(error, result) {
	
								var
								// saved data
								savedData;
	
								if (error === TO_DELETE && result.ops.length > 0) {
	
									savedData = result.ops[0];
	
									// clean saved data before callback.
									cleanData(savedData);
	
									if (isNotUsingHistory !== true) {
										addHistory('create', savedData.id, savedData, savedData.createTime);
									}
									
									recacheData(savedData, function() {
										
										if (callback !== undefined) {
											callback(savedData);
										}
									});
								}
	
								// if error is not TO_DELETE
								else {
	
									logError({
										method : 'create',
										data : data,
										errorMsg : error !== TO_DELETE ? error.toString() : '_id existed.'
									}, errorHandler);
								}
							});
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'create',
								data : data,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
	
					innerGet = function(params, callbackOrHandlers) {
						//REQUIRED: params
						//REQUIRED: params.filter
						//REQUIRED: params.sort
						//OPTIONAL: params.isToCache
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// filter
						filter = params.filter,
	
						// sort
						sort = params.sort,
						
						// is to cache
						isToCache = params.isToCache,
	
						// callback
						callback,
	
						// not exists handler
						notExistsHandler,
	
						// error handler
						errorHandler,
	
						// error message
						errorMsg,
									
						// cleaned filter
						cleanedFilter,
						
						// cached info
						cachedInfo;
	
						try {
	
							makeUpFilter(filter);
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notExistsHandler = callbackOrHandlers.notExists;
								errorHandler = callbackOrHandlers.error;
							}
							
							if (isToCache === true) {
												
								cleanedFilter = cleanFilter(filter);
								
								cachedInfo = cachedGetDB.get(STRINGIFY({
									filter : cleanedFilter,
									sort : sort
								}));
							}
							
							if (cachedInfo !== undefined) {
								if (callback !== undefined) {
									callback(cachedInfo.data);
								}
							}
							
							else {

								collection.find(filter).sort(sort).limit(1).toArray(function(error, savedDataSet) {
		
									var
									// saved data
									savedData;
		
									if (error === TO_DELETE) {
											
										if (savedDataSet.length > 0) {
		
											savedData = savedDataSet[0];
		
											// clean saved data before callback.
											cleanData(savedData);
											
											// cache data.
											if (isToCache === true) {
												
												cachedGetDB.save({
													id : STRINGIFY({
														filter : cleanedFilter,
														sort : sort
													}),
													data : {
														filter : cleanedFilter,
														data : savedData
													}
												});
											}
											
											if (callback !== undefined) {
												callback(savedData);
											}
		
										} else {
		
											if (notExistsHandler !== undefined) {
												notExistsHandler();
											} else {
												console.log(CONSOLE_YELLOW('[UPPERCASE-DB] `' + box.boxName + '.' + name + '/get` NOT EXISTS.'), filter);
											}
										}
									}
		
									// if error is not TO_DELETE
									else {
		
										logError({
											method : 'get',
											params : params,
											errorMsg : error.toString()
										}, errorHandler);
									}
								});
							}
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'get',
								params : params,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
	
					self.get = get = function(idOrParams, callbackOrHandlers) {
						//OPTIONAL: idOrParams
						//OPTIONAL: idOrParams.id
						//OPTIONAL: idOrParams.filter
						//OPTIONAL: idOrParams.sort
						//OPTIONAL: idOrParams.isRandom
						//OPTIONAL: idOrParams.isToCache
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// id
						id,
	
						// filter
						filter,
	
						// sort
						sort,
	
						// is random
						isRandom,
						
						// is to cache
						isToCache,
	
						// callback
						callback,
	
						// not exists handler
						notExistsHandler,
	
						// error handler
						errorHandler,
	
						// random key
						randomKey,
	
						// error message
						errorMsg;
	
						try {
							
							// init params.
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = idOrParams;
								idOrParams = {};
							}
	
							if (idOrParams !== undefined) {
								
								if (CHECK_IS_DATA(idOrParams) !== true) {
									id = idOrParams;
								} else {
									id = idOrParams.id;
									filter = idOrParams.filter;
									sort = idOrParams.sort;
									isRandom = idOrParams.isRandom;
									isToCache = idOrParams.isToCache;
								}
							}
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notExistsHandler = callbackOrHandlers.notExists;
								errorHandler = callbackOrHandlers.error;
							}
	
							if (isRandom === true) {
	
								if (filter === undefined) {
									filter = {};
								}
	
								filter.__RANDOM_KEY = {
									$gte : randomKey = Math.random()
								};
	
								sort = {
									__RANDOM_KEY : 1
								};
	
								innerGet({
									filter : filter,
									sort : sort
								}, {
									error : errorHandler,
									notExists : function() {
	
										filter.__RANDOM_KEY = {
											$lte : randomKey
										};
	
										innerGet({
											filter : filter,
											sort : sort
										}, callbackOrHandlers);
									},
									success : callback
								});
	
							}
							
							else if (idOrParams === undefined) {
								
								if (notExistsHandler !== undefined) {
									notExistsHandler();
								} else {
									console.log(CONSOLE_YELLOW('[UPPERCASE-DB] `' + box.boxName + '.' + name + '/get` NOT EXISTS.'), filter);
								}
							}
							
							else {
								
								if (filter === undefined) {
									filter = {};
								}
	
								if (id !== undefined) {
									filter._id = gen_id(id);
								}
	
								if (sort === undefined) {
									sort = {
										createTime : -1
									};
								}
								
								else if (sort.id !== undefined) {
									sort._id = sort.id;
									delete sort.id;
								}
								
								if (sort.createTime === undefined) {
									sort.createTime = -1;
								}
	
								innerGet({
									filter : filter,
									sort : sort,
									isToCache : isToCache
								}, callbackOrHandlers);
							}
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'get',
								idOrParams : idOrParams,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
	
					innerUpdate = function(data, callbackOrHandlers, isNotToSaveHistory, isNotToUpdateLastUpdateTime) {
						//REQUIRED: data
						//REQUIRED: data.id
						//OPTIONAL: data.$inc
						//OPTIONAL: data.$push
						//OPTIONAL: data.$addToSet
						//OPTIONAL: data.$pull
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: isNotToSaveHistory
						//OPTIONAL: isNotToUpdateLastUpdateTime
						
						var
						// id
						id = data.id,
	
						// $inc
						$inc = data.$inc,
	
						// $push
						$push = data.$push,
	
						// $addToSet
						$addToSet = data.$addToSet,
	
						// $pull
						$pull = data.$pull,
	
						// filter
						filter,
	
						// callback
						callback,
	
						// not exists handler
						notExistsHandler,
	
						// error handler
						errorHandler,
	
						// $unset
						$unset,
	
						// update data
						updateData,
	
						// error message
						errorMsg;
	
						try {
	
							filter = {
								_id : gen_id(id)
							};
	
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									notExistsHandler = callbackOrHandlers.notExists;
									errorHandler = callbackOrHandlers.error;
								}
							}
	
							EACH(data, function(value, name) {
								if (name === 'id' || name === '_id' || name === 'createTime' || name[0] === '$') {
									delete data[name];
								} else if (value === TO_DELETE) {
	
									if ($unset === undefined) {
										$unset = {};
									}
	
									$unset[name] = '';
								}
							});
							
							removeEmptyValues(data);
	
							if (isNotToUpdateLastUpdateTime !== true) {
								data.lastUpdateTime = new Date();
							}
							
							updateData = {};
							
							if (CHECK_IS_EMPTY_DATA(data) !== true) {
								updateData.$set = data;
							}
	
							if ($unset !== undefined) {
								updateData.$unset = $unset;
							}
	
							if ($inc !== undefined) {
								removeEmptyValues($inc);
								if (CHECK_IS_EMPTY_DATA($inc) !== true) {
									updateData.$inc = $inc;
								}
							}
							
							if ($push !== undefined) {
								removeEmptyValues($push);
								updateData.$push = $push;
							}
							
							if ($addToSet !== undefined) {
								removeEmptyValues($addToSet);
								updateData.$addToSet = $addToSet;
							}
							
							if ($pull !== undefined) {
								removeEmptyValues($pull);
								updateData.$pull = $pull;
							}
							
							get({
								filter : filter
							}, {
	
								error : function(errorMsg) {
	
									logError({
										method : 'update',
										data : data,
										errorMsg : errorMsg
									}, errorHandler);
								},
	
								notExists : function() {
	
									if (notExistsHandler !== undefined) {
										notExistsHandler();
									} else {
										console.log(CONSOLE_YELLOW('[UPPERCASE-DB] `' + box.boxName + '.' + name + '/update` NOT EXISTS.'), filter);
									}
								},
	
								success : function(originData) {
									
									//!! if update data is empty, data to be empty.
									if (CHECK_IS_EMPTY_DATA(updateData) === true) {
										
										if (callback !== undefined) {
											callback(originData, originData);
										}
										
									} else {
	
										collection.updateOne(filter, updateData, {
											w : 1
										}, function(error, result) {
	
											if (error !== TO_DELETE) {
				
												logError({
													method : 'update',
													data : data,
													errorMsg : error.toString()
												}, errorHandler);
											}
											
											else if (result.result.n === 0) {
				
												if (notExistsHandler !== undefined) {
													notExistsHandler();
												} else {
													console.log(CONSOLE_YELLOW('[UPPERCASE-DB] `' + box.boxName + '.' + name + '/update` NOT EXISTS.'), filter);
												}
											}
											
											else {
				
												get({
													filter : filter
												}, {
				
													error : function(errorMsg) {
				
														logError({
															method : 'update',
															data : data,
															errorMsg : errorMsg
														}, errorHandler);
													},
				
													notExists : function() {
				
														if (notExistsHandler !== undefined) {
															notExistsHandler();
														} else {
															console.log(CONSOLE_YELLOW('[UPPERCASE-DB] `' + box.boxName + '.' + name + '/update` NOT EXISTS.'), filter);
														}
													},
				
													success : function(savedData) {
				
														var
														// update data
														updateData = {};
		
														EACH(data, function(value, name) {
															updateData[name] = value;
														});
			
														if ($unset !== undefined) {
															EACH($unset, function(value, name) {
																updateData[name] = TO_DELETE;
															});
														}
														
														if ($inc !== undefined) {
															EACH($inc, function(notUsing, name) {
																updateData[name] = savedData[name];
															});
														}
														
														if ($push !== undefined) {
															EACH($push, function(notUsing, name) {
																updateData[name] = savedData[name];
															});
														}
														
														if ($addToSet !== undefined) {
															EACH($addToSet, function(notUsing, name) {
																updateData[name] = savedData[name];
															});
														}
														
														if ($pull !== undefined) {
															EACH($pull, function(notUsing, name) {
																updateData[name] = savedData[name];
															});
														}
														
														if (isNotUsingHistory !== true && isNotToSaveHistory !== true && RUN(function() {
															
															var
															// is same
															isSame = true;
															
															EACH(updateData, function(value, name) {
																if (name !== 'lastUpdateTime' && originData[name] !== value) {
																	isSame = false;
																	return false;
																}
															});
															
															return isSame;
															
														}) !== true) {
															addHistory('update', id, updateData, savedData.lastUpdateTime);
														}
				
														// aleady cleaned origin/saved data
														recacheDataForUpdate(originData, savedData, function() {
															
															if (callback !== undefined) {
																callback(savedData, originData);
															}
														});
													}
												});
											}
										});
									}
								}
							});
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'update',
								data : data,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
					
					self.update = update = function(data, callbackOrHandlers) {
						//REQUIRED: data
						//REQUIRED: data.id
						//OPTIONAL: data.$inc
						//OPTIONAL: data.$push
						//OPTIONAL: data.$addToSet
						//OPTIONAL: data.$pull
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
						innerUpdate(data, callbackOrHandlers);
					};
					
					self.updateNoHistory = updateNoHistory = function(data, callbackOrHandlers) {
						//REQUIRED: data
						//REQUIRED: data.id
						//OPTIONAL: data.$inc
						//OPTIONAL: data.$push
						//OPTIONAL: data.$addToSet
						//OPTIONAL: data.$pull
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
						innerUpdate(data, callbackOrHandlers, true);
					};
					
					self.updateNoRecord = updateNoRecord = function(data, callbackOrHandlers) {
						//REQUIRED: data
						//REQUIRED: data.id
						//OPTIONAL: data.$inc
						//OPTIONAL: data.$push
						//OPTIONAL: data.$addToSet
						//OPTIONAL: data.$pull
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
						innerUpdate(data, callbackOrHandlers, true, true);
					};
					
					self.remove = remove = function(id, callbackOrHandlers) {
						//REQUIRED: id
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// filter
						filter,
	
						// callback
						callback,
	
						// not exists handler
						notExistsHandler,
	
						// error handler
						errorHandler,
	
						// error message
						errorMsg;
	
						try {
	
							filter = {
								_id : gen_id(id)
							};
	
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									notExistsHandler = callbackOrHandlers.notExists;
									errorHandler = callbackOrHandlers.error;
								}
							}
	
							get({
								filter : filter
							}, {
	
								error : function(errorMsg) {
	
									logError({
										method : 'remove',
										id : id,
										errorMsg : errorMsg
									}, errorHandler);
								},
	
								notExists : function() {
	
									if (notExistsHandler !== undefined) {
										notExistsHandler();
									} else {
										console.log(CONSOLE_YELLOW('[UPPERCASE-DB] `' + box.boxName + '.' + name + '/remove` NOT EXISTS.'), filter);
									}
								},
	
								success : function(originData) {
	
									collection.deleteOne(filter, {
										w : 1
									}, function(error, result) {
										
										if (error !== TO_DELETE) {
	
											logError({
												method : 'remove',
												id : id,
												errorMsg : error.toString()
											}, errorHandler);
										}
										
										else if (result.result.n === 0) {
	
											if (notExistsHandler !== undefined) {
												notExistsHandler();
											} else {
												console.log(CONSOLE_YELLOW('[UPPERCASE-DB] `' + box.boxName + '.' + name + '/remove` NOT EXISTS.'), filter);
											}
										}
	
										else {
	
											if (isNotUsingHistory !== true) {
												addHistory('remove', id, undefined, new Date());
											}
											
											// aleady cleaned origin data
											recacheData(originData, function() {
												
												if (callback !== undefined) {
													callback(originData);
												}
											});
										}
									});
								}
							});
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'remove',
								id : id,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
					
					self.find = find = function(params, callbackOrHandlers) {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.sort
						//OPTIONAL: params.start
						//OPTIONAL: params.count
						//OPTIONAL: params.isFindAll
						//OPTIONAL: params.isToCache
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// filter
						filter,
	
						// sort
						sort,
	
						// start
						start,
	
						// count
						count,
	
						// is find all
						isFindAll,
						
						// is to cache
						isToCache,
	
						// callback
						callback,
	
						// error handler
						errorHandler,
	
						// error message
						errorMsg,
						
						// cleaned filter
						cleanedFilter,
						
						// cached info
						cachedInfo,
	
						// proc.
						proc;
	
						try {
	
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}
	
							if (params !== undefined) {
								filter = params.filter;
								sort = params.sort;
								start = INTEGER(params.start);
								count = INTEGER(params.count);
								isFindAll = params.isFindAll;
								isToCache = params.isToCache;
							}
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							if (filter === undefined) {
								filter = {};
							}
	
							if (sort === undefined) {
								sort = {
									createTime : -1
								};
							} 
						
							else if (sort.id !== undefined) {
								sort._id = sort.id;
								delete sort.id;
							}
							
							if (sort.createTime === undefined) {
								sort.createTime = -1;
							}
	
							if (start === undefined || start < 0) {
								start = 0;
							}
	
							if (isFindAll !== true) {
								if (count === undefined || count > NODE_CONFIG.maxDataCount || isNaN(count) === true) {
									count = NODE_CONFIG.maxDataCount;
								} else if (count < 1) {
									count = 1;
								}
							}
	
							makeUpFilter(filter);
							
							if (isToCache === true) {
								
								cleanedFilter = cleanFilter(filter);
								
								cachedInfo = cachedFindDB.get(STRINGIFY({
									filter : cleanedFilter,
									sort : sort,
									start : start,
									count : count,
									isFindAll : isFindAll
								}));
							}
							
							if (cachedInfo !== undefined) {
								callback(cachedInfo.dataSet);
							} else {
		
								proc = function(error, savedDataSet) {
		
									if (error === TO_DELETE) {
										
										// clean saved data before callback.
										EACH(savedDataSet, function(savedData, i) {
											cleanData(savedData);
										});
										
										// cache data set.
										if (isToCache === true) {
											
											cachedFindDB.save({
												id : STRINGIFY({
													filter : cleanedFilter,
													sort : sort,
													start : start,
													count : count,
													isFindAll : isFindAll
												}),
												data : {
													filter : cleanedFilter,
													dataSet : savedDataSet
												}
											});
										}
		
										callback(savedDataSet);
									}
		
									// if error is not TO_DELETE
									else {
		
										logError({
											method : 'find',
											params : params,
											errorMsg : error.toString()
										}, errorHandler);
									}
								};
								
								if (isFindAll === true) {
		
									// find all data set.
									collection.find(filter).sort(sort).skip(start).toArray(proc);
		
								} else {
		
									collection.find(filter).sort(sort).skip(start).limit(count).toArray(function(error, savedDataSet) {
										
										if (error === TO_DELETE && savedDataSet.length === NODE_CONFIG.maxDataCount) {
											console.log(CONSOLE_YELLOW('[UPPERCASE-DB] `' + box.boxName + '.' + name + '/find` MAX DATA COUNT.'));
										}
										
										proc(error, savedDataSet);
									});
								}
							}
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'find',
								params : params,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
	
					self.count = count = function(params, callbackOrHandlers) {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.isToCache
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// filter
						filter,
						
						// is to cache
						isToCache,
	
						// callback
						callback,
	
						// error handler
						errorHandler,
	
						// error message
						errorMsg,
									
						// cleaned filter
						cleanedFilter,
						
						// cached info
						cachedInfo;
	
						try {
	
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}
	
							if (params !== undefined) {
								filter = params.filter;
								isToCache = params.isToCache;
							}
	
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = filter;
								filter = undefined;
							}
	
							if (filter === undefined) {
								filter = {};
							}
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							makeUpFilter(filter);
							
							if (isToCache === true) {
								
								cleanedFilter = cleanFilter(filter);
								
								cachedInfo = cachedCountDB.get(STRINGIFY({
									filter : cleanedFilter
								}));
							}
							
							if (cachedInfo !== undefined) {
								callback(cachedInfo.count);
							} else {
	
								collection.find(filter).count(function(error, count) {
		
									if (error === TO_DELETE) {
										
										// cache count.
										if (isToCache === true) {
											
											cachedCountDB.save({
												id : STRINGIFY({
													filter : cleanedFilter
												}),
												data : {
													filter : cleanedFilter,
													count : count
												}
											});
										}
										
										callback(count);
									}
		
									// if error is not TO_DELETE
									else {
		
										logError({
											method : 'count',
											filter : filter,
											errorMsg : error.toString()
										}, errorHandler);
									}
								});
							}
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'count',
								filter : filter,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
	
					self.checkIsExists = checkIsExists = function(params, callbackOrHandlers) {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.isToCache
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// filter
						filter,
						
						// is to cache
						isToCache,
	
						// callback
						callback,
	
						// error handler
						errorHandler,
	
						// error message
						errorMsg,
									
						// cleaned filter
						cleanedFilter,
						
						// cached incfo
						cachedInfo,
						
						// cached count
						cachedCount;
	
						try {
	
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}
	
							if (params !== undefined) {
								filter = params.filter;
								isToCache = params.isToCache;
							}
	
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = filter;
								filter = undefined;
							}
	
							// when undefined
							if (filter === undefined) {
								filter = {};
							}
	
							// when id
							else if (CHECK_IS_DATA(filter) !== true) {
	
								filter = {
									_id : gen_id(filter)
								};
							}
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							makeUpFilter(filter);
							
							if (isToCache === true) {
								
								cleanedFilter = cleanFilter(filter);
								
								cachedInfo = cachedCountDB.get(STRINGIFY({
									filter : cleanedFilter
								}));
							}
							
							if (cachedInfo !== undefined) {
								
								cachedCount = cachedInfo.count;
								
								callback(cachedCount !== undefined && cachedCount > 0);
								
							} else {
	
								collection.find(filter).count(function(error, count) {
		
									if (error === TO_DELETE) {
										
										// cache count.
										if (isToCache === true) {
											
											cachedCountDB.save({
												id : STRINGIFY({
													filter : cleanedFilter
												}),
												data : {
													filter : cleanedFilter,
													count : count
												}
											});
										}
		
										callback(count !== undefined && count > 0);
									}
		
									// if error is not TO_DELETE
									else {
		
										logError({
											method : 'checkIsExists',
											filter : filter,
											errorMsg : error.toString()
										}, errorHandler);
									}
								});
							}
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'checkIsExists',
								filter : filter,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
	
					self.aggregate = aggregate = function(params, callbackOrHandlers) {
						//REQUIRED: params
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// callback
						callback,
	
						// error handler
						errorHandler;
	
						try {
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							collection.aggregate(params).toArray(function(error, result) {
	
								if (error === TO_DELETE) {
	
									callback(result);
								}
	
								// if error is not TO_DELETE
								else {
	
									logError({
										method : 'aggregate',
										params : params,
										errorMsg : error.toString()
									}, errorHandler);
								}
							});
						}
	
						// if catch error
						catch (error) {
	
							logError({
								method : 'aggregate',
								params : params,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
					
					self.createIndex = createIndex = function(keys, callbackOrHandlers) {
						//REQUIRED: keys
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
						
						var
						// callback
						callback,
	
						// error handler
						errorHandler;
						
						try {
							
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									errorHandler = callbackOrHandlers.error;
								}
							}
							
							collection.createIndex(keys, {
								w : 1
							}, function(error) {
		
								if (error === TO_DELETE) {
		
									if (callback !== undefined) {
										callback();
									}
								}
		
								// if error is not TO_DELETE
								else {
		
									logError({
										method : 'createIndex',
										keys : keys,
										errorMsg : error.toString()
									}, errorHandler);
								}
							});
						}
	
						// if catch error
						catch (error) {
							
							logError({
								method : 'createIndex',
								keys : keys,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
					
					// improve performance.
					createIndex({
						createTime : 1
					});
					
					self.removeIndex = removeIndex = function(index, callbackOrHandlers) {
						//REQUIRED: index
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
						
						var
						// callback
						callback,
	
						// error handler
						errorHandler;
						
						try {
						
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									errorHandler = callbackOrHandlers.error;
								}
							}
							
							collection.dropIndex(index, {
								w : 1
							}, function(error) {
		
								if (error === TO_DELETE) {
		
									if (callback !== undefined) {
										callback();
									}
								}
		
								// if error is not TO_DELETE
								else {
		
									logError({
										method : 'removeIndex',
										index : index,
										errorMsg : error.toString()
									}, errorHandler);
								}
							});
						}
	
						// if catch error
						catch (error) {
							
							logError({
								method : 'removeIndex',
								index : index,
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
					
					self.findAllIndexes = findAllIndexes = function(callbackOrHandlers) {
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						var
						// callback
						callback,
	
						// error handler
						errorHandler;
						
						try {
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							collection.indexInformation(function(error, indexInfo) {
								
								var
								// key map
								keyMap;
	
								if (error === TO_DELETE) {
									
									keyMap = [];
									
									EACH(indexInfo, function(pairs) {
											
										var
										// keys
										keys = {};
										
										EACH(pairs, function(pair) {
											keys[pair[0]] = pair[1];
										});
										
										keyMap.push(keys);
									});
	
									callback(keyMap);
								}
	
								// if error is not TO_DELETE
								else {
	
									logError({
										method : 'findAllIndexes',
										errorMsg : error.toString()
									}, errorHandler);
								}
							});
						}
	
						// if catch error
						catch (error) {
							
							logError({
								method : 'findAllIndexes',
								errorMsg : error.toString()
							}, errorHandler);
						}
					};
	
					// run waiting infos.
	
					EACH(waitingCreateInfos, function(info) {
						create(info.data, info.callbackOrHandlers);
					});
	
					waitingCreateInfos = undefined;
	
					EACH(waitingGetInfos, function(info) {
						get(info.idOrParams, info.callbackOrHandlers);
					});
	
					waitingGetInfos = undefined;
	
					EACH(waitingUpdateInfos, function(info) {
						innerUpdate(info.data, info.callbackOrHandlers, info.isNotToSaveHistory);
					});
	
					waitingUpdateInfos = undefined;
	
					EACH(waitingRemoveInfos, function(info) {
						remove(info.id, info.callbackOrHandlers);
					});
	
					waitingRemoveInfos = undefined;
	
					EACH(waitingFindInfos, function(info) {
						find(info.params, info.callbackOrHandlers);
					});
	
					waitingFindInfos = undefined;
	
					EACH(waitingCountInfos, function(info) {
						count(info.params, info.callbackOrHandlers);
					});
	
					waitingCountInfos = undefined;
	
					EACH(waitingCheckIsExistsInfos, function(info) {
						checkIsExists(info.params, info.callbackOrHandlers);
					});
	
					waitingCheckIsExistsInfos = undefined;
	
					EACH(waitingAggregateInfos, function(info) {
						aggregate(info.params, info.callbackOrHandlers);
					});
	
					waitingAggregateInfos = undefined;
					
					EACH(waitingCreateIndexInfos, function(info) {
						createIndex(info.keys, info.callbackOrHandlers);
					});
	
					waitingCreateIndexInfos = undefined;
					
					EACH(waitingRemoveIndexInfos, function(info) {
						removeIndex(info.index, info.callbackOrHandlers);
					});
	
					waitingRemoveIndexInfos = undefined;
					
					EACH(waitingFindAllIndexesInfos, function(info) {
						findAllIndexes(info.callbackOrHandlers);
					});
	
					waitingFindAllIndexesInfos = undefined;
				});
			}
		};
	});
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * MongoDB collection wrapper class for logging
	 */
	box.LOG_DB = CLASS(function(cls) {
		
		var
		// generate _id.
		gen_id = function(id) {
			//REQUIRED: id
			
			return VALID.id(id) === true ? new ObjectID(id) : -1;
		},
		
		// make up filter.
		makeUpFilter = function(filter) {

			var
			// f.
			f = function(filter) {

				if (filter.id !== undefined) {

					if (CHECK_IS_DATA(filter.id) === true) {

						EACH(filter.id, function(values, i) {
							if (CHECK_IS_DATA(values) === true || CHECK_IS_ARRAY(values) === true) {
								EACH(values, function(value, j) {
									values[j] = gen_id(value);
								});
							} else {
								filter.id[i] = gen_id(values);
							}
						});

						filter._id = filter.id;

					} else {
						filter._id = gen_id(filter.id);
					}
					delete filter.id;
				}

				EACH(filter, function(value, name) {
					if (value === undefined) {
						delete filter[name];
					}
				});
			};

			if (filter.$and !== undefined) {

				EACH(filter.$and, function(filter) {
					f(filter);
				});

			} else if (filter.$or !== undefined) {

				EACH(filter.$or, function(filter) {
					f(filter);
				});

			} else {
				f(filter);
			}
		};

		return {
		
			init : function(inner, self, name) {
				//REQUIRED: name
	
				var
				// waiting log data set
				waitingLogDataSet = [],
				
				// waiting find infos
				waitingFindInfos = [],
	
				// log.
				log,
				
				// find.
				find;
	
				self.log = log = function(data) {
					//REQUIRED: data
	
					waitingLogDataSet.push(data);
				};
				
				self.find = find = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingFindInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				CONNECT_TO_DB_SERVER.addInitDBFunc(function(nativeDB) {
	
					var
					// MongoDB collection
					collection = nativeDB.collection(box.boxName + '.' + name);
	
					self.log = log = function(data) {
						//REQUIRED: data
	
						// now
						data.time = new Date();
						
						box.DB.removeEmptyValues(data);
	
						collection.insertOne(data);
					};
					
					self.find = find = function(params, callbackOrHandlers) {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.sort
						//OPTIONAL: params.start
						//OPTIONAL: params.count
						//OPTIONAL: params.isFindAll
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
		
						var
						// filter
						filter,
	
						// sort
						sort,
	
						// start
						start,
	
						// count
						count,
	
						// is find all
						isFindAll,
						
						// callback
						callback,
	
						// error handler
						errorHandler,
	
						// error message
						errorMsg,
						
						// cleaned filter
						cleanedFilter,
						
						// cached info
						cachedInfo,
	
						// proc.
						proc;
	
						try {
	
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}
	
							if (params !== undefined) {
								filter = params.filter;
								sort = params.sort;
								start = INTEGER(params.start);
								count = INTEGER(params.count);
								isFindAll = params.isFindAll;
							}
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							if (filter === undefined) {
								filter = {};
							}
	
							if (sort === undefined) {
								sort = {
									time : -1
								};
							} 
						
							else if (sort.id !== undefined) {
								sort._id = sort.id;
								delete sort.id;
							}
							
							if (sort.time === undefined) {
								sort.time = -1;
							}
	
							if (start === undefined || start < 0) {
								start = 0;
							}
	
							if (isFindAll !== true) {
								if (count === undefined || count > NODE_CONFIG.maxDataCount || isNaN(count) === true) {
									count = NODE_CONFIG.maxDataCount;
								} else if (count < 1) {
									count = 1;
								}
							}
	
							makeUpFilter(filter);
	
							proc = function(error, savedDataSet) {
	
								if (error === TO_DELETE) {
									
									// clean saved data before callback.
									EACH(savedDataSet, function(savedData, i) {
										
										// convert _id (object) to id (string).
										if (savedData._id !== undefined) {
											savedData.id = savedData._id.toString();
										}
						
										// delete _id.
										delete savedData._id;
									});
	
									callback(savedDataSet);
								}
	
								// if error is not TO_DELETE
								else {
	
									if (errorHandler !== undefined) {
										errorHandler(error.toString());
									} else {
										SHOW_ERROR('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` LOG_DB ERROR:', error.toString());
									}
								}
							};
							
							if (isFindAll === true) {
	
								// find all data set.
								collection.find(filter).sort(sort).skip(start).toArray(proc);
	
							} else {
	
								collection.find(filter).sort(sort).skip(start).limit(count).toArray(proc);
							}
						}
	
						// if catch error
						catch (error) {
							
							if (errorHandler !== undefined) {
								errorHandler(error.toString());
							} else {
								SHOW_ERROR('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` LOG_DB ERROR:', error.toString());
							}
						}
					};
	
					EACH(waitingLogDataSet, function(data) {
						log(data);
					});
	
					waitingLogDataSet = undefined;
					
					EACH(waitingFindInfos, function(info) {
						find(info.params, info.callbackOrHandlers);
					});
	
					waitingFindInfos = undefined;
				});
			}
		};
	});
});

OVERRIDE(NODE_CONFIG, function(origin) {
	
	/**
	 * Node-side Configuration
	 */
	global.NODE_CONFIG = COMBINE([{

		// db log mode
		isDBLogMode : false,

		// init max data count = 1000
		maxDataCount : 1000
		
	}, origin]);
});
