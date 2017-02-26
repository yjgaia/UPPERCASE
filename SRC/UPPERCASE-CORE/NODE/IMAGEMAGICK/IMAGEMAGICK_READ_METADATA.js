/*
 * ImageMagick을 이용해 이미지의 메타데이터를 반한홥니다.
 */
global.IMAGEMAGICK_READ_METADATA = METHOD(() => {

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
			
			ImageMagick.readMetadata(path, (error, metadata) => {

				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

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
