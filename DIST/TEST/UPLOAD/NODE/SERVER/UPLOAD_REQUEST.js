// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-TRANSPORT.
require('../../../../UPPERCASE.IO-TRANSPORT/NODE.js');

// load UPPERCASE.IO-UPLOAD.
//require('../../../../UPPERCASE.IO-UPLOAD/NODE.js');

INIT_OBJECTS();

RESOURCE_SERVER({
	port : 8123,
	rootPath : __dirname + '/R'
}, function(requestInfo, response, onDisconnected) {

	/*var
	 // is upload request
	 isUploadRequest = UPLOAD_REQUEST({
	 requestInfo : requestInfo,
	 uploadPath : __dirname + '/UPLOAD_FILES'
	 }, response);*/
});
