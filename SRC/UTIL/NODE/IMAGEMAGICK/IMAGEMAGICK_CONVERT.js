/**
 * ImageMagick® convert.
 */
global.IMAGEMAGICK_CONVERT = IMAGEMAGICK_CONVERT = METHOD(function() {'use strict';

	var
	// sqwish
	sqwish = require('imagemagick');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params
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

			imagemagick.convert(params, function(error) {

				if (error !== TO_DELETE) {
					errorHandler(error.toString());
				} else {
					callback();
				}
			});
		}
	};
});
