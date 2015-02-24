/**
 * connect to MongoDB server.
 */
global.CONNECT_TO_DB_SERVER = METHOD(function(m) {

	var
	// native db
	nativeDB,

	// init db funcs
	initDBFuncs = [],

	// add init db func.
	addInitDBFunc;

	m.addInitDBFunc = addInitDBFunc = function(initDBFunc) {

		if (nativeDB === undefined) {
			initDBFuncs.push(initDBFunc);
		} else {
			initDBFunc(nativeDB);
		}
	};

	return {

		run : function(params, callback) {
			'use strict';
			//REQUIRED: params
			//OPTIONAL: params.username
			//OPTIONAL: params.password
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.name
			//OPTIONAL: callback

			var
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

			require('mongodb').MongoClient.connect('mongodb://' + (username !== undefined && password !== undefined ? username + ':' + password + '@' : '') + host + ':' + port + '/' + name, function(error, _nativeDB) {

				if (error !== TO_DELETE) {

					console.log(CONSOLE_RED('[UPPERCASE.IO-DB] CONNECT TO DB SERVER FAILED: ' + error.toString()));

				} else {

					nativeDB = _nativeDB;

					EACH(initDBFuncs, function(initDBFunc) {
						initDBFunc(nativeDB);
					});

					initDBFuncs = undefined;

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
	box.DB = CLASS({

		init : function(inner, self, nameOrParams) {
			//REQUIRED: nameOrParams
			//REQUIRED: nameOrParams.name
			//OPTIONAL: nameOrParams.isNotUsingObjectId
			//OPTIONAL: nameOrParams.isNotUsingHistory

			var
			// name
			name,
			
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

			// remove empty values.
			removeEmptyValues = function(data) {
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
				//REQUIRED: idOrParams
				//OPTIONAL: idOrParams.id
				//OPTIONAL: idOrParams.filter
				//OPTIONAL: idOrParams.sort
				//OPTIONAL: idOrParams.isRandom
				//OPTIONAL: idOrParams.isToCache
				//REQUIRED: callbackOrHandlers
				//REQUIRED: callbackOrHandlers.success
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
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.error

				waitingUpdateInfos.push({
					data : data,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			if (isNotUsingObjectId !== true) {

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
			}

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

			CONNECT_TO_DB_SERVER.addInitDBFunc(function(nativeDB) {

				var
				// MongoDB collection
				collection = nativeDB.collection(box.boxName + '.' + name),

				// MongoDB collection for history
				historyCollection = nativeDB.collection(box.boxName + '.' + name + '__HISTORY'),

				// MongoDB collection for error log
				errorLogCollection = nativeDB.collection(box.boxName + '.' + name + '__ERROR'),
			
				// cached get store
				cachedGetStore = box.SHARED_STORE('cachedGetStore'),
				
				// cached find store
				cachedFindStore = box.SHARED_STORE('cachedFindStore'),
				
				// cached count store
				cachedCountStore = box.SHARED_STORE('cachedCountStore'),
				
				// add history.
				addHistory = function(method, id, change, time) {
					//REQUIRED: method
					//REQUIRED: id
					//OPTIONAL: change
					//REQUIRED: time

					historyCollection.findOne({
						_id : id
					}, function(error, savedData) {

						var
						// info
						info;

						if (error === TO_DELETE) {

							info = {
								method : method,
								time : time
							};
							
							if (change !== undefined) {
								info.change = change;
							}

							if (savedData === TO_DELETE) {

								historyCollection.insert({
									_id : id,
									timeline : [info]
								}, {
									w : 0
								});

							} else {

								historyCollection.update({
									_id : id
								}, {
									$push : {
										timeline : info
									}
								}, {
									w : 0
								});
							}
						}
					});

					if (NODE_CONFIG.isDBLogMode === true) {
						
						if (method === 'remove') {
							console.log('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '` DATA(' + id + ') REMOVED.');
						} else {
							console.log('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '` DATA(' + id + ') SAVED:', change);
						}
					}
				},

				// log error.
				logError = function(errorInfo, errorHandler) {
					//REQUIRED: errorInfo
					//REQUIRED: errorInfo.errorMsg
					//OPTIONAL: errorHandler

					// now
					errorInfo.time = new Date();

					try {

						errorLogCollection.insert(errorInfo, {
							w : 0
						});
					}

					// if catch error
					catch (error) {
						// this case, ignore.
					}

					if (errorHandler !== undefined) {
						errorHandler(errorInfo.errorMsg);
					} else {
						console.log(CONSOLE_RED('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '` ERROR:'), errorInfo);
					}
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
					
					EACH(cachedGetStore.list(), function(info, paramsStr) {
						
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
					
					EACH(cachedFindStore.list(), function(info, paramsStr) {
						
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
					
					EACH(cachedCountStore.list(), function(info, paramsStr) {
						
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
					
					PARALLEL([
					function(done) {
						
						PARALLEL(cachedGetInfos, [
						function(info, done) {
							
							var
							// params str
							paramsStr = info.paramsStr;
						
							get(PARSE_STR(paramsStr), {
								
								notExists : function() {
									cachedGetStore.remove(paramsStr);
									done();
								},
								error : function() {
									cachedGetStore.remove(paramsStr);
									done();
								},
								
								success : function(savedData) {
									
									cachedGetStore.save({
										name : paramsStr,
										value : {
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
									cachedFindStore.remove(paramsStr);
									done();
								},
								
								success : function(savedDataSet) {
									
									cachedFindStore.save({
										name : paramsStr,
										value : {
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
									cachedCountStore.remove(paramsStr);
									done();
								},
								
								success : function(count) {
									
									cachedCountStore.save({
										name : paramsStr,
										value : {
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

				// inner get.
				innerGet;

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

						// set random key.
						data.__RANDOM_KEY = Math.random();

						// set create time.
						data.createTime = new Date();

						removeEmptyValues(data);

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

						collection.insert(data, {
							safe : true
						}, function(error, savedDataSet) {

							var
							// saved data
							savedData;

							if (error === TO_DELETE) {

								savedData = savedDataSet[0];

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
									errorMsg : error.toString()
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
					//REQUIRED: callbackOrHandlers.success
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
							
							cachedInfo = cachedGetStore.get(STRINGIFY({
								filter : cleanedFilter,
								sort : sort
							}));
						}
						
						if (cachedInfo !== undefined) {
							callback(cachedInfo.data);
						} else {

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
											
											cachedGetStore.save({
												name : STRINGIFY({
													filter : cleanedFilter,
													sort : sort
												}),
												value : {
													filter : cleanedFilter,
													data : savedData
												}
											});
										}
	
										callback(savedData);
	
									} else {
	
										if (notExistsHandler !== undefined) {
											notExistsHandler();
										} else {
											console.log(CONSOLE_YELLOW('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '.get` NOT EXISTS.'), filter);
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
					//REQUIRED: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.isToCache
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
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
						if (CHECK_IS_DATA(idOrParams) !== true) {
							id = idOrParams;
						} else {
							id = idOrParams.id;
							filter = idOrParams.filter;
							sort = idOrParams.sort;
							isRandom = idOrParams.isRandom;
							isToCache = idOrParams.isToCache;
						}

						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							errorHandler = callbackOrHandlers.error;
						}

						if (sort === undefined) {
							sort = {
								createTime : -1
							};
						}

						if (isRandom === true) {

							if (filter === undefined) {
								filter = {};
							}

							filter.__RANDOM_KEY = {
								$gte : randomKey = Math.random()
							};

							sort.__RANDOM_KEY = 1;

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

						} else {

							if (filter === undefined) {
								filter = {
									_id : gen_id(id)
								};
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

				self.update = update = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: data.$inc
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error

					var
					// id
					id = data.id,

					// $unset
					$unset,

					// $inc
					$inc = data.$inc,

					// filter
					filter,

					// callback
					callback,

					// not exists handler
					notExistsHandler,

					// error handler
					errorHandler,

					// update data
					updateData,

					// is set data
					isSetData,

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
							if (name === 'id' || name === '_id' || name === 'createTime' || name === '$inc') {
								delete data[name];
							} else if (value === TO_DELETE) {

								if ($unset === undefined) {
									$unset = {};
								}

								$unset[name] = '';

							} else {
								isSetData = true;
							}
						});

						data.lastUpdateTime = new Date();

						removeEmptyValues(data);

						updateData = {
							$set : data
						};

						if ($unset !== undefined) {
							updateData.$unset = $unset;
						}

						if ($inc !== undefined) {
							updateData.$inc = $inc;
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
									console.log(CONSOLE_YELLOW('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '.update` NOT EXISTS.'), filter);
								}
							},

							success : function(originData) {

								collection.update(filter, updateData, {
									safe : true
								}, function(error, result) {
		
									if (result === 0) {
		
										if (notExistsHandler !== undefined) {
											notExistsHandler();
										} else {
											console.log(CONSOLE_YELLOW('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '.update` NOT EXISTS.'), filter);
										}
		
									} else if (error === TO_DELETE) {
		
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
													console.log(CONSOLE_YELLOW('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '.update` NOT EXISTS.'), filter);
												}
											},
		
											success : function(savedData) {
		
												var
												// update data
												updateData;
		
												if ($inc === undefined || isSetData === true || $unset !== undefined) {
		
													updateData = {};
		
													if (isSetData === true) {
														EACH(data, function(value, name) {
															updateData[name] = value;
														});
													}
		
													if ($unset !== undefined) {
														EACH($unset, function(value, name) {
															updateData[name] = TO_DELETE;
														});
													}
													
													if (isNotUsingHistory !== true) {
														addHistory('update', id, updateData, savedData.lastUpdateTime);
													}
												}
		
												// aleady cleaned origin data
												recacheData(originData, function() {
													
													// aleady cleaned saved data
													if (callback !== undefined) {
														callback(savedData);
													}
												});
											}
										});
									}
		
									// if error is not TO_DELETE
									else {
		
										logError({
											method : 'update',
											data : data,
											errorMsg : error.toString()
										}, errorHandler);
									}
								});
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
				
				if (isNotUsingObjectId !== true) {
	
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
										console.log(CONSOLE_YELLOW('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '.remove` NOT EXISTS.'), filter);
									}
								},
	
								success : function(originData) {

									collection.remove(filter, {
										safe : true
									}, function(error, result) {
										
										if (result === 0) {
	
											if (notExistsHandler !== undefined) {
												notExistsHandler();
											} else {
												console.log(CONSOLE_YELLOW('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '.remove` NOT EXISTS.'), filter);
											}
	
										} else if (error === TO_DELETE) {
	
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
	
										// if error is not TO_DELETE
										else {
	
											logError({
												method : 'remove',
												id : id,
												errorMsg : error.toString()
											}, errorHandler);
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
				}

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

						if (start === undefined) {
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
							
							cachedInfo = cachedFindStore.get(STRINGIFY({
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
										
										cachedFindStore.save({
											name : STRINGIFY({
												filter : cleanedFilter,
												sort : sort,
												start : start,
												count : count,
												isFindAll : isFindAll
											}),
											value : {
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
	
								collection.find(filter).sort(sort).skip(start).limit(count).toArray(proc);
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
							
							cachedInfo = cachedCountStore.get(STRINGIFY({
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
										
										cachedCountStore.save({
											name : STRINGIFY({
												filter : cleanedFilter
											}),
											value : {
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
							
							cachedInfo = cachedCountStore.get(STRINGIFY({
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
										
										cachedCountStore.save({
											name : STRINGIFY({
												filter : cleanedFilter
											}),
											value : {
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

						collection.aggregate(params, function(error, result) {

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
						
						collection.ensureIndex(keys, {
							safe : true
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
							safe : true
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
					update(info.data, info.callbackOrHandlers);
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
			});
		}
	});
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * MongoDB collection wrapper class for logging
	 */
	box.LOG_DB = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// waiting log data set
			waitingLogDataSet = [],

			// log.
			log;

			self.log = log = function(data) {
				//REQUIRED: data

				waitingLogDataSet.push(data);
			};

			CONNECT_TO_DB_SERVER.addInitDBFunc(function(nativeDB) {

				var
				// MongoDB collection
				collection = nativeDB.collection(box.boxName + '.' + name);

				self.log = log = function(data) {
					//REQUIRED: data

					// now
					data.time = new Date();

					collection.insert(data, {
						w : 0
					});
				};

				EACH(waitingLogDataSet, function(data) {
					log(data);
				});

				waitingLogDataSet = undefined;
			});
		}
	});
});

/**
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, function(origin) {

	global.NODE_CONFIG = COMBINE([origin, {

		// db log mode
		isDBLogMode : false,

		// init max data count = 1000
		maxDataCount : 1000
	}]);
});
