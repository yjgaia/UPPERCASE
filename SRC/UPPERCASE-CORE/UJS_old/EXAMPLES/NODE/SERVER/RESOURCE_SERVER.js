// load UJS.
require('../../../UJS-NODE.js');

TEST('RESOURCE_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// if you don't want resource caching.
	CONFIG.isDevMode = true;

	RESOURCE_SERVER({
		port : 8123,
		rootPath : __dirname + '/R'
	});
});
