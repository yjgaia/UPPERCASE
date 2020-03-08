/*
 * GraphicsMagick의 convert 기능을 사용합니다.
 */
global.GRAPHICSMAGICK_CONVERT = METHOD(() => {

	let GraphicsMagick = require('hanul-graphicsmagick');

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
			
			GraphicsMagick.convert(params, (error) => {

				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
						errorHandler = undefined;
					} else {
						SHOW_ERROR('GRAPHICSMAGICK_CONVERT', errorMsg);
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
