FOR_BOX(function(box) {'use strict';

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

			// count conifg
			countConfig,

			// check is exists conifg
			checkIsExistsConfig,

			// create valid
			createValid,

			// update valid
			updateValid,

			// _init data.
			_initData,

			// room
			room = box.ROOM(name),

			// room for create
			roomForCreate,

			// rooms for create
			roomsForCreate = {},

			// room for remove
			roomForRemove,

			// rooms for remove
			roomsForRemove = {},

			// sub rooms
			subRooms = [],

			// sub rooms for create
			subRoomsForCreate = [],

			// sub room map for create
			subRoomMapForCreate = {},

			// log error.
			logError = function(errorMsg) {
				//REQUIRED: errorMsg

				console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '` ERROR: ' + errorMsg);
			},

			// log not exists.
			logNotExists = function() {
				console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '` NOT EXISTS!');
			},

			// log not valid.
			logNotValid = function(errors) {
				//REQUIRED: errors

				console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '` NOT VALID!: ', errors);
			},

			// log not authed.
			logNotAuthed = function() {
				console.log('[UPPERCASE.IO-MODEL] `' + box.boxName + '.' + name + '` NOT AUTHED!');
			},

			// get name.
			getName,

			// get create valid.
			getCreateValid,

			// get update valid.
			getUpdateValid,

			// init data.
			initData,

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

			// close on new.
			closeOnNew,

			// on remove.
			onRemove,

			// close on remove.
			closeOnRemove;

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
					_initData = createConfig.initData;
				}

				if (updateConfig !== undefined) {
					updateValid = updateConfig.valid;
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

			self.getRoom = getRoom = function() {
				return room;
			};

			// create.
			if (createConfig !== false) {

				self.create = create = function(data, callbackOrHandlers) {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers

					var
					// callback.
					callback,

					// not valid handler.
					notValidHandler,

					// not valid handler.
					notAuthedHandler,

					// error handler.
					errorHandler,

					// valid result.
					validResult;

					if (initData !== undefined) {
						initData(data);
					}

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

					if (createValid !== undefined) {
						validResult = createValid.check({
							data : data
						});
					}

					if (validResult !== undefined && validResult.checkHasError() === true) {

						if (notValidHandler !== undefined) {
							notValidHandler(validResult.getErrors());
						}

					} else {

						room.send({
							methodName : 'create',
							data : data
						}, function(result) {

							var
							// error msg
							errorMsg = result.errorMsg,

							// valid errors
							validErrors = result.validErrors,

							// is not authed
							isNotAuthed = result.isNotAuthed,

							// saved data
							savedData = result.savedData;

							if (errorMsg !== undefined) {

								logError(errorMsg);

								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								} else {
									logNotValid(validErrors);
								}
							} else if (isNotAuthed === true) {
								if (notAuthedHandler !== undefined) {
									notAuthedHandler();
								} else {
									logNotAuthed();
								}
							} else {
								if (callback !== undefined) {
									callback(savedData);
								}
							}
						});
					}

					// remove TO_DELETE properties.
					REMOVE_TO_DELETE(data);
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

					// not valid handler.
					notAuthedHandler,

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

							logError(errorMsg);

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								logNotAuthed();
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								logNotExists();
							}
						} else {
							if (callback !== undefined) {
								callback(savedData);
							}
						}
					});
				};

				self.getWatching = getWatching = function(idOrParams, callbackOrHandlers) {
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

					// not valid handler.
					notAuthedHandler,

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
						notAuthedHandler = callbackOrHandlers.notAuthed;
						errorHandler = callbackOrHandlers.error;
					}

					get(idOrParams, {

						success : function(savedData) {

							var
							// sub room
							subRoom,

							// close watching.
							closeWatching;

							if (callback !== undefined) {

								subRooms.push( subRoom = box.ROOM(name + '/' + savedData.id));

								callback(savedData,

								// add update handler.
								function(callback) {
									subRoom.on('update', callback);
								},

								// add remove handler.
								function(callback) {
									subRoom.on('remove', function(result) {
										callback(result);
										closeWatching();
									});
								},

								// close watching.
								closeWatching = function() {

									REMOVE({
										data : subRooms,
										value : subRoom
									});

									subRoom.exit();
								});
							}
						},

						notExists : notExistsHandler,
						notAuthedHandler : notAuthedHandler,
						errorHandler : errorHandler
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

					// not valid handler.
					notValidHandler,

					// not exists handler
					notExistsHandler,

					// not valid handler.
					notAuthedHandler,

					// error handler
					errorHandler,

					// valid result
					validResult;

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
						validResult = updateValid.check({
							data : data,
							isExceptUndefined : true
						});
					}

					if (updateValid !== undefined && validResult.checkHasError() === true) {

						if (notValidHandler !== undefined) {
							notValidHandler(validResult.getErrors());
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
							savedData;

							if (result !== undefined) {
								errorMsg = result.errorMsg;
								validErrors = result.validErrors;
								isNotAuthed = result.isNotAuthed;
								savedData = result.savedData;
							}

							if (errorMsg !== undefined) {

								logError(errorMsg);

								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								} else {
									logNotValid(validErrors);
								}
							} else if (isNotAuthed === true) {
								if (notAuthedHandler !== undefined) {
									notAuthedHandler();
								} else {
									logNotAuthed();
								}
							} else if (savedData === undefined) {
								if (notExistsHandler !== undefined) {
									notExistsHandler();
								} else {
									logNotExists();
								}
							} else {
								if (callback !== undefined) {
									callback(savedData);
								}
							}
						});
					}

					// remove TO_DELETE properties.
					REMOVE_TO_DELETE(data);
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

					// not valid handler.
					notAuthedHandler,

					// error handler
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

						// saved data
						savedData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							isNotAuthed = result.isNotAuthed;
							savedData = result.savedData;
						}

						if (errorMsg !== undefined) {

							logError(errorMsg);

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								logNotAuthed();
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								logNotExists();
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
					//REQUIRED: callbackOrHandlers

					var
					// callback
					callback,

					// not valid handler.
					notAuthedHandler,

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
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}
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

							logError(errorMsg);

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								logNotAuthed();
							}
						} else {
							if (callback !== undefined) {
								callback(savedDataSet);
							}
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
					// callback
					callback,

					// not valid handler.
					notAuthedHandler,

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
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}
					}

					find(params, {

						success : function(savedDataSet) {

							var
							// inner sub rooms
							innerSubRooms = {},

							// close watching.
							closeWatching;

							if (callback !== undefined) {

								EACH(savedDataSet, function(savedData, i) {

									var
									// id
									id = savedData.id;

									subRooms.push(innerSubRooms[id] = box.ROOM(name + '/' + id));
								});

								callback(savedDataSet,

								// add update handler.
								function(id, callback) {
									innerSubRooms[id].on('update', callback);
								},

								// add remove handler.
								function(id, callback) {
									innerSubRooms[id].on('remove', function(result) {
										callback(result);
										closeWatching(id);
									});
								},

								// close watching.
								closeWatching = function(id) {

									if (innerSubRooms[id] !== undefined) {

										REMOVE({
											data : subRooms,
											value : innerSubRooms[id]
										});

										innerSubRooms[id].exit();
										delete innerSubRooms[id];
									}
								});
							}
						},

						notAuthedHandler : notAuthedHandler,
						errorHandler : errorHandler
					});
				};
			}

			if (countConfig !== false) {

				self.count = count = function(filter, callbackOrHandlers) {
					//OPTIONAL: filter
					//REQUIRED: callbackOrHandlers

					var
					// callback
					callback,

					// not valid handler.
					notAuthedHandler,

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
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}
					}

					room.send({
						methodName : 'count',
						data : filter
					}, function(result) {

						var
						// error msg
						errorMsg = result.errorMsg,

						// is not authed
						isNotAuthed = result.isNotAuthed,

						// count
						count = result.count;

						if (errorMsg !== undefined) {

							logError(errorMsg);

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								logNotAuthed();
							}
						} else {
							if (callback !== undefined) {
								callback(count);
							}
						}
					});
				};
			}

			if (checkIsExistsConfig !== false) {

				self.checkIsExists = checkIsExists = function(filter, callbackOrHandlers) {
					//OPTIONAL: filter
					//REQUIRED: callbackOrHandlers

					var
					// callback
					callback,

					// not valid handler.
					notAuthedHandler,

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
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}
					}

					room.send({
						methodName : 'checkIsExists',
						data : filter
					}, function(result) {

						var
						// error msg
						errorMsg = result.errorMsg,

						// is not authed
						isNotAuthed = result.isNotAuthed,

						// is exists
						isExists = result.isExists;

						if (errorMsg !== undefined) {

							logError(errorMsg);

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}
						} else if (isNotAuthed === true) {
							if (notAuthedHandler !== undefined) {
								notAuthedHandler();
							} else {
								logNotAuthed();
							}
						} else {
							if (callback !== undefined) {
								callback(isExists);
							}
						}
					});
				};
			}

			self.onNew = onNew = function(properties, func) {
				//OPTIONAL: properties
				//REQUIRED: func

				var
				// f.
				f = function(savedData) {

					var
					// id
					id = savedData.id;

					func(savedData);
				};

				if (func === undefined) {
					func = properties;

					if (roomForCreate === undefined) {
						roomForCreate = box.ROOM(name + '/create');
					}

					roomForCreate.on('create', f);

				} else {

					EACH(properties, function(value, propertyName) {

						var
						// room
						room = roomsForCreate[propertyName + '/' + value];

						if (room === undefined) {
							room = roomsForCreate[propertyName + '/' + value] = box.ROOM(name + '/' + propertyName + '/' + value + '/create');
						}

						room.on('create', f);
					});
				}
			};

			self.onNewWatching = onNewWatching = function(properties, func) {
				//OPTIONAL: properties
				//REQUIRED: func

				var
				// f.
				f = function(savedData, subRoomsForCreate) {

					var
					// id
					id = savedData.id,

					// sub room
					subRoom,

					// close watching.
					closeWatching;

					subRooms.push( subRoom = box.ROOM(name + '/' + id));
					subRoomsForCreate.push(subRoom);

					func(savedData,

					// add update handler.
					function(callback) {
						subRoom.on('update', callback);
					},

					// add remove handler.
					function(callback) {
						subRoom.on('remove', function(result) {
							callback(result);
							closeWatching();
						});
					},

					// close watching.
					closeWatching = function() {

						subRoom.exit();

						REMOVE({
							data : subRooms,
							value : subRoom
						});
					});
				};

				if (func === undefined) {
					func = properties;

					if (roomForCreate === undefined) {
						roomForCreate = box.ROOM(name + '/create');
					}

					roomForCreate.on('create', function(savedData) {
						f(savedData, subRoomsForCreate);
					});

				} else {

					EACH(properties, function(value, propertyName) {

						var
						// room
						room = roomsForCreate[propertyName + '/' + value],

						// sub rooms for create
						subRoomsForCreate = subRoomMapForCreate[propertyName + '/' + value];

						if (room === undefined) {
							room = roomsForCreate[propertyName + '/' + value] = box.ROOM(name + '/' + propertyName + '/' + value + '/create');
						}

						if (subRoomsForCreate === undefined) {
							subRoomsForCreate = subRoomMapForCreate[propertyName + '/' + value] = [];
						}

						room.on('create', function(savedData) {
							f(savedData, subRoomsForCreate);
						});
					});
				}
			};

			self.closeOnNew = closeOnNew = function(properties) {
				//OPTIONAL: properties

				if (properties === undefined) {

					if (roomForCreate !== undefined) {
						roomForCreate.exit();
						roomForCreate = undefined;
					}

					EACH(subRoomsForCreate, function(subRoom) {

						subRoom.exit();

						REMOVE({
							data : subRooms,
							value : subRoom
						});
					});

					subRoomsForCreate = [];

				} else {

					EACH(properties, function(value, propertyName) {

						if (roomsForCreate[propertyName + '/' + value] !== undefined) {
							roomsForCreate[propertyName + '/' + value].exit();
							delete roomsForCreate[propertyName + '/' + value];
						}

						EACH(subRoomMapForCreate[propertyName + '/' + value], function(subRoom) {

							subRoom.exit();

							REMOVE({
								data : subRooms,
								value : subRoom
							});
						});
						delete subRoomMapForCreate[propertyName + '/' + value];
					});
				}
			};

			self.onRemove = onRemove = function(properties, func) {
				//OPTIONAL: properties
				//REQUIRED: func

				var
				// f.
				f = function(savedData) {

					var
					// id
					id = savedData.id;

					func(savedData);
				};

				if (func === undefined) {
					func = properties;

					if (roomForRemove === undefined) {
						roomForRemove = box.ROOM(name + '/remove');
					}

					roomForRemove.on('remove', f);

				} else {

					EACH(properties, function(value, propertyName) {

						var
						// room
						room = roomsForRemove[propertyName + '/' + value];

						if (room === undefined) {
							room = roomsForRemove[propertyName + '/' + value] = box.ROOM(name + '/' + propertyName + '/' + value + '/remove');
						}

						room.on('remove', f);
					});
				}
			};

			self.closeOnRemove = closeOnRemove = function(properties) {
				//OPTIONAL: properties

				if (properties === undefined) {

					if (roomForRemove !== undefined) {
						roomForRemove.exit();
						roomForRemove = undefined;
					}

				} else {

					EACH(properties, function(value, propertyName) {

						if (roomsForRemove[propertyName + '/' + value] !== undefined) {
							roomsForRemove[propertyName + '/' + value].exit();
							delete roomsForRemove[propertyName + '/' + value];
						}
					});
				}
			};
		}
	});
});
