// load UJS.
require('../../../../UJS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

TEST('PROCESS_MEMORY_USAGE', function(ok) {
	'use strict';

	PROCESS_MEMORY_USAGE(process.pid, function(memoryUsage) {
		console.log(memoryUsage);
	});
});
