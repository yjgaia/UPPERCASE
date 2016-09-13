// load UJS.
require('../../../UJS-NODE.js');

// load UPPERCASE-DB.
require('../../../UPPERCASE-DB/NODE.js');

TEST('CONNECT_TO_DB_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CONNECT_TO_DB_SERVER({
		// username : 'test',
		// password : 'test',
		host : '127.0.0.1',
		port : 27017,
		name : 'test'
	}, function() {
		console.log('connected!');
	});
});
