/**
 * 폴더를 생성합니다.
 */
global.CREATE_FOLDER = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(pathOrParams, callbackOrHandlers) {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	폴더를 생성할 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			var
			// path
			path,

			// is sync
			isSync,

			// folder path
			folderPath,

			// error handler.
			errorHandler,

			// callback.
			callback;

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

				CHECK_FILE_EXISTS(path, function(isExists) {

					if (isExists === true) {

						if (callback !== undefined) {
							callback();
						}

					} else {

						folderPath = _path.dirname(path);

						CHECK_FILE_EXISTS(folderPath, function(isExists) {

							if (isExists === true) {

								fs.mkdir(path, function(error) {

									var
									// error msg
									errorMsg;

									if (error !== TO_DELETE) {

										errorMsg = error.toString();

										if (errorHandler !== undefined) {
											errorHandler(errorMsg);
										} else {
											SHOW_ERROR('CREATE_FOLDER', errorMsg);
										}

									} else {
										callback();
									}
								});

							} else {

								CREATE_FOLDER(folderPath, function() {

									// retry.
									CREATE_FOLDER(path, callback);
								});
							}
						});
					}
				});
			}

			// when sync mode
			else {

				RUN(function() {

					var
					// error msg
					errorMsg;

					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) !== true) {

							folderPath = _path.dirname(path);

							if (CHECK_FILE_EXISTS({
								path : folderPath,
								isSync : true
							}) === true) {
								fs.mkdirSync(path);
							} else {

								CREATE_FOLDER({
									path : folderPath,
									isSync : true
								});

								// retry.
								CREATE_FOLDER({
									path : path,
									isSync : true
								});
							}
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR('CREATE_FOLDER', errorMsg);
							}
						}
					}

					if (callback !== undefined) {
						callback();
					}
				});
			}
		}
	};
});
