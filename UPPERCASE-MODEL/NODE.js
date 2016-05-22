/*

Welcome to UPPERCASE! (http://uppercase.io)

*/

FOR_BOX(function(box) {'use strict';

	/**
	 * Model(include CRUD functions) interface
	 */
	box.MODEL = CLASS({

		init : function(inner, self, params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//OPTIONAL: params.config
			
			var
			// get box name.
			getBoxName;
			
			self.getBoxName = getBoxName = function() {
				return box.boxName;
			};

			// to implement.
		}
	});
});

FOR_BOX(function(box) {
	'use strict';

	OVERRIDE(box.MODEL, function(origin) {

		/**
		 * Model(include CRUD functions) class
		 */
		box.MODEL = CLASS({
			
			preset : function() {
				return origin;
			},

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

				// before get listeners
				beforeGetListeners = [],

				// after get listeners
				afterGetListeners = [],

				// before update listeners
				beforeUpdateListeners = [],

				// after update listeners
				afterUpdateListeners = [],

				// before remove listeners
				beforeRemoveListeners = [],

				// after remove listeners
				afterRemoveListeners = [],

				// before find listeners
				beforeFindListeners = [],

				// after find listeners
				afterFindListeners = [],

				// before count listeners
				beforeCountListeners = [],

				// after count listeners
				afterCountListeners = [],

				// before check is exists listeners
				beforeCheckIsExistsListeners = [],

				// after check is exists listeners
				afterCheckIsExistsListeners = [],

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
				
				// update no record.
				updateNoRecord,

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
							filter = {};
							
							filter[name] = TO_DELETE;
						
							$or.push(filter);
						});
						
						if ($or.length > 0) {

							db.find({
								filter : {
									$or : $or
								},
								isFindAll : true
							}, function(notInitedDataSet) {
								
								if (notInitedDataSet.length > 0) {
									
									console.log('[UPPERCASE-MODEL] Found ' + notInitedDataSet.length + ' not inited data set in `' + box.boxName + '.' + name + '`.');
									
									EACH(notInitedDataSet, function(notInitedData) {
										
										EACH(initData, function(value, name) {
											if (notInitedData[name] === undefined) {
												notInitedData[name] = value;
											}
										});
			
										db.update(notInitedData);
									});
								}
							});
						}
					});
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
						
						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeCreateListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterCreateListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterCreateListeners.push(funcOrFuncs);
						}
					}

					// when get method
					else if (methodName === 'get') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeGetListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterGetListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterGetListeners.push(funcOrFuncs);
						}
					}

					// when update method
					else if (methodName === 'update') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeUpdateListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterUpdateListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterUpdateListeners.push(funcOrFuncs);
						}
					}

					// when remove method
					else if (methodName === 'remove') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeRemoveListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterRemoveListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterRemoveListeners.push(funcOrFuncs);
						}
					}

					// when find method
					else if (methodName === 'find') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeFindListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterFindListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterFindListeners.push(funcOrFuncs);
						}
					}

					// when count method
					else if (methodName === 'count') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeCountListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterCountListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterCountListeners.push(funcOrFuncs);
						}
					}

					// when check is exists method
					else if (methodName === 'checkIsExists') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeCheckIsExistsListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterCheckIsExistsListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterCheckIsExistsListeners.push(funcOrFuncs);
						}
					}
				};

				innerCreate = function(data, ret, clientInfo) {

					var
					// valid result
					validResult;

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
							
							var
							// is not run next
							isNotRunNext;

							// run before create listeners.
							EACH(beforeCreateListeners, function(beforeCreateListener) {
								
								if (beforeCreateListener(data, next, ret, clientInfo) === false) {
									
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						function(next) {
							return function() {

								// create data in database.
								db.create(data, {

									error : function(errorMsg) {
										ret({
											errorMsg : errorMsg
										});
									},

									success : function(savedData) {
										
										var
										// is not run next
										isNotRunNext;
										
										// run after create listeners.
										EACH(afterCreateListeners, function(afterCreateListener) {
											
											if (afterCreateListener(savedData, function() {
												next(savedData);
											}, ret, clientInfo) === false) {
												
												isNotRunNext = true;
											}
										});
			
										if (isNotRunNext !== true) {
											next(savedData);
										}
									}
								});
							};
						},
						
						function() {
							return function(savedData) {
								
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
							};
						}]);
					}
				};

				innerGet = function(idOrParams, ret, clientInfo) {
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.isToCache
					//OPTIONAL: idOrParams.clientInfo

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
					isToCache;

					// init params.
					if (idOrParams !== undefined) {
						
						if (CHECK_IS_DATA(idOrParams) !== true) {
							id = idOrParams;
						} else {
							id = idOrParams.id;
							filter = idOrParams.filter;
							sort = idOrParams.sort;
							isRandom = idOrParams.isRandom;
							isToCache = idOrParams.isToCache;
							
							if (clientInfo === undefined) {
								clientInfo = idOrParams.clientInfo;
							}
						}
					}
					
					NEXT([
					function(next) {
						
						var
						// is not run next
						isNotRunNext;

						// run before get listeners.
						EACH(beforeGetListeners, function(beforeGetListener) {
							
							if (beforeGetListener(idOrParams, next, ret, clientInfo) === false) {
								
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					function(next) {
						return function() {
						
							// get data in database.
							db.get(idOrParams === undefined ? undefined : {
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
									ret({});
								},
		
								success : function(savedData) {
									
									var
									// is not run next
									isNotRunNext;
		
									// run after get listeners.
									EACH(afterGetListeners, function(afterGetListener) {
										
										if (afterGetListener(savedData, function() {
											next(savedData);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});
		
									if (isNotRunNext !== true) {
										next(savedData);
									}
								}
							});
						};
					},
					
					function() {
						return function(savedData) {

							ret({
								savedData : savedData
							});
						};
					}]);
				};

				innerUpdate = function(data, ret, clientInfo, isNotToSaveHistory, isNotToUpdateLastUpdateTime) {

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

					// valid result
					validResult,

					// $inc valid result
					$incValidResult,

					// $push valid result
					$pushValidResult,
					
					// $addToSet valid result
					$addToSetValidResult,

					// $pull valid result
					$pullValidResult;

					// valid data.
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
						
						if ($addToSet !== undefined) {
							
							$addToSetValidResult = updateValid.checkForUpdate(RUN(function() {
								
								var
								// data for valid
								dataForValid = {};
								
								EACH($addToSet, function(value, attr) {
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
					data.$addToSet = $addToSet;
					data.$pull = $pull;

					if (updateValid !== undefined && (
						validResult.checkHasError() === true ||
						($incValidResult !== undefined && $incValidResult.checkHasError() === true) ||
						($pushValidResult !== undefined && $pushValidResult.checkHasError() === true) ||
						($addToSetValidResult !== undefined && $addToSetValidResult.checkHasError() === true) ||
						($pullValidResult !== undefined && $pullValidResult.checkHasError() === true)
					)) {

						ret({
							validErrors : COMBINE([
								validResult.getErrors(),
								$incValidResult === undefined ? {} : $incValidResult.getErrors(),
								$pushValidResult === undefined ? {} : $pushValidResult.getErrors(),
								$addToSetValidResult === undefined ? {} : $addToSetValidResult.getErrors(),
								$pullValidResult === undefined ? {} : $pullValidResult.getErrors()
							])
						});
					}

					// when has not error
					else {

						NEXT([
						function(next) {
										
							var
							// is not run next
							isNotRunNext;

							// run before update listeners.
							EACH(beforeUpdateListeners, function(beforeUpdateListener) {

								if (beforeUpdateListener(data, next, ret, clientInfo) === false) {

									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						function(next) {
							return function() {

								// update data in database.
								(isNotToUpdateLastUpdateTime === true ? db.updateNoRecord :
								(isNotToSaveHistory === true ? db.updateNoHistory :
								db.update))(data, {

									error : function(errorMsg) {
										ret({
											errorMsg : errorMsg
										});
									},

									notExists : function() {
										ret({});
									},

									success : function(savedData, originData) {
										
										var
										// is not run next
										isNotRunNext;
										
										// run after update listeners.
										EACH(afterUpdateListeners, function(afterUpdateListener) {
			
											if (afterUpdateListener(savedData, originData, function() {
												next(savedData, originData);
											}, ret, clientInfo) === false) {
												
												isNotRunNext = true;
											}
										});
			
										if (isNotRunNext !== true) {
											next(savedData, originData);
										}
									}
								});
							};
						},
						
						function() {
							return function(savedData, originData) {

								// broadcast for watching.
								box.BROADCAST({
									roomName : name + '/' + savedData.id,
									methodName : 'update',
									data : savedData
								});

								ret({
									savedData : savedData,
									originData : originData
								});
							};
						}]);
					}
				};

				innerRemove = function(id, ret, clientInfo) {
					
					NEXT([
					function(next) {
						
						var
						// is not run next
						isNotRunNext;

						// run before remove listeners.
						EACH(beforeRemoveListeners, function(beforeRemoveListener) {
							
							if (beforeRemoveListener(id, next, ret, clientInfo) === false) {
								
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					function(next) {
						return function() {

							// remove data in database.
							db.remove(id, {

								error : function(errorMsg) {
									ret({
										errorMsg : errorMsg
									});
								},

								notExists : function() {
									ret({});
								},

								success : function(originData) {
									
									var
									// is not run next
									isNotRunNext;

									// run after remove listeners.
									EACH(afterRemoveListeners, function(afterRemoveListener) {
										
										if (afterRemoveListener(originData, function() {
											next(originData);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});

									if (isNotRunNext !== true) {
										next(originData);
									}
								}
							});
						};
					},
						
					function() {
						return function(originData) {
							
							// broadcast for watching.
							box.BROADCAST({
								roomName : name + '/' + originData.id,
								methodName : 'remove',
								data : originData
							});
							
							// broadcast.
							box.BROADCAST({
								roomName : name + '/remove',
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

							ret({
								originData : originData
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
					//OPTIONAL: params.clientInfo

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
					isToCache;

					if (params !== undefined) {
						filter = params.filter;
						sort = params.sort;
						start = INTEGER(params.start);
						count = INTEGER(params.count);
						isFindAll = params.isFindAll;
						isToCache = params.isToCache;
						
						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}
					
					NEXT([
					function(next) {
						
						var
						// is not run next
						isNotRunNext;

						// run before find listeners.
						EACH(beforeFindListeners, function(beforeFindListener) {
							
							if (beforeFindListener({
								filter : filter,
								sort : sort,
								start : start,
								count : count,
								isFindAll : isFindAll,
								isToCache : isToCache
							}, next, ret, clientInfo) === false) {
								
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					function(next) {
						return function() {
							
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
							
									var
									// is not run next
									isNotRunNext;
		
									// run after find listeners.
									EACH(afterFindListeners, function(afterFindListener) {
		
										if (afterFindListener(savedDataSet, function() {
											next(savedDataSet);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});
		
									if (isNotRunNext !== true) {
										next(savedDataSet);
									}
								}
							});
						};
					},
					
					function() {
						return function(savedDataSet) {

							ret({
								savedDataSet : savedDataSet
							});
						};
					}]);
				};

				innerCount = function(params, ret, clientInfo) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//OPTIONAL: params.clientInfo

					var
					// filter
					filter,
					
					// is to cache
					isToCache;

					if (params !== undefined) {
						filter = params.filter;
						isToCache = params.isToCache;
						
						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}
					
					NEXT([
					function(next) {
						
						var
						// is not run next
						isNotRunNext;

						// run before count listeners.
						EACH(beforeCountListeners, function(beforeCountListener) {
							
							if (beforeCountListener({
								filter : filter,
								isToCache : isToCache
							}, next, ret, clientInfo) === false) {
								
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					function(next) {
						return function() {
							
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
									
									var
									// is not run next
									isNotRunNext;
		
									// run after count listeners.
									EACH(afterCountListeners, function(afterCountListener) {
										
										if (afterCountListener(count, function() {
											next(count);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});
		
									if (isNotRunNext !== true) {
										next(count);
									}
								}
							});
						};
					},
					
					function() {
						return function(count) {

							ret({
								count : count
							});
						};
					}]);
				};

				innerCheckIsExists = function(params, ret, clientInfo) {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//OPTIONAL: params.clientInfo

					var
					// filter
					filter,
					
					// is to cache
					isToCache;

					if (params !== undefined) {
						filter = params.filter;
						isToCache = params.isToCache;
						
						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}
					
					NEXT([
					function(next) {
						
						var
						// is not run next
						isNotRunNext;

						// run before check is exists listeners.
						EACH(beforeCheckIsExistsListeners, function(beforeCheckIsExistsListener) {
							
							if (beforeCheckIsExistsListener({
								filter : filter,
								isToCache : isToCache
							}, next, ret, clientInfo) === false) {
								
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					function(next) {
						return function() {
						
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
									
									var
									// is not run next
									isNotRunNext;
		
									// run after check is exists listeners.
									EACH(afterCheckIsExistsListeners, function(afterCheckIsExistsListener) {
		
										if (afterCheckIsExistsListener(isExists, function() {
											next(isExists);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});
		
									if (isNotRunNext !== true) {
										next(isExists);
									}
								}
							});
						};
					},
					
					function() {
						return function(isExists) {

							ret({
								isExists : isExists
							});
						};
					}]);
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
									console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.create` ERROR: ' + errorMsg));
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								} else {
									console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.create` NOT VALID.'), validErrors);
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
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.isToCache
					//OPTIONAL: idOrParams.clientInfo
					//REQUIRED: callbackOrHandlers

					var
					// callback.
					callback,

					// not exists handler.
					notExistsHandler,

					// error handler.
					errorHandler;
					
					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = idOrParams;
						idOrParams = {};
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
								console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.get` ERROR: ' + errorMsg));
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.get` NOT EXISTS.'), idOrParams);
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
								console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` ERROR: ' + errorMsg));
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT VALID.'), validErrors);
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT EXISTS.'), data);
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
								console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` ERROR: ' + errorMsg));
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT VALID.'), validErrors);
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT EXISTS.'), data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}
						
					}, undefined, true);
				};
				
				self.updateNoRecord = updateNoRecord = function(data, callbackOrHandlers) {
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
								console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` ERROR: ' + errorMsg));
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT VALID.'), validErrors);
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT EXISTS.'), data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}
						
					}, undefined, true, true);
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
								console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.remove` ERROR: ' + errorMsg));
							}
						} else if (originData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.remove` NOT EXISTS.'), id);
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
								console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.find` ERROR: ' + errorMsg));
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
								console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.count` ERROR: ' + errorMsg));
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
								console.log(CONSOLE_RED('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.checkIsExists` ERROR: ' + errorMsg));
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

								if (createAdminRole !== undefined && clientInfo.roles !== undefined && CHECK_IS_IN({
									array : clientInfo.roles,
									value : createAdminRole
								}) === true) {

									innerCreate(data, ret, clientInfo);

								} else if (createRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
									array : clientInfo.roles,
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
						});
					}

					// init get.
					if (getConfig !== false) {

						// on get.
						on('get', function(idOrParams, ret) {
						
							if (getRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array : clientInfo.roles,
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
									array : clientInfo.roles,
									value : updateRole
								}) === true || CHECK_IS_IN({
									array : clientInfo.roles,
									value : updateAdminRole
								}) === true))) {
	
									// check and inject auth key. (when not admin)
									if (updateAuthKey !== undefined && (clientInfo.roles !== undefined && CHECK_IS_IN({
										array : clientInfo.roles,
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
												ret({});
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
									array : clientInfo.roles,
									value : removeRole
								}) === true || CHECK_IS_IN({
									array : clientInfo.roles,
									value : removeAdminRole
								}) === true))) {
	
									// check auth key. (when not admin)
									if (removeAuthKey !== undefined && (clientInfo.roles !== undefined && CHECK_IS_IN({
										array : clientInfo.roles,
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
												ret({});
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
											array : clientInfo.roles,
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
								array : clientInfo.roles,
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
								array : clientInfo.roles,
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
								array : clientInfo.roles,
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
