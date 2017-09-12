/*
 * 지정된 경로에 위치한 폴더들의 이름 목록을 불러옵니다.
 */
global.FIND_FOLDER_NAMES = METHOD(() => {

	let FS = require('fs');
	
	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	폴더들이 위치한 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExistsHandler
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

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			let folderNames = [];

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						FS.readdir(path, (error, names) => {

							if (error !== TO_DELETE) {

								let errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg, pathOrParams);
								} else {
									SHOW_ERROR('FIND_FOLDER_NAMES', errorMsg, pathOrParams);
								}

							} else if (callback !== undefined) {

								PARALLEL(names, [
								(name, done) => {

									if (name[0] !== '.') {

										FS.stat(path + '/' + name, (error, stats) => {

											if (error !== TO_DELETE) {

												let errorMsg = error.toString();

												if (errorHandler !== undefined) {
													errorHandler(errorMsg, pathOrParams);
												} else {
													SHOW_ERROR('FIND_FOLDER_NAMES', errorMsg, pathOrParams);
												}

											} else {

												if (stats.isDirectory() === true) {
													folderNames.push(name);
												}

												done();
											}
										});

									} else {
										done();
									}
								},

								() => {
									if (callback !== undefined) {
										callback(folderNames);
									}
								}]);
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('FIND_FOLDER_NAMES', MSG({
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

				return RUN(() => {
					
					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {

							let names = FS.readdirSync(path);

							EACH(names, (name) => {
								if (name[0] !== '.' && FS.statSync(path + '/' + name).isDirectory() === true) {
									folderNames.push(name);
								}
							});

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('FIND_FOLDER_NAMES', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									path : path
								});
							}

							// return undefined.
							return;
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('FIND_FOLDER_NAMES', errorMsg, pathOrParams);
							}
						}
					}

					if (callback !== undefined) {
						callback(folderNames);
					}

					return folderNames;
				});
			}
		}
	};
});
