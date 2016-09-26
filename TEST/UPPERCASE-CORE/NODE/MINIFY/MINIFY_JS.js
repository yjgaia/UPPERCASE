TEST('MINIFY_JS', function(ok) {
	'use strict';

	READ_FILE('NODE/MINIFY/MINIFY_JS.js', function(content) {

		var
		// js code
		jsCode = content.toString();

		console.log(MINIFY_JS(jsCode));
	});
});
