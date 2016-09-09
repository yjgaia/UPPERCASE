/**
 * get window width. (px)
 */
global.WIN_WIDTH = METHOD({

	run : function() {
		'use strict';

		return document.documentElement.clientWidth;
	}
});
