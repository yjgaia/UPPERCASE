TEST('RUN', function(ok) {
	'use strict';

	var
	// result
	result;

	result = RUN(function() {

		console.log('just run!');

		return 1;
	});

	ok(result === 1);
});
