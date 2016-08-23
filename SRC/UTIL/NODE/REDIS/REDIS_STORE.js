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
			list,
			
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
				//REQUIRED: params.name
				//REQUIRED: params.value
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// name
				name = params.name,

				// value
				value = params.value,
				
				// callback
				callback,

				// error handler
				errorHandler;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						errorHandler = callbackOrHandlers.error;
					}
				}
				
				client.hset(storeName, name, STRINGIFY(value), function(errorInfo) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:', errorInfo);
						}
					} else if (callback !== undefined) {
						callback();
					}
				});
			};

			self.get = get = function(name, callbackOrHandlers) {
				//REQUIRED: name
				//REQUIRED: callbackOrHandlers
				//REQUIRED: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// callback
				callback,

				// error handler
				errorHandler;
			
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}

				client.hget(storeName, name, function(errorInfo, value) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:', errorInfo);
						}
					} else if (value === TO_DELETE) {
						callback();
					} else {
						callback(PARSE_STR(value));
					}
				});
			};

			self.remove = remove = function(name, callbackOrHandlers) {
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// callback
				callback,

				// error handler
				errorHandler;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						errorHandler = callbackOrHandlers.error;
					}
				}

				client.hdel(storeName, name, function(errorInfo) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:', errorInfo);
						}
					} else if (callback !== undefined) {
						callback();
					}
				});
			};
			
			self.list = list = function(callbackOrHandlers) {
				//REQUIRED: callbackOrHandlers
				//REQUIRED: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// callback
				callback,

				// error handler
				errorHandler;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
				
				client.hgetall(storeName, function(errorInfo, all) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:', errorInfo);
						}
					} else if (all === TO_DELETE) {
						callback({});
					} else {
						
						EACH(all, function(data, key) {
							all[key] = PARSE_STR(data);
						});
						
						callback(all);
					}
				});
			};
			
			self.count = count = function(callbackOrHandlers) {
				//REQUIRED: callbackOrHandlers
				//REQUIRED: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// callback
				callback,

				// error handler
				errorHandler;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}

				client.hlen(storeName, function(errorInfo, count) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:', errorInfo);
						}
					} else {
						callback(count);
					}
				});
			};

			self.clear = clear = function(callbackOrHandlers) {
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.success
				//OPTIONAL: callbackOrHandlers.error
				
				var
				// callback
				callback,

				// error handler
				errorHandler;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						errorHandler = callbackOrHandlers.error;
					}
				}

				client.del(storeName, function(errorInfo) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							SHOW_ERROR('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:', errorInfo);
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
			
			// list.
			list,
			
			// count.
			count,
			
			// clear.
			clear;

			self.save = save = redisStore.save;

			self.get = get = redisStore.get;

			self.remove = remove = redisStore.remove;
			
			self.list = list = redisStore.list;

			self.count = count = redisStore.count;
			
			self.clear = clear = redisStore.clear;
		}
	});
});
