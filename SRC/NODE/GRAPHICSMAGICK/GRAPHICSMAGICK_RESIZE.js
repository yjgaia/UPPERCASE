/*
 * GraphicsMagick을 사용해 이미지의 크기를 조절하여 새 파일로 저장합니다.
 */
global.GRAPHICSMAGICK_RESIZE = METHOD(() => {

	let Path = require('path');

	return {

		run: (params, callbackOrHandlers) => {
			//REQUIRED: params.srcPath
			//REQUIRED: params.distPath
			//OPTIONAL: params.width
			//OPTIONAL: params.height
			//OPTIONAL: callbackOrHandlers

			let srcPath = params.srcPath;
			let distPath = params.distPath;
			let width = params.width;
			let height = params.height;

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

			CREATE_FOLDER(Path.dirname(distPath), {
				error: errorHandler,
				success: () => {

					GRAPHICSMAGICK_IDENTIFY(srcPath, {
						error: errorHandler,
						success: (features) => {

							if (width === undefined) {
								width = height / features.height * features.width;
							}

							if (height === undefined) {
								height = width / features.width * features.height;
							}

							GRAPHICSMAGICK_CONVERT([srcPath, '-resize', width + 'x' + height + '\!', distPath], callbackOrHandlers);
						}
					});
				}
			});
		}
	};
});
