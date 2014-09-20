// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

TEST('RUN_LITCOFFEE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	READ_FILE('sample.litcoffee', function(content) {

		var
		// coffee code
		coffeeCode = content.toString();

		RUN_LITCOFFEE(coffeeCode);

		ok(number === 32);
	});
});
