// load UPPERCASE-CORE-NODE
require('../../UPPERCASE-CORE/NODE.js');

RUN(function() {
	'use strict';

	var
	// port
	port = 8810;

	INIT_OBJECTS();

	// don't resource caching.
	CONFIG.isDevMode = true;

	WEB_SERVER({
		port : port,
		rootPath : __dirname
	}, {
		notExistsResource : function(resourcePath, requestInfo, response) {
			
			READ_FILE(__dirname + '/__TEST_BROWSER.html', function(content) {
				response(content.toString());
			});
			
			return false;
		},
		requestListener : function(requestInfo, response, replaceRootPath, next) {
	
			var
			// uri
			uri = requestInfo.uri,
	
			// method
			method = requestInfo.method,
	
			// params
			params = requestInfo.params;
	
			if (uri === 'BROWSER.js') {
				
				replaceRootPath(__dirname + '/../../UPPERCASE-CORE');
				
			} else if (uri === 'request_test') {
	
				console.log(method, params);
	
				response({
					content : 'Request DONE!',
					headers : {
						'Access-Control-Allow-Origin' : '*'
					}
				});
	
			} else if (uri === 'request_test_json') {
	
				console.log(method, params);
	
				response({
					content : '{ "thisis" : "JSON" }',
					headers : {
						'Access-Control-Allow-Origin' : '*'
					}
				});
			}
		}
	});

	console.log('UJS test server running. - http://localhost:' + port);
});
