FOR_BOX(function(box) {'use strict';

	OVERRIDE(box.MODEL, function(origin) {

		/**
		 * Model(include CRUD functions) class
		 */
		box.MODEL = CLASS({

			init : function(inner, self, params) {
				//REQUIRED: params
				//REQUIRED: params.name
				//OPTIONAL: params.config

				var
				// name
				name = params.name,

				// config
				config = params.config,

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

				// init data.
				_initData,

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
				db = box.DB(name),

				// log error.
				logError = function(errorMsg) {
					//REQUIRED: errorMsg

					console.log(CONSOLE_RED('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '` ERROR: ' + errorMsg));
				},

				// get name.
				getName,

				// get create valid.
				getCreateValid,

				// get update valid.
				getUpdateValid,

				// init data.
				initData,

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

				// remove.
				remove,

				// find.
				find,

				// count.
				count,

				// check is exists.
				checkIsExists;

				self.getName = getName = function() {
					return name;
				};

				// init configs.
				if (config !== undefined) {

					createConfig = config.create;
					getConfig = config.get;
					updateConfig = config.update;
					removeConfig = config.remove;
					findConfig = config.find;
					countConfig = config.count;
					checkIsExistsConfig = config.checkIsExists;

					if (createConfig !== undefined) {

						createValid = createConfig.valid;
						createRole = createConfig.role;

						_initData = createConfig.initData;
					}

					if (getConfig !== undefined) {
						getRole = getConfig.role;
					}

					if (updateConfig !== undefined) {
						updateValid = updateConfig.valid;
						updateRole = updateConfig.role;
					}

					if (removeConfig !== undefined) {
						removeRole = removeConfig.role;
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

				inner.getCreateValid = getCreateValid = function() {
					return createValid;
				};

				inner.getUpdateValid = getUpdateValid = function() {
					return updateValid;
				};

				inner.initData = initData = function(data) {
					//REQUIRED: data

					if (_initData !== undefined) {
						_initData(data);
					}

					return data;
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
					initData(data);

					// remove TO_DELETE properties.
					REMOVE_TO_DELETE(data);

					// valid data.
					if (createValid !== undefined) {

						validResult = createValid.check({
							data : data
						});
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
								b = beforeCreateListener(data, ret, next, clientInfo);

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

										logError(errorMsg);

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

					var
					// is not run next
					isNotRunNext;

					// get data in database.
					db.get(idOrParams, {

						error : function(errorMsg) {

							logError(errorMsg);

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

				innerUpdate = function(data, ret, clientInfo) {

					var
					// valid result
					validResult,

					// is not run next
					isNotRunNext;

					// valid data.
					if (updateValid !== undefined) {

						validResult = updateValid.check({
							data : data,
							isExceptUndefined : true
						});
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

							// run before update listeners.
							EACH(beforeUpdateListeners, function(beforeUpdateListener) {

								var
								// b
								b = beforeUpdateListener(data, ret, next, clientInfo);

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
								db.update(data, {

									error : function(errorMsg) {

										logError(errorMsg);

										ret({
											errorMsg : errorMsg
										});
									},

									notExists : function() {
										ret();
									},

									success : function(savedData) {

										if (savedData !== undefined) {

											// run after update listeners.
											EACH(afterUpdateListeners, function(afterUpdateListener) {
												afterUpdateListener(savedData, clientInfo);
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
										}

										ret({
											savedData : savedData
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
							b = beforeRemoveListener(id, ret, next, clientInfo);

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

									logError(errorMsg);

									ret({
										errorMsg : errorMsg
									});
								},

								notExists : function() {
									ret();
								},

								success : function(savedData) {

									if (savedData !== undefined) {

										// run after remove listeners.
										EACH(afterRemoveListeners, function(afterRemoveListener) {
											afterRemoveListener(savedData, clientInfo);
										});

										// broadcast.
										box.BROADCAST({
											roomName : name + '/' + savedData.id,
											methodName : 'remove',
											data : savedData
										});

										// broadcast by property.
										EACH(savedData, function(value, propertyName) {
											box.BROADCAST({
												roomName : name + '/' + propertyName + '/' + value + '/remove',
												methodName : 'remove',
												data : savedData
											});
										});
									}

									ret({
										savedData : savedData
									});
								}
							});
						};
					}]);
				};

				innerFind = function(params, ret, clientInfo) {

					var
					// is not run next
					isNotRunNext;

					// find data set in database.
					db.find(params, {

						error : function(errorMsg) {

							logError(errorMsg);

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

				innerCount = function(filter, ret, clientInfo) {

					var
					// is not run next
					isNotRunNext;

					// count data in database.
					db.count(filter, {

						error : function(errorMsg) {

							logError(errorMsg);

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

				innerCheckIsExists = function(filter, ret, clientInfo) {

					var
					// is not run next
					isNotRunNext;

					// check is exists data in database.
					db.checkIsExists(filter, {

						error : function(errorMsg) {

							logError(errorMsg);

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

				// create.
				if (createConfig !== false) {

					self.create = create = function(data, callbackOrHandlers) {
						//REQUIRED: data
						//OPTIONAL: callbackOrHandlers

						var
						// callback
						callback,

						// not valid handler
						notValidHandler,

						// error handler
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
							errorMsg = result.errorMsg,

							// valid errors
							validErrors = result.validErrors,

							// saved data
							savedData = result.savedData;

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								}
							} else {
								if (callback !== undefined) {
									callback(savedData);
								}
							}
						});
					};
				}

				// get.
				if (getConfig !== false) {

					self.get = get = function(idOrParams, callbackOrHandlers) {
						//OPTIONAL: idOrParams
						//OPTIONAL: idOrParams.filter
						//OPTIONAL: idOrParams.sort
						//OPTIONAL: idOrParams.isRandom
						//REQUIRED: callbackOrHandlers

						var
						// callback
						callback,

						// not exists handler
						notExistsHandler,

						// error handler
						errorHandler;

						// init params.
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

						innerGet(idOrParams, function(result) {

							var
							// error msg
							errorMsg = result.errorMsg,

							// saved data
							savedData = result.savedData;

							if (result !== undefined) {
								errorMsg = result.errorMsg;
								savedData = result.savedData;
							}

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							} else if (savedData === undefined) {
								if (notExistsHandler !== undefined) {
									notExistsHandler();
								}
							} else {
								callback(savedData);
							}
						});
					};
				}

				// update.
				if (updateConfig !== false) {

					self.update = update = function(data, callbackOrHandlers) {
						//REQUIRED: data
						//REQUIRED: data.id
						//OPTIONAL: callbackOrHandlers

						var
						// callback
						callback,

						// not exists handler
						notExistsHandler,

						// not valid handler
						notValidHandler,

						// error handler
						errorHandler;

						// remove TO_DELETE properties.
						REMOVE_TO_DELETE(data);

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
							savedData;

							if (result !== undefined) {
								errorMsg = result.errorMsg;
								validErrors = result.validErrors;
								savedData = result.savedData;
							}

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								}
							} else if (savedData === undefined) {
								if (notExistsHandler !== undefined) {
									notExistsHandler(validErrors);
								}
							} else {
								if (callback !== undefined) {
									callback(savedData);
								}
							}
						});
					};
				}

				// remove.
				if (removeConfig !== false) {

					self.remove = remove = function(id, callbackOrHandlers) {
						//REQUIRED: id
						//OPTIONAL: callbackOrHandlers

						var
						// callback
						callback,

						// not exists handler
						notExistsHandler,

						// error handler
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
							errorMsg = result.errorMsg,

							// saved data
							savedData = result.savedData;

							if (result !== undefined) {
								errorMsg = result.errorMsg;
								savedData = result.savedData;
							}

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							} else if (savedData === undefined) {
								if (notExistsHandler !== undefined) {
									notExistsHandler();
								}
							} else {
								if (callback !== undefined) {
									callback(savedData);
								}
							}
						});
					};
				}

				// find.
				if (findConfig !== false) {

					self.find = find = function(params, callbackOrHandlers) {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.sort
						//OPTIONAL: params.start
						//OPTIONAL: params.count
						//OPTIONAL: params.isFindAll
						//REQUIRED: callbackOrHandlers

						var
						// callback
						callback,

						// error handler
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
								}
							} else {
								callback(savedDataSet);
							}
						});
					};
				}

				// count.
				if (countConfig !== false) {

					self.count = count = function(filter, callbackOrHandlers) {
						//OPTIONAL: filter
						//REQUIRED: callbackOrHandlers

						var
						// callback
						callback,

						// error handler
						errorHandler;

						// init params.
						if (callbackOrHandlers === undefined) {
							callbackOrHandlers = filter;
							filter = undefined;
						}

						if (callbackOrHandlers !== undefined) {
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
						}

						innerCount(filter, function(result) {

							var
							// error msg
							errorMsg = result.errorMsg,

							// count
							count = result.count;

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							} else {
								callback(count);
							}
						});
					};
				}

				// check is exists.
				if (checkIsExistsConfig !== false) {

					self.checkIsExists = checkIsExists = function(filter, callbackOrHandlers) {
						//OPTIONAL: filter
						//REQUIRED: callbackOrHandlers

						var
						// callback
						callback,

						// error handler
						errorHandler;

						// init params.
						if (callbackOrHandlers === undefined) {
							callbackOrHandlers = filter;
							filter = undefined;
						}

						if (callbackOrHandlers !== undefined) {
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
						}

						innerCheckIsExists(filter, function(result) {

							var
							// error msg
							errorMsg = result.errorMsg,

							// is exists
							isExists = result.isExists;

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							} else {
								callback(isExists);
							}
						});
					};
				}

				// init room for create, get, find.
				box.ROOM(name, function(clientInfo, on) {

					var
					// roles
					roles = clientInfo.roles;

					// init roles.
					if (roles === undefined) {
						roles = clientInfo.roles = [];
					}

					// init create.
					if (createConfig !== false) {

						// on create.
						on('create', function(data, ret) {

							if (createRole === undefined || CHECK_IS_EXISTS({
								data : roles,
								value : createRole
							}) === true) {

								innerCreate(data, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init get.
					if (getConfig !== false) {

						// on get.
						on('get', function(idOrParams, ret) {

							if (getRole === undefined || CHECK_IS_EXISTS({
								data : roles,
								value : getRole
							}) === true) {

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

							if (updateRole === undefined || CHECK_IS_EXISTS({
								data : roles,
								value : updateRole
							}) === true) {

								innerUpdate(data, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init remove.
					if (removeConfig !== false) {

						// on remove.
						on('remove', function(id, ret) {

							if (removeRole === undefined || CHECK_IS_EXISTS({
								data : roles,
								value : removeRole
							}) === true) {

								innerRemove(id, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init find.
					if (findConfig !== false) {

						// on find.
						on('find', function(params, ret) {

							if (findRole === undefined || CHECK_IS_EXISTS({
								data : roles,
								value : findRole
							}) === true) {

								if (params !== undefined) {

									// delete isFindAll.
									delete params.isFindAll;
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
						on('count', function(filter, ret) {

							// on remove.
							on('remove', function(id, ret) {

								if (countRole === undefined || CHECK_IS_EXISTS({
									data : roles,
									value : countRole
								}) === true) {

									innerCount(filter, ret, clientInfo);

								} else {

									ret({
										isNotAuthed : true
									});
								}
							});
						});
					}

					// init check is exists.
					if (checkIsExistsConfig !== false) {

						// on check is exists.
						on('checkIsExists', function(filter, ret) {

							if (checkIsExistsRole === undefined || CHECK_IS_EXISTS({
								data : roles,
								value : checkIsExistsRole
							}) === true) {

								innerCheckIsExists(filter, ret, clientInfo);

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
