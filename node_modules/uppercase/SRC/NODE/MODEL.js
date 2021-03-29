FOR_BOX((box) => {

	OVERRIDE(box.MODEL, (origin) => {

		/*
		 * MODEL 클래스
		 */
		box.MODEL = CLASS({

			preset: () => {
				return origin;
			},

			params: () => {
				return {
					isNotToInitialize: NODE_CONFIG.isNotToModelInitialize
				};
			},

			init: (inner, self, params) => {
				//REQUIRED: params
				//REQUIRED: params.name
				//OPTIONAL: params.initData
				//OPTIONAL: params.methodConfig
				//OPTIONAL: params.methodConfig.create
				//OPTIONAL: params.methodConfig.create.valid
				//OPTIONAL: params.methodConfig.create.role
				//OPTIONAL: params.methodConfig.create.authKey
				//OPTIONAL: params.methodConfig.create.adminRole
				//OPTIONAL: params.methodConfig.get
				//OPTIONAL: params.methodConfig.get.role
				//OPTIONAL: params.methodConfig.update
				//OPTIONAL: params.methodConfig.update.valid
				//OPTIONAL: params.methodConfig.update.role
				//OPTIONAL: params.methodConfig.update.authKey
				//OPTIONAL: params.methodConfig.update.adminRole
				//OPTIONAL: params.methodConfig.remove
				//OPTIONAL: params.methodConfig.remove.role
				//OPTIONAL: params.methodConfig.remove.authKey
				//OPTIONAL: params.methodConfig.remove.adminRole
				//OPTIONAL: params.methodConfig.find
				//OPTIONAL: params.methodConfig.find.role
				//OPTIONAL: params.methodConfig.count
				//OPTIONAL: params.methodConfig.count.role
				//OPTIONAL: params.methodConfig.checkExists
				//OPTIONAL: params.methodConfig.checkExists.role
				//OPTIONAL: params.isNotUsingObjectId
				//OPTIONAL: params.isNotUsingHistory
				//OPTIONAL: params.isNotToInitialize

				let name = params.name;
				let initData = params.initData;
				let methodConfig = params.methodConfig;
				let isNotUsingObjectId = params.isNotUsingObjectId;
				let isNotUsingHistory = params.isNotUsingHistory;
				let isNotToInitialize = params.isNotToInitialize;

				let createConfig;
				let getConfig;
				let updateConfig;
				let removeConfig;
				let findConfig;
				let countConfig;
				let checkExistsConfig;

				let createValid;
				let updateValid;

				let createRole;
				let getRole;
				let updateRole;
				let removeRole;
				let findRole;
				let countRole;
				let checkExistsRole;

				let createAdminRole;
				let updateAdminRole;
				let removeAdminRole;

				let createAuthKey;
				let updateAuthKey;
				let removeAuthKey;

				let beforeCreateListeners = [];
				let afterCreateListeners = [];
				let beforeGetListeners = [];
				let afterGetListeners = [];
				let beforeUpdateListeners = [];
				let afterUpdateListeners = [];
				let beforeRemoveListeners = [];
				let afterRemoveListeners = [];
				let beforeFindListeners = [];
				let afterFindListeners = [];
				let beforeCountListeners = [];
				let afterCountListeners = [];
				let beforeCheckExistsListeners = [];
				let afterCheckExistsListeners = [];

				let db = box.DB({
					name: name,
					isNotUsingObjectId: isNotUsingObjectId,
					isNotUsingHistory: isNotUsingHistory
				});

				// init method config.
				if (methodConfig !== undefined) {

					createConfig = methodConfig.create;
					getConfig = methodConfig.get;
					updateConfig = methodConfig.update;
					removeConfig = methodConfig.remove;
					findConfig = methodConfig.find;
					countConfig = methodConfig.count;
					checkExistsConfig = methodConfig.checkExists;

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

					if (checkExistsConfig !== undefined) {
						checkExistsRole = checkExistsConfig.role;
					}
				}

				// init not inited data set. (when worker id is 1)
				if (isNotToInitialize !== true && CPU_CLUSTERING.getWorkerId() === 1 && initData !== undefined) {

					let $or = [];

					EACH(initData, (value, name) => {

						let filter = {};

						filter[name] = TO_DELETE;

						$or.push(filter);
					});

					if ($or.length > 0) {

						db.find({
							filter: {
								$or: $or
							},
							isFindAll: true
						}, (notInitedDataSet) => {

							if (notInitedDataSet.length > 0) {

								SHOW_WARNING(box.boxName + '.' + name + 'Model', MSG({
									ko: '초기화 되지 않은 데이터가 ' + notInitedDataSet.length + '개 있습니다. 모두 초기화합니다.'
								}));

								NEXT(notInitedDataSet, [

									(notInitedData, next) => {

										EACH(initData, (value, name) => {
											if (notInitedData[name] === undefined) {
												notInitedData[name] = value;
											}
										});

										db.update(notInitedData, next);
									},

									() => {
										return () => {
											SHOW_WARNING(box.boxName + '.' + name + 'Model', MSG({
												ko: notInitedDataSet.length + '개 데이터를 모두 초기화하였습니다.'
											}));
										};
									}
								]);
							}
						});
					}
				}

				let getName = self.getName = () => {
					return name;
				};

				let getInitData = self.getInitData = () => {
					return initData;
				};

				let getCreateValid = self.getCreateValid = () => {
					return createValid;
				};

				let getUpdateValid = self.getUpdateValid = () => {
					return updateValid;
				};

				let getDB = self.getDB = () => {
					return db;
				};

				let on = inner.on = (methodName, funcOrFuncs) => {
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

					// when check exists method
					else if (methodName === 'checkExists') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeCheckExistsListeners.push(funcOrFuncs.before);
							}

							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterCheckExistsListeners.push(funcOrFuncs.after);
							}

						} else {

							// add after listener.
							afterCheckExistsListeners.push(funcOrFuncs);
						}
					}
				};

				let innerCreate = (data, ret, clientInfo) => {

					let validResult;

					// init data.
					if (initData !== undefined) {
						EACH(initData, (value, name) => {
							data[name] = value;
						});
					}

					// valid data.
					if (createValid !== undefined) {
						validResult = createValid.checkAndWash(data);
					}

					// when has error
					if (validResult !== undefined && validResult.checkHasError() === true) {

						ret({
							validErrors: validResult.getErrors()
						});
					}

					// when has not error
					else {

						NEXT([

							(next) => {

								let isNotRunNext;

								// run before create listeners.
								EACH(beforeCreateListeners, (beforeCreateListener) => {

									if (beforeCreateListener(data, next, ret, clientInfo) === false) {

										isNotRunNext = true;
									}
								});

								if (isNotRunNext !== true) {
									next();
								}
							},

							(next) => {
								return () => {

									// create data in database.
									db.create(data, {

										error: (errorMsg, errorInfo) => {
											ret({
												errorMsg: errorMsg,
												errorInfo: errorInfo
											});
										},

										success: (savedData) => {

											let isNotRunNext;

											// run after create listeners.
											EACH(afterCreateListeners, (afterCreateListener) => {

												if (afterCreateListener(savedData, () => {
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

							() => {
								return (savedData) => {

									// broadcast.
									box.BROADCAST({
										roomName: name + '/create',
										methodName: 'create',
										data: savedData
									});

									// broadcast by property.
									EACH(savedData, (value, propertyName) => {
										box.BROADCAST({
											roomName: name + '/' + propertyName + '/' + value + '/create',
											methodName: 'create',
											data: savedData
										});
									});

									ret({
										savedData: savedData
									});
								};
							}
						]);
					}
				};

				let innerGet = (idOrParams, ret, clientInfo) => {
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.clientInfo

					let isIdMode;
					let id;
					let filter;
					let sort;
					let isRandom;
					let params;

					// init params.
					if (idOrParams !== undefined) {

						if (CHECK_IS_DATA(idOrParams) !== true) {

							isIdMode = true;

							id = idOrParams;
						}

						else {

							id = idOrParams.id;
							filter = idOrParams.filter;
							sort = idOrParams.sort;
							isRandom = idOrParams.isRandom;

							if (clientInfo === undefined) {
								clientInfo = idOrParams.clientInfo;
							}
						}

						params = {
							id: id,
							filter: filter,
							sort: sort,
							isRandom: isRandom
						};
					}

					NEXT([

						(next) => {

							let isNotRunNext;

							// run before get listeners.
							EACH(beforeGetListeners, (beforeGetListener) => {
								if (beforeGetListener(isIdMode === true ? id : params, next, ret, clientInfo) === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						(next) => {
							return () => {

								// get data in database.
								db.get(params, {

									error: (errorMsg, errorInfo) => {
										ret({
											errorMsg: errorMsg,
											errorInfo: errorInfo
										});
									},

									notExists: () => {
										ret({});
									},

									success: (savedData) => {

										let isNotRunNext;

										// run after get listeners.
										EACH(afterGetListeners, (afterGetListener) => {

											if (afterGetListener(savedData, () => {
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

						() => {
							return (savedData) => {

								ret({
									savedData: savedData
								});
							};
						}
					]);
				};

				let innerUpdate = (data, ret, clientInfo, isNotToSaveHistory) => {

					let id = data.id;
					let $inc = data.$inc;
					let $push = data.$push;
					let $addToSet = data.$addToSet;
					let $pull = data.$pull;

					let validResult;
					let $incValidResult;
					let $pushValidResult;
					let $addToSetValidResult;
					let $pullValidResult;

					// valid data.
					if (updateValid !== undefined) {

						validResult = updateValid.checkForUpdate(data);

						if ($inc !== undefined) {
							$incValidResult = updateValid.checkForUpdate($inc);
						}

						if ($push !== undefined) {

							$pushValidResult = updateValid.checkForUpdate(RUN(() => {

								let dataForValid = {};

								EACH($push, (value, attr) => {
									dataForValid[attr] = [value];
								});

								return dataForValid;
							}));
						}

						if ($addToSet !== undefined) {

							$addToSetValidResult = updateValid.checkForUpdate(RUN(() => {

								let dataForValid = {};

								EACH($addToSet, (value, attr) => {
									dataForValid[attr] = [value];
								});

								return dataForValid;
							}));
						}

						if ($pull !== undefined) {

							$pullValidResult = updateValid.checkForUpdate(RUN(() => {

								let dataForValid = {};

								EACH($pull, (value, attr) => {
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
							validErrors: COMBINE([
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

							(next) => {

								let isNotRunNext;

								// run before update listeners.
								EACH(beforeUpdateListeners, (beforeUpdateListener) => {

									if (beforeUpdateListener(data, next, ret, clientInfo) === false) {

										isNotRunNext = true;
									}
								});

								if (isNotRunNext !== true) {
									next();
								}
							},

							(next) => {
								return () => {

									// update data in database.
									(isNotToSaveHistory === true ? db.updateNoHistory : db.update)(data, {

										error: (errorMsg, errorInfo) => {
											ret({
												errorMsg: errorMsg,
												errorInfo: errorInfo
											});
										},

										notExists: () => {
											ret({});
										},

										success: (savedData, originData) => {

											let isNotRunNext;

											// run after update listeners.
											EACH(afterUpdateListeners, (afterUpdateListener) => {

												if (afterUpdateListener(savedData, originData, () => {
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

							() => {
								return (savedData, originData) => {

									// broadcast for watching.
									box.BROADCAST({
										roomName: name + '/' + savedData.id,
										methodName: 'update',
										data: savedData
									});

									ret({
										savedData: savedData,
										originData: originData
									});
								};
							}
						]);
					}
				};

				let innerRemove = (id, ret, clientInfo) => {

					NEXT([

						(next) => {

							let isNotRunNext;

							// run before remove listeners.
							EACH(beforeRemoveListeners, (beforeRemoveListener) => {

								if (beforeRemoveListener(id, next, ret, clientInfo) === false) {

									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						(next) => {
							return () => {

								// remove data in database.
								db.remove(id, {

									error: (errorMsg, errorInfo) => {
										ret({
											errorMsg: errorMsg,
											errorInfo: errorInfo
										});
									},

									notExists: () => {
										ret({});
									},

									success: (originData) => {

										let isNotRunNext;

										// run after remove listeners.
										EACH(afterRemoveListeners, (afterRemoveListener) => {

											if (afterRemoveListener(originData, () => {
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

						() => {
							return (originData) => {

								// broadcast for watching.
								box.BROADCAST({
									roomName: name + '/' + originData.id,
									methodName: 'remove',
									data: originData
								});

								// broadcast.
								box.BROADCAST({
									roomName: name + '/remove',
									methodName: 'remove',
									data: originData
								});

								// broadcast by property.
								EACH(originData, (value, propertyName) => {
									box.BROADCAST({
										roomName: name + '/' + propertyName + '/' + value + '/remove',
										methodName: 'remove',
										data: originData
									});
								});

								ret({
									originData: originData
								});
							};
						}
					]);
				};

				let innerFind = (params, ret, clientInfo) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//OPTIONAL: params.clientInfo

					let filter;
					let sort;
					let start;
					let count;
					let isFindAll;

					if (params !== undefined) {
						filter = params.filter;
						sort = params.sort;
						start = INTEGER(params.start);
						count = INTEGER(params.count);
						isFindAll = params.isFindAll;

						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}

					params = {
						filter: filter,
						sort: sort,
						start: start,
						count: count,
						isFindAll: isFindAll
					};

					NEXT([

						(next) => {

							let isNotRunNext;

							// run before find listeners.
							EACH(beforeFindListeners, (beforeFindListener) => {
								if (beforeFindListener(params, next, ret, clientInfo) === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						(next) => {
							return () => {

								// find data set in database.
								db.find(params, {

									error: (errorMsg, errorInfo) => {
										ret({
											errorMsg: errorMsg,
											errorInfo: errorInfo
										});
									},

									success: (savedDataSet) => {

										let isNotRunNext;

										// run after find listeners.
										EACH(afterFindListeners, (afterFindListener) => {

											if (afterFindListener(savedDataSet, () => {
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

						() => {
							return (savedDataSet) => {

								ret({
									savedDataSet: savedDataSet
								});
							};
						}
					]);
				};

				let innerCount = (params, ret, clientInfo) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.clientInfo

					let filter;

					if (params !== undefined) {
						filter = params.filter;

						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}

					params = {
						filter: filter
					};

					NEXT([

						(next) => {

							let isNotRunNext;

							// run before count listeners.
							EACH(beforeCountListeners, (beforeCountListener) => {
								if (beforeCountListener(params, next, ret, clientInfo) === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						(next) => {
							return () => {

								// count data in database.
								db.count(params, {

									error: (errorMsg, errorInfo) => {
										ret({
											errorMsg: errorMsg,
											errorInfo: errorInfo
										});
									},

									success: (count) => {

										let isNotRunNext;

										// run after count listeners.
										EACH(afterCountListeners, (afterCountListener) => {

											if (afterCountListener(count, () => {
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

						() => {
							return (count) => {

								ret({
									count: count
								});
							};
						}
					]);
				};

				let innerCheckExists = (params, ret, clientInfo) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.clientInfo

					let filter;

					if (params !== undefined) {
						filter = params.filter;

						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}

					params = {
						filter: filter
					};

					NEXT([

						(next) => {

							let isNotRunNext;

							// run before check exists listeners.
							EACH(beforeCheckExistsListeners, (beforeCheckExistsListener) => {
								if (beforeCheckExistsListener(params, next, ret, clientInfo) === false) {
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						(next) => {
							return () => {

								// check exists data in database.
								db.checkExists(params, {

									error: (errorMsg, errorInfo) => {
										ret({
											errorMsg: errorMsg,
											errorInfo: errorInfo
										});
									},

									success: (exists) => {

										let isNotRunNext;

										// run after check exists listeners.
										EACH(afterCheckExistsListeners, (afterCheckExistsListener) => {

											if (afterCheckExistsListener(exists, () => {
												next(exists);
											}, ret, clientInfo) === false) {

												isNotRunNext = true;
											}
										});

										if (isNotRunNext !== true) {
											next(exists);
										}
									}
								});
							};
						},

						() => {
							return (exists) => {

								ret({
									exists: exists
								});
							};
						}
					]);
				};

				let create = self.create = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.notValid
					//OPTIONAL: callbackOrHandlers.success

					let errorHandler;
					let notValidHandler;
					let callback;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							notValidHandler = callbackOrHandlers.notValid;
							callback = callbackOrHandlers.success;
						}
					}

					innerCreate(data, (result) => {

						let errorMsg;
						let errorInfo;
						let validErrors;
						let savedData;

						if (result !== undefined) {

							errorMsg = result.errorMsg;
							errorInfo = result.errorInfo;
							validErrors = result.validErrors;
							savedData = result.savedData;

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									SHOW_ERROR(box.boxName + '.' + name + 'Model.create', errorMsg, errorInfo);
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								} else {
									SHOW_WARNING(box.boxName + '.' + name + 'Model.create', MSG({
										ko: '데이터가 유효하지 않습니다.'
									}), {
										data: data,
										validErrors: validErrors
									});
								}
							} else if (callback !== undefined) {
								callback(savedData);
							}

						} else if (callback !== undefined) {
							callback();
						}
					});
				};

				let get = self.get = (idOrParams, callbackOrHandlers) => {
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.clientInfo
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.success

					let errorHandler;
					let notExistsHandler;
					let callback;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = idOrParams;
						idOrParams = {};
					}

					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						errorHandler = callbackOrHandlers.error;
						notExistsHandler = callbackOrHandlers.notExists;
						callback = callbackOrHandlers.success;
					}

					let callStack = errorHandler !== undefined || notExistsHandler !== undefined ? undefined : (new Error()).stack;
					let showCallStack = () => {
						console.log(callStack);
					};

					innerGet(idOrParams, (result) => {

						let errorMsg;
						let errorInfo;
						let savedData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							errorInfo = result.errorInfo;
							savedData = result.savedData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.get', errorMsg, errorInfo);
								showCallStack();
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.get', MSG({
									ko: '데이터가 존재하지 않습니다.'
								}), idOrParams);
								showCallStack();
							}
						} else if (callback !== undefined) {
							callback(savedData);
						}
					});
				};

				let update = self.update = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.notValid
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.success

					let errorHandler;
					let notValidHandler;
					let notExistsHandler;
					let callback;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							notValidHandler = callbackOrHandlers.notValid;
							notExistsHandler = callbackOrHandlers.notExists;
							callback = callbackOrHandlers.success;
						}
					}

					let callStack = errorHandler !== undefined || notExistsHandler !== undefined ? undefined : (new Error()).stack;
					let showCallStack = () => {
						console.log(callStack);
					};

					innerUpdate(data, (result) => {

						let errorMsg;
						let errorInfo;
						let validErrors;
						let savedData;
						let originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							errorInfo = result.errorInfo;
							validErrors = result.validErrors;
							savedData = result.savedData;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.update', errorMsg, errorInfo);
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', MSG({
									ko: '데이터가 유효하지 않습니다.'
								}), {
									data: data,
									validErrors: validErrors
								});
								showCallStack();
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', MSG({
									ko: '수정할 데이터가 존재하지 않습니다.'
								}), data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}
					});
				};

				let updateNoHistory = self.updateNoHistory = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.notValid
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.success

					let errorHandler;
					let notValidHandler;
					let notExistsHandler;
					let callback;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							notValidHandler = callbackOrHandlers.notValid;
							notExistsHandler = callbackOrHandlers.notExists;
							callback = callbackOrHandlers.success;
						}
					}

					let callStack = errorHandler !== undefined || notExistsHandler !== undefined ? undefined : (new Error()).stack;
					let showCallStack = () => {
						console.log(callStack);
					};

					innerUpdate(data, (result) => {

						let errorMsg;
						let errorInfo;
						let validErrors;
						let savedData;
						let originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							errorInfo = result.errorInfo;
							validErrors = result.validErrors;
							savedData = result.savedData;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.update', errorMsg, errorInfo);
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', MSG({
									ko: '데이터가 유효하지 않습니다.'
								}), {
									data: data,
									validErrors: validErrors
								});
								showCallStack();
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', MSG({
									ko: '수정할 데이터가 존재하지 않습니다.'
								}), data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}

					}, undefined, true);
				};

				let remove = self.remove = (id, callbackOrHandlers) => {
					//REQUIRED: id
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.success

					let errorHandler;
					let notExistsHandler;
					let callback;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							notExistsHandler = callbackOrHandlers.notExists;
							callback = callbackOrHandlers.success;
						}
					}

					innerRemove(id, (result) => {

						let errorMsg;
						let errorInfo;
						let originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							errorInfo = result.errorInfo;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.remove', errorMsg, errorInfo);
							}
						} else if (originData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.remove', MSG({
									ko: '삭제할 데이터가 존재하지 않습니다.'
								}), id);
							}
						} else if (callback !== undefined) {
							callback(originData);
						}
					});
				};

				let find = self.find = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					let errorHandler;
					let callback;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							callback = callbackOrHandlers.success;
						}
					}

					innerFind(params, (result) => {

						let errorMsg = result.errorMsg;
						let errorInfo = result.errorInfo;
						let savedDataSet = result.savedDataSet;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.find', errorMsg, errorInfo);
							}
						} else {
							callback(savedDataSet);
						}
					});
				};

				let count = self.count = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					let errorHandler;
					let callback;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							callback = callbackOrHandlers.success;
						}
					}

					innerCount(params, (result) => {

						let errorMsg = result.errorMsg;
						let errorInfo = result.errorInfo;
						let count = result.count;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.count', errorMsg, errorInfo);
							}
						} else {
							callback(count);
						}
					});
				};

				let checkExists = self.checkExists = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					let errorHandler;
					let callback;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							callback = callbackOrHandlers.success;
						}
					}

					innerCheckExists(params, (result) => {

						let errorMsg = result.errorMsg;
						let errorInfo = result.errorInfo;
						let exists = result.exists;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.checkExists', errorMsg, errorInfo);
							}
						} else {
							callback(exists);
						}
					});
				};

				// init room for create, get, find.
				box.ROOM(name, (clientInfo, on) => {

					// init create.
					if (createConfig !== false) {

						// on create.
						on('create', (data, ret) => {

							// ignore undefined data attack.
							if (data !== undefined) {

								if (createAdminRole !== undefined && clientInfo.roles !== undefined && CHECK_IS_IN({
									array: clientInfo.roles,
									value: createAdminRole
								}) === true) {

									innerCreate(data, ret, clientInfo);

								} else if (createRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
									array: clientInfo.roles,
									value: createRole
								}) === true)) {

									// inject auth key.
									if (createAuthKey !== undefined) {
										data[createAuthKey] = clientInfo.authKey;
									}

									innerCreate(data, ret, clientInfo);

								} else {

									ret({
										isNotAuthed: true
									});
								}
							}
						});
					}

					// init get.
					if (getConfig !== false) {

						// on get.
						on('get', (idOrParams, ret) => {

							if (getRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array: clientInfo.roles,
								value: getRole
							}) === true)) {

								innerGet(idOrParams, ret, clientInfo);

							} else {

								ret({
									isNotAuthed: true
								});
							}
						});
					}

					// init update.
					if (updateConfig !== false) {

						// on update.
						on('update', (data, ret) => {

							// ignore undefined data attack.
							if (data !== undefined) {

								if (updateRole === undefined || (clientInfo.roles !== undefined && (CHECK_IS_IN({
									array: clientInfo.roles,
									value: updateRole
								}) === true || CHECK_IS_IN({
									array: clientInfo.roles,
									value: updateAdminRole
								}) === true))) {

									// check and inject auth key. (when not admin)
									if (updateAuthKey !== undefined && (clientInfo.roles !== undefined && CHECK_IS_IN({
										array: clientInfo.roles,
										value: updateAdminRole
									}) === true) !== true) {

										// get data in database.
										db.get(data.id, {

											error: (errorMsg, errorInfo) => {
												ret({
													errorMsg: errorMsg,
													errorInfo: errorInfo
												});
											},

											notExists: () => {
												ret({});
											},

											success: (savedData) => {

												// check auth key.
												if (savedData[updateAuthKey] === clientInfo.authKey) {

													// do not change auth key.
													data[updateAuthKey] = clientInfo.authKey;

													innerUpdate(data, ret, clientInfo);
												}

												// not authed
												else {
													ret({
														isNotAuthed: true
													});
												}
											}
										});

									} else {
										innerUpdate(data, ret, clientInfo);
									}

								} else {

									ret({
										isNotAuthed: true
									});
								}
							}
						});
					}

					// init remove.
					if (removeConfig !== false) {

						// on remove.
						on('remove', (id, ret) => {

							// ignore undefined data attack.
							if (id !== undefined) {

								if (removeRole === undefined || (clientInfo.roles !== undefined && (CHECK_IS_IN({
									array: clientInfo.roles,
									value: removeRole
								}) === true || CHECK_IS_IN({
									array: clientInfo.roles,
									value: removeAdminRole
								}) === true))) {

									// check auth key. (when not admin)
									if (removeAuthKey !== undefined && (clientInfo.roles !== undefined && CHECK_IS_IN({
										array: clientInfo.roles,
										value: removeAdminRole
									}) === true) !== true) {

										// get data in database.
										db.get(id, {

											error: (errorMsg, errorInfo) => {
												ret({
													errorMsg: errorMsg,
													errorInfo: errorInfo
												});
											},

											notExists: () => {
												ret({});
											},

											success: (savedData) => {

												// check auth key.
												if (savedData[removeAuthKey] === clientInfo.authKey) {
													innerRemove(id, ret, clientInfo);
												}

												// not authed
												else {
													ret({
														isNotAuthed: true
													});
												}
											}
										});

									} else if (removeAuthKey === undefined && removeAdminRole !== undefined) {

										if (clientInfo.roles !== undefined && CHECK_IS_IN({
											array: clientInfo.roles,
											value: removeAdminRole
										}) === true) {

											innerRemove(id, ret, clientInfo);

										} else {

											ret({
												isNotAuthed: true
											});
										}

									} else {
										innerRemove(id, ret, clientInfo);
									}

								} else {

									ret({
										isNotAuthed: true
									});
								}
							}
						});
					}

					// init find.
					if (findConfig !== false) {

						// on find.
						on('find', (params, ret) => {

							if (findRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array: clientInfo.roles,
								value: findRole
							}) === true)) {

								if (params !== undefined) {

									// delete for server params.
									delete params.isFindAll;
								}

								innerFind(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed: true
								});
							}
						});
					}

					// init count.
					if (countConfig !== false) {

						// on count.
						on('count', (params, ret) => {

							if (countRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array: clientInfo.roles,
								value: countRole
							}) === true)) {

								innerCount(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed: true
								});
							}
						});
					}

					// init check exists.
					if (checkExistsConfig !== false) {

						// on check exists.
						on('checkExists', (params, ret) => {

							if (checkExistsRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array: clientInfo.roles,
								value: checkExistsRole
							}) === true)) {

								innerCheckExists(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed: true
								});
							}
						});
					}
				});
			}
		});
	});
});
