// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-TRANSPORT.
require('../../../../UPPERCASE.IO-TRANSPORT/NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

// load UPPERCASE.IO-UPLOAD.
require('../../../../UPPERCASE.IO-UPLOAD/NODE.js');

INIT_OBJECTS();

UPLOAD_SERVER({
	port : 8124,
	uploadPath : __dirname + '/UPLOAD_FILES'
}, function(fileDataSet) {
	console.log(fileDataSet);
});
