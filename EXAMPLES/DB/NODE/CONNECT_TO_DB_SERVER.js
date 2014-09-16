// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-BOX.
require('../../../UPPERCASE.IO-BOX/CORE.js');

// load UPPERCASE.IO-DB.
require('../../../UPPERCASE.IO-DB/NODE.js');

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
