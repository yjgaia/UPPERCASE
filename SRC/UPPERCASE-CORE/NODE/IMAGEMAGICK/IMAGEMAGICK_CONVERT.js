/*
 * ImageMagick의 convert 기능을 사용합니다.
 */
global.IMAGEMAGICK_CONVERT = METHOD(() => {

	let ImageMagick = require('hanul-imagemagick');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//OPTIONAL: callbackOrHandlers

			let callback;
			let errorHandler;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}
			
			ImageMagick.convert(params, (error) => {

				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

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
