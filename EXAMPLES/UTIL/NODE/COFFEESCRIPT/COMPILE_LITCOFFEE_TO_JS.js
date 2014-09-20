// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

TEST('COMPILE_LITCOFFEE_TO_JS', function(ok) {
	'use strict';

	READ_FILE('sample.litcoffee', function(content) {

		var
		// coffee code
		coffeeCode = content.toString();

		RUN_LITCOFFEE(coffeeCode);

		console.log(COMPILE_LITCOFFEE_TO_JS(coffeeCode));
	});
});
