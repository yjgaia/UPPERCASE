TEST('RAR', function(ok) {
	'use strict';

	var
	// function
	func = RAR(function() {
		console.log('just run!');
	});

	func();
});
