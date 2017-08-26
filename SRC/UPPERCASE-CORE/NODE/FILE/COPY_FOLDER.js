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
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success

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
	
					CHECK_FILE_EXISTS(from, (isExists) => {
	
						if (isExists === true) {
							
							NEXT([
							(next) => {
								
								FIND_FILE_NAMES(from, (fileNames) => {
									
									PARALLEL(fileNames, [
									(fileName, done) => {
										COPY_FILE({
											from : from + '/' + fileName,
											to : to + '/' + fileName
										}, done);
									},
									
									() => {
										next();
									}]);
								});
							},
							
							() => {
								return () => {
									
									FIND_FOLDER_NAMES(from, (folderNames) => {
										
										PARALLEL(folderNames, [
										(folderName, done) => {
											COPY_FOLDER({
												from : from + '/' + folderName,
												to : to + '/' + folderName
											}, done);
										},
										
										() => {
											
											if (callback !== undefined) {
												callback();
											}
										}]);
									});
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
								
								FIND_FILE_NAMES({
									path : from,
									isSync : true
								}, EACH((fileName) => {
									
									COPY_FILE({
										from : from + '/' + fileName,
										to : to + '/' + fileName,
										isSync : true
									});
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
								}));
	
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
									errorHandler(errorMsg);
								} else {
									SHOW_ERROR('COPY_FOLDER', errorMsg);
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
