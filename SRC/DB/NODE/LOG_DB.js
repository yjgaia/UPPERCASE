FOR_BOX(function(box) {
	'use strict';

	/**
	 * MongoDB collection wrapper class for logging
	 */
	box.LOG_DB = CLASS({

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

						box.DB.makeUpFilter(filter);

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
									console.log(CONSOLE_RED('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` LOG_DB ERROR:'), error.toString());
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
							console.log(CONSOLE_RED('[UPPERCASE-DB] `' + box.boxName + '.' + name + '` LOG_DB ERROR:'), error.toString());
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
	});
});
