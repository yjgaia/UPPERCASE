/**
 * get window height. (px)
 */
global.WIN_HEIGHT = METHOD({

	run : function() {
		'use strict';

		return document.documentElement.clientHeight;
	}
});
