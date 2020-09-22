/*
 * 폴더를 삭제합니다.
 * 
 * 폴더 내의 모든 파일 및 폴더를 삭제하므로, 주의해서 사용해야 합니다.
 */
global.REMOVE_FOLDER = METHOD(() => {

	let FS = require('fs');

	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	삭제할 폴더의 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				notExistsHandler = callbackOrHandlers.notExists;
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {
						
						NEXT([
						(next) => {
							
							FIND_FILE_NAMES(path, (fileNames) => {
								
								PARALLEL(fileNames, [
								(fileName, done) => {
									REMOVE_FILE(path + '/' + fileName, done);
								},
								
								() => {
									next();
								}]);
							});
						},
						
						(next) => {
							return () => {
								
								FIND_FOLDER_NAMES(path, (folderNames) => {
									
									PARALLEL(folderNames, [
									(folderName, done) => {
										REMOVE_FOLDER(path + '/' + folderName, done);
									},
									
									() => {
										next();
									}]);
								});
							};
						},
						
						() => {
							return () => {
								
								FS.rmdir(path, (error) => {
									
									if (error !== TO_DELETE) {
										
										let errorMsg = error.toString();
										
										if (errorHandler !== undefined) {
											errorHandler(errorMsg, pathOrParams);
										} else {
											SHOW_ERROR('REMOVE_FOLDER', errorMsg, pathOrParams);
										}
		
									} else {
		
										if (callback !== undefined) {
											callback();
										}
									}
								});
							};
						}]);

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('REMOVE_FOLDER', MSG({
								ko : '폴더가 존재하지 않습니다.'
							}), {
								path : path
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
							path : path,
							isSync : true
						}) === true) {
							
							FIND_FILE_NAMES({
								path : path,
								isSync : true
							}, EACH((fileName) => {
								
								REMOVE_FILE({
									path : path + '/' + fileName,
									isSync : true
								});
							}));
							
							FIND_FOLDER_NAMES({
								path : path,
								isSync : true
							}, EACH((folderName) => {
								
								REMOVE_FOLDER({
									path : path + '/' + folderName,
									isSync : true
								});
							}));
							
							FS.rmdirSync(path);

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('REMOVE_FOLDER', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									path : path
								});
							}

							// do not run callback.
							return;
						}

					} catch(error) {
						
						if (error !== TO_DELETE) {
							
							let errorMsg = error.toString();
	
							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('REMOVE_FOLDER', errorMsg, pathOrParams);
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
