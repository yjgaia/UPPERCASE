// load UJS.
require('../../../UJS-NODE.js');

TEST('DOWNLOAD', function(ok) {
	'use strict';

	INIT_OBJECTS();

	DOWNLOAD({
		url : 'https://github.com/Hanul/UJS/archive/master.zip',
		path : 'UJS.zip'
	});
	
	DOWNLOAD({
		host : 'github.com',
		uri : 'Hanul/UJS/archive/master.zip',
		isSecure : true,
		path : 'UJS.zip'
	});
});
