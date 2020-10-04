/*
 * 파일의 내용을 불러옵니다.
 * 
 * 내용을 Buffer형으로 불러오기 때문에, 내용을 문자열로 불러오려면 toString 메소드를 이용하시기 바랍니다.
 */
global.READ_FILE = METHOD(() => {

	let FS = require('fs');

	return {

		run: (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	불러올 파일의 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
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

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						FS.stat(path, (error, stat) => {

							if (error !== TO_DELETE) {

								let errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg, pathOrParams);
								} else {
									SHOW_ERROR('READ_FILE', errorMsg, pathOrParams);
								}

							} else if (stat.isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									SHOW_WARNING('READ_FILE', MSG({
										ko: '파일이 존재하지 않습니다.'
									}), {
										path: path
									});
								}

							} else {

								FS.readFile(path, (error, buffer) => {

									if (error !== TO_DELETE) {

										let errorMsg = error.toString();

										if (errorHandler !== undefined) {
											errorHandler(errorMsg, pathOrParams);
										} else {
											SHOW_ERROR('READ_FILE', errorMsg, pathOrParams);
										}

									} else if (callback !== undefined) {
										callback(buffer);
									}
								});
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('READ_FILE', MSG({
								ko: '파일이 존재하지 않습니다.'
							}), {
								path: path
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
							path: path,
							isSync: true
						}) === true) {

							if (FS.statSync(path).isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									SHOW_WARNING('READ_FILE', MSG({
										ko: '파일이 존재하지 않습니다.'
									}), {
										path: path
									});
								}

							} else {

								let buffer = FS.readFileSync(path);

								if (callback !== undefined) {
									callback(buffer);
								}

								return buffer;
							}

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('READ_FILE', MSG({
									ko: '파일이 존재하지 않습니다.'
								}), {
									path: path
								});
							}
						}

					} catch (error) {

						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('READ_FILE', errorMsg, pathOrParams);
							}
						}
					}

					// return undefined.
					return;
				});
			}
		}
	};
});
