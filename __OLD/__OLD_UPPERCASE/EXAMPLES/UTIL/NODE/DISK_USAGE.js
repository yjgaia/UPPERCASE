// load UJS.
require('../../../UJS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../UPPERCASE-UTIL/NODE.js');

TEST('DISK_USAGE', function(ok) {
	'use strict';
	
	DISK_USAGE(function(percent) {
		console.log(percent);
	});
	
	DISK_USAGE('C', function(percent) {
		console.log(percent);
	});
	
	DISK_USAGE('/', {
		error : function() {
			console.log('ERROR!');
		},
		success : function(percent) {
			console.log(percent);
		}
	});
});
