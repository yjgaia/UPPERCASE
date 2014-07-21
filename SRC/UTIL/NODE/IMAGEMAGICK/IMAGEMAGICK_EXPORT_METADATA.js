/**
 * ImageMagick® export metadata.
 */
global.IMAGEMAGICK_EXPORT_METADATA = IMAGEMAGICK_EXPORT_METADATA = METHOD(function() {'use strict';

	var
	// sqwish
	sqwish = require('imagemagick');

	return {

		run : function(path, callback) {
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

				if (error !== TO_DELETE) {
					errorHandler(error.toString());
				} else {
					callback(metadata);
				}
			});
		}
	};
});
