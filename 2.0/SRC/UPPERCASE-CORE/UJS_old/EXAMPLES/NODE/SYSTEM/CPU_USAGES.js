// load UJS.
require('../../../UJS-NODE.js');

TEST('CPU_USAGES', function(ok) {
	'use strict';

	INIT_OBJECTS();

	INTERVAL(1, RAR(function() {
		console.log(CPU_USAGES());
	}));
});
