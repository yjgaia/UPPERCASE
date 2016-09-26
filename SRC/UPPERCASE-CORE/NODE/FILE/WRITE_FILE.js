/**
 * 파일을 작성합니다.
 * 
 * 파일이 없으면 파일을 생성하고, 파일이 이미 있으면 내용을 덮어씁니다.
 */
global.WRITE_FILE = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params
			//REQUIRED: params.path		작성할 파일의 경로
			//OPTIONAL: params.content	파일에 작성할 내용 (문자열)
			//OPTIONAL: params.buffer	파일에 작성할 내용 (Buffer)
			//OPTIONAL: params.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			var
			// path
			path = params.path,

			// content
			content = params.content,

			// buffer
			buffer = params.buffer,

			// is sync
			isSync = params.isSync,

			// error handler.
			errorHandler,

			// callback.
			callback;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			CREATE_FOLDER({
				path : _path.dirname(path),
				isSync : isSync
			}, function() {

				// when normal mode
				if (isSync !== true) {

					fs.writeFile(path, buffer !== undefined ? buffer : content, function(error) {
						
						var
						// error msg
						errorMsg;
						
						if (error !== TO_DELETE) {
							
							errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR('WRITE_FILE', errorMsg);
							}

						} else if (callback !== undefined) {
							callback();
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

							fs.writeFileSync(path, buffer !== undefined ? buffer : content);

						} catch(error) {
							
							if (error !== TO_DELETE) {
								
								errorMsg = error.toString();
									
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									SHOW_ERROR('WRITE_FILE', errorMsg);
								}
							}
						}

						if (callback !== undefined) {
							callback();
						}
					});
				}
			});
		}
	};
});
