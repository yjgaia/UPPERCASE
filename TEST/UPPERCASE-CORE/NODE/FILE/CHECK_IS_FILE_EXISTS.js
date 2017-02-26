TEST('CHECK_IS_FILE_EXISTS', (check) => {

	check(CHECK_IS_FILE_EXISTS({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}) === true);
});
