// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-TRANSPORT.
require('../../../UPPERCASE.IO-TRANSPORT/NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../UPPERCASE.IO-UTIL/NODE.js');

// load UPPERCASE.IO-UPLOAD.
require('../../../UPPERCASE.IO-UPLOAD/NODE.js');

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
					success : function(fileDataSet) {
						response(STRINGIFY(fileDataSet));
					}
				});
			}
		});
	});
});
