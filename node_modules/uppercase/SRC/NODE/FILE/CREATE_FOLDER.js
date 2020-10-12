/*
 * 폴더를 생성합니다.
 */
global.CREATE_FOLDER = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');

	return {

		run: (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	폴더를 생성할 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;

			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						if (callback !== undefined) {
							callback();
						}

					} else {

						let folderPath = Path.dirname(path);

						if (folderPath === path || folderPath + '/' === path) {

							if (callback !== undefined) {
								callback();
							}
						}

						else {

							CHECK_FILE_EXISTS(folderPath, (exists) => {

								if (folderPath === '.' || exists === true) {

									FS.mkdir(path, (error) => {

										if (error !== TO_DELETE) {

											let errorMsg = error.toString();

											if (errorHandler !== undefined) {
												errorHandler(errorMsg, pathOrParams);
											} else {
												SHOW_ERROR('CREATE_FOLDER', errorMsg, pathOrParams);
											}
										}

										else if (callback !== undefined) {
											callback();
										}
									});

								} else {

									CREATE_FOLDER(folderPath, () => {

										// retry.
										CREATE_FOLDER(path, callback);
									});
								}
							});
						}
					}
				});
			}

			// when sync mode
			else {

				try {

					if (CHECK_FILE_EXISTS({
						path: path,
						isSync: true
					}) !== true) {

						let folderPath = Path.dirname(path);

						if (folderPath === path || folderPath + '/' === path) {
							// ignore.
						}

						else {

							if (folderPath === '.' || CHECK_FILE_EXISTS({
								path: folderPath,
								isSync: true
							}) === true) {
								FS.mkdirSync(path);
							} else {

								CREATE_FOLDER({
									path: folderPath,
									isSync: true
								});

								// retry.
								CREATE_FOLDER({
									path: path,
									isSync: true
								});
							}
						}
					}

				} catch (error) {

					if (error !== TO_DELETE) {

						let errorMsg = error.toString();

						if (errorHandler !== undefined) {
							errorHandler(errorMsg, pathOrParams);
						} else {
							SHOW_ERROR('CREATE_FOLDER', errorMsg, pathOrParams);
						}
					}
				}

				if (callback !== undefined) {
					callback();
				}
			}
		}
	};
});
