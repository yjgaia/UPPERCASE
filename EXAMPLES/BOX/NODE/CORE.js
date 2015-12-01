// load UJS
require('../../../UJS-COMMON.js');
require('../../../UJS-NODE.js');

TEST('BOX', function(ok) {
	'use strict';

	// create test box.
	BOX('TestBox');

	INIT_OBJECTS();

	ok(TestBox.boxName === 'TestBox');
});
