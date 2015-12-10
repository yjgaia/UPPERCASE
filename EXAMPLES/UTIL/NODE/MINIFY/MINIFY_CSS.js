// load UJS.
require('../../../../UJS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

TEST('MINIFY_CSS', function(ok) {
	'use strict';

	READ_FILE('sample.css', function(content) {

		var
		// css code
		cssCode = content.toString();

		console.log(MINIFY_CSS(cssCode));
	});
});
