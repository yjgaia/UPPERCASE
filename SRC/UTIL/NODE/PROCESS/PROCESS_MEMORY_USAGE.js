/**
 * get process memory usage.
 */
global.PROCESS_MEMORY_USAGE = METHOD(function(m) {
	
	var
	//IMPORT: os
	os = require('os'),
	
	//IMPORT: pidusage
	pidusage = require('pidusage'),
	
	// total memory
	totalMemory = os.totalmem();
	
	return {
		
		run : function(pid, callbackOrHandlers) {
			'use strict';
			//REQUIRED: pid
			//REQUIRED: callbackOrHandlers
			
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
			
			pidusage.stat(process.pid, function(error, stat) {
				
				var
				// error msg
				errorMsg;

				if (error !== TO_DELETE) {

					errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
					} else {
						SHOW_ERROR('[UPPERCASE-PROCESS_MEMORY_USAGE] ERROR: ' + errorMsg);
					}

				} else {

					if (callback !== undefined) {
						callback(stat.memory / totalMemory * 100);
					}
				}
			});
		}
	};
});
