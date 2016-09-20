TEST('RUN', function(check) {
	'use strict';

	var
	// result
	result;

	result = RUN(function() {

		console.log('just run!');

		return 1;
	});

	check(result === 1);
});
