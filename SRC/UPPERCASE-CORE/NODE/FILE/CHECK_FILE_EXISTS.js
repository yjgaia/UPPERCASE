/*
 * 지정된 경로에 파일이나 폴더가 존재하는지 확인합니다.
 */
global.CHECK_FILE_EXISTS = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');

	return {

		run : (pathOrParams, callback) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	확인할 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callback

			let path;
			let isSync;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			// when normal mode
			if (isSync !== true) {
				
				if (path === './') {
					callback(true);
				}
				
				else {
					
					FS.access(path, (error) => {
						
						if (error !== TO_DELETE) {
							callback(false);
						}
						
						else {
							
							FS.readdir(Path.dirname(path), (error, names) => {
	
								if (error !== TO_DELETE) {
									callback(false);
								}
								
								else {
	
									callback(CHECK_IS_IN({
										array : names,
										value : Path.basename(path)
									}));
								}
							});
						}
					});
				}
			}

			// when sync mode
			else {
				
				if (path === './') {
					
					if (callback !== undefined) {
						callback(true);
					}
					
					return true;
				}
				
				else {
					
					try {
	
						FS.accessSync(path);
						
						let result = CHECK_IS_IN({
							array : FS.readdirSync(Path.dirname(path)),
							value : Path.basename(path)
						});
						
						if (callback !== undefined) {
							callback(result);
						}
						
						return result;
	
					} catch(error) {
						
						if (callback !== undefined) {
							callback(false);
						}
						
						return false;
					}
				}
			}
		}
	};
});
