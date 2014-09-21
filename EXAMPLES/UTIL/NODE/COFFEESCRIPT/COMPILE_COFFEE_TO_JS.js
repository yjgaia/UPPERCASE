// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

TEST('COMPILE_COFFEE_TO_JS', function(ok) {
	'use strict';

	READ_FILE('sample.coffee', function(content) {

		var
		// coffee code
		coffeeCode = content.toString();

		RUN_COFFEE(coffeeCode);

		console.log(COMPILE_COFFEE_TO_JS(coffeeCode));
	});

	return;

	// run error code.
	READ_FILE('error.coffee', function(content) {

		var
		// coffee code
		coffeeCode = content.toString();

		RUN_COFFEE({
			code : coffeeCode,
			fileName : 'error.coffee'
		});
	});
});
