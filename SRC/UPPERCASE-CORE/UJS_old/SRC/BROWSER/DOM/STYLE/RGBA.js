/**
 * get rgba style string.
 */
global.RGBA = METHOD({

	run : function(rgba) {
		'use strict';
		//REQUIRED: rgba

		return 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
	}
});
