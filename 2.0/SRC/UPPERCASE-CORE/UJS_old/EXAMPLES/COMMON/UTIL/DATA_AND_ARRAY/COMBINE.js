TEST('COMBINE', function(ok) {
	'use strict';

	var
	// data1
	data1 = {
		a : 1,
		b : 2,
		c : 3
	},

	// data2
	data2 = COMBINE([data1]),

	// data3
	data3 = COMBINE([data1, {
		d : 4
	}]),

	// array1
	array1 = [1, 2, 3],

	// array2
	array2 = COMBINE([array1]),

	// array3
	array3 = COMBINE([array1, [5, 6]]);

	data2.b = 4;

	ok(CHECK_ARE_SAME([data2, {
		a : 1,
		b : 4,
		c : 3
	}]) === true);

	ok(CHECK_ARE_SAME([data3, {
		a : 1,
		b : 2,
		c : 3,
		d : 4
	}]) === true);

	array2[1] = 4;

	ok(CHECK_ARE_SAME([array2, [1, 4, 3]]) === true);

	ok(CHECK_ARE_SAME([array3, [1, 2, 3, 5, 6]]) === true);
});
