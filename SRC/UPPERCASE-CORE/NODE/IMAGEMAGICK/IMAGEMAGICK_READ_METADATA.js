/**
 * ImageMagick을 이용해 이미지의 메타데이터를 반한홥니다.
 */
global.IMAGEMAGICK_READ_METADATA = METHOD(function() {
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
			
			imagemagick.readMetadata(path, function(error, metadata) {

				var
				// error msg
				errorMsg;

				if (error !== TO_DELETE) {

					errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
					} else {
						SHOW_ERROR('IMAGEMAGICK_READ_METADATA', errorMsg);
					}

				} else {
					callback(metadata);
				}
			});
		}
	};
});
