TEST('CHECK_IS_FILE_EXISTS', function(check) {
	'use strict';

	check(CHECK_IS_FILE_EXISTS({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}) === true);
});
