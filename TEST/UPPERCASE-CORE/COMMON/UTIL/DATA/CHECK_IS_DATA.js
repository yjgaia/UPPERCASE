TEST('CHECK_IS_DATA', function(check) {
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

	check(CHECK_IS_DATA(value) === false);
	check(CHECK_IS_DATA(data) === true);
	check(CHECK_IS_DATA(array) === false);
	check(CHECK_IS_DATA(arguments) === false);
});
