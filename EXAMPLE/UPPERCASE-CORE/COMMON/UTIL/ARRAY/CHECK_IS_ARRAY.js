TEST('CHECK_IS_ARRAY', function(ok) {
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

	ok(CHECK_IS_ARRAY(value) === false);
	ok(CHECK_IS_ARRAY(data) === false);
	ok(CHECK_IS_ARRAY(array) === true);
	ok(CHECK_IS_ARRAY(arguments) === false);
});
