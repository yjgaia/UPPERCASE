TEST('CHECK_IS_IN', function(ok) {
	'use strict';

	var
	// data
	data = {
		a : 1,
		b : ['a', 'b', 'c'],
		c : {
			d : 1
		}
	},

	// array
	array = [1, ['a', 'b', 'c'], {
		d : 1
	}];

	ok(CHECK_IS_IN({
		data : data,
		value : 1
	}) === true);

	ok(CHECK_IS_IN({
		data : data,
		value : ['a', 'b', 'c']
	}) === true);

	ok(CHECK_IS_IN({
		data : data,
		value : {
			d : 1
		}
	}) === true);

	ok(CHECK_IS_IN({
		array : array,
		value : 1
	}) === true);

	ok(CHECK_IS_IN({
		array : array,
		value : ['a', 'b', 'c']
	}) === true);

	ok(CHECK_IS_IN({
		array : array,
		value : {
			d : 1
		}
	}) === true);
});
