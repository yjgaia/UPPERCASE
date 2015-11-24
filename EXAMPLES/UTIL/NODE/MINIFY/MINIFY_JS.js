// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

TEST('MINIFY_JS', function(ok) {
	'use strict';

	READ_FILE('MINIFY_JS.js', function(content) {

		var
		// js code
		jsCode = content.toString();

		console.log(MINIFY_JS(jsCode));
	});
});
