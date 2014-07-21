/**
 * minify css.
 */
global.MINIFY_CSS = MINIFY_CSS = METHOD(function() {'use strict';

	var
	// sqwish
	sqwish = require('sqwish');

	return {

		run : function(cssContent) {
			//REQUIRED: cssContent

			return sqwish.minify(cssContent);
		}
	};
});
