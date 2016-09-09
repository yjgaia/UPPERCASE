TEST('CHECK_IS_EMPTY_DATA', function(ok) {
	'use strict';

	var
	// empty data
	data = {};

	ok(CHECK_IS_EMPTY_DATA(data) === true);
});
