/*
 * 파일이나 폴더의 위치를 이동시킵니다.
 */
global.MOVE_FILE = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');
	
	return {
		
		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.from		파일의 원래 위치
			//REQUIRED: params.to		파일을 옮길 위치
			//OPTIONAL: params.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExistsHandler
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success
	
			let from = params.from;
			let to = params.to;
			let isSync = params.isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;
	
			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}
			
			if (from === to) {
				if (callback !== undefined) {
					callback();
				}
			}
			
			else {
				
				CREATE_FOLDER({
					path : Path.dirname(to),
					isSync : isSync
				}, {
	
					error : errorHandler,
	
					success : () => {
	
						// when normal mode
						if (isSync !== true) {
	
							CHECK_FILE_EXISTS(from, (exists) => {
	
								if (exists === true) {
	
									FS.rename(from, to, (error) => {
										
										if (error !== TO_DELETE) {
	
											let errorMsg = error.toString();
	
											if (errorHandler !== undefined) {
												errorHandler(errorMsg, params);
											} else {
												SHOW_ERROR('MOVE_FILE', errorMsg, params);
											}
	
										} else if (callback !== undefined) {
											callback();
										}
									});
	
								} else {
	
									if (notExistsHandler !== undefined) {
										notExistsHandler(from);
									} else {
										SHOW_WARNING('MOVE_FILE', MSG({
											ko : '파일이 존재하지 않습니다.'
										}), {
											from : from
										});
									}
								}
							});
						}
	
						// when sync mode
						else {
	
							RUN(() => {
	
								try {
	
									if (CHECK_FILE_EXISTS({
										path : from,
										isSync : true
									}) === true) {
	
										FS.renameSync(from, to);
	
									} else {
	
										if (notExistsHandler !== undefined) {
											notExistsHandler(from);
										} else {
											SHOW_WARNING('MOVE_FILE', MSG({
												ko : '파일이 존재하지 않습니다.'
											}), {
												from : from
											});
										}
	
										// do not run callback.
										return;
									}
	
								} catch(error) {
	
									if (error !== TO_DELETE) {
	
										let errorMsg = error.toString();
	
										if (errorHandler !== undefined) {
											errorHandler(errorMsg, params);
										} else {
											SHOW_ERROR('MOVE_FILE', errorMsg, params);
										}
									}
								}
	
								if (callback !== undefined) {
									callback();
								}
							});
						}
					}
				});
			}
		}
	}
});
