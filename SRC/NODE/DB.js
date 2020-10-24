FOR_BOX((box) => {

	let ObjectID = require('mongodb').ObjectID;

	/*
	 * MongoDB 컬렉션을 다루는 DB 클래스
	 */
	box.DB = CLASS((cls) => {

		let removeEmptyValues = cls.removeEmptyValues = (data) => {
			//REQUIRED: data

			EACH(data, (value, name) => {

				if (value === undefined || value === TO_DELETE) {

					REMOVE({
						data: data,
						name: name
					});

				} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {

					removeEmptyValues(value);
				}
			});
		};

		return {

			init: (inner, self, nameOrParams) => {
				//REQUIRED: nameOrParams
				//OPTIONAL: nameOrParams.dbServerName
				//REQUIRED: nameOrParams.name
				//OPTIONAL: nameOrParams.isNotUsingObjectId
				//OPTIONAL: nameOrParams.isNotUsingHistory

				let dbServerName;
				let name;
				let isNotUsingObjectId;
				let isNotUsingHistory;

				if (CHECK_IS_DATA(nameOrParams) !== true) {
					name = nameOrParams;
				} else {
					dbServerName = nameOrParams.dbServerName;
					name = nameOrParams.name;
					isNotUsingObjectId = nameOrParams.isNotUsingObjectId;
					isNotUsingHistory = nameOrParams.isNotUsingHistory;
				}

				let waitingCreateInfos = [];
				let waitingGetInfos = [];
				let waitingUpdateInfos = [];
				let waitingRemoveInfos = [];
				let waitingFindInfos = [];
				let waitingFindAllAndUpdateNoHistoryInfos = [];
				let waitingCountInfos = [];
				let waitingCheckExistsInfos = [];
				let waitingAggregateInfos = [];
				let waitingCreateIndexInfos = [];
				let waitingRemoveIndexInfos = [];
				let waitingFindAllIndexesInfos = [];

				let gen_id = (id) => {
					//REQUIRED: id

					if (isNotUsingObjectId === true) {
						return id;
					} else {
						return VALID.mongoId(id) === true ? new ObjectID(id) : -1;
					}
				};

				let cleanData = (data) => {
					//REQUIRED: data

					// convert _id (object) to id (string).
					if (data._id !== undefined && typeof data._id === 'object') {
						data.id = data._id.toString();
					} else {
						data.id = data._id;
					}

					// delete _id.
					delete data._id;

					// delete __RANDOM_KEY.
					delete data.__RANDOM_KEY;
				};

				let makeUpFilter = (filter) => {

					let f = (filter) => {

						if (filter.id !== undefined) {

							if (CHECK_IS_DATA(filter.id) === true) {

								EACH(filter.id, (values, i) => {
									if (CHECK_IS_DATA(values) === true || CHECK_IS_ARRAY(values) === true) {
										EACH(values, (value, j) => {
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

						EACH(filter, (value, name) => {
							if (value === undefined) {
								delete filter[name];
							}
						});
					};

					if (filter.$and !== undefined) {

						EACH(filter.$and, (filter) => {
							f(filter);
						});

					} else if (filter.$or !== undefined) {

						EACH(filter.$or, (filter) => {
							f(filter);
						});

					} else {
						f(filter);
					}
				};

				let create = self.create = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error

					waitingCreateInfos.push({
						data: data,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let get = self.get = (idOrParams, callbackOrHandlers) => {
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success

					waitingGetInfos.push({
						idOrParams: idOrParams,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let update = self.update = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: data.$inc
					//OPTIONAL: data.$push
					//OPTIONAL: data.$addToSet
					//OPTIONAL: data.$pull
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success

					waitingUpdateInfos.push({
						data: data,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let updateNoHistory = self.updateNoHistory = (data, callbackOrHandlers) => {
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
						data: data,
						callbackOrHandlers: callbackOrHandlers,
						isNotToSaveHistory: true
					});
				};

				let remove = self.remove = (id, callbackOrHandlers) => {
					//REQUIRED: id
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success

					waitingRemoveInfos.push({
						id: id,
						callbackOrHandlers: callbackOrHandlers
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

					waitingFindInfos.push({
						params: params,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let findAllAndUpdateNoHistory = self.findAllAndUpdateNoHistory = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: params.filter
					//REQUIRED: params.data
					//OPTIONAL: params.data.$inc
					//OPTIONAL: params.data.$push
					//OPTIONAL: params.data.$addToSet
					//OPTIONAL: params.data.$pull
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success

					waitingFindAllAndUpdateNoHistoryInfos.push({
						params: params,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let count = self.count = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					waitingCountInfos.push({
						params: params,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let checkExists = self.checkExists = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					waitingCheckExistsInfos.push({
						params: params,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let aggregate = self.aggregate = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					waitingAggregateInfos.push({
						params: params,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let createIndex = self.createIndex = (index, callbackOrHandlers) => {
					//REQUIRED: index
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					waitingCreateIndexInfos.push({
						index: index,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let removeIndex = self.removeIndex = (index, callbackOrHandlers) => {
					//REQUIRED: index
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					waitingRemoveIndexInfos.push({
						index: index,
						callbackOrHandlers: callbackOrHandlers
					});
				};

				let findAllIndexes = self.findAllIndexes = (callbackOrHandlers) => {
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					waitingFindAllIndexesInfos.push({
						callbackOrHandlers: callbackOrHandlers
					});
				};

				CONNECT_TO_DB_SERVER.addInitDBFunc(dbServerName, (nativeDB, backupDB) => {

					let collection = nativeDB.collection(box.boxName + '.' + name);
					let historyCollection;
					let errorLogCollection;

					let backupCollection;
					if (backupDB !== undefined) {
						backupCollection = backupDB.collection(box.boxName + '.' + name);
					}

					let addHistory = (method, id, change, time) => {
						//REQUIRED: method
						//REQUIRED: id
						//OPTIONAL: change
						//REQUIRED: time

						let historyData = {
							docId: id,
							method: method,
							time: time
						};

						if (change !== undefined) {
							historyData.change = change;
						}

						if (historyCollection === undefined) {

							historyCollection = nativeDB.collection(box.boxName + '.' + name + '__HISTORY');

							// create history index.
							historyCollection.createIndex({
								docId: 1
							});
						}

						historyCollection.insertOne(historyData);
					};

					let logError = (errorInfo, errorHandler) => {
						//REQUIRED: errorInfo
						//REQUIRED: errorInfo.errorMsg
						//OPTIONAL: errorHandler

						if (errorLogCollection === undefined) {
							errorLogCollection = nativeDB.collection(box.boxName + '.' + name + '__ERROR');
						}

						// now
						errorInfo.time = new Date();

						try {
							errorLogCollection.insertOne(errorInfo);
						}

						// if catch error
						catch (error) {
							// this case, ignore.
						}

						if (errorHandler !== undefined) {
							errorHandler(errorInfo.errorMsg, errorInfo);
						} else {

							let errorMsg = errorInfo.errorMsg;

							delete errorInfo.errorMsg;

							SHOW_ERROR('DB', errorMsg, {
								boxName: box.boxName,
								name: name,
								errorInfo: errorInfo
							});
						}
					};

					create = self.create = (data, callbackOrHandlers) => {
						//REQUIRED: data
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error

						let callback;
						let errorHandler;
						let errorMsg;

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
								w: 1
							}, (error, result) => {

								if (error === TO_DELETE && result.ops.length > 0) {

									let savedData = result.ops[0];

									// clean saved data before callback.
									cleanData(savedData);

									if (isNotUsingHistory !== true) {
										addHistory('create', savedData.id, savedData, savedData.createTime);
									}

									if (callback !== undefined) {
										callback(savedData);
									}

									if (backupCollection !== undefined) {
										backupCollection.insertOne(savedData, (error) => {

											if (error !== TO_DELETE) {

												SHOW_ERROR('BACKUP DB', error.toString(), {
													boxName: box.boxName,
													name: name
												});
											}
										});
									}
								}

								// if error is not TO_DELETE
								else {

									logError({
										method: 'create',
										data: data,
										errorMsg: error !== TO_DELETE ? error.toString() : '_id가 이미 존재합니다.'
									}, errorHandler);
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'create',
								data: data,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					let innerGet = (params, callbackOrHandlers) => {
						//REQUIRED: params
						//REQUIRED: params.filter
						//REQUIRED: params.sort
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: callbackOrHandlers.success

						let filter = params.filter;
						let sort = params.sort;

						let notExistsHandler;
						let errorHandler;
						let callback;

						try {

							makeUpFilter(filter);

							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								notExistsHandler = callbackOrHandlers.notExists;
								errorHandler = callbackOrHandlers.error;
								callback = callbackOrHandlers.success;
							}

							collection.find(filter).sort(sort).limit(1).toArray((error, savedDataSet) => {

								if (error === TO_DELETE) {

									if (savedDataSet.length > 0) {

										let savedData = savedDataSet[0];

										// clean saved data before callback.
										cleanData(savedData);

										if (callback !== undefined) {
											callback(savedData);
										}

									} else {

										if (notExistsHandler !== undefined) {
											notExistsHandler();
										} else {
											SHOW_WARNING(box.boxName + '.' + name + 'DB.get', MSG({
												ko: '데이터가 존재하지 않습니다.'
											}), filter);
										}
									}
								}

								// if error is not TO_DELETE
								else {

									logError({
										method: 'get',
										params: params,
										errorMsg: error.toString()
									}, errorHandler);
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'get',
								params: params,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					get = self.get = (idOrParams, callbackOrHandlers) => {
						//OPTIONAL: idOrParams
						//OPTIONAL: idOrParams.id
						//OPTIONAL: idOrParams.filter
						//OPTIONAL: idOrParams.sort
						//OPTIONAL: idOrParams.isRandom
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: callbackOrHandlers.success

						let id;
						let filter;
						let sort;
						let isRandom;

						let notExistsHandler;
						let errorHandler;
						let callback;

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
								}
							}

							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								notExistsHandler = callbackOrHandlers.notExists;
								errorHandler = callbackOrHandlers.error;
								callback = callbackOrHandlers.success;
							}

							if (isRandom === true) {

								if (filter === undefined) {
									filter = {};
								}

								let randomKey;

								filter.__RANDOM_KEY = {
									$gte: randomKey = Math.random()
								};

								sort = {
									__RANDOM_KEY: 1
								};

								innerGet({
									filter: filter,
									sort: sort
								}, {
									error: errorHandler,
									notExists: () => {

										filter.__RANDOM_KEY = {
											$lte: randomKey
										};

										innerGet({
											filter: filter,
											sort: sort
										}, callbackOrHandlers);
									},
									success: callback
								});
							}

							else if (idOrParams === undefined) {

								if (notExistsHandler !== undefined) {
									notExistsHandler();
								} else {
									SHOW_WARNING(box.boxName + '.' + name + 'DB.get', MSG({
										ko: '데이터가 존재하지 않습니다.'
									}), filter);
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
										createTime: -1
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
									filter: filter,
									sort: sort
								}, callbackOrHandlers);
							}
						}

						// if catch error
						catch (error) {

							logError({
								method: 'get',
								idOrParams: idOrParams,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					let innerUpdate = (data, callbackOrHandlers, isNotToSaveHistory) => {
						//REQUIRED: data
						//REQUIRED: data.id
						//OPTIONAL: data.$inc
						//OPTIONAL: data.$push
						//OPTIONAL: data.$addToSet
						//OPTIONAL: data.$pull
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: isNotToSaveHistory

						let id = data.id;
						let $inc = data.$inc;
						let $push = data.$push;
						let $addToSet = data.$addToSet;
						let $pull = data.$pull;

						let notExistsHandler;
						let errorHandler;
						let callback;

						try {

							let filter = {
								_id: gen_id(id)
							};

							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									notExistsHandler = callbackOrHandlers.notExists;
									errorHandler = callbackOrHandlers.error;
									callback = callbackOrHandlers.success;
								}
							}

							let $unset;

							EACH(data, (value, name) => {
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

							data.lastUpdateTime = new Date();

							let updateData = {};

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
								filter: filter
							}, {

								error: (errorMsg) => {

									logError({
										method: 'update',
										data: data,
										errorMsg: errorMsg
									}, errorHandler);
								},

								notExists: () => {

									if (notExistsHandler !== undefined) {
										notExistsHandler();
									} else {
										SHOW_WARNING(box.boxName + '.' + name + 'DB.update', MSG({
											ko: '수정할 데이터가 존재하지 않습니다.'
										}), filter);
									}
								},

								success: (originData) => {

									//!! if update data is empty, data to be empty.
									if (CHECK_IS_EMPTY_DATA(updateData) === true) {

										if (callback !== undefined) {
											callback(originData, originData);
										}

									} else {

										collection.updateOne(filter, updateData, {
											w: 1
										}, (error, result) => {

											if (error !== TO_DELETE) {

												logError({
													method: 'update',
													data: data,
													errorMsg: error.toString()
												}, errorHandler);
											}

											else if (result.result.n === 0) {

												if (notExistsHandler !== undefined) {
													notExistsHandler();
												} else {
													SHOW_WARNING(box.boxName + '.' + name + 'DB.update', MSG({
														ko: '수정할 데이터가 존재하지 않습니다.'
													}), filter);
												}
											}

											else {

												get({
													filter: filter
												}, {

													error: (errorMsg) => {

														logError({
															method: 'update',
															data: data,
															errorMsg: errorMsg
														}, errorHandler);
													},

													notExists: () => {

														if (notExistsHandler !== undefined) {
															notExistsHandler();
														} else {
															SHOW_WARNING(box.boxName + '.' + name + 'DB.update', MSG({
																ko: '수정할 데이터가 존재하지 않습니다.'
															}), filter);
														}
													},

													success: (savedData) => {

														let updateData = {};

														EACH(data, (value, name) => {
															updateData[name] = value;
														});

														if ($unset !== undefined) {
															EACH($unset, (value, name) => {
																updateData[name] = TO_DELETE;
															});
														}

														if ($inc !== undefined) {
															EACH($inc, (notUsing, name) => {
																updateData[name] = savedData[name];
															});
														}

														if ($push !== undefined) {
															EACH($push, (notUsing, name) => {
																updateData[name] = savedData[name];
															});
														}

														if ($addToSet !== undefined) {
															EACH($addToSet, (notUsing, name) => {
																updateData[name] = savedData[name];
															});
														}

														if ($pull !== undefined) {
															EACH($pull, (notUsing, name) => {
																updateData[name] = savedData[name];
															});
														}

														if (isNotUsingHistory !== true && isNotToSaveHistory !== true && RUN(() => {

															let isSame = true;

															EACH(updateData, (value, name) => {
																if (name !== 'lastUpdateTime' && originData[name] !== value) {
																	isSame = false;
																	return false;
																}
															});

															return isSame;

														}) !== true) {
															addHistory('update', id, updateData, savedData.lastUpdateTime);
														}

														if (callback !== undefined) {
															callback(savedData, originData);
														}

														if (backupCollection !== undefined) {
															backupCollection.updateOne(filter, savedData, (error) => {

																if (error !== TO_DELETE) {

																	SHOW_ERROR('BACKUP DB', error.toString(), {
																		boxName: box.boxName,
																		name: name
																	});
																}
															});
														}
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
								method: 'update',
								data: data,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					update = self.update = (data, callbackOrHandlers) => {
						//REQUIRED: data
						//REQUIRED: data.id
						//OPTIONAL: data.$inc
						//OPTIONAL: data.$push
						//OPTIONAL: data.$addToSet
						//OPTIONAL: data.$pull
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: callbackOrHandlers.success

						innerUpdate(data, callbackOrHandlers);
					};

					updateNoHistory = self.updateNoHistory = (data, callbackOrHandlers) => {
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

					remove = self.remove = (id, callbackOrHandlers) => {
						//REQUIRED: id
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: callbackOrHandlers.success

						let notExistsHandler;
						let errorHandler;
						let callback;

						try {

							let filter = {
								_id: gen_id(id)
							};

							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									notExistsHandler = callbackOrHandlers.notExists;
									errorHandler = callbackOrHandlers.error;
									callback = callbackOrHandlers.success;
								}
							}

							get({
								filter: filter
							}, {

								error: (errorMsg) => {

									logError({
										method: 'remove',
										id: id,
										errorMsg: errorMsg
									}, errorHandler);
								},

								notExists: () => {

									if (notExistsHandler !== undefined) {
										notExistsHandler();
									} else {
										SHOW_WARNING(box.boxName + '.' + name + 'DB.remove', MSG({
											ko: '삭제할 데이터가 존재하지 않습니다.'
										}), filter);
									}
								},

								success: (originData) => {

									collection.deleteOne(filter, {
										w: 1
									}, (error, result) => {

										if (error !== TO_DELETE) {

											logError({
												method: 'remove',
												id: id,
												errorMsg: error.toString()
											}, errorHandler);
										}

										else if (result.result.n === 0) {

											if (notExistsHandler !== undefined) {
												notExistsHandler();
											} else {
												SHOW_WARNING(box.boxName + '.' + name + 'DB.remove', MSG({
													ko: '삭제할 데이터가 존재하지 않습니다.'
												}), filter);
											}
										}

										else {

											if (isNotUsingHistory !== true) {
												addHistory('remove', id, undefined, new Date());
											}

											if (callback !== undefined) {
												callback(originData);
											}

											if (backupCollection !== undefined) {
												backupCollection.deleteOne(filter, (error) => {

													if (error !== TO_DELETE) {

														SHOW_ERROR('BACKUP DB', error.toString(), {
															boxName: box.boxName,
															name: name
														});
													}
												});
											}
										}
									});
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'remove',
								id: id,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					find = self.find = (params, callbackOrHandlers) => {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.sort
						//OPTIONAL: params.start
						//OPTIONAL: params.count
						//OPTIONAL: params.isFindAll
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.error
						//REQUIRED: callbackOrHandlers.success

						let filter;
						let sort;
						let start;
						let count;
						let isFindAll;

						let errorHandler;
						let callback;

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
								errorHandler = callbackOrHandlers.error;
								callback = callbackOrHandlers.success;
							}

							if (filter === undefined) {
								filter = {};
							}

							if (sort === undefined) {
								sort = {
									createTime: -1
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

							let proc = (error, savedDataSet) => {

								if (error === TO_DELETE) {

									// clean saved data before callback.
									EACH(savedDataSet, (savedData, i) => {
										cleanData(savedData);
									});

									callback(savedDataSet);
								}

								// if error is not TO_DELETE
								else {

									if (savedDataSet.length >= 100000) {
										SHOW_WARNING(box.boxName + '.' + name + 'DB.find', MSG({
											ko: '불러온 데이터의 개수가 너무 많습니다. (' + savedDataSet.length + '개)'
										}));
									}

									logError({
										method: 'find',
										params: params,
										errorMsg: error.toString()
									}, errorHandler);
								}
							};

							if (isFindAll === true) {

								// find all data set.
								collection.find(filter).sort(sort).skip(start).toArray(proc);

							} else {

								collection.find(filter).sort(sort).skip(start).limit(count).toArray((error, savedDataSet) => {

									if (error === TO_DELETE && savedDataSet.length === NODE_CONFIG.maxDataCount) {
										SHOW_WARNING(box.boxName + '.' + name + 'DB.find', MSG({
											ko: '데이터의 개수가 ' + NODE_CONFIG.maxDataCount + '개 이상입니다. 최대 가져올 수 있는 데이터의 개수는 ' + NODE_CONFIG.maxDataCount + '개 입니다.'
										}));
									}

									proc(error, savedDataSet);
								});
							}
						}

						// if catch error
						catch (error) {

							logError({
								method: 'find',
								params: params,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					findAllAndUpdateNoHistory = self.findAllAndUpdateNoHistory = (params, callbackOrHandlers) => {
						//REQUIRED: params
						//OPTIONAL: params.filter
						//REQUIRED: params.data
						//OPTIONAL: params.data.$inc
						//OPTIONAL: params.data.$push
						//OPTIONAL: params.data.$addToSet
						//OPTIONAL: params.data.$pull
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: callbackOrHandlers.success

						let filter = params.filter;
						let data = params.data;

						let $inc = data.$inc;
						let $push = data.$push;
						let $addToSet = data.$addToSet;
						let $pull = data.$pull;

						let errorHandler;
						let callback;

						try {

							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									errorHandler = callbackOrHandlers.error;
									callback = callbackOrHandlers.success;
								}
							}

							if (filter === undefined) {
								filter = {};
							}

							makeUpFilter(filter);

							let $unset;

							EACH(data, (value, name) => {
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

							data.lastUpdateTime = new Date();

							let updateData = {};

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

							collection.updateMany(filter, updateData, {
								w: 1
							}, (error) => {

								if (error !== TO_DELETE) {

									logError({
										method: 'update',
										data: data,
										errorMsg: error.toString()
									}, errorHandler);
								}

								else if (callback !== undefined) {
									callback();
								}

								if (backupCollection !== undefined) {
									backupCollection.updateMany(filter, updateData, (error) => {

										if (error !== TO_DELETE) {

											SHOW_ERROR('BACKUP DB', error.toString(), {
												boxName: box.boxName,
												name: name
											});
										}
									});
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'findAllAndUpdateNoHistory',
								params: params,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					count = self.count = (params, callbackOrHandlers) => {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.error
						//REQUIRED: callbackOrHandlers.success

						let filter;

						let errorHandler;
						let callback;

						try {

							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}

							if (params !== undefined) {
								filter = params.filter;
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
								errorHandler = callbackOrHandlers.error;
								callback = callbackOrHandlers.success;
							}

							makeUpFilter(filter);

							collection.find(filter).count((error, count) => {

								if (error === TO_DELETE) {
									callback(count);
								}

								// if error is not TO_DELETE
								else {

									logError({
										method: 'count',
										filter: filter,
										errorMsg: error.toString()
									}, errorHandler);
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'count',
								filter: filter,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					checkExists = self.checkExists = (params, callbackOrHandlers) => {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.error
						//REQUIRED: callbackOrHandlers.success

						let filter;

						let errorHandler;
						let callback;

						try {

							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}

							if (params !== undefined) {
								filter = params.filter;
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
									_id: gen_id(filter)
								};
							}

							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								errorHandler = callbackOrHandlers.error;
								callback = callbackOrHandlers.success;
							}

							makeUpFilter(filter);

							collection.find(filter).count((error, count) => {

								if (error === TO_DELETE) {
									callback(count !== undefined && count > 0);
								}

								// if error is not TO_DELETE
								else {

									logError({
										method: 'checkExists',
										filter: filter,
										errorMsg: error.toString()
									}, errorHandler);
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'checkExists',
								filter: filter,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					aggregate = self.aggregate = (params, callbackOrHandlers) => {
						//REQUIRED: params
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.error
						//REQUIRED: callbackOrHandlers.success

						let errorHandler;
						let callback;

						try {

							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								errorHandler = callbackOrHandlers.error;
								callback = callbackOrHandlers.success;
							}

							collection.aggregate(params).toArray((error, result) => {

								if (error === TO_DELETE) {

									callback(result);
								}

								// if error is not TO_DELETE
								else {

									logError({
										method: 'aggregate',
										params: params,
										errorMsg: error.toString()
									}, errorHandler);
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'aggregate',
								params: params,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					let createIndex = self.createIndex = (index, callbackOrHandlers) => {
						//REQUIRED: index
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: callbackOrHandlers.success

						let errorHandler;
						let callback;

						try {

							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									errorHandler = callbackOrHandlers.error;
									callback = callbackOrHandlers.success;
								}
							}

							collection.createIndex(index, {
								w: 1
							}, (error) => {

								if (error === TO_DELETE) {

									if (callback !== undefined) {
										callback();
									}
								}

								// if error is not TO_DELETE
								else {

									logError({
										method: 'createIndex',
										index: index,
										errorMsg: error.toString()
									}, errorHandler);
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'createIndex',
								index: index,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					// improve performance.
					createIndex({
						createTime: 1
					});

					let removeIndex = self.removeIndex = (index, callbackOrHandlers) => {
						//REQUIRED: index
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.error
						//OPTIONAL: callbackOrHandlers.success

						let errorHandler;
						let callback;

						try {

							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									errorHandler = callbackOrHandlers.error;
									callback = callbackOrHandlers.success;
								}
							}

							collection.dropIndex(index, {
								w: 1
							}, (error) => {

								if (error === TO_DELETE) {

									if (callback !== undefined) {
										callback();
									}
								}

								// if error is not TO_DELETE
								else {

									logError({
										method: 'removeIndex',
										index: index,
										errorMsg: error.toString()
									}, errorHandler);
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'removeIndex',
								index: index,
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					findAllIndexes = self.findAllIndexes = (callbackOrHandlers) => {
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.error
						//REQUIRED: callbackOrHandlers.success

						let errorHandler;
						let callback;

						try {

							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								errorHandler = callbackOrHandlers.error;
								callback = callbackOrHandlers.success;
							}

							collection.indexInformation((error, indexInfo) => {

								if (error === TO_DELETE) {

									let indexes = [];

									EACH(indexInfo, (pairs) => {

										let index = {};

										EACH(pairs, (pair) => {
											index[pair[0]] = pair[1];
										});

										indexes.push(index);
									});

									callback(indexes);
								}

								// if error is not TO_DELETE
								else {

									logError({
										method: 'findAllIndexes',
										errorMsg: error.toString()
									}, errorHandler);
								}
							});
						}

						// if catch error
						catch (error) {

							logError({
								method: 'findAllIndexes',
								errorMsg: error.toString()
							}, errorHandler);
						}
					};

					// run waiting infos.

					EACH(waitingCreateInfos, (info) => {
						create(info.data, info.callbackOrHandlers);
					});

					waitingCreateInfos = undefined;

					EACH(waitingGetInfos, (info) => {
						get(info.idOrParams, info.callbackOrHandlers);
					});

					waitingGetInfos = undefined;

					EACH(waitingUpdateInfos, (info) => {
						innerUpdate(info.data, info.callbackOrHandlers, info.isNotToSaveHistory);
					});

					waitingUpdateInfos = undefined;

					EACH(waitingRemoveInfos, (info) => {
						remove(info.id, info.callbackOrHandlers);
					});

					waitingRemoveInfos = undefined;

					EACH(waitingFindInfos, (info) => {
						find(info.params, info.callbackOrHandlers);
					});

					waitingFindInfos = undefined;

					EACH(waitingFindAllAndUpdateNoHistoryInfos, (info) => {
						findAllAndUpdateNoHistory(info.params, info.callbackOrHandlers);
					});

					waitingFindAllAndUpdateNoHistoryInfos = undefined;

					EACH(waitingCountInfos, (info) => {
						count(info.params, info.callbackOrHandlers);
					});

					waitingCountInfos = undefined;

					EACH(waitingCheckExistsInfos, (info) => {
						checkExists(info.params, info.callbackOrHandlers);
					});

					waitingCheckExistsInfos = undefined;

					EACH(waitingAggregateInfos, (info) => {
						aggregate(info.params, info.callbackOrHandlers);
					});

					waitingAggregateInfos = undefined;

					EACH(waitingCreateIndexInfos, (info) => {
						createIndex(info.index, info.callbackOrHandlers);
					});

					waitingCreateIndexInfos = undefined;

					EACH(waitingRemoveIndexInfos, (info) => {
						removeIndex(info.index, info.callbackOrHandlers);
					});

					waitingRemoveIndexInfos = undefined;

					EACH(waitingFindAllIndexesInfos, (info) => {
						findAllIndexes(info.callbackOrHandlers);
					});

					waitingFindAllIndexesInfos = undefined;
				});
			}
		};
	});
});
