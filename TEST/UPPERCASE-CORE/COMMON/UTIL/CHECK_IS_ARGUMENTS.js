TEST('CHECK_IS_ARGUMENTS', function(check) {
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

	check(CHECK_IS_ARGUMENTS(value) === false);
	check(CHECK_IS_ARGUMENTS(data) === false);
	check(CHECK_IS_ARGUMENTS(array) === false);
	check(CHECK_IS_ARGUMENTS(arguments) === true);
});
