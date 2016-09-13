TEST('FIND', function(ok) {
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

	ok(FIND({
		data : data,
		value : 1
	}) === 'a');

	ok(FIND({
		array : array,
		value : 1
	}) === 2);
});
