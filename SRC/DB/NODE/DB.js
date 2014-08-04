FOR_BOX(function(box) {
	'use strict';

	var
	//IMPORT: MongoDB ObjectID
	ObjectID = require('mongodb').ObjectID,

	// generate _id.
	gen_id = function(id) {
		//REQUIRED: id

		return new ObjectID(id);
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

		// delete __IS_ENABLED.
		delete data.__IS_ENABLED;

		// delete __RANDOM_KEY.
		delete data.__RANDOM_KEY;

		return data;
	},

	// remove to delete params.
	removeToDeleteParams = function(data) {
		//REQUIRED: data

		EACH(data, function(value, key) {

			if (value === TO_DELETE) {

				REMOVE({
					data : data,
					key : key
				});

			} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {

				removeToDeleteParams(value);
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
					filter._id = gen_id(id);
				}
				delete filter.id;
			}

			filter.__IS_ENABLED = true;

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

	/**
	 * MongoDB collection wrapper class
	 */
	box.DB = CLASS({

		init : function(inner, self, name) {
			'use strict';
			//REQUIRED: name

			var
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
			checkIsExists;

			self.create = create = function(data, callbackOrHandlers) {
				//REQUIRED: data
				//OPTIONAL: callbackOrHandlers

				waitingCreateInfos.push({
					data : data,
					callbackOrHandlers : callbackOrHandlers
				});
			};

			self.get = get = function(idOrParams, callbackOrHandlers) {
				//REQUIRED: idOrParams
				//OPTIONAL: idOrParams.isRandom
				//REQUIRED: callbackOrHandlers

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

				waitingUpdateInfos.push({
					data : data,
					callbackOrHandlers : callbackOrHandlers
				});
			};

			self.remove = remove = function(id, callbackOrHandlers) {
				//REQUIRED: id
				//OPTIONAL: callbackOrHandlers

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
				//REQUIRED: callbackOrHandlers

				waitingFindInfos.push({
					params : params,
					callbackOrHandlers : callbackOrHandlers
				});
			};

			self.count = count = function(filter, callbackOrHandlers) {
				//OPTIONAL: filter
				//REQUIRED: callbackOrHandlers

				waitingCountInfos.push({
					filter : filter,
					callbackOrHandlers : callbackOrHandlers
				});
			};

			self.checkIsExists = checkIsExists = function(filter, callbackOrHandlers) {
				//OPTIONAL: filter
				//REQUIRED: callbackOrHandlers

				waitingCheckIsExistsInfos.push({
					filter : filter,
					callbackOrHandlers : callbackOrHandlers
				});
			};

			CONNECT_TO_DB_SERVER.addInitDBFunc(function(nativeDB) {

				var
				// MongoDB collection
				collection = nativeDB.collection(box.boxName + '.' + name),

				// MongoDB collection for backup
				backupCollection = nativeDB.collection(box.boxName + '.' + name + '__BACKUP'),

				// MongoDB collection for error log
				errorLogCollection = nativeDB.collection(box.boxName + '.' + name + '__ERROR'),

				// backup.
				backup = function(params) {
					//REQUIRED: params
					//REQUIRED: params.method
					//REQUIRED: params.data

					var
					// method
					method = params.method,

					// data
					data = params.data,

					// now
					now = new Date(),

					// info
					info = {
						method : method,
						time : now,
						data : data
					};

					backupCollection.save(info, {
						w : 0
					});

					if (NODE_CONFIG.isDBLogMode === true) {
						console.log('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '` DATA SAVED:', info);
					}
				},

				// log error.
				logError = function(errorInfo, errorHandler) {
					//REQUIRED: errorInfo
					//REQUIRED: errorInfo.errorMsg
					//OPTIONAL: errorHandler

					// now
					errorInfo.time = new Date();

					errorLogCollection.save(errorInfo, {
						w : 0
					});

					if (errorHandler !== undefined) {
						errorHandler(errorInfo.errorMsg);
					} else {
						console.log('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '` ERROR:', errorInfo);
					}
				},

				// inner get.
				innerGet;

				self.create = create = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers

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

						// set is enabled.
						data.__IS_ENABLED = true;

						// set random key.
						data.__RANDOM_KEY = Math.random();

						// set create time.
						data.createTime = new Date();

						removeToDeleteParams(data);

						if (callbackOrHandlers !== undefined) {
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
						}

						collection.save(data, {
							safe : true
						}, function(error, savedData) {

							if (error === TO_DELETE) {

								backup({
									method : 'create',
									data : savedData
								});

								// clean saved data before callback.
								cleanData(savedData);

								if (callback !== undefined) {
									callback(savedData);
								}
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
					//REQUIRED: callbackOrHandlers

					var
					// filter
					filter = params.filter,

					// sort
					sort = params.sort,

					// callback
					callback,

					// not exists handler
					notExistsHandler,

					// error handler
					errorHandler,

					// error message
					errorMsg;

					try {

						makeUpFilter(filter);

						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							errorHandler = callbackOrHandlers.error;
						}

						collection.find(filter).sort(sort).limit(1).toArray(function(error, savedDataSet) {

							var
							// saved data
							savedData;

							if (error === TO_DELETE) {

								if (savedDataSet !== TO_DELETE && savedDataSet.length > 0) {

									savedData = savedDataSet[0];

									// clean saved data before callback.
									cleanData(savedData);

									callback(savedData);

								} else {
									if (notExistsHandler !== undefined) {
										notExistsHandler();
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
					//OPTIONAL: idOrParams.isRandom
					//REQUIRED: callbackOrHandlers

					var
					// filter
					filter,

					// sort
					sort,

					// is random
					isRandom,

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

					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = idOrParams;
						idOrParams = undefined;
					}

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						notExistsHandler = callbackOrHandlers.notExists;
						errorHandler = callbackOrHandlers.error;
					}

					try {

						// when params
						if (CHECK_IS_DATA(idOrParams) === true) {

							filter = idOrParams.filter;
							sort = idOrParams.sort;
							isRandom = idOrParams.isRandom;
						}

						// when id
						else if (idOrParams !== undefined) {

							filter = {
								_id : gen_id(idOrParams)
							};
						}

						// when undefined
						else {
							filter = {};
						}

						if (filter === undefined) {
							filter = {};
						}

						if (sort === undefined) {
							sort = {
								createTime : -1
							};
						}

						if (isRandom === true) {

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

							innerGet({
								filter : filter,
								sort : sort
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

					var
					// id
					id = data.id,

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

					// error message
					errorMsg;

					try {

						filter = {
							_id : gen_id(id),
							__IS_ENABLED : true
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

						NEXT([
						function(next) {
							collection.findOne(filter, next);
						},

						function(next) {
							return function(error, savedData) {

								var
								// others
								f;

								if (error === TO_DELETE) {

									if (savedData === TO_DELETE) {

										if (notExistsHandler !== undefined) {
											notExistsHandler();
										}

									} else {

										EACH(data, function(value, name) {
											if (name !== 'id' && name !== '_id' && name !== '__IS_ENABLED' && name !== 'createTime' && name !== '$inc') {
												savedData[name] = value;
											}
										});

										removeToDeleteParams(savedData);

										savedData.lastUpdateTime = new Date();

										if ($inc !== undefined) {

											collection.save(savedData, {
												safe : true
											}, function(error) {
												next(savedData, error);
											});

										} else {

											collection.save(savedData, {
												safe : true
											}, function(error) {
												next.next(savedData, error);
											});
										}
									}
								}

								// if error is not TO_DELETE
								else {

									logError({
										method : 'update',
										data : data,
										errorMsg : error.toString()
									}, errorHandler);
								}
							};
						},

						function(next) {
							return function(savedData, error) {

								collection.update(filter, {
									$inc : $inc
								}, function(error) {

									EACH($inc, function(value, name) {
										savedData[name] += value;
									});

									next(savedData, error);
								});
							};
						},

						function(next) {
							return function(savedData, error) {

								if (error === TO_DELETE) {

									backup({
										method : 'update',
										data : savedData
									});

									// clean saved data before callback.
									cleanData(savedData);

									if (callback !== undefined) {
										callback(savedData);
									}
								}

								// if error is not TO_DELETE
								else {

									logError({
										method : 'update',
										data : data,
										errorMsg : error.toString()
									}, errorHandler);
								}
							};
						}]);
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

				self.remove = remove = function(id, callbackOrHandlers) {
					//REQUIRED: id
					//OPTIONAL: callbackOrHandlers

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
							_id : gen_id(id),
							__IS_ENABLED : true
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

						collection.findOne(filter, function(error, savedData) {

							var
							// others
							f;

							if (error === TO_DELETE) {

								if (savedData === TO_DELETE) {

									if (notExistsHandler !== undefined) {
										notExistsHandler();
									}

								} else {

									savedData.__IS_ENABLED = false;

									savedData.removeTime = new Date();

									collection.save(savedData, {
										safe : true
									}, function(error) {

										if (error === TO_DELETE) {

											backup({
												method : 'remove',
												data : savedData
											});

											// clean saved data before callback.
											cleanData(savedData);

											if (callback !== undefined) {
												callback(savedData);
											}
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
					//REQUIRED: callbackOrHandlers

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

						proc = function(error, savedDataSet) {

							if (error === TO_DELETE) {

								if (savedDataSet !== TO_DELETE) {

									// clean saved data before callback.
									EACH(savedDataSet, function(savedData, i) {
										cleanData(savedData);
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

					// if catch error
					catch (error) {

						logError({
							method : 'find',
							params : params,
							errorMsg : error.toString()
						}, errorHandler);
					}
				};

				self.count = count = function(filter, callbackOrHandlers) {
					//OPTIONAL: filter
					//REQUIRED: callbackOrHandlers

					var
					// callback
					callback,

					// error handler
					errorHandler,

					// error message
					errorMsg;

					try {

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

						collection.find(filter).count(function(error, count) {

							if (error === TO_DELETE) {
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

					// if catch error
					catch (error) {

						logError({
							method : 'count',
							filter : filter,
							errorMsg : error.toString()
						}, errorHandler);
					}
				};

				self.checkIsExists = checkIsExists = function(filter, callbackOrHandlers) {
					//OPTIONAL: filter
					//REQUIRED: callbackOrHandlers

					var
					// callback
					callback,

					// error handler
					errorHandler,

					// error message
					errorMsg;

					try {

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

						collection.find(filter).count(function(error, count) {

							if (error === TO_DELETE) {

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

					// if catch error
					catch (error) {

						logError({
							method : 'checkIsExists',
							filter : filter,
							errorMsg : error.toString()
						}, errorHandler);
					}
				};

				// run all waiting infos.

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
					count(info.filter, info.callbackOrHandlers);
				});

				waitingCountInfos = undefined;

				EACH(waitingCheckIsExistsInfos, function(info) {
					checkIsExists(info.filter, info.callbackOrHandlers);
				});

				waitingCheckIsExistsInfos = undefined;
			});
		}
	});
});
