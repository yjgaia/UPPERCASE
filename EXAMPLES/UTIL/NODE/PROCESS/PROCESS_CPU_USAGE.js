// load UJS.
require('../../../../UJS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

TEST('PROCESS_CPU_USAGE', function(ok) {
	'use strict';

	PROCESS_CPU_USAGE(process.pid, function(cpuUsage) {
		console.log(cpuUsage);
	});
});
