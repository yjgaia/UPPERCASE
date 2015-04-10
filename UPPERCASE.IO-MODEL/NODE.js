FOR_BOX(function(box) {
	'use strict';

	OVERRIDE(box.MODEL, function(origin) {

		/**
		 * Model(include CRUD functions) class
		 */
		box.MODEL = CLASS({

			init : function(inner, self, params) {
				//REQUIRED: params
				//REQUIRED: params.name
				//OPTIONAL: params.initData
				//OPTIONAL: params.methodConfig
				//OPTIONAL: params.isNotUsingObjectId
				//OPTIONAL: params.isNotUsingHistory

				var
				// name
				name = params.name,

				// init data.
				initData = params.initData,

				// method config
				methodConfig = params.methodConfig,
				
				// is not using object id
				isNotUsingObjectId = params.isNotUsingObjectId,

				// is not using history
				isNotUsingHistory = params.isNotUsingHistory,

				// create config
				createConfig,

				// get config
				getConfig,

				// update config
				updateConfig,

				// remove config
				removeConfig,

				// find config
				findConfig,

				// count onifg
				countConfig,

				// check is exists conifg
				checkIsExistsConfig,

				// create valid
				createValid,

				// update valid
				updateValid,

				// create role
				createRole,

				// get role
				getRole,

				// update role
				updateRole,

				// remove role
				removeRole,

				// find role
				findRole,

				// count role
				countRole,

				// check is exists role
				checkIsExistsRole,

				// create admin role
				createAdminRole,

				// update admin role
				updateAdminRole,

				// remove admin role
				removeAdminRole,

				// create auth key
				createAuthKey,

				// update auth key
				updateAuthKey,

				// remove auth key
				removeAuthKey,

				// is _id assignable
				is_idAssignable,

				// before create listeners
				beforeCreateListeners = [],

				// after create listeners
				afterCreateListeners = [],

				// get listeners
				getListeners = [],

				// before update listeners
				beforeUpdateListeners = [],

				// after update listeners
				afterUpdateListeners = [],

				// before remove listeners
				beforeRemoveListeners = [],

				// after remove listeners
				afterRemoveListeners = [],

				// find listeners
				findListeners = [],

				// count listeners
				countListeners = [],

				// check is exists listeners
				checkIsExistsListeners = [],

				// db
				db = box.DB({
					name : name,
					isNotUsingObjectId : isNotUsingObjectId,
					isNotUsingHistory : isNotUsingHistory
				}),

				// get name.
				getName,

				// get init data.
				getInitData,

				// get create valid.
				getCreateValid,

				// get update valid.
				getUpdateValid,

				// get db.
				getDB,

				// on.
				on,

				// inner create.
				innerCreate,

				// inner get.
				innerGet,

				// inner update.
				innerUpdate,

				// inner remove.
				innerRemove,

				// inner find.
				innerFind,

				// inner count.
				innerCount,

				// inner check is exists.
				innerCheckIsExists,

				// create.
				create,

				// get.
				get,

				// update.
				update,
				
				// update no history.
				updateNoHistory,

				// remove.
				remove,

				// find.
				find,

				// count.
				count,

				// check is exists.
				checkIsExists;

				// init method config.
				if (methodConfig !== undefined) {

					createConfig = methodConfig.create;
					getConfig = methodConfig.get;
					updateConfig = methodConfig.update;
					removeConfig = methodConfig.remove;
					findConfig = methodConfig.find;
					countConfig = methodConfig.count;
					checkIsExistsConfig = methodConfig.checkIsExists;

					if (createConfig !== undefined) {
						createValid = createConfig.valid;
						createRole = createConfig.role;
						createAuthKey = createConfig.authKey;
						createAdminRole = createConfig.adminRole;
					}

					if (getConfig !== undefined) {
						getRole = getConfig.role;
					}

					if (updateConfig !== undefined) {
						updateValid = updateConfig.valid;
						updateRole = updateConfig.role;
						updateAuthKey = updateConfig.authKey;
						updateAdminRole = updateConfig.adminRole;
					}

					if (removeConfig !== undefined) {
						removeRole = removeConfig.role;
						removeAuthKey = removeConfig.authKey;
						removeAdminRole = removeConfig.adminRole;
					}

					if (findConfig !== undefined) {
						findRole = findConfig.role;
					}

					if (countConfig !== undefined) {
						countRole = countConfig.role;
					}

					if (checkIsExistsConfig !== undefined) {
						checkIsExistsRole = checkIsExistsConfig.role;
					}
				}

				// init not inited data set. (when not cpu clustering or worker id is 1)
				if ((CPU_CLUSTERING.getWorkerId() === undefined || CPU_CLUSTERING.getWorkerId() === 1) && initData !== undefined) {

					RUN(function() {

						var
						// or
						$or = [];

						EACH(initData, function(value, name) {

							var
							// filter
							filter;
							
							if (createValid !== undefined && createValid.getValidDataSet()[name].notEmpty === true) {
							
								filter = {};
								filter[name] = TO_DELETE;
							
								$or.push(filter);
							}
						});

						db.find({
							filter : {
								$or : $or
							},
							isFindAll : true
						}, EACH(function(notInitedData) {
							
							console.log('[UPPERCASE.IO-MODEL] Found not inited data in `' + box.boxName + '.' + name + '`.', notInitedData);

							EACH(initData, function(value, name) {
								if (notInitedData[name] === undefined) {
									notInitedData[name] = value;
								}
							});

							db.update(notInitedData);
						}));
					});
				}

				self.getName = getName = function() {
					return name;
				};

				inner.getInitData = getInitData = function() {
					return initData;
				};

				inner.getCreateValid = getCreateValid = function() {
					return createValid;
				};

				inner.getUpdateValid = getUpdateValid = function() {
					return updateValid;
				};

				self.getDB = getDB = function() {
					return db;
				};

				inner.on = on = function(methodName, funcOrFuncs) {
					//REQUIRED: methodName
					//REQUIRED: funcOrFuncs
					//OPTIONAL: funcOrFuncs.before
					//OPTIONAL: funcOrFuncs.after

					// when create method
					if (methodName === 'create') {

						// add before listener.
						if (funcOrFuncs.before !== undefined) {
							beforeCreateListeners.push(funcOrFuncs.before);
						}

						// add after listener.
						if (funcOrFuncs.after !== undefined) {
							afterCreateListeners.push(funcOrFuncs.after);
						}
					}

					// when get method
					else if (methodName === 'get') {

						// add listener.
						getListeners.push(funcOrFuncs);
					}

					// when update method
					else if (methodName === 'update') {

						// add before listener.
						if (funcOrFuncs.before !== undefined) {
							beforeUpdateListeners.push(funcOrFuncs.before);
						}

						// add after listener.
						if (funcOrFuncs.after !== undefined) {
							afterUpdateListeners.push(funcOrFuncs.after);
						}
					}

					// when remove method
					else if (methodName === 'remove') {

						// add before listener.
						if (funcOrFuncs.before !== undefined) {
							beforeRemoveListeners.push(funcOrFuncs.before);
						}

						// add after listener.
						if (funcOrFuncs.after !== undefined) {
							afterRemoveListeners.push(funcOrFuncs.after);
						}
					}

					// when find method
					else if (methodName === 'find') {

						// add listener.
						findListeners.push(funcOrFuncs);
					}

					// when count method
					else if (methodName === 'count') {

						// add listener.
						countListeners.push(funcOrFuncs);
					}

					// when check is exists method
					else if (methodName === 'checkIsExists') {

						// add listener.
						checkIsExistsListeners.push(funcOrFuncs);
					}
				};

				innerCreate = function(data, ret, clientInfo) {

					var
					// valid result
					validResult,

					// is not run next
					isNotRunNext;

					// init data.
					if (initData !== undefined) {
						EACH(initData, function(value, name) {
							data[name] = value;
						});
					}

					// valid data.
					if (createValid !== undefined) {
						validResult = createValid.check(data);
					}

					// when has error
					if (validResult !== undefined && validResult.checkHasError() === true) {

						ret({
							validErrors : validResult.getErrors()
						});
					}

					// when has not error
					else {

						NEXT([
						function(next) {

							// run before create listeners.
							EACH(beforeCreateListeners, function(beforeCreateListener) {

								var
								// b
								b = beforeCreateListener(data, next, ret, clientInfo);

								if (isNotRunNext !== true && b === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						function() {
							return function() {

								// create data in database.
								db.create(data, {

									error : function(errorMsg) {
										ret({
											errorMsg : errorMsg
										});
									},

									success : function(savedData) {

										// run after create listeners.
										EACH(afterCreateListeners, function(afterCreateListener) {
											afterCreateListener(savedData, clientInfo);
										});

										// broadcast.
										box.BROADCAST({
											roomName : name + '/create',
											methodName : 'create',
											data : savedData
										});

										// broadcast by property.
										EACH(savedData, function(value, propertyName) {
											box.BROADCAST({
												roomName : name + '/' + propertyName + '/' + value + '/create',
												methodName : 'create',
												data : savedData
											});
										});

										ret({
											savedData : savedData
										});
									}
								});
							};
						}]);
					}
				};

				innerGet = function(idOrParams, ret, clientInfo) {
					//REQUIRED: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.isToCache

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

					// is not run next
					isNotRunNext;

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

					// get data in database.
					db.get({
						id : id,
						filter : filter,
						sort : sort,
						isRandom : isRandom,
						isToCache : isToCache
					}, {

						error : function(errorMsg) {
							ret({
								errorMsg : errorMsg
							});
						},

						notExists : function() {
							ret();
						},

						success : function(savedData) {

							// run get listeners.
							EACH(getListeners, function(getListener) {

								var
								// b
								b = getListener(savedData, ret, clientInfo);

								if (isNotRunNext !== true && b === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {

								ret({
									savedData : savedData
								});
							}
						}
					});
				};

				innerUpdate = function(data, ret, clientInfo, isNotToSaveHistory) {

					var
					// id
					id = data.id,

					// valid result
					validResult,

					// is not run next
					isNotRunNext;

					// valid data.
					if (updateValid !== undefined) {
						validResult = updateValid.checkForUpdate(data);
					}

					data.id = id;

					// when has error
					if (validResult !== undefined && validResult.checkHasError() === true) {

						ret({
							validErrors : validResult.getErrors()
						});
					}

					// when has not error
					else {

						NEXT([
						function(next) {

							// run before update listeners.
							EACH(beforeUpdateListeners, function(beforeUpdateListener) {

								var
								// b
								b = beforeUpdateListener(data, next, ret, clientInfo);

								if (isNotRunNext !== true && b === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						function() {
							return function() {

								// update data in database.
								(isNotToSaveHistory === true ? db.updateNoHistory : db.update)(data, {

									error : function(errorMsg) {
										ret({
											errorMsg : errorMsg
										});
									},

									notExists : function() {
										ret();
									},

									success : function(savedData, originData) {

										// run after update listeners.
										EACH(afterUpdateListeners, function(afterUpdateListener) {
											afterUpdateListener(savedData, originData, clientInfo);
										});

										// broadcast.
										box.BROADCAST({
											roomName : name + '/' + savedData.id,
											methodName : 'update',
											data : savedData
										});

										// broadcast by property.
										EACH(savedData, function(value, propertyName) {
											box.BROADCAST({
												roomName : name + '/' + propertyName + '/' + value + '/update',
												methodName : 'update',
												data : savedData
											});
										});

										ret({
											savedData : savedData,
											originData : originData
										});
									}
								});
							};
						}]);
					}
				};

				innerRemove = function(id, ret, clientInfo) {

					var
					// is not run next
					isNotRunNext;

					NEXT([
					function(next) {

						// run before remove listeners.
						EACH(beforeRemoveListeners, function(beforeRemoveListener) {

							var
							// b
							b = beforeRemoveListener(id, next, ret, clientInfo);

							if (isNotRunNext !== true && b === false) {
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					function() {
						return function() {

							// remove data in database.
							db.remove(id, {

								error : function(errorMsg) {
									ret({
										errorMsg : errorMsg
									});
								},

								notExists : function() {
									ret();
								},

								success : function(originData) {

									if (originData !== undefined) {

										// run after remove listeners.
										EACH(afterRemoveListeners, function(afterRemoveListener) {
											afterRemoveListener(originData, clientInfo);
										});

										// broadcast.
										box.BROADCAST({
											roomName : name + '/' + originData.id,
											methodName : 'remove',
											data : originData
										});

										// broadcast by property.
										EACH(originData, function(value, propertyName) {
											box.BROADCAST({
												roomName : name + '/' + propertyName + '/' + value + '/remove',
												methodName : 'remove',
												data : originData
											});
										});
									}

									ret({
										originData : originData
									});
								}
							});
						};
					}]);
				};

				innerFind = function(params, ret, clientInfo) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//OPTIONAL: params.isToCache

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

					// is not run next
					isNotRunNext;

					if (params !== undefined) {
						filter = params.filter;
						sort = params.sort;
						start = INTEGER(params.start);
						count = INTEGER(params.count);
						isFindAll = params.isFindAll;
						isToCache = params.isToCache;
					}

					// find data set in database.
					db.find({
						filter : filter,
						sort : sort,
						start : start,
						count : count,
						isFindAll : isFindAll,
						isToCache : isToCache
					}, {

						error : function(errorMsg) {
							ret({
								errorMsg : errorMsg
							});
						},

						success : function(savedDataSet) {

							// run find listeners.
							EACH(findListeners, function(findListener) {

								var
								// b
								b = findListener(savedDataSet, ret, clientInfo);

								if (isNotRunNext !== true && b === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {

								ret({
									savedDataSet : savedDataSet
								});
							}
						}
					});
				};

				innerCount = function(params, ret, clientInfo) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache

					var
					// filter
					filter,
					
					// is to cache
					isToCache,

					// is not run next
					isNotRunNext;

					if (params !== undefined) {
						filter = params.filter;
						isToCache = params.isToCache;
					}

					// count data in database.
					db.count({
						filter : filter,
						isToCache : isToCache
					}, {

						error : function(errorMsg) {
							ret({
								errorMsg : errorMsg
							});
						},

						success : function(count) {

							// run count listeners.
							EACH(countListeners, function(countListener) {

								var
								// b
								b = countListener(count, ret, clientInfo);

								if (isNotRunNext !== true && b === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {

								ret({
									count : count
								});
							}
						}
					});
				};

				innerCheckIsExists = function(params, ret, clientInfo) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache

					var
					// filter
					filter,
					
					// is to cache
					isToCache,

					// is not run next
					isNotRunNext;

					if (params !== undefined) {
						filter = params.filter;
						isToCache = params.isToCache;
					}

					// check is exists data in database.
					db.checkIsExists({
						filter : filter,
						isToCache : isToCache
					}, {

						error : function(errorMsg) {
							ret({
								errorMsg : errorMsg
							});
						},

						success : function(isExists) {

							// run check is exists listeners.
							EACH(checkIsExistsListeners, function(checkIsExistsListener) {

								var
								// b
								b = checkIsExistsListeners(isExists, ret, clientInfo);

								if (isNotRunNext !== true && b === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {

								ret({
									isExists : isExists
								});
							}
						}
					});
				};

				self.create = create = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers

					var
					// callback.
					callback,

					// not valid handler.
					notValidHandler,

					// error handler.
					errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notValidHandler = callbackOrHandlers.notValid;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerCreate(data, function(result) {

						var
						// error msg
						errorMsg,

						// valid errors
						validErrors,

						// saved data
						savedData;

						if (result !== undefined) {

							errorMsg = result.errorMsg;
							validErrors = result.validErrors;
							savedData = result.savedData;

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/create` ERROR: ' + errorMsg));
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								} else {
									console.log(CONSOLE_YELLOW('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/create` NOT VALID.'), validErrors);
								}
							} else if (callback !== undefined) {
								callback(savedData);
							}

						} else if (callback !== undefined) {
							callback();
						}
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

					var
					// callback.
					callback,

					// not exists handler.
					notExistsHandler,

					// error handler.
					errorHandler;

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						notExistsHandler = callbackOrHandlers.notExists;
						errorHandler = callbackOrHandlers.error;
					}

					innerGet(idOrParams, function(result) {

						var
						// error msg
						errorMsg,

						// saved data
						savedData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							savedData = result.savedData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/get` ERROR: ' + errorMsg));
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/get` NOT EXISTS.'), idOrParams);
							}
						} else {
							callback(savedData);
						}
					});
				};

				self.update = update = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: callbackOrHandlers

					var
					// callback.
					callback,

					// not exists handler.
					notExistsHandler,

					// not valid handler.
					notValidHandler,

					// error handler.
					errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							notValidHandler = callbackOrHandlers.notValid;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerUpdate(data, function(result) {

						var
						// error msg
						errorMsg,

						// valid errors
						validErrors,

						// saved data
						savedData,
						
						// origin data
						originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							validErrors = result.validErrors;
							savedData = result.savedData;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` ERROR: ' + errorMsg));
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` NOT VALID.'), validErrors);
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` NOT EXISTS.'), data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}
					});
				};
				
				self.updateNoHistory = updateNoHistory = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: callbackOrHandlers

					var
					// callback.
					callback,

					// not exists handler.
					notExistsHandler,

					// not valid handler.
					notValidHandler,

					// error handler.
					errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							notValidHandler = callbackOrHandlers.notValid;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerUpdate(data, function(result) {

						var
						// error msg
						errorMsg,

						// valid errors
						validErrors,

						// saved data
						savedData,
						
						// origin data
						originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							validErrors = result.validErrors;
							savedData = result.savedData;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` ERROR: ' + errorMsg));
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` NOT VALID.'), validErrors);
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` NOT EXISTS.'), data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}
						
					}, undefined, true);
				};
				
				self.remove = remove = function(id, callbackOrHandlers) {
					//REQUIRED: id
					//OPTIONAL: callbackOrHandlers

					var
					// callback.
					callback,

					// not exists handler.
					notExistsHandler,

					// error handler.
					errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerRemove(id, function(result) {

						var
						// error msg
						errorMsg,

						// origin data
						originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/remove` ERROR: ' + errorMsg));
							}
						} else if (originData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/remove` NOT EXISTS.'), id);
							}
						} else if (callback !== undefined) {
							callback(originData);
						}
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

					var
					// callback.
					callback,

					// error handler.
					errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerFind(params, function(result) {

						var
						// error msg
						errorMsg = result.errorMsg,

						// saved data set
						savedDataSet = result.savedDataSet;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/find` ERROR: ' + errorMsg));
							}
						} else {
							callback(savedDataSet);
						}
					});
				};

				self.count = count = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// error handler.
					errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerCount(params, function(result) {

						var
						// error msg
						errorMsg = result.errorMsg,

						// count
						count = result.count;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/count` ERROR: ' + errorMsg));
							}
						} else {
							callback(count);
						}
					});
				};

				self.checkIsExists = checkIsExists = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// error handler.
					errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerCheckIsExists(params, function(result) {

						var
						// error msg
						errorMsg = result.errorMsg,

						// is exists
						isExists = result.isExists;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/checkIsExists` ERROR: ' + errorMsg));
							}
						} else {
							callback(isExists);
						}
					});
				};

				// init room for create, get, find.
				box.ROOM(name, function(clientInfo, on) {

					// init create.
					if (createConfig !== false) {

						// on create.
						on('create', function(data, ret) {
							
							// ignore undefined data attack.
							if (data !== undefined) {

								if (createAdminRole !== undefined) {
	
									if (createRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
										data : clientInfo.roles,
										value : createAdminRole
									}) === true)) {
	
										innerCreate(data, ret, clientInfo);
	
									} else {
	
										ret({
											isNotAuthed : true
										});
									}
	
								} else {
	
									if (createRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
										data : clientInfo.roles,
										value : createRole
									}) === true)) {
	
										// inject auth key.
										if (createAuthKey !== undefined) {
											data[createAuthKey] = clientInfo.authKey;
										}
	
										innerCreate(data, ret, clientInfo);
	
									} else {
	
										ret({
											isNotAuthed : true
										});
									}
								}
							}
						});
					}

					// init get.
					if (getConfig !== false) {

						// on get.
						on('get', function(idOrParams, ret) {
						
							if (getRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								data : clientInfo.roles,
								value : getRole
							}) === true)) {
								
								if (idOrParams !== undefined && CHECK_IS_DATA(idOrParams) === true) {

									// delete for server params.
									delete idOrParams.isToCache;
								}

								innerGet(idOrParams, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init update.
					if (updateConfig !== false) {

						// on update.
						on('update', function(data, ret) {
							
							// ignore undefined data attack.
							if (data !== undefined) {

								if (updateRole === undefined || (clientInfo.roles !== undefined && (CHECK_IS_IN({
									data : clientInfo.roles,
									value : updateRole
								}) === true || CHECK_IS_IN({
									data : clientInfo.roles,
									value : updateAdminRole
								}) === true))) {
	
									// check and inject auth key. (when not admin)
									if (updateAuthKey !== undefined && (clientInfo.roles !== undefined && CHECK_IS_IN({
										data : clientInfo.roles,
										value : updateAdminRole
									}) === true) !== true) {
	
										// get data in database.
										db.get(data.id, {
	
											error : function(errorMsg) {
												ret({
													errorMsg : errorMsg
												});
											},
	
											notExists : function() {
												ret();
											},
	
											success : function(savedData) {
	
												// check auth key.
												if (savedData[updateAuthKey] === clientInfo.authKey) {
	
													// do not change auth key.
													data[updateAuthKey] = clientInfo.authKey;
	
													innerUpdate(data, ret, clientInfo);
												}
	
												// not authed
												else {
													ret({
														isNotAuthed : true
													});
												}
											}
										});
	
									} else {
										innerUpdate(data, ret, clientInfo);
									}
	
								} else {
	
									ret({
										isNotAuthed : true
									});
								}
							}
						});
					}

					// init remove.
					if (removeConfig !== false) {

						// on remove.
						on('remove', function(id, ret) {
							
							// ignore undefined data attack.
							if (id !== undefined) {

								if (removeRole === undefined || (clientInfo.roles !== undefined && (CHECK_IS_IN({
									data : clientInfo.roles,
									value : removeRole
								}) === true || CHECK_IS_IN({
									data : clientInfo.roles,
									value : removeAdminRole
								}) === true))) {
	
									// check auth key. (when not admin)
									if (removeAuthKey !== undefined && (clientInfo.roles !== undefined && CHECK_IS_IN({
										data : clientInfo.roles,
										value : removeAdminRole
									}) === true) !== true) {
	
										// get data in database.
										db.get(id, {
	
											error : function(errorMsg) {
												ret({
													errorMsg : errorMsg
												});
											},
	
											notExists : function() {
												ret();
											},
	
											success : function(savedData) {
	
												// check auth key.
												if (savedData[removeAuthKey] === clientInfo.authKey) {
													innerRemove(id, ret, clientInfo);
												}
	
												// not authed
												else {
													ret({
														isNotAuthed : true
													});
												}
											}
										});
	
									} else if (removeAuthKey === undefined && removeAdminRole !== undefined) {
	
										if (clientInfo.roles !== undefined && CHECK_IS_IN({
											data : clientInfo.roles,
											value : removeAdminRole
										}) === true) {
	
											innerRemove(id, ret, clientInfo);
	
										} else {
	
											ret({
												isNotAuthed : true
											});
										}
	
									} else {
										innerRemove(id, ret, clientInfo);
									}
	
								} else {
	
									ret({
										isNotAuthed : true
									});
								}
							}
						});
					}

					// init find.
					if (findConfig !== false) {

						// on find.
						on('find', function(params, ret) {

							if (findRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								data : clientInfo.roles,
								value : findRole
							}) === true)) {

								if (params !== undefined) {

									// delete for server params.
									delete params.isFindAll;
									delete params.isToCache;
								}

								innerFind(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init count.
					if (countConfig !== false) {

						// on count.
						on('count', function(params, ret) {

							if (countRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								data : clientInfo.roles,
								value : countRole
							}) === true)) {
								
								if (params !== undefined) {

									// delete for server params.
									delete params.isToCache;
								}

								innerCount(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init check is exists.
					if (checkIsExistsConfig !== false) {

						// on check is exists.
						on('checkIsExists', function(params, ret) {
							
							if (checkIsExistsRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								data : clientInfo.roles,
								value : checkIsExistsRole
							}) === true)) {
								
								if (params !== undefined) {

									// delete for server params.
									delete params.isToCache;
								}

								innerCheckIsExists(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}
				});
			}
		});
	});
});
