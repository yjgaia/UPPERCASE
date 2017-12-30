TEST('WATCH_FILE_CHANGE', (check) => {
	
	let path = 'UPPERCASE-CORE/test.txt';
	
	WRITE_FILE({
		path : path,
		content : '',
		isSync : true
	});
	
	WATCH_FILE_CHANGE('UPPERCASE-CORE/test.txt', () => {
		console.log('파일 내용이 변경되었습니다.');
		
		READ_FILE(path, (buffer) => {
			console.log('변경된 파일의 내용: ' + buffer.toString());
		});
	});
	
	DELAY(1, () => {
		
		WRITE_FILE({
			path : path,
			content : 'this is test file.',
			isSync : true
		});
		
		DELAY(1, () => {
			
			REMOVE_FILE({
				path : path,
				isSync : true
			});
		});
	});
});
