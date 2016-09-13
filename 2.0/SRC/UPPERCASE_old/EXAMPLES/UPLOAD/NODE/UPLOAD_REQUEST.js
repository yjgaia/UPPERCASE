// load UJS.
require('../../../UJS-NODE.js');

// load UPPERCASE-TRANSPORT.
require('../../../UPPERCASE-TRANSPORT/NODE.js');

// load UPPERCASE-UTIL.
require('../../../UPPERCASE-UTIL/NODE.js');

// load UPPERCASE-UPLOAD.
require('../../../UPPERCASE-UPLOAD/NODE.js');

TEST('UPLOAD_REQUEST', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function() {

		var
		// web server
		webServer = WEB_SERVER({
			port : 8124,
			noParsingParamsURI : ['__UPLOAD_1', '__UPLOAD_2']
		}, function(requestInfo, response, onDisconnected) {

			if (requestInfo.uri === '__UPLOAD_1') {

				UPLOAD_REQUEST({
					requestInfo : requestInfo,
					uploadPath : __dirname + '/UPLOAD_1_FILES'
				}, {
					error : function(errorMsg) {
						response(errorMsg);
					},
					overFileSize : function() {
						response('OVER FILE SIZE!');
					},
					progress : function(bytesRecieved, bytesExpected) {
						console.log('(' + bytesRecieved + '/' + bytesExpected + ')');
					},
					success : function(fileDataSet) {
						response(STRINGIFY(fileDataSet));
					}
				});
			}

			if (requestInfo.uri === '__UPLOAD_2') {

				UPLOAD_REQUEST({
					requestInfo : requestInfo,
					uploadPath : __dirname + '/UPLOAD_2_FILES'
				}, {
					error : function(errorMsg) {
						response(errorMsg);
					},
					overFileSize : function() {
						response('OVER FILE SIZE!');
					},
					progress : function(bytesRecieved, bytesExpected) {
						console.log('(' + bytesRecieved + '/' + bytesExpected + ')');
					},
					success : function(fileDataSet) {
						response(STRINGIFY(fileDataSet));
					}
				});
			}
		});
	});
});
