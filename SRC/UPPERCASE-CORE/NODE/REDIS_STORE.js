/**
 * Redis store class
 */
global.REDIS_STORE = CLASS(function(cls) {
	'use strict';

	var
	// RedisClustr
	RedisClustr,
	
	// Redis
	Redis,
	
	// client
	client;
	
	return {

		init : function(inner, self, storeName) {
			//REQUIRED: storeName

			var
			// save.
			save,

			// get.
			get,

			// remove.
			remove,
			
			// list.
			all,
			
			// count.
			count,
			
			// clear.
			clear;
			
			if (client === undefined) {
				
				if (NODE_CONFIG.redisPorts !== undefined) {
					
					RedisClustr = require('redis-clustr');
					
					client = new RedisClustr({
						
						servers : RUN(function() {
							
							var
							// ret
							ret = [];
							
							if (CHECK_IS_ARRAY(NODE_CONFIG.redisPorts) === true) {
								EACH(NODE_CONFIG.redisPorts, function(port) {
									ret.push({
										host : '127.0.0.1',
										port : port
									});
								});
							}
							
							else {
								EACH(NODE_CONFIG.redisPorts, function(ports, host) {
									EACH(ports, function(port) {
										ret.push({
											host : host,
											port : port
										});
									});
								});
							}
							
							return ret;
						})
					});
				}
				
				else {
					
					Redis = require('redis');
					
					client = Redis.createClient({
						host : NODE_CONFIG.redisHost,
						port : NODE_CONFIG.redisPort
					});
				}
			}
			
			self.save = save = function(params, callbackOrHandlers) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				var
				// id
				id = params.id,

				// data
				data = params.data,

				// error handler
				errorHandler,
				
				// callback
				callback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						errorHandler = callbackOrHandlers.error;
						callback = callbackOrHandlers.success;
					}
				}
				
				client.hset(storeName, id, STRINGIFY(data), function(errorInfo) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('REDIS_STORE (' + storeName + ')', errorInfo);
						}
					} else if (callback !== undefined) {
						callback();
					}
				});
			};

			self.get = get = function(id, callbackOrHandlers) {
				//REQUIRED: id
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.notExists
				//REQUIRED: callbackOrHandlers.success
				
				var
				// error handler
				errorHandler,
				
				// not exists handler.
				notExistsHandler,
				
				// callback
				callback;
			
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					notExistsHandler = callbackOrHandlers.notExists;
					callback = callbackOrHandlers.success;
				}
				
				client.hget(storeName, id, function(errorInfo, value) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('REDIS_STORE (' + storeName + ')', errorInfo);
						}
					} else if (value === TO_DELETE) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', '가져올 데이터가 존재하지 않습니다.', id);
						}
					} else {
						callback(PARSE_STR(value));
					}
				});
			};

			self.remove = remove = function(id, callbackOrHandlers) {
				//REQUIRED: id
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success
				
				var
				// error handler
				errorHandler,
				
				// not exists handler.
				notExistsHandler,
				
				// callback
				callback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						errorHandler = callbackOrHandlers.error;
						notExistsHandler = callbackOrHandlers.notExists;
						callback = callbackOrHandlers.success;
					}
				}
				
				client.hget(storeName, id, function(errorInfo, value) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('REDIS_STORE (' + storeName + ')', errorInfo);
						}
					} else if (value === TO_DELETE) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', '삭제할 데이터가 존재하지 않습니다.', id);
						}
					} else {
						
						client.hdel(storeName, id, function(errorInfo) {
							
							if (errorInfo !== TO_DELETE) {
								if (errorHandler !== undefined) {
									errorHandler(errorInfo.toString());
								} else {
									SHOW_ERROR('REDIS_STORE (' + storeName + ')', errorInfo);
								}
							} else if (callback !== undefined) {
								callback(PARSE_STR(value));
							}
						});
					}
				});
			};
			
			self.all = all = function(callbackOrHandlers) {
				//REQUIRED: callbackOrHandlers
				//REQUIRED: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// error handler
				errorHandler,
				
				// callback
				callback;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
				
				client.hgetall(storeName, function(errorInfo, values) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('REDIS_STORE (' + storeName + ')', errorInfo);
						}
					} else if (values === TO_DELETE) {
						callback({});
					} else {
						
						EACH(values, function(data, key) {
							values[key] = PARSE_STR(data);
						});
						
						callback(values);
					}
				});
			};
			
			self.count = count = function(callbackOrHandlers) {
				//REQUIRED: callbackOrHandlers
				//REQUIRED: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// error handler
				errorHandler,
				
				// callback
				callback;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}

				client.hlen(storeName, function(errorInfo, count) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('REDIS_STORE (' + storeName + ')', errorInfo);
						}
					} else {
						callback(count);
					}
				});
			};
			
			self.checkIsExists = checkIsExists = function(id, callbackOrHandlers) {
				//REQUIRED: id
				//REQUIRED: callbackOrHandlers
				//REQUIRED: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// error handler
				errorHandler,
				
				// callback
				callback;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
				
				client.hget(storeName, id, function(errorInfo, value) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('REDIS_STORE (' + storeName + ')', errorInfo);
						}
					} else {
						callback(value !== TO_DELETE);
					}
				});
			};

			self.clear = clear = function(callbackOrHandlers) {
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// error handler
				errorHandler,
				
				// callback
				callback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						errorHandler = callbackOrHandlers.error;
						callback = callbackOrHandlers.success;
					}
				}

				client.del(storeName, function(errorInfo) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('REDIS_STORE (' + storeName + ')', errorInfo);
						}
					} else if (callback !== undefined) {
						callback();
					}
				});
			};
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.REDIS_STORE = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// redis store
			redisStore = REDIS_STORE(box.boxName + '.' + name),

			// save.
			save,

			// get.
			get,

			// remove.
			remove,
			
			// all.
			all,
			
			// count.
			count,
			
			// check is exists.
			checkIsExists,
			
			// clear.
			clear;

			self.save = save = redisStore.save;

			self.get = get = redisStore.get;

			self.remove = remove = redisStore.remove;
			
			self.all = all = redisStore.all;

			self.count = count = redisStore.count;
			
			self.checkIsExists = checkIsExists = redisStore.checkIsExists;
			
			self.clear = clear = redisStore.clear;
		}
	});
});
