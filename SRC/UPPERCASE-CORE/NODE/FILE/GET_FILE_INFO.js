/**
 * 파일의 정보를 불러옵니다.
 * 
 * 파일의 크기(size), 생성 시간(createTime), 최종 수정 시간(lastUpdateTime)을 불러옵니다.
 */
global.GET_FILE_INFO = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs');

	return {

		run : function(pathOrParams, callbackOrHandlers) {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	불러올 파일의 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error

			var
			// path
			path,

			// is sync
			isSync,

			// callback.
			callback,

			// not eixsts handler.
			notExistsHandler,

			// error handler.
			errorHandler;

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
					callback = callbackOrHandlers.success;
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
				}
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_IS_EXISTS_FILE(path, function(isExists) {

					if (isExists === true) {

						fs.stat(path, function(error, stat) {

							var
							// error msg
							errorMsg;

							if (error !== TO_DELETE) {

								errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									SHOW_ERROR('[GET_FILE_INFO] ERROR: ' + errorMsg);
								}

							} else if (stat.isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									console.log(CONSOLE_YELLOW('[GET_FILE_INFO] NOT EXISTS! <' + path + '>'));
								}

							} else if (callback !== undefined) {
								callback({
									size : stat.size,
									createTime : stat.birthtime,
									lastUpdateTime : stat.mtime
								});
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							console.log(CONSOLE_YELLOW('[GET_FILE_INFO] NOT EXISTS! <' + path + '>'));
						}
					}
				});
			}

			// when sync mode
			else {

				return RUN(function() {

					var
					// error msg
					errorMsg,

					// stat
					stat;

					try {

						if (CHECK_IS_EXISTS_FILE({
							path : path,
							isSync : true
						}) === true) {
							
							stat = fs.statSync(path);

							if (stat.isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									console.log(CONSOLE_YELLOW('[GET_FILE_INFO] NOT EXISTS! <' + path + '>'));
								}
								
							} else {
								
								if (callback !== undefined) {
									callback({
										size : stat.size,
										createTime : stat.birthtime,
										lastUpdateTime : stat.mtime
									});
								}
								
								return {
									size : stat.size,
									createTime : stat.birthtime,
									lastUpdateTime : stat.mtime
								};
							}

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								console.log(CONSOLE_YELLOW('[GET_FILE_INFO] NOT EXISTS! <' + path + '>'));
							}
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR('[GET_FILE_INFO] ERROR: ' + errorMsg);
							}
						}
					}

					// do not run callback.
					return;
				});
			}
		}
	};
});
