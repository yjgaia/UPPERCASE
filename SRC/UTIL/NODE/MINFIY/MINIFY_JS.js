/**
 * minify js.
 */
global.MINIFY_JS = MINIFY_JS = METHOD(function() {'use strict';

	var
	// uglify-js
	uglifyJS = require('uglify-js');

	return {

		run : function(script) {
			//REQUIRED: script

			return uglifyJS.minify(String(script), {
				fromString : true,
				mangle : true
			}).code;
		}
	};
});
