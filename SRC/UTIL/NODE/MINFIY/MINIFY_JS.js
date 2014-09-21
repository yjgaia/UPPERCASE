/**
 * minify js.
 */
global.MINIFY_JS = MINIFY_JS = METHOD(function() {
	'use strict';

	var
	// uglify-js
	uglifyJS = require('uglify-js');

	return {

		run : function(code) {
			//REQUIRED: code

			return uglifyJS.minify(code.toString(), {
				fromString : true,
				mangle : true
			}).code;
		}
	};
});
