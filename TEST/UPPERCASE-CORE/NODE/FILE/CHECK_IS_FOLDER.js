TEST('CHECK_IS_FOLDER', function(check) {
	'use strict';

	check(CHECK_IS_FOLDER({
		path : 'UPPERCASE-CORE',
		isSync : true
	}) === true);
});
