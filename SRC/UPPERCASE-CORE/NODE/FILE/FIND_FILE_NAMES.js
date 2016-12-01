/**
 * 지정된 경로에 위치한 파일들의 이름 목록을 불러옵니다.
 */
global.FIND_FILE_NAMES = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(pathOrParams, callbackOrHandlers) {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	파일들이 위치한 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExistsHandler
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			var
			// path
			path,

			// is sync
			isSync,

			// not exists handler.
			notExistsHandler,

			// error handler.
			errorHandler,

			// callback.
			callback,

			// file names
			fileNames = [];

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
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_IS_FILE_EXISTS(path, function(isExists) {

					if (isExists === true) {

						fs.readdir(path, function(error, names) {

							var
							// error msg
							errorMsg;

							if (error !== TO_DELETE) {

								errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									SHOW_ERROR('FIND_FILE_NAMES', errorMsg);
								}

							} else if (callback !== undefined) {

								PARALLEL(names, [
								function(name, done) {

									if (name[0] !== '.') {

										fs.stat(path + '/' + name, function(error, stats) {

											var
											// error msg
											errorMsg;

											if (error !== TO_DELETE) {

												errorMsg = error.toString();

												if (errorHandler !== undefined) {
													errorHandler(errorMsg);
												} else {
													SHOW_ERROR('FIND_FILE_NAMES', errorMsg);
												}

											} else {

												if (stats.isDirectory() !== true) {
													fileNames.push(name);
												}

												done();
											}
										});

									} else {
										done();
									}
								},

								function() {
									if (callback !== undefined) {
										callback(fileNames);
									}
								}]);
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('FIND_FOLDER_NAMES', '폴더가 존재하지 않습니다.', {
								path : path
							});
						}
					}
				});
			}

			// when sync mode
			else {

				return RUN(function() {

					var
					// names
					names,

					// error msg
					errorMsg;

					try {

						if (CHECK_IS_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {

							names = fs.readdirSync(path);

							EACH(names, function(name) {
								if (name[0] !== '.' && fs.statSync(path + '/' + name).isDirectory() !== true) {
									fileNames.push(name);
								}
							});

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('FIND_FILE_NAMES', '폴더가 존재하지 않습니다.', {
									path : path
								});
							}

							// do not run callback.
							return;
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR('FIND_FILE_NAMES', errorMsg);
							}
						}
					}

					if (callback !== undefined) {
						callback(fileNames);
					}

					return fileNames;
				});
			}
		}
	};
});
