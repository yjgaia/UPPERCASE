FOR_BOX(function(box) {
	'use strict';

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

			var
			// name
			name = params.name,

			// init data.
			initData = params.initData,

			// method config
			methodConfig = params.methodConfig,
			
			// is not using object id
			isNotUsingObjectId = params.isNotUsingObjectId,

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

			// count conifg
			countConfig,

			// check is exists conifg
			checkIsExistsConfig,

			// create valid
			createValid,

			// update valid
			updateValid,

			// is _id assignable
			is_idAssignable,

			// room
			room = box.ROOM(name),

			// get name.
			getName,

			// get init data.
			getInitData,

			// get create valid.
			getCreateValid,

			// get update valid.
			getUpdateValid,

			// get room.
			getRoom,

			// create.
			create,

			// get.
			get,

			// get watching.
			getWatching,

			// update.
			update,

			// remove.
			remove,

			// find.
			find,

			// find watching.
			findWatching,

			// count.
			count,

			// check is exists.
			checkIsExists,

			// on new.
			onNew,

			// on new watching.
			onNewWatching,
			
			// on new and find.
			onNewAndFind,

			// on new and find watching.
			onNewAndFindWatching,

			// on remove.
			onRemove;

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
				}

				if (updateConfig !== undefined) {
					updateValid = updateConfig.valid;
				}
			}

			self.getName = getName = function() {
				return name;
			};

			self.getInitData = getInitData = function() {
				return initData;
			};

			self.getCreateValid = getCreateValid = function() {
				return createValid;
			};

			self.getUpdateValid = getUpdateValid = function() {
				return updateValid;
			};

			self.getRoom = getRoom = function() {
				return room;
			};

			// create.
			if (createConfig !== false) {

				self.create = create = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.notValid
					//OPTIONAL: callbackOrHandlers.notAuthed
					//OPTIONAL: callbackOrHandlers.error

					var
					// callback.
					callback,

					// not valid handler.
					notValidHandler,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler,

					// valid result
					validResult;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notValidHandler = callbackOrHandlers.notValid;
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}
					}

					// init data.
					if (initData !== undefined) {
						EACH(initData, function(value, name) {
							data[name] = value;
						});
					}

					if (createValid !== undefined) {
						validResult = createValid.check(data);
					}

					if (validResult !== undefined && validResult.checkHasError() === true) {

						if (notValidHandler !== undefined) {
							notValidHandler(validResult.getErrors());
						} else {
							console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/create` NOT VALID!: ', validResult.getErrors());
						}

					} else {

						room.send({
							methodName : 'create',
							data : data
						}, function(result) {

							var
							// error msg
							errorMsg,

							// valid errors
							validErrors,

							// is not authed
							isNotAuthed,

							// saved data
							savedData;

							if (result !== undefined) {

								errorMsg = result.errorMsg;
								validErrors = result.validErrors;
								isNotAuthed = result.isNotAuthed;
								savedData = result.savedData;

								if (errorMsg !== undefined) {
									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/create` ERROR: ' + errorMsg);
									}
								} else if (validErrors !== undefined) {
									if (notValidHandler !== undefined) {
										notValidHandler(validErrors);
									} else {
										console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/create` NOT VALID!: ', validErrors);
									}
								} else if (isNotAuthed === true) {
									if (notAuthedHandler !== undefined) {
										notAuthedHandler();
									} else {
										console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/create` NOT AUTHED!');
									}
								} else if (callback !== undefined) {
									callback(savedData);
								}

							} else if (callback !== undefined) {
								callback();
							}
						});
					}
				};
			}

			// get.
			if (getConfig !== false) {

				self.get = get = function(idOrParams, callbackOrHandlers) {
					//REQUIRED: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// not exists handler.
					notExistsHandler,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler;

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						notExistsHandler = callbackOrHandlers.notExists;
						notAuthedHandler = callbackOrHandlers.notAuthed;
						errorHandler = callbackOrHandlers.error;
					}

					room.send({
						methodName : 'get',
						data : idOrParams
					}, function(result) {

						var
						// error msg
						errorMsg,

						// is not authed
						isNotAuthed,

						// saved data
						savedData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							isNotAuthed = result.isNotAuthed;
							savedData = result.savedData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/get` ERROR: ' + errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/get` NOT AUTHED!');
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/get` NOT EXISTS!');
							}
						} else if (callback !== undefined) {
							callback(savedData);
						}
					});
				};

				self.getWatching = getWatching = function(idOrParams, callbackOrHandlers) {
					//REQUIRED: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// not exists handler.
					notExistsHandler,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler,

					// is exited
					isExited,

					// sub room
					subRoom;

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						notExistsHandler = callbackOrHandlers.notExists;
						notAuthedHandler = callbackOrHandlers.notAuthed;
						errorHandler = callbackOrHandlers.error;
					}

					self.get(idOrParams, {

						success : function(savedData) {

							var
							// exit.
							exit;

							if (isExited !== true && callback !== undefined) {

								subRoom = box.ROOM(name + '/' + savedData.id);

								callback(savedData,

								// add update handler.
								function(callback) {
									subRoom.on('update', callback);
								},

								// add remove handler.
								function(callback) {
									subRoom.on('remove', function(originData) {
										callback(originData);
										exit();
									});
								},

								// exit.
								exit = function() {
									if (subRoom !== undefined) {
										subRoom.exit();
										subRoom = undefined;
									}
								});
							}
						},

						notExists : notExistsHandler,
						notAuthed : notAuthedHandler,
						error : errorHandler
					});

					return OBJECT({

						init : function(inner, self) {

							var
							// exit.
							exit;

							self.exit = exit = function() {

								if (subRoom !== undefined) {
									subRoom.exit();
								}

								isExited = true;
							};
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
					// id
					id = data.id,
					
					// $inc
					$inc = data.$inc,
					
					// $push
					$push = data.$push,
					
					// $pull
					$pull = data.$pull,

					// callback.
					callback,

					// not valid handler.
					notValidHandler,

					// not exists handler.
					notExistsHandler,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler,

					// valid result
					validResult,

					// $inc valid result
					$incValidResult,

					// $push valid result
					$pushValidResult,

					// $pull valid result
					$pullValidResult,
					
					// valied errors
					validErrors;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notValidHandler = callbackOrHandlers.notValid;
							notExistsHandler = callbackOrHandlers.notExists;
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}
					}

					if (updateValid !== undefined) {
						
						validResult = updateValid.checkForUpdate(data);
						
						if ($inc !== undefined) {
							$incValidResult = updateValid.checkForUpdate($inc);
						}
						
						if ($push !== undefined) {
							
							$pushValidResult = updateValid.checkForUpdate(RUN(function() {
								
								var
								// data for valid
								dataForValid = {};
								
								EACH($push, function(value, attr) {
									dataForValid[attr] = [value];
								});
								
								return dataForValid;
							}));
						}
						
						if ($pull !== undefined) {
							
							$pullValidResult = updateValid.checkForUpdate(RUN(function() {
								
								var
								// data for valid
								dataForValid = {};
								
								EACH($pull, function(value, attr) {
									dataForValid[attr] = [value];
								});
								
								return dataForValid;
							}));
						}
					}

					data.id = id;
					data.$inc = $inc;
					data.$push = $push;
					data.$pull = $pull;

					if (updateValid !== undefined && (
						validResult.checkHasError() === true ||
						($incValidResult !== undefined && $incValidResult.checkHasError() === true) ||
						($pushValidResult !== undefined && $pushValidResult.checkHasError() === true) ||
						($pullValidResult !== undefined && $pullValidResult.checkHasError() === true)
					)) {
						
						validErrors = COMBINE([
							validResult.getErrors(),
							$incValidResult === undefined ? {} : $incValidResult.getErrors(),
							$pushValidResult === undefined ? {} : $pushValidResult.getErrors(),
							$pullValidResult === undefined ? {} : $pullValidResult.getErrors()
						]);

						if (notValidHandler !== undefined) {
							notValidHandler(validErrors);
						} else {
							console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` NOT VALID!: ', validErrors);
						}

					} else {

						room.send({
							methodName : 'update',
							data : data
						}, function(result) {

							var
							// error msg
							errorMsg,

							// valid errors
							validErrors,

							// is not authed
							isNotAuthed,

							// saved data
							savedData,
							
							// origin data
							originData;

							if (result !== undefined) {
								errorMsg = result.errorMsg;
								validErrors = result.validErrors;
								isNotAuthed = result.isNotAuthed;
								savedData = result.savedData;
								originData = result.originData;
							}

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` ERROR: ' + errorMsg);
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								} else {
									console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` NOT VALID!: ', validErrors);
								}
							} else if (isNotAuthed === true) {
								if (notAuthedHandler !== undefined) {
									notAuthedHandler();
								} else {
									console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` NOT AUTHED!');
								}
							} else if (savedData === undefined) {
								if (notExistsHandler !== undefined) {
									notExistsHandler();
								} else {
									console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/update` NOT EXISTS!');
								}
							} else if (callback !== undefined) {
								callback(savedData, originData);
							}
						});
					}
				};
			}

			// remove.
			if (removeConfig !== false) {

				self.remove = remove = function(id, callbackOrHandlers) {
					//REQUIRED: id
					//OPTIONAL: callbackOrHandlers

					var
					// callback.
					callback,

					// not exists handler.
					notExistsHandler,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}
					}

					room.send({
						methodName : 'remove',
						data : id
					}, function(result) {

						var
						// error msg
						errorMsg,

						// is not authed
						isNotAuthed,

						// origin data
						originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							isNotAuthed = result.isNotAuthed;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/remove` ERROR: ' + errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/remove` NOT AUTHED!');
							}
						} else if (originData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/remove` NOT EXISTS!');
							}
						} else if (callback !== undefined) {
							callback(originData);
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
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						notAuthedHandler = callbackOrHandlers.notAuthed;
						errorHandler = callbackOrHandlers.error;
					}

					room.send({
						methodName : 'find',
						data : params
					}, function(result) {

						var
						// error msg
						errorMsg = result.errorMsg,

						// is not authed
						isNotAuthed = result.isNotAuthed,

						// saved data set
						savedDataSet = result.savedDataSet;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/find` ERROR: ' + errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/find` NOT AUTHED!');
							}
						} else if (callback !== undefined) {
							callback(savedDataSet);
						}
					});
				};

				self.findWatching = findWatching = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler,

					// is exited
					isExited,

					// sub rooms
					subRooms = {};

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						notAuthedHandler = callbackOrHandlers.notAuthed;
						errorHandler = callbackOrHandlers.error;
					}

					self.find(params, {

						success : function(savedDataSet) {

							var
							// exit.
							exit;

							if (isExited !== true && callback !== undefined) {

								EACH(savedDataSet, function(savedData, i) {

									var
									// id
									id = savedData.id;

									subRooms[id] = box.ROOM(name + '/' + id);
								});

								callback(savedDataSet,

								// add update handler.
								function(id, callback) {
									subRooms[id].on('update', callback);
								},

								// add remove handler.
								function(id, callback) {
									subRooms[id].on('remove', function(originData) {
										callback(originData);
										exit(id);
									});
								},

								// exit.
								exit = function(id) {
									if (subRooms[id] !== undefined) {
										subRooms[id].exit();
										delete subRooms[id];
									}
								});
							}
						},

						notAuthed : notAuthedHandler,
						error : errorHandler
					});

					return OBJECT({

						init : function(inner, self) {

							var
							// exit.
							exit;

							self.exit = exit = function() {

								EACH(subRooms, function(subRoom) {
									subRoom.exit();
								});

								isExited = true;
							};
						}
					});
				};
			}

			if (countConfig !== false) {

				self.count = count = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						notAuthedHandler = callbackOrHandlers.notAuthed;
						errorHandler = callbackOrHandlers.error;
					}

					room.send({
						methodName : 'count',
						data : params
					}, function(result) {

						var
						// error msg
						errorMsg = result.errorMsg,

						// is not authed
						isNotAuthed = result.isNotAuthed,

						// count
						count = result.count;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/count` ERROR: ' + errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/count` NOT AUTHED!');
							}
						} else if (callback !== undefined) {
							callback(count);
						}
					});
				};
			}

			if (checkIsExistsConfig !== false) {

				self.checkIsExists = checkIsExists = function(params, callbackOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						notAuthedHandler = callbackOrHandlers.notAuthed;
						errorHandler = callbackOrHandlers.error;
					}

					room.send({
						methodName : 'checkIsExists',
						data : params
					}, function(result) {

						var
						// error msg
						errorMsg = result.errorMsg,

						// is not authed
						isNotAuthed = result.isNotAuthed,

						// is exists
						isExists = result.isExists;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/checkIsExists` ERROR: ' + errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '/checkIsExists` NOT AUTHED!');
							}
						} else if (callback !== undefined) {
							callback(isExists);
						}
					});
				};
			}

			self.onNew = onNew = function(properties, handler) {
				//OPTIONAL: properties
				//REQUIRED: handler

				var
				// room for create
				roomForCreate;

				if (handler === undefined) {
					handler = properties;

					( roomForCreate = box.ROOM(name + '/create')).on('create', handler);

				} else if (properties === undefined) {

					( roomForCreate = box.ROOM(name + '/create')).on('create', handler);

				} else {

					EACH(properties, function(value, propertyName) {

						( roomForCreate = box.ROOM(name + '/' + propertyName + '/' + value + '/create')).on('create', function(savedData) {

							if (EACH(properties, function(value, propertyName) {

								if (savedData[propertyName] !== value) {
									return false;
								}
							}) === true) {
								handler(savedData);
							}
						});

						return false;
					});
				}

				return OBJECT({

					init : function(inner, self) {

						var
						// exit.
						exit;

						self.exit = exit = function() {
							if (roomForCreate !== undefined) {
								roomForCreate.exit();
							}
						};
					}
				});
			};

			self.onNewWatching = onNewWatching = function(properties, handler) {
				//OPTIONAL: properties
				//REQUIRED: handler

				var
				// room for create
				roomForCreate,

				// sub rooms
				subRooms = [],

				// inner handler.
				innerHandler = function(savedData) {

					var
					// id
					id = savedData.id,

					// sub room
					subRoom,

					// close watching.
					closeWatching;

					subRooms.push( subRoom = box.ROOM(name + '/' + id));

					handler(savedData,

					// add update handler.
					function(callback) {
						subRoom.on('update', callback);
					},

					// add remove handler.
					function(callback) {
						subRoom.on('remove', function(originData) {
							callback(originData);
							closeWatching();
						});
					},

					// close watching.
					closeWatching = function() {

						subRoom.exit();

						REMOVE({
							array : subRooms,
							value : subRoom
						});
					});
				};

				if (handler === undefined) {
					handler = properties;

					( roomForCreate = box.ROOM(name + '/create')).on('create', function(savedData) {
						innerHandler(savedData);
					});

				} else if (properties === undefined) {

					( roomForCreate = box.ROOM(name + '/create')).on('create', function(savedData) {
						innerHandler(savedData);
					});
					
				} else {

					EACH(properties, function(value, propertyName) {

						( roomForCreate = box.ROOM(name + '/' + propertyName + '/' + value + '/create')).on('create', function(savedData) {

							if (EACH(properties, function(value, propertyName) {

								if (savedData[propertyName] !== value) {
									return false;
								}
							}) === true) {
								innerHandler(savedData);
							}
						});

						return false;
					});
				}

				return OBJECT({

					init : function(inner, self) {

						var
						// exit.
						exit;

						self.exit = exit = function() {

							if (roomForCreate !== undefined) {
								roomForCreate.exit();
							}

							EACH(subRooms, function(subRoom) {
								subRoom.exit();
							});
						};
					}
				});
			};
			
			// find.
			if (findConfig !== false) {
				
				self.onNewAndFind = onNewAndFind = function(params, handlerOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.properties
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//REQUIRED: handlerOrHandlers
					
					var
					// properties
					properties,
					
					// filter
					filter,
					
					// sort
					sort,
					
					// start
					start,
					
					// count
					count,
					
					// on new room
					onNewRoom,
					
					// handler.
					handler,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler;

					// init params.
					if (handlerOrHandlers === undefined) {
						handlerOrHandlers = params;
						params = undefined;
					}
					
					if (params !== undefined) {
						properties = params.properties;
						filter = params.filter;
						sort = params.sort;
						start = params.start;
						count = params.count;
					}

					if (CHECK_IS_DATA(handlerOrHandlers) !== true) {
						handler = handlerOrHandlers;
					} else {
						handler = handlerOrHandlers.success;
						notAuthedHandler = handlerOrHandlers.notAuthed;
						errorHandler = handlerOrHandlers.error;
					}
					
					if (filter === undefined && sort === undefined && (start === undefined || start === 0)) {
						onNewRoom = onNew(properties, handler);
					}
					
					find({
						filter : COMBINE([properties, filter]),
						sort : sort,
						start : start,
						count : count
					}, {
						success : REVERSE_EACH(handler),
						notAuthed : notAuthedHandler,
						error : errorHandler
					});
					
					return OBJECT({
	
						init : function(inner, self) {
	
							var
							// exit.
							exit;
	
							self.exit = exit = function() {
	
								if (onNewRoom !== undefined) {
									onNewRoom.exit();
								}
							};
						}
					});
				};
				
				self.onNewAndFindWatching = onNewAndFindWatching = function(params, handlerOrHandlers) {
					//OPTIONAL: params
					//OPTIONAL: params.properties
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//REQUIRED: handlerOrHandlers
					
					var
					// properties
					properties,
					
					// filter
					filter,
					
					// sort
					sort,
					
					// start
					start,
					
					// count
					count,
					
					// on new watching room
					onNewWatchingRoom,
					
					// find watching room
					findWatchingRoom,
					
					// handler.
					handler,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler;

					// init params.
					if (handlerOrHandlers === undefined) {
						handlerOrHandlers = params;
						params = undefined;
					}
					
					if (params !== undefined) {
						properties = params.properties;
						filter = params.filter;
						sort = params.sort;
						start = params.start;
						count = params.count;
					}

					if (CHECK_IS_DATA(handlerOrHandlers) !== true) {
						handler = handlerOrHandlers;
					} else {
						handler = handlerOrHandlers.success;
						notAuthedHandler = handlerOrHandlers.notAuthed;
						errorHandler = handlerOrHandlers.error;
					}
					
					if (filter === undefined && sort === undefined && (start === undefined || start === 0)) {
						onNewWatchingRoom = onNewWatching(properties, handler);
					}
					
					findWatchingRoom = findWatching({
						filter : COMBINE([properties, filter]),
						sort : sort,
						start : start,
						count : count
					}, {
						success : function(savedDataSet, addUpdateHandler, addRemoveHandler) {
							REVERSE_EACH(savedDataSet, function(savedData) {
								handler(savedData, function(handler) {
									addUpdateHandler(savedData.id, handler);
								}, function(handler) {
									addRemoveHandler(savedData.id, handler);
								});
							});
						},
						notAuthed : notAuthedHandler,
						error : errorHandler
					});
					
					return OBJECT({
	
						init : function(inner, self) {
	
							var
							// exit.
							exit;
	
							self.exit = exit = function() {
	
								if (onNewWatchingRoom !== undefined) {
									onNewWatchingRoom.exit();
								}
								
								findWatchingRoom.exit();
							};
						}
					});
				};
			}

			self.onRemove = onRemove = function(properties, handler) {
				//OPTIONAL: properties
				//REQUIRED: handler

				var
				// room for removes
				roomForRemove;

				if (handler === undefined) {
					handler = properties;

					( roomForRemove = box.ROOM(name + '/remove')).on('remove', handler);

				} else {

					EACH(properties, function(value, propertyName) {

						( roomForRemove = box.ROOM(name + '/' + propertyName + '/' + value + '/remove')).on('remove', function(originData) {

							if (EACH(properties, function(value, propertyName) {

								if (originData[propertyName] !== value) {
									return false;
								}
							}) === true) {
								handler(originData);
							}
						});

						return false;
					});
				}

				return OBJECT({

					init : function(inner, self) {

						var
						// exit.
						exit;

						self.exit = exit = function() {
							if (roomForRemove !== undefined) {
								roomForRemove.exit();
							}
						};
					}
				});
			};
		}
	});
});
