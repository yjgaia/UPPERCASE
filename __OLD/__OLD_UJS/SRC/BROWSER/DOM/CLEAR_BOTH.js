/**
 * create clear:both div.
 */
global.CLEAR_BOTH = METHOD({

	run : function() {
		'use strict';

		return DIV({
			style : {
				clear : 'both'
			}
		});
	}
});
