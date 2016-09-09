TEST('REMOVE', function(ok) {
	'use strict';

	var
	// data
	data = {
		a : 1,
		b : 2,
		c : 3
	},

	// array
	array = [3, 2, 1];

	REMOVE({
		data : data,
		name : 'b'
	});

	ok(CHECK_ARE_SAME([data, {
		a : 1,
		c : 3
	}]) === true);

	REMOVE({
		array : array,
		key : 1
	});

	ok(CHECK_ARE_SAME([array, [3, 1]]) === true);

	REMOVE({
		data : data,
		value : 1
	});

	ok(CHECK_ARE_SAME([data, {
		c : 3
	}]) === true);

	REMOVE({
		array : array,
		value : 1
	});

	ok(CHECK_ARE_SAME([array, [3]]) === true);
});
