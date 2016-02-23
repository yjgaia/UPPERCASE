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
			
			// list.
			list,

			// remove.
			remove;
			
			if (client === undefined) {
				client = Redis.createClient({
					host : NODE_CONFIG.redisHost,
					port : NODE_CONFIG.redisPort
				});
				
				if (NODE_CONFIG.redisPassword !== undefined) {
					client.auth(NODE_CONFIG.redisPassword);
				}
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
				
				client.hset(storeName, name, STRINGIFY(value), function(error) {
					
					if (error !== TO_DELETE) {
						errorHandler(error.toString());
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

				client.hget(storeName, name, function(error, value) {
					
					if (error !== TO_DELETE) {
						errorHandler(error.toString());
					} else if (value === TO_DELETE) {
						callback();
					} else {
						callback(PARSE_STR(value));
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
				
				client.hgetall(storeName, function(error, all) {
					
					if (error !== TO_DELETE) {
						errorHandler(error.toString());
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

			self.remove = remove = function(name, errorHandler) {
				//REQUIRED: name
				//OPTIONAL: errorHandler

				client.hdel(storeName, name, function(error) {
					
					if (error !== TO_DELETE) {
						errorHandler(error.toString());
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
			
			// list.
			list,

			// remove.
			remove;

			self.save = save = redisStore.save;

			self.get = get = redisStore.get;
			
			self.list = list = redisStore.list;

			self.remove = remove = redisStore.remove;
		}
	});
});
