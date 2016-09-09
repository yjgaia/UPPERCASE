// load UJS.
require('../../../UJS-NODE.js');

var
//IMPORT: Jade
Jade = require('jade');

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index';
	}
	
	uri = uri + '.jade';
	
	CHECK_IS_EXISTS_FILE(uri, function(isExists) {
		
		if (isExists === true) {
			response(Jade.renderFile(uri,
			// params	
			{
				pageTitle : 'Page Title'
			}));
		} else {
			response(404);
		}
	});
});
