/*

Welcome to UPPERCASE! (http://uppercase.io)

*/

/**
 * get disk usage.
 */
global.DISK_USAGE = METHOD(function() {
	'use strict';

	var
	//IMPORT: diskspace
	diskspace = require('diskspace'),
	
	// os type
	osType = require('os').type();

	return {

		run : function(drive, callbackOrHandlers) {
			//OPTIONAL: drive
			//REQUIRED: callbackOrHandlers

			var
			// callback.
			callback,

			// error handler.
			errorHandler;

			if (callbackOrHandlers === undefined) {
				callbackOrHandlers = drive;
				drive = undefined;
			}
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}
			
			if (drive === undefined) {
				if (osType === 'Windows_NT') {
					drive = 'C';
				} else if (osType === 'Darwin' || osType === 'Linux') {
					drive = '/';
				}
			}
			
			diskspace.check(drive, function(err, total, free, status) {
				if (status === 'READY') {
					callback((1 - free / total) * 100);
				} else if (errorHandler !== undefined) {
					errorHandler(status);
				} else {
					console.log(CONSOLE_RED('[UPPERCASE-DISK_USAGE] ERROR: ' + status));
				}
			});
		}
	};
});

/**
 * ImageMagick® convert.
 */
global.IMAGEMAGICK_CONVERT = METHOD(function() {
	'use strict';

	var
	//IMPORT: imagemagick
	imagemagick = require('imagemagick');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params
			//OPTIONAL: callbackOrHandlers

			var
			// callback.
			callback,

			// error handler.
			errorHandler;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}

			imagemagick.convert(params, function(error) {

				var
				// error msg
				errorMsg;

				if (error !== TO_DELETE) {

					errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
					} else {
						console.log(CONSOLE_RED('[UPPERCASE-IMAGEMAGICK_CONVERT] ERROR: ' + errorMsg));
					}

				} else {

					if (callback !== undefined) {
						callback();
					}
				}
			});
		}
	};
});

/**
 * ImageMagick® identify.
 */
global.IMAGEMAGICK_IDENTIFY = METHOD(function() {
	'use strict';

	var
	//IMPORT: imagemagick
	imagemagick = require('imagemagick');

	return {

		run : function(path, callbackOrHandlers) {
			//REQUIRED: path
			//REQUIRED: callbackOrHandlers

			var
			// callback.
			callback,

			// error handler.
			errorHandler;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}

			imagemagick.identify(path, function(error, features) {

				var
				// error msg
				errorMsg;

				if (error !== TO_DELETE) {

					errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
					} else {
						console.log(CONSOLE_RED('[UPPERCASE-IMAGEMAGICK_IDENTIFY] ERROR: ' + errorMsg));
					}

				} else {
					callback(features);
				}
			});
		}
	};
});

/**
 * ImageMagick® read metadata.
 */
global.IMAGEMAGICK_READ_METADATA = METHOD(function() {
	'use strict';

	var
	//IMPORT: imagemagick
	imagemagick = require('imagemagick');

	return {

		run : function(path, callbackOrHandlers) {
			//REQUIRED: path
			//REQUIRED: callbackOrHandlers

			var
			// callback.
			callback,

			// error handler.
			errorHandler;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}

			imagemagick.readMetadata(path, function(error, metadata) {

				var
				// error msg
				errorMsg;

				if (error !== TO_DELETE) {

					errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
					} else {
						console.log(CONSOLE_RED('[UPPERCASE-IMAGEMAGICK_READ_METADATA] ERROR: ' + errorMsg));
					}

				} else {
					callback(metadata);
				}
			});
		}
	};
});

/**
 * ImageMagick® resize.
 */
global.IMAGEMAGICK_RESIZE = METHOD(function() {
	'use strict';

	var
	//IMPORT: path
	_path = require('path');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params.srcPath
			//REQUIRED: params.distPath
			//OPTIONAL: params.width
			//OPTIONAL: params.height
			//OPTIONAL: callbackOrHandlers

			var
			// src path
			srcPath = params.srcPath,

			// dist path
			distPath = params.distPath,

			// width
			width = params.width,

			// height
			height = params.height,

			// callback.
			callback,

			// error handler.
			errorHandler;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}

			CREATE_FOLDER(_path.dirname(distPath), {
				error : errorHandler,
				success : function() {

					IMAGEMAGICK_IDENTIFY(srcPath, {
						error : errorHandler,
						success : function(features) {

							if (width === undefined) {
								width = height / features.height * features.width;
							}

							if (height === undefined) {
								height = width / features.width * features.height;
							}

							IMAGEMAGICK_CONVERT([srcPath, '-resize', width + 'x' + height + '\!', distPath], callbackOrHandlers);
						}
					});
				}
			});
		}
	};
});

/**
 * minify css.
 */
global.MINIFY_CSS = METHOD(function() {
	'use strict';

	var
	// sqwish
	sqwish = require('sqwish');

	return {

		run : function(code) {
			//REQUIRED: code

			return sqwish.minify(code.toString());
		}
	};
});

/**
 * minify js.
 */
global.MINIFY_JS = METHOD(function() {
	'use strict';

	var
	// uglify-js
	uglifyJS = require('uglify-js');

	return {

		run : function(code) {
			//REQUIRED: code

			return uglifyJS.minify(code.toString(), {
				fromString : true,
				mangle : true,
				output : {
					comments : /@license|@preserve|^!/
				}
			}).code;
		}
	};
});

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
