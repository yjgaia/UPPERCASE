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

	// remove to delete values.
	removeToDeleteValues = function(data) {
		//REQUIRED: data

		EACH(data, function(value, name) {

			if (value === TO_DELETE) {

				REMOVE({
					data : data,
					name : name
				});

			} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {

				removeToDeleteValues(value);
			}
		});
	},

	// make up filter.
	makeUpFilter = function(filter, isIncludeRemovedData) {

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

			if (isIncludeRemovedData !== true) {
				filter.__IS_ENABLED = true;
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
				//OPTIONAL: idOrParams
				//OPTIONAL: idOrParams.isRandom
				//OPTIONAL: idOrParams.isIncludeRemovedData
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

			self.remove = remove = function(idOrParams, callbackOrHandlers) {
				//REQUIRED: idOrParams
				//REQUIRED: idOrParams.id
				//OPTIONAL: idOrParams.isRemoveForever
				//OPTIONAL: callbackOrHandlers

				waitingRemoveInfos.push({
					idOrParams : idOrParams,
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
				//OPTIONAL: params.isIncludeRemovedData
				//REQUIRED: callbackOrHandlers

				waitingFindInfos.push({
					params : params,
					callbackOrHandlers : callbackOrHandlers
				});
			};

			self.count = count = function(filterOrParams, callbackOrHandlers) {
				//OPTIONAL: filterOrParams
				//OPTIONAL: filterOrParams.filter
				//OPTIONAL: filterOrParams.isIncludeRemovedData
				//REQUIRED: callbackOrHandlers

				waitingCountInfos.push({
					filterOrParams : filterOrParams,
					callbackOrHandlers : callbackOrHandlers
				});
			};

			self.checkIsExists = checkIsExists = function(filterOrParams, callbackOrHandlers) {
				//OPTIONAL: filterOrParams
				//OPTIONAL: filterOrParams.filter
				//OPTIONAL: filterOrParams.isIncludeRemovedData
				//REQUIRED: callbackOrHandlers

				waitingCheckIsExistsInfos.push({
					filterOrParams : filterOrParams,
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

				// add history.
				addHistory = function(method, id, change, time) {
					//REQUIRED: method
					//REQUIRED: id
					//REQUIRED: change
					//REQUIRED: time

					historyCollection.findOne({
						id : id
					}, function(error, savedData) {

						var
						// info
						info;

						if (error === TO_DELETE) {

							info = {
								method : method,
								change : change,
								time : time
							};

							if (savedData === TO_DELETE) {

								historyCollection.insert({
									id : id,
									timeline : [info]
								}, {
									w : 0
								});

							} else {

								historyCollection.update({
									id : id
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
						console.log('[UPPERCASE.IO-DB] `' + box.boxName + '.' + name + '` DATA SAVED:', data);
					}
				},

				// log error.
				logError = function(errorInfo, errorHandler) {
					//REQUIRED: errorInfo
					//REQUIRED: errorInfo.errorMsg
					//OPTIONAL: errorHandler

					// now
					errorInfo.time = new Date();

					errorLogCollection.insert(errorInfo, {
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

						removeToDeleteValues(data);

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

								addHistory('create', savedData._id.toString(), data, data.createTime);

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
					//OPTIONAL: params.isIncludeRemovedData
					//REQUIRED: callbackOrHandlers

					var
					// filter
					filter = params.filter,

					// sort
					sort = params.sort,

					// is include removed data
					isIncludeRemovedData = params.isIncludeRemovedData,

					// callback
					callback,

					// not exists handler
					notExistsHandler,

					// error handler
					errorHandler,

					// error message
					errorMsg;

					try {

						makeUpFilter(filter, isIncludeRemovedData);

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
					//OPTIONAL: idOrParams.isIncludeRemovedData
					//REQUIRED: callbackOrHandlers

					var
					// filter
					filter,

					// sort
					sort,

					// is random
					isRandom,

					// is include removed data
					isIncludeRemovedData,

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
							isIncludeRemovedData = idOrParams.isIncludeRemovedData;
						}

						// when id
						else if (idOrParams !== undefined) {

							filter = {
								_id : gen_id(idOrParams)
							};
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
								sort : sort,
								isIncludeRemovedData : isIncludeRemovedData
							}, {
								error : errorHandler,
								notExists : function() {

									filter.__RANDOM_KEY = {
										$lte : randomKey
									};

									innerGet({
										filter : filter,
										sort : sort,
										isIncludeRemovedData : isIncludeRemovedData
									}, callbackOrHandlers);
								},
								success : callback
							});

						} else {

							innerGet({
								filter : filter,
								sort : sort,
								isIncludeRemovedData : isIncludeRemovedData
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

						EACH(data, function(value, name) {
							if (name === 'id' || name === '_id' || name === '__IS_ENABLED' || name === 'createTime' || name === '$inc') {
								delete data[name];
							} else if (value === TO_DELETE) {

								if ($unset === undefined) {
									$unset = {};
								}

								$unset[name] = '';
								delete data[name];

							} else {
								isSetData = true;
							}
						});

						data.lastUpdateTime = new Date();

						updateData = {
							$set : data
						};

						if ($unset !== undefined) {
							updateData.$unset = $unset;
						}

						if ($inc !== undefined) {
							updateData.$inc = $inc;
						}

						collection.update(filter, updateData, {
							safe : true
						}, function(error, result) {

							if (result === 0) {

								if (notExistsHandler !== undefined) {
									notExistsHandler();
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

											addHistory('update', id, updateData, data.lastUpdateTime);
										}

										// clean saved data before callback.
										cleanData(savedData);

										if (callback !== undefined) {
											callback(savedData);
										}
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

					// if catch error
					catch (error) {

						logError({
							method : 'update',
							data : data,
							errorMsg : error.toString()
						}, errorHandler);
					}
				};

				self.remove = remove = function(idOrParams, callbackOrHandlers) {
					//REQUIRED: idOrParams
					//REQUIRED: idOrParams.id
					//OPTIONAL: idOrParams.isRemoveForever
					//OPTIONAL: callbackOrHandlers

					var
					// id
					id,

					// is remove forever
					isRemoveForever,

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

						if (CHECK_IS_DATA(idOrParams) !== true) {
							id = idOrParams;
						} else {
							id = idOrParams.id;
							isRemoveForever = idOrParams.isRemoveForever;
						}

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
								}
							},

							success : function(savedData) {

								var
								// remove data
								removeData;

								collection.update(filter, {
									$set : removeData = {
										__IS_ENABLED : false,
										removeTime : new Date()
									}
								}, {
									safe : true
								}, function(error, result) {

									if (result === 0) {

										if (notExistsHandler !== undefined) {
											notExistsHandler();
										}

									} else if (error === TO_DELETE) {

										addHistory('remove', savedData.id, removeData, removeData.removeTime);

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
					//OPTIONAL: params.isIncludeRemovedData
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

					// is include remove data
					isIncludeRemovedData,

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
							isIncludeRemovedData = params.isIncludeRemovedData;
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

				self.count = count = function(filterOrParams, callbackOrHandlers) {
					//OPTIONAL: filterOrParams
					//OPTIONAL: filterOrParams.filter
					//OPTIONAL: filterOrParams.isIncludeRemovedData
					//REQUIRED: callbackOrHandlers

					var
					// filter
					filter,

					// is include remove data
					isIncludeRemovedData,

					// callback
					callback,

					// error handler
					errorHandler,

					// error message
					errorMsg;

					try {

						if (CHECK_IS_DATA(filterOrParams) !== true) {
							filter = filterOrParams;
						} else {
							filter = filterOrParams.filter;
							isIncludeRemovedData = filterOrParams.isIncludeRemovedData;
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

				self.checkIsExists = checkIsExists = function(filterOrParams, callbackOrHandlers) {
					//OPTIONAL: filterOrParams
					//OPTIONAL: filterOrParams.filter
					//OPTIONAL: filterOrParams.isIncludeRemovedData
					//REQUIRED: callbackOrHandlers

					var
					// filter
					filter,

					// is include remove data
					isIncludeRemovedData,

					// callback
					callback,

					// error handler
					errorHandler,

					// error message
					errorMsg;

					try {

						if (CHECK_IS_DATA(filterOrParams) !== true) {
							filter = filterOrParams;
						} else {
							filter = filterOrParams.filter;
							isIncludeRemovedData = filterOrParams.isIncludeRemovedData;
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
					remove(info.idOrParams, info.callbackOrHandlers);
				});

				waitingRemoveInfos = undefined;

				EACH(waitingFindInfos, function(info) {
					find(info.params, info.callbackOrHandlers);
				});

				waitingFindInfos = undefined;

				EACH(waitingCountInfos, function(info) {
					count(info.filterOrParams, info.callbackOrHandlers);
				});

				waitingCountInfos = undefined;

				EACH(waitingCheckIsExistsInfos, function(info) {
					checkIsExists(info.filterOrParams, info.callbackOrHandlers);
				});

				waitingCheckIsExistsInfos = undefined;
			});
		}
	});
});
