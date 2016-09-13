TEST('OVERRIDE', function(ok) {
	'use strict';

	var
	// function
	func = function() {
		console.log('a');
	};

	OVERRIDE(func, function(origin) {

		func = function() {
			origin();
			console.log('b');
		};
	});

	func();
});
