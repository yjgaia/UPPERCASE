/*
 * 파일을 작성합니다.
 * 
 * 파일이 없으면 파일을 생성하고, 파일이 이미 있으면 내용을 덮어씁니다.
 */
global.WRITE_FILE = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.path		작성할 파일의 경로
			//OPTIONAL: params.content	파일에 작성할 내용 (문자열)
			//OPTIONAL: params.buffer	파일에 작성할 내용 (Buffer)
			//OPTIONAL: params.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path = params.path;
			let content = params.content;
			let buffer = params.buffer;
			let isSync = params.isSync;
			
			let errorHandler;
			let callback;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			CREATE_FOLDER({
				path : Path.dirname(path),
				isSync : isSync
			}, () => {

				// when normal mode
				if (isSync !== true) {

					FS.writeFile(path, buffer !== undefined ? buffer : content, (error) => {
						
						if (error !== TO_DELETE) {
							
							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, params);
							} else {
								SHOW_ERROR('WRITE_FILE', errorMsg, params);
							}

						} else if (callback !== undefined) {
							callback();
						}
					});
				}

				// when sync mode
				else {
					
					try {

						FS.writeFileSync(path, buffer !== undefined ? buffer : content);

					} catch(error) {
						
						if (error !== TO_DELETE) {
							
							let errorMsg = error.toString();
								
							if (errorHandler !== undefined) {
								errorHandler(errorMsg, params);
							} else {
								SHOW_ERROR('WRITE_FILE', errorMsg, params);
							}
						}
					}

					if (callback !== undefined) {
						callback();
					}
				}
			});
		}
	};
});
