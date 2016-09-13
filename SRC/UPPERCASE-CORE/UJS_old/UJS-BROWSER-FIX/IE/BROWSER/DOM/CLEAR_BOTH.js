OVERRIDE(CLEAR_BOTH, function(origin) {
	'use strict';

	/**
	 * Create clear:both div. (fix for IE)
	 */
	global.CLEAR_BOTH = METHOD({

		run : function() {
			return DIV({
				style : {
					clear : 'both',
					height : 1,
					overflow : 'hidden'
				}
			});
		}
	});
});
