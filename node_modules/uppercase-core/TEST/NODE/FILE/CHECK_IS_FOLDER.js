TEST('CHECK_IS_FOLDER', (check) => {

	check(CHECK_IS_FOLDER({
		path : 'UPPERCASE-CORE',
		isSync : true
	}) === true);
});
