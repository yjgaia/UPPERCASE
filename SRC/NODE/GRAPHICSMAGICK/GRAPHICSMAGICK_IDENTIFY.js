/*
 * GraphicsMagick의 identify 기능을 사용합니다.
 */
global.GRAPHICSMAGICK_IDENTIFY = METHOD(() => {

	let GraphicsMagick = require('hanul-graphicsmagick');

	return {

		run: (path, callbackOrHandlers) => {
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

			GraphicsMagick.identify(path, (error, features) => {

				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
						errorHandler = undefined;
					} else {
						SHOW_ERROR('GRAPHICSMAGICK_IDENTIFY', errorMsg);
					}

				} else {
					callback(features);
				}
			});
		}
	};
});
