/**
 * change document title.
 */
global.TITLE = METHOD({

	run : function(title) {
		'use strict';
		//OPTIONAL: title

		if (title === undefined) {
			return document.title;
		} else {
			document.title = title;
		}
	}
});
