TEST('FIND', function(check) {
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

	check(FIND({
		data : data,
		value : 1
	}) === 'a');

	check(FIND({
		array : array,
		value : 1
	}) === 2);
});
