/*
 * 폴더를 복사합니다.
 */
global.COPY_FOLDER = METHOD(() => {

	let FS = require('fs');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.from		복사할 폴더의 위치
			//REQUIRED: params.to		폴더를 복사할 위치
			//OPTIONAL: params.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let from = params.from;
			let to = params.to;
			let isSync = params.isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				notExistsHandler = callbackOrHandlers.notExists;
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}
			
			if (from === to) {
				if (callback !== undefined) {
					callback();
				}
			}
			
			else {
				
				// when normal mode
				if (isSync !== true) {
	
					CHECK_FILE_EXISTS(from, (exists) => {
	
						if (exists === true) {
							
							NEXT([
							(next) => {
								
								FIND_FILE_NAMES(from, (fileNames) => {
									
									NEXT(fileNames, [
									(fileName, next) => {
										COPY_FILE({
											from : from + '/' + fileName,
											to : to + '/' + fileName
										}, next);
									},
									
									() => {
										next(fileNames.length);
									}]);
								});
							},
							
							(next) => {
								return (count) => {
									
									FIND_FOLDER_NAMES(from, (folderNames) => {
										
										PARALLEL(folderNames, [
										(folderName, done) => {
											COPY_FOLDER({
												from : from + '/' + folderName,
												to : to + '/' + folderName
											}, done);
										},
										
										() => {
											next(count + folderNames.length);
										}]);
									});
								};
							},
							
							() => {
								return (count) => {
									
									// 빈 폴더면 폴더 생성
									if (count === 0) {
										CREATE_FOLDER(to, () => {
											if (callback !== undefined) {
												callback();
											}
										});
									}
									
									else if (callback !== undefined) {
										callback();
									}
								};
							}]);
	
						} else {
	
							if (notExistsHandler !== undefined) {
								notExistsHandler(from);
							} else {
								SHOW_WARNING('COPY_FOLDER', MSG({
									ko : '폴더가 존재하지 않습니다.'
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
								
								let count = 0;
								
								FIND_FILE_NAMES({
									path : from,
									isSync : true
								}, EACH((fileName) => {
									
									COPY_FILE({
										from : from + '/' + fileName,
										to : to + '/' + fileName,
										isSync : true
									});
									
									count += 1;
								}));
								
								FIND_FOLDER_NAMES({
									path : from,
									isSync : true
								}, EACH((folderName) => {
									
									COPY_FOLDER({
										from : from + '/' + folderName,
										to : to + '/' + folderName,
										isSync : true
									});
									
									count += 1;
								}));
								
								// 빈 폴더면 폴더 생성
								if (count === 0) {
									CREATE_FOLDER({
										path : to,
										isSync : true
									});
								}
								
							} else {
	
								if (notExistsHandler !== undefined) {
									notExistsHandler(from);
								} else {
									SHOW_WARNING('COPY_FOLDER', MSG({
										ko : '폴더가 존재하지 않습니다.'
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
									SHOW_ERROR('COPY_FOLDER', errorMsg, params);
								}
							}
						}
	
						if (callback !== undefined) {
							callback();
						}
					});
				}
			}
		}
	};
});
