// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-BOX
require('../../../UPPERCASE.IO-BOX/CORE.js');

TEST('BOX', function(ok) {
	'use strict';

	// create test box.
	BOX('TestBox');

	INIT_OBJECTS();

	ok(TestBox.boxName === 'TestBox');
});
