OVERRIDE(WIN_HEIGHT, function(origin) {
	'use strict';

	/**
	 * get window height. (fix for IE)
	 */
	global.WIN_HEIGHT = METHOD({

		run : function() {
			return document.documentElement.offsetHeight;
		}
	});
});
