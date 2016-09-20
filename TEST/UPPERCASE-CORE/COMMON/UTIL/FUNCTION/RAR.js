TEST('RAR', function(check) {
	'use strict';

	var
	// function
	func = RAR(function() {
		console.log('just run!');
	});

	func();
});
