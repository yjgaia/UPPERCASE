/**
 * Redis store class
 */
global.REDIS_STORE = CLASS(function(cls) {
	'use strict';

	var
	//IMPORT: redis
	Redis = require('redis'),
	
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
				client = Redis.createClient({
					host : NODE_CONFIG.redisHost,
					port : NODE_CONFIG.redisPort
				});
				
				if (NODE_CONFIG.redisPassword !== undefined) {
					client.auth(NODE_CONFIG.redisPassword);
				}
				
				client.del(storeName);
			}
			
			self.save = save = function(params, errorHandler) {
				//REQUIRED: params
				//REQUIRED: params.name
				//REQUIRED: params.value
				//OPTIONAL: errorHandler

				var
				// name
				name = params.name,

				// value
				value = params.value;
				
				client.hset(storeName, name, STRINGIFY(value), function(errorInfo) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							console.log(CONSOLE_RED('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:'), errorInfo);
						}
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
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						errorHandler = callbackOrHandlers.error;
					}
				}

				client.hget(storeName, name, function(errorInfo, value) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							console.log(CONSOLE_RED('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:'), errorInfo);
						}
					} else if (value === TO_DELETE) {
						callback();
					} else {
						callback(PARSE_STR(value));
					}
				});
			};

			self.remove = remove = function(name, errorHandler) {
				//REQUIRED: name
				//OPTIONAL: errorHandler

				client.hdel(storeName, name, function(errorInfo) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							console.log(CONSOLE_RED('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:'), errorInfo);
						}
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
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						errorHandler = callbackOrHandlers.error;
					}
				}
				
				client.hgetall(storeName, function(errorInfo, all) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							console.log(CONSOLE_RED('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:'), errorInfo);
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
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						callback = callbackOrHandlers.success;
						errorHandler = callbackOrHandlers.error;
					}
				}

				client.hlen(storeName, function(errorInfo, count) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							console.log(CONSOLE_RED('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:'), errorInfo);
						}
					} else {
						callback(count);
					}
				});
			};

			self.clear = clear = function(errorHandler) {
				//OPTIONAL: errorHandler

				client.del(storeName, function(errorInfo) {
					
					if (errorInfo !== TO_DELETE) {
						if (errorHandler !== undefined) {
							errorHandler(errorInfo.toString());
						} else {
							console.log(CONSOLE_RED('[UPPERCASE-UTIL] REDIS_STORE `' + storeName + '` ERROR:'), errorInfo);
						}
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
