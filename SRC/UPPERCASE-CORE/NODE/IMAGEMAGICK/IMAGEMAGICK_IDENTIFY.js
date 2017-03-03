/*
 * ImageMagick의 identify 기능을 사용합니다.
 */
global.IMAGEMAGICK_IDENTIFY = METHOD(() => {

	let ImageMagick = require('hanul-imagemagick');

	return {

		run : (path, callbackOrHandlers) => {
			//REQUIRED: path
			//REQUIRED: callbackOrHandlers

			let callback;
			let errorHandler;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}
			
			ImageMagick.identify(path, (error, features) => {

				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

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
