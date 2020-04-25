TEST('CHECK_FILE_EXISTS', (check) => {
	
	check(CHECK_FILE_EXISTS({
		path : 'UPPERCASE-CORE/__TEST_NODE.js',
		isSync : true
	}) === true);
});
