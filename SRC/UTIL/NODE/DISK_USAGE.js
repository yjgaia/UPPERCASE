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
