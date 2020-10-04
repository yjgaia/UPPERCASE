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

			init: (inner, self, nameOrParams) => {
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
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success

					waitingFindInfos.push({
						params: params,
						callbackOrHandlers: callbackOrHandlers
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
						//OPTIONAL: callbackOrHandlers.error
						//REQUIRED: callbackOrHandlers.success

						let filter;
						let sort;
						let start;
						let count;
						let isFindAll;

						let errorHandler;
						let callback;

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
								errorHandler = callbackOrHandlers.error;
								callback = callbackOrHandlers.success;
							}

							if (filter === undefined) {
								filter = {};
							}

							if (sort === undefined) {
								sort = {
									time: -1
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
											boxName: box.boxName,
											name: name
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
									boxName: box.boxName,
									name: name
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
