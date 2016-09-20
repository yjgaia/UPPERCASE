TEST('CHECK_IS_EMPTY_DATA', function(check) {
	'use strict';

	var
	// empty data
	data = {};

	check(CHECK_IS_EMPTY_DATA(data) === true);
});
