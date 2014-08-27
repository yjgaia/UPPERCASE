/**
 * ImageMagick® resize.
 */
global.IMAGEMAGICK_RESIZE = IMAGEMAGICK_RESIZE = METHOD(function() {
	'use strict';

	var
	//IMPORT: path
	_path = require('path'),

	//IMPORT: imagemagick
	imagemagick = require('imagemagick');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params.srcPath
			//REQUIRED: params.distPath
			//OPTIONAL: params.width
			//OPTIONAL: params.height
			//REQUIRED: callbackOrHandlers

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

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}

			CREATE_FOLDER(_path.dirname(distPath), function() {

				imagemagick.resize({
					srcPath : srcPath,
					// different!
					dstPath : distPath,
					width : width,
					height : height
				}, function(error) {

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
			});
		}
	};
});
