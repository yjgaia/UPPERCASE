TEST('CHECK_ARE_SAME', function(ok) {
	'use strict';

	var
	// data1
	data1 = {
		a : 1,
		b : 2,
		c : [1, 2, 3]
	},

	// data2
	data2 = {
		a : 1,
		b : 2,
		c : [1, 2, 3]
	},

	// array1
	array1 = [1, 2, 3, 4, {
		a : 1,
		b : 2
	}, [5, 6]],

	// array2
	array2 = [1, 2, 3, 4, {
		a : 1,
		b : 2
	}, [5, 6]];

	ok(CHECK_ARE_SAME([data1, data2]) === true);

	data2.a = 0;

	ok(CHECK_ARE_SAME([data1, data2]) === false);

	ok(CHECK_ARE_SAME([array1, array2]) === true);

	array2[0] = 0;

	ok(CHECK_ARE_SAME([array1, array2]) === false);
});
