TEST('EXTEND', function(ok) {
	'use strict';

	var
	// data1
	data1 = {
		a : 1,
		b : 2,
		c : 3,
		d : ['a', 'b', 'c']
	},

	// data2
	data2 = {
		d : ['d', 'e'],
		e : {
			k : 1
		}
	},

	// array1
	array1 = [1, 2, 3],

	// array2
	array2 = [4, 5, [7, 8]];

	EXTEND({
		origin : data1,
		extend : data2
	});

	EXTEND({
		origin : data2,
		extend : {
			e : 5
		}
	});

	EXTEND({
		origin : array1,
		extend : array2
	});

	ok(CHECK_ARE_SAME([data1, {
		a : 1,
		b : 2,
		c : 3,
		d : ['d', 'e'],
		e : {
			k : 1
		}
	}]));

	ok(CHECK_ARE_SAME([data2, {
		d : ['d', 'e'],
		e : 5
	}]));

	ok(CHECK_ARE_SAME([array1, [1, 2, 3, 4, 5, [7, 8]]]));
});
