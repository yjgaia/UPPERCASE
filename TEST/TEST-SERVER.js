// load UPPERCASE.JS.
require('../UPPERCASE.JS-COMMON.js');
require('../UPPERCASE.JS-NODE.js');

RUN(function() {
	'use strict';

	var
	// port
	port = 8811;

	INIT_OBJECTS();

	// don't resource caching.
	CONFIG.isDevMode = true;

	RESOURCE_SERVER({
		port : port,
		rootPath : __dirname
	}, function(requestInfo, response, onDisconnected, replaceRootPath, next) {

		var
		// uri
		uri = requestInfo.uri,

		// method
		method = requestInfo.method,

		// params
		params = requestInfo.params;

		if (uri === '') {

			requestInfo.uri = 'TEST.html';

		} else if (uri === 'TestBox/AJAX_TEST') {

			console.log(method, params);

			response('Request DONE!');

		} else if (uri === 'TestBox/AJAX_JSON_TEST') {

			console.log(method, params);

			response('{ "thisis" : "JSON" }');
		}
	});

	console.log('UPPERCASE.IO test server running. - http://localhost:' + port);
});
