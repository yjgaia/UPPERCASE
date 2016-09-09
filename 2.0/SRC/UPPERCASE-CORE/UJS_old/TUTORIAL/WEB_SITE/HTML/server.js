// load UJS.
require('../../../UJS-NODE.js');

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index';
	}
	
	uri = uri + '.html';
	
	READ_FILE(uri, {
		
		notExists : function() {
			response(404);
		},
		
		success : function(buffer) {
			response({
				buffer : buffer
			});
		}
	});
});
