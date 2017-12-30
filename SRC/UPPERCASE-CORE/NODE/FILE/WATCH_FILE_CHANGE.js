/*
 * 파일이 수정되는 것을 확인합니다.
 */
global.WATCH_FILE_CHANGE = CLASS(() => {

	let FS = require('fs');

	return {

		init : (inner, self, path, changeListenerOrHandlers) => {
			//REQUIRED: path							수정을 감지할 파일의 경로
			//REQUIRED: changeListenerOrHandlers
			//OPTIONAL: changeListenerOrHandlers.notExists	파일이 존재하지 않을 때
			//REQUIRED: changeListenerOrHandlers.change		파일의 내용이 수정될 때
			//REQUIRED: changeListenerOrHandlers.move			파일의 위치가 이동되거나, 이름이 변경되었을 때
			//REQUIRED: changeListenerOrHandlers.remove		파일이 삭제되었을 때
			
			let notExistsHandler;
			let changeListener;
			let moveListener;
			let removeListener;

			if (changeListenerOrHandlers !== undefined) {
				if (CHECK_IS_DATA(changeListenerOrHandlers) !== true) {
					changeListener = changeListenerOrHandlers;
				} else {
					notExistsHandler = changeListenerOrHandlers.notExists;
					changeListener = changeListenerOrHandlers.change;
					moveListener = changeListenerOrHandlers.move;
					removeListener = changeListenerOrHandlers.remove;
				}
			}
			
			let watcher;
			
			CHECK_FILE_EXISTS(path, (exists) => {

				if (exists === true) {
					
					watcher = FS.watch(path, (eventType, fileName) => {
						
						console.log(eventType, fileName);
						
						if (eventType === 'rename') {
							
							
							
							// 파일이 제거되었으면, exit
							CHECK_FILE_EXISTS(path, (exists) => {
								
								if (removeListener !== undefined) {
									removeListener();
								}
								
								if (exists !== true) {
									exit();
								}
							});
						}
						
						if (eventType === '') {
							
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
