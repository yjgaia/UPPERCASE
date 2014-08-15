// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-BOX.
require('../../../UPPERCASE.IO-BOX/CORE.js');

BOX('TestBox');

// load UPPERCASE.IO-DB.
require('../../../UPPERCASE.IO-DB/NODE.js');

INIT_OBJECTS();

CONNECT_TO_DB_SERVER({
	name : 'test'
}, function() {

	var
	// log db
	logDB = TestBox.LOG_DB('testLog');

	// log.
	logDB.log({
		ok : true
	});
});
