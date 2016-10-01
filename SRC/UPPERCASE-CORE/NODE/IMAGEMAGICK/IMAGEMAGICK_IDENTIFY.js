/**
 * ImageMagick의 identify 기능을 사용합니다.
 */
global.IMAGEMAGICK_IDENTIFY = METHOD(function() {
	'use strict';

	var
	//IMPORT: imagemagick
	imagemagick = require('hanul-imagemagick');

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
						SHOW_ERROR('IMAGEMAGICK_IDENTIFY', errorMsg);
					}

				} else {
					callback(features);
				}
			});
		}
	};
});
