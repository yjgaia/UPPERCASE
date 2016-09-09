// load UJS.
require('../../../UJS-NODE.js');

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index.html';
	}
	
	// load UJS
	else if (uri.substring(0, 'UJS-'.length) === 'UJS-') {
		uri = '../../../' + uri;
	}
	
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
