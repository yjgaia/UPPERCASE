FOR_BOX(function(box) {
	'use strict';

	/**
	 * 로그를 저장하는 기능을 제공하는 LOG_DB 클래스
	 */
	box.LOG_DB = CLASS(function(cls) {
		
		var
		// generate _id.
		gen_id = function(id) {
			//REQUIRED: id
			
			return VALID.id(id) === true ? new ObjectID(id) : -1;
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
						filter._id = gen_id(filter.id);
					}
					delete filter.id;
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

		return {
		
			init : function(inner, self, name) {
				//REQUIRED: name
	
				var
				// waiting log data set
				waitingLogDataSet = [],
				
				// waiting find infos
				waitingFindInfos = [],
	
				// log.
				log,
				
				// find.
				find;
	
				self.log = log = function(data) {
					//REQUIRED: data
	
					waitingLogDataSet.push(data);
				};
				
				self.find = find = function(params, callbackOrHandlers) {
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
	
				CONNECT_TO_DB_SERVER.addInitDBFunc(function(nativeDB) {
	
					var
					// MongoDB collection
					collection = nativeDB.collection(box.boxName + '.' + name);
	
					self.log = log = function(data) {
						//REQUIRED: data
	
						// now
						data.time = new Date();
						
						box.DB.removeEmptyValues(data);
	
						collection.insertOne(data);
					};
					
					self.find = find = function(params, callbackOrHandlers) {
						//OPTIONAL: params
						//OPTIONAL: params.filter
						//OPTIONAL: params.sort
						//OPTIONAL: params.start
						//OPTIONAL: params.count
						//OPTIONAL: params.isFindAll
						//REQUIRED: callbackOrHandlers
						//REQUIRED: callbackOrHandlers.success
						//OPTIONAL: callbackOrHandlers.error
		
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
						
						// cleaned filter
						cleanedFilter,
						
						// cached info
						cachedInfo,
	
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
	
							proc = function(error, savedDataSet) {
	
								if (error === TO_DELETE) {
									
									// clean saved data before callback.
									EACH(savedDataSet, function(savedData, i) {
										
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
	
					EACH(waitingLogDataSet, function(data) {
						log(data);
					});
	
					waitingLogDataSet = undefined;
					
					EACH(waitingFindInfos, function(info) {
						find(info.params, info.callbackOrHandlers);
					});
	
					waitingFindInfos = undefined;
				});
			}
		};
	});
});
