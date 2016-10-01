/**
 * ImageMagick의 convert 기능을 사용합니다.
 */
global.IMAGEMAGICK_CONVERT = METHOD(function() {
	'use strict';

	var
	//IMPORT: imagemagick
	imagemagick = require('hanul-imagemagick');

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
						SHOW_ERROR('IMAGEMAGICK_CONVERT', errorMsg);
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
