TEST('EACH', function(ok) {
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
	array = [1, 2, 3],

	// sum
	sum = 0,

	// function
	func;

	EACH(value, function(value, i) {
		console.log('value each - ' + i + ': ' + value);
		sum += value;
	});

	ok(sum === 0);

	EACH(data, function(value, name) {
		console.log('data each - ' + name + ': ' + value);
		sum += value;
	});

	ok(sum === 6);

	EACH(array, function(value, i) {
		console.log('array each - ' + i + ': ' + value);
		sum += value;
	});

	ok(sum === 12);

	func = function() {
		EACH(arguments, function(value, i) {
			console.log('arguments each - ' + i + ': ' + value);
			sum += value;
		});
	};

	func(3, 2, 1);

	ok(sum === 18);
});
