TEST('MEMORY_USAGE', function(check) {
	'use strict';

	INTERVAL(1, RAR(function() {
		console.log(MEMORY_USAGE());
	}));
});
