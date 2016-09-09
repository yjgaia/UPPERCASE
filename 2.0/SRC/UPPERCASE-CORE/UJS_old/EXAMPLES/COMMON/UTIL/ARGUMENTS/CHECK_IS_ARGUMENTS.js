TEST('CHECK_IS_ARGUMENTS', function(ok) {
	'use strict';

	var
	// just value
	value = 1,

	// data
	data = {
		a : 1,
		b : 2,
		c : 3
	},

	// array
	array = [1, 2, 3];

	ok(CHECK_IS_ARGUMENTS(value) === false);
	ok(CHECK_IS_ARGUMENTS(data) === false);
	ok(CHECK_IS_ARGUMENTS(array) === false);
	ok(CHECK_IS_ARGUMENTS(arguments) === true);
});
