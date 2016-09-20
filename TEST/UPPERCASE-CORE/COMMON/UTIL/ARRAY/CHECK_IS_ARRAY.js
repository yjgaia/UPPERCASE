TEST('CHECK_IS_ARRAY', function(check) {
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

	check(CHECK_IS_ARRAY(value) === false);
	check(CHECK_IS_ARRAY(data) === false);
	check(CHECK_IS_ARRAY(array) === true);
	check(CHECK_IS_ARRAY(arguments) === false);
});
