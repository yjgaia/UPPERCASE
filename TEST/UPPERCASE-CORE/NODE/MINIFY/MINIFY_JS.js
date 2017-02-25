TEST('MINIFY_JS', function(check) {
	'use strict';

	READ_FILE('UPPERCASE-CORE/NODE/MINIFY/sample.js', function(content) {

		var
		// js code
		jsCode = content.toString();

		console.log(MINIFY_JS(jsCode));
	});
});
