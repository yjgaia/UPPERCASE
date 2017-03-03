/*

Welcome to UPPERCASE-DB! (http://uppercase.io)

*/

/*
 * MongoDB 서버에 연결합니다.
 */
global.CONNECT_TO_DB_SERVER = METHOD((m) => {

	const DEFAULT_DB_SERVER_NAME = '__';
	
	let nativeDBs = {};
	let initDBFuncMap = {};

	let addInitDBFunc = m.addInitDBFunc = (dbServerName, initDBFunc) => {
		//OPTIONAL: dbServerName
		//REQUIRED: initDBFunc
		
		if (initDBFunc === undefined) {
			initDBFunc = dbServerName;
			dbServerName = undefined;
		}
		
		if (dbServerName === undefined) {
			dbServerName = DEFAULT_DB_SERVER_NAME;
		}

		if (nativeDBs[dbServerName] === undefined) {
			
			if (initDBFuncMap[dbServerName] === undefined) {
				initDBFuncMap[dbServerName] = [];
			}
			
			initDBFuncMap[dbServerName].push(initDBFunc);
			
		} else {
			initDBFunc(nativeDBs[dbServerName]);
		}
	};

	return {

		run : (params, callback) => {
			//REQUIRED: params
			//OPTIONAL: params.dbServerName
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.name
			//OPTIONAL: params.username
			//OPTIONAL: params.password
			//OPTIONAL: callback

			let dbServerName = params.dbServerName === undefined ? DEFAULT_DB_SERVER_NAME : params.dbServerName;
			let host = params.host === undefined ? '127.0.0.1' : params.host;
			let port = params.port === undefined ? 27017 : params.port;
			let name = params.name;
			let username = params.username;
			let password = params.password;

			require('mongodb').MongoClient.connect(
				
				'mongodb://' +
				(username !== undefined && password !== undefined ? username + ':' + password.replace(/@/g, '%40') + '@' : '') +
				host + ':' +
				port + '/' +
				name,
				
				(error, nativeDB) => {

				if (error !== TO_DELETE) {

					SHOW_ERROR('CONNECT_TO_DB_SERVER', error.toString());

				} else {

					nativeDBs[dbServerName] = nativeDB;

					if (initDBFuncMap[dbServerName] !== undefined) {
						
						EACH(initDBFuncMap[dbServerName], (initDBFunc) => {
							initDBFunc(nativeDB);
						});
						
						delete initDBFuncMap[dbServerName];
					}

					if (callback !== undefined) {
						callback();
					}
				}
			});
		}
	};
});

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
						data : data,
						name : name
					});

				} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {

					removeEmptyValues(value);
				}
			});
		};
		
		return {

			init : (inner, self, nameOrParams) => {
				//REQUIRED: nameOrParams
				//OPTIONAL: nameOrParams.dbServerName
				//REQUIRED: nameOrParams.name
				//OPTIONAL: nameOrParams.isNotUsingObjectId
				//OPTIONAL: nameOrParams.isNotUsingHistory
	
				let dbServerName;
				let name;
				let isNotUsingObjectId;
				let isNotUsingHistory;
				
				let waitingCreateInfos = [];
				let waitingGetInfos = [];
				let waitingUpdateInfos = [];
				let waitingRemoveInfos = [];
				let waitingFindInfos = [];
				let waitingCountInfos = [];
				let waitingCheckIsExistsInfos = [];
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
					if (data._id !== undefined) {
						data.id = data._id.toString();
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
	
				if (CHECK_IS_DATA(nameOrParams) !== true) {
					name = nameOrParams;
				} else {
					dbServerName = nameOrParams.dbServerName;
					name = nameOrParams.name;
					isNotUsingObjectId = nameOrParams.isNotUsingObjectId;
					isNotUsingHistory = nameOrParams.isNotUsingHistory;
				}
	
				let create = self.create = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingCreateInfos.push({
						data : data,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				let get = self.get = (idOrParams, callbackOrHandlers) => {
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
	
					waitingGetInfos.push({
						idOrParams : idOrParams,
						callbackOrHandlers : callbackOrHandlers
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
					//OPTIONAL: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
	
					waitingUpdateInfos.push({
						data : data,
						callbackOrHandlers : callbackOrHandlers
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
						data : data,
						callbackOrHandlers : callbackOrHandlers,
						isNotToSaveHistory : true
					});
				};
				
				let updateNoRecord = self.updateNoRecord = (data, callbackOrHandlers) => {
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
						data : data,
						callbackOrHandlers : callbackOrHandlers,
						isNotToSaveHistory : true,
						isNotToUpdateLastUpdateTime : true
					});
				};
				
				let remove = self.remove = (id, callbackOrHandlers) => {
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
	
				let find = self.find = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingFindInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				let count = self.count = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingCountInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				let checkIsExists = self.checkIsExists = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingCheckIsExistsInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				let aggregate = self.aggregate = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingAggregateInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
				
				let createIndex = self.createIndex = (keys, callbackOrHandlers) => {
					//REQUIRED: keys
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
					
					waitingCreateIndexInfos.push({
						keys : keys,
						callbackOrHandlers : callbackOrHandlers
					});
				};
				
				let removeIndex = self.removeIndex = (index, callbackOrHandlers) => {
					//REQUIRED: index
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
					
					waitingRemoveIndexInfos.push({
						index : index,
						callbackOrHandlers : callbackOrHandlers
					});
				};
				
				let findAllIndexes = self.findAllIndexes = (callbackOrHandlers) => {
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
					
					waitingFindAllIndexesInfos.push({
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				CONNECT_TO_DB_SERVER.addInitDBFunc(dbServerName, (nativeDB) => {
					
					let collection = nativeDB.collection(box.boxName + '.' + name);
					let historyCollection;
					let errorLogCollection;
					
					let addHistory = (method, id, change, time) => {
						//REQUIRED: method
						//REQUIRED: id
						//OPTIONAL: change
						//REQUIRED: time
						
						let historyData = {
							docId : id,
							method : method,
							time : time
						};
						
						if (change !== undefined) {
							historyData.change = change;
						}
						
						if (historyCollection === undefined) {
							
							historyCollection = nativeDB.collection(box.boxName + '.' + name + '__HISTORY');
							
							// create history index.
							historyCollection.createIndex({
								docId : 1
							});
						}
	
						historyCollection.insertOne(historyData);
	
						if (NODE_CONFIG.isDBLogMode === true) {
							
							if (method === 'remove') {
								console.log('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` DATA(' + id + ') REMOVED.');
							} else {
								console.log('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` DATA(' + id + ') SAVED:', change);
							}
						}
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
							errorLogCollection.insert(errorInfo);
						}
	
						// if catch error
						catch (error) {
							// this case, ignore.
						}
	
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.errorMsg);
						} else {
							SHOW_ERROR('DB', errorInfo.errorMsg, {
								boxName : box.boxName,
								name : name
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
								w : 1
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
								}
	
								// if error is not TO_DELETE
								else {
	
									logError({
										method : 'create',
										data : data,
										errorMsg : error !== TO_DELETE ? error.toString() : '_id가 이미 존재합니다.'
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
	
					let innerGet = (params, callbackOrHandlers) => {
						//REQUIRED: params
						//REQUIRED: params.filter
						//REQUIRED: params.sort
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
						let filter = params.filter;
						let sort = params.sort;
						
						let callback;
						let notExistsHandler;
						let errorHandler;
						
						try {
	
							makeUpFilter(filter);
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notExistsHandler = callbackOrHandlers.notExists;
								errorHandler = callbackOrHandlers.error;
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
											SHOW_WARNING(box.boxName + '.' + name + 'DB.get', '데이터가 존재하지 않습니다.', filter);
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
	
					get = self.get = (idOrParams, callbackOrHandlers) => {
						//OPTIONAL: idOrParams
						//OPTIONAL: idOrParams.id
						//OPTIONAL: idOrParams.filter
						//OPTIONAL: idOrParams.sort
						//OPTIONAL: idOrParams.isRandom
						//REQUIRED: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
						let id;
						let filter;
						let sort;
						let isRandom;
						
						let callback;
						let notExistsHandler;
						let errorHandler;
	
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
								callback = callbackOrHandlers.success;
								notExistsHandler = callbackOrHandlers.notExists;
								errorHandler = callbackOrHandlers.error;
							}
	
							if (isRandom === true) {
	
								if (filter === undefined) {
									filter = {};
								}
								
								let randomKey;
	
								filter.__RANDOM_KEY = {
									$gte : randomKey = Math.random()
								};
	
								sort = {
									__RANDOM_KEY : 1
								};
	
								innerGet({
									filter : filter,
									sort : sort
								}, {
									error : errorHandler,
									notExists : () => {
	
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
	
							}
							
							else if (idOrParams === undefined) {
								
								if (notExistsHandler !== undefined) {
									notExistsHandler();
								} else {
									SHOW_WARNING(box.boxName + '.' + name + 'DB.get', '데이터가 존재하지 않습니다.', filter);
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
										createTime : -1
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
	
					let innerUpdate = (data, callbackOrHandlers, isNotToSaveHistory, isNotToUpdateLastUpdateTime) => {
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
						//OPTIONAL: isNotToSaveHistory
						//OPTIONAL: isNotToUpdateLastUpdateTime
						
						let id = data.id;
						let $inc = data.$inc;
						let $push = data.$push;
						let $addToSet = data.$addToSet;
						let $pull = data.$pull;
						
						let callback;
						let notExistsHandler;
						let errorHandler;
	
						try {
	
							let filter = {
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
	
							if (isNotToUpdateLastUpdateTime !== true) {
								data.lastUpdateTime = new Date();
							}
							
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
								filter : filter
							}, {
	
								error : (errorMsg) => {
	
									logError({
										method : 'update',
										data : data,
										errorMsg : errorMsg
									}, errorHandler);
								},
	
								notExists : () => {
	
									if (notExistsHandler !== undefined) {
										notExistsHandler();
									} else {
										SHOW_WARNING(box.boxName + '.' + name + 'DB.update', '수정할 데이터가 존재하지 않습니다.', filter);
									}
								},
	
								success : (originData) => {
									
									//!! if update data is empty, data to be empty.
									if (CHECK_IS_EMPTY_DATA(updateData) === true) {
										
										if (callback !== undefined) {
											callback(originData, originData);
										}
										
									} else {
	
										collection.updateOne(filter, updateData, {
											w : 1
										}, (error, result) => {
	
											if (error !== TO_DELETE) {
				
												logError({
													method : 'update',
													data : data,
													errorMsg : error.toString()
												}, errorHandler);
											}
											
											else if (result.result.n === 0) {
				
												if (notExistsHandler !== undefined) {
													notExistsHandler();
												} else {
													SHOW_WARNING(box.boxName + '.' + name + 'DB.update', '수정할 데이터가 존재하지 않습니다.', filter);
												}
											}
											
											else {
				
												get({
													filter : filter
												}, {
				
													error : (errorMsg) => {
				
														logError({
															method : 'update',
															data : data,
															errorMsg : errorMsg
														}, errorHandler);
													},
				
													notExists : () => {
				
														if (notExistsHandler !== undefined) {
															notExistsHandler();
														} else {
															SHOW_WARNING(box.boxName + '.' + name + 'DB.update', '수정할 데이터가 존재하지 않습니다.', filter);
														}
													},
				
													success : (savedData) => {
				
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
								method : 'update',
								data : data,
								errorMsg : error.toString()
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
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
	
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
					
					updateNoRecord = self.updateNoRecord = (data, callbackOrHandlers) => {
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
	
						innerUpdate(data, callbackOrHandlers, true, true);
					};
					
					remove = self.remove = (id, callbackOrHandlers) => {
						//REQUIRED: id
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.notExists
						//OPTIONAL: callbackOrHandlers.error
						
						let callback;
						let notExistsHandler;
						let errorHandler;
	
						try {
	
							let filter = {
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
	
								error : (errorMsg) => {
	
									logError({
										method : 'remove',
										id : id,
										errorMsg : errorMsg
									}, errorHandler);
								},
	
								notExists : () => {
	
									if (notExistsHandler !== undefined) {
										notExistsHandler();
									} else {
										SHOW_WARNING(box.boxName + '.' + name + 'DB.remove', '삭제할 데이터가 존재하지 않습니다.', filter);
									}
								},
	
								success : (originData) => {
	
									collection.deleteOne(filter, {
										w : 1
									}, (error, result) => {
										
										if (error !== TO_DELETE) {
	
											logError({
												method : 'remove',
												id : id,
												errorMsg : error.toString()
											}, errorHandler);
										}
										
										else if (result.result.n === 0) {
	
											if (notExistsHandler !== undefined) {
												notExistsHandler();
											} else {
												SHOW_WARNING(box.boxName + '.' + name + 'DB.remove', '삭제할 데이터가 존재하지 않습니다.', filter);
											}
										}
	
										else {
	
											if (isNotUsingHistory !== true) {
												addHistory('remove', id, undefined, new Date());
											}
											
											if (callback !== undefined) {
												callback(originData);
											}
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
					
					find = self.find = (params, callbackOrHandlers) => {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.sort
						//OPTIONAL: params.start
						//OPTIONAL: params.count
						//OPTIONAL: params.isFindAll
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						let filter;
						let sort;
						let start;
						let count;
						let isFindAll;
						
						let callback;
						let errorHandler;
	
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
	
								collection.find(filter).sort(sort).skip(start).limit(count).toArray((error, savedDataSet) => {
									
									if (error === TO_DELETE && savedDataSet.length === NODE_CONFIG.maxDataCount) {
										SHOW_WARNING(box.boxName + '.' + name + 'DB.find', '데이터의 개수가 ' + NODE_CONFIG.maxDataCount + '개 이상입니다. 최대 가져올 수 있는 데이터의 개수는 ' + NODE_CONFIG.maxDataCount + '개 입니다.');
									}
									
									proc(error, savedDataSet);
								});
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
	
					count = self.count = (params, callbackOrHandlers) => {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						let filter;
						
						let callback;
						let errorHandler;
	
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
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							makeUpFilter(filter);
							
							collection.find(filter).count((error, count) => {
	
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
	
					checkIsExists = self.checkIsExists = (params, callbackOrHandlers) => {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						let filter;
						
						let callback;
						let errorHandler;
						
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
							
							collection.find(filter).count((error, count) => {
	
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
	
					aggregate = self.aggregate = (params, callbackOrHandlers) => {
						//REQUIRED: params
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						let callback;
						let errorHandler;
	
						try {
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							collection.aggregate(params).toArray((error, result) => {
	
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
					
					let createIndex = self.createIndex = (keys, callbackOrHandlers) => {
						//REQUIRED: keys
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
						
						let callback;
						let errorHandler;
						
						try {
							
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									errorHandler = callbackOrHandlers.error;
								}
							}
							
							collection.createIndex(keys, {
								w : 1
							}, (error) => {
		
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
					
					// improve performance.
					createIndex({
						createTime : 1
					});
					
					let removeIndex = self.removeIndex = (index, callbackOrHandlers) => {
						//REQUIRED: index
						//OPTIONAL: callbackOrHandlers
						//OPTIONAL: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
						
						let callback;
						let errorHandler;
						
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
								w : 1
							}, (error) => {
		
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
					
					findAllIndexes = self.findAllIndexes = (callbackOrHandlers) => {
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
	
						let callback;
						let errorHandler;
						
						try {
	
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								errorHandler = callbackOrHandlers.error;
							}
	
							collection.indexInformation((error, indexInfo) => {
								
								if (error === TO_DELETE) {
									
									let keyMap = [];
									
									EACH(indexInfo, (pairs) => {
											
										var
										// keys
										keys = {};
										
										EACH(pairs, (pair) => {
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
	
					EACH(waitingCreateInfos, (info) => {
						create(info.data, info.callbackOrHandlers);
					});
	
					waitingCreateInfos = undefined;
	
					EACH(waitingGetInfos, (info) => {
						get(info.idOrParams, info.callbackOrHandlers);
					});
	
					waitingGetInfos = undefined;
	
					EACH(waitingUpdateInfos, (info) => {
						innerUpdate(info.data, info.callbackOrHandlers, info.isNotToSaveHistory, info.isNotToUpdateLastUpdateTime);
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
	
					EACH(waitingCountInfos, (info) => {
						count(info.params, info.callbackOrHandlers);
					});
	
					waitingCountInfos = undefined;
	
					EACH(waitingCheckIsExistsInfos, (info) => {
						checkIsExists(info.params, info.callbackOrHandlers);
					});
	
					waitingCheckIsExistsInfos = undefined;
	
					EACH(waitingAggregateInfos, (info) => {
						aggregate(info.params, info.callbackOrHandlers);
					});
	
					waitingAggregateInfos = undefined;
					
					EACH(waitingCreateIndexInfos, (info) => {
						createIndex(info.keys, info.callbackOrHandlers);
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

FOR_BOX((box) => {

	/*
	 * 로그를 저장하는 기능을 제공하는 LOG_DB 클래스
	 */
	box.LOG_DB = CLASS((cls) => {
		
		let gen_id = (id) => {
			//REQUIRED: id
			
			return VALID.mongoId(id) === true ? new ObjectID(id) : -1;
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

		return {
		
			init : (inner, self, nameOrParams) => {
				//REQUIRED: nameOrParams
				//OPTIONAL: nameOrParams.dbServerName
				//REQUIRED: nameOrParams.name
	
				let dbServerName;
				let name;
				
				let waitingLogDataSet = [];
				let waitingFindInfos = [];
				
				if (CHECK_IS_DATA(nameOrParams) !== true) {
					name = nameOrParams;
				} else {
					dbServerName = nameOrParams.dbServerName;
					name = nameOrParams.name;
				}
	
				let log = self.log = (data) => {
					//REQUIRED: data
	
					waitingLogDataSet.push(data);
				};
				
				let find = self.find = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//REQUIRED: callbackOrHandlers
					//REQUIRED: callbackOrHandlers.success
					//OPTIONAL: callbackOrHandlers.error
	
					waitingFindInfos.push({
						params : params,
						callbackOrHandlers : callbackOrHandlers
					});
				};
	
				CONNECT_TO_DB_SERVER.addInitDBFunc(dbServerName, (nativeDB) => {
	
					let collection = nativeDB.collection(box.boxName + '.' + name);
	
					log = self.log = (data) => {
						//REQUIRED: data
	
						// now
						data.time = new Date();
						
						box.DB.removeEmptyValues(data);
	
						collection.insertOne(data);
					};
					
					find = self.find = (params, callbackOrHandlers) => {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.sort
						//OPTIONAL: params.start
						//OPTIONAL: params.count
						//OPTIONAL: params.isFindAll
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
		
						let filter;
						let sort;
						let start;
						let count;
						let isFindAll;
						
						let callback;
						let errorHandler;
						let errorMsg;
						let cleanedFilter;
						let cachedInfo;
						
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
									time : -1
								};
							} 
						
							else if (sort.id !== undefined) {
								sort._id = sort.id;
								delete sort.id;
							}
							
							if (sort.time === undefined) {
								sort.time = -1;
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
										
										// convert _id (object) to id (string).
										if (savedData._id !== undefined) {
											savedData.id = savedData._id.toString();
										}
						
										// delete _id.
										delete savedData._id;
									});
	
									callback(savedDataSet);
								}
	
								// if error is not TO_DELETE
								else {
	
									if (errorHandler !== undefined) {
										errorHandler(error.toString());
									} else {
										SHOW_ERROR('LOG_DB', error.toString(), {
											boxName : box.boxName,
											name : name
										});
									}
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
							
							if (errorHandler !== undefined) {
								errorHandler(error.toString());
							} else {
								SHOW_ERROR('LOG_DB', error.toString(), {
									boxName : box.boxName,
									name : name
								});
							}
						}
					};
	
					EACH(waitingLogDataSet, (data) => {
						log(data);
					});
	
					waitingLogDataSet = undefined;
					
					EACH(waitingFindInfos, (info) => {
						find(info.params, info.callbackOrHandlers);
					});
	
					waitingFindInfos = undefined;
				});
			}
		};
	});
});

OVERRIDE(NODE_CONFIG, (origin) => {
	
	/*
	 * Node.js 환경에서의 기본 설정
	 */
	global.NODE_CONFIG = COMBINE([{

		// 데이터가 갱신될 때 콘솔 로그를 출력할 지 여부
		isDBLogMode : false,

		// find 함수를 수행할 때 최대로 가져올 데이터의 개수
		maxDataCount : 1000
		
	}, origin]);
});
