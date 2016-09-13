TEST('REVERSE_EACH', function(ok) {
	'use strict';

	var
	// just value
	value = 1,

	// array
	array = [1, 2, 3],

	// sum
	sum = 0,

	// function
	func;

	REVERSE_EACH(value, function(value, i) {
		console.log('value each - ' + i + ': ' + value);
		sum += value;
	});

	ok(sum === 0);

	REVERSE_EACH(array, function(value, i) {
		console.log('array each - ' + i + ': ' + value);
		sum += value;
	});

	ok(sum === 6);

	func = function() {
		REVERSE_EACH(arguments, function(value, i) {
			console.log('arguments each - ' + i + ': ' + value);
			sum += value;
		});
	};

	func(3, 2, 1);

	ok(sum === 12);
});
