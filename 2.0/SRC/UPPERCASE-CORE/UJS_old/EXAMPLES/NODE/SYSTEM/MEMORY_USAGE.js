// load UJS.
require('../../../UJS-NODE.js');

TEST('MEMORY_USAGE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	INTERVAL(1, RAR(function() {
		console.log(MEMORY_USAGE());
	}));
});
