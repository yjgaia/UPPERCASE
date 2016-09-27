TEST('CPU_USAGES', function(check) {
	'use strict';

	INTERVAL(1, RAR(function() {
		console.log(CPU_USAGES());
	}));
});
