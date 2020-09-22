/*
 * GraphicsMagick을 이용해 이미지의 메타데이터를 반한홥니다.
 */
global.GRAPHICSMAGICK_READ_METADATA = METHOD(() => {

	let GraphicsMagick = require('hanul-graphicsmagick');

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
			
			GraphicsMagick.readMetadata(path, (error, metadata) => {
				
				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
						errorHandler = undefined;
					} else {
						SHOW_ERROR('GRAPHICSMAGICK_READ_METADATA', errorMsg);
					}

				} else {
					callback(metadata);
				}
			});
		}
	};
});
