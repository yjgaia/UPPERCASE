TEST('COPY', function(check) {
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
	}],

	// copy
	copy = COPY(data);

	copy.a = 2;

	check(CHECK_ARE_SAME([copy, {
		a : 2,
		b : ['a', 'b', 'c'],
		c : {
			d : 1
		}
	}]) === true);

	copy = COPY(array);

	copy[0] = 2;

	check(CHECK_ARE_SAME([copy, [2, ['a', 'b', 'c'], {
		d : 1
	}]]) === true);
});
