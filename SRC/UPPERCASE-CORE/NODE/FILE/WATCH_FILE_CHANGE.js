/*
 * 파일 내용의 변경 사항을 감지합니다.
 */
global.WATCH_FILE_CHANGE = CLASS((cls) => {

	let FS = require('fs');

	return {

		init : (inner, self, path, changeListenerOrHandlers) => {
			//REQUIRED: path	수정을 감지할 파일의 경로
			//REQUIRED: changeListenerOrHandlers
			//OPTIONAL: changeListenerOrHandlers.notExists
			//REQUIRED: changeListenerOrHandlers.change
			
			let notExistsHandler;
			let changeListener;
			
			if (CHECK_IS_DATA(changeListenerOrHandlers) !== true) {
				changeListener = changeListenerOrHandlers;
			} else {
				notExistsHandler = changeListenerOrHandlers.notExists;
				changeListener = changeListenerOrHandlers.change;
			}
			
			let watcher;
			
			CHECK_FILE_EXISTS(path, (exists) => {

				if (exists === true) {
					
					watcher = FS.watch(path, (eventType) => {
						
						// 파일의 위치가 달라지거나, 삭제된 경우 exit
						if (eventType === 'rename') {
							exit();
						}
						
						if (eventType === 'change') {
							changeListener();
						}
					});
					
				} else {

					if (notExistsHandler !== undefined) {
						notExistsHandler(path);
					} else {
						SHOW_WARNING('WATCH_FILE_CHANGE', MSG({
							ko : '파일이 존재하지 않습니다.'
						}), {
							path : path
						});
					}
				}
			});
			
			let exit = self.exit = () => {
				if (watcher !== undefined) {
					watcher.close();
					watcher = undefined;
				}
			};
		}
	};
});
