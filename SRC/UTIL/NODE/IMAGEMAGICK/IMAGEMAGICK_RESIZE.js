/**
 * ImageMagick® resize.
 */
global.IMAGEMAGICK_RESIZE = IMAGEMAGICK_RESIZE = METHOD(function() {'use strict';

	var
	// imagemagick
	imagemagick = require('imagemagick');

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

			imagemagick.resize(params, function(error) {

				var
				// error msg
				errorMsg;

				if (error !== TO_DELETE) {

					errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
					} else {
						console.log(CONSOLE_RED('[UPPERCASE.IO-IMAGEMAGICK_RESIZE] ERROR: ' + errorMsg));
					}
				} else {
					callback();
				}
			});
		}
	};
});
