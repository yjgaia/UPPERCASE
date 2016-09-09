TEST('CHECK_IS_DATA', function(ok) {
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

	ok(CHECK_IS_DATA(value) === false);
	ok(CHECK_IS_DATA(data) === true);
	ok(CHECK_IS_DATA(array) === false);
	ok(CHECK_IS_DATA(arguments) === false);
});
