OVERRIDE(WIN_WIDTH, function(origin) {
	'use strict';

	/**
	 * get window width. (fix for IE)
	 */
	global.WIN_WIDTH = METHOD({

		run : function() {
			return document.documentElement.offsetWidth;
		}
	});
});
