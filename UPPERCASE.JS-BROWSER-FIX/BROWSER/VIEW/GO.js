OVERRIDE(GO, function(origin) {
	'use strict';

	/**
	 * go another view.
	 */
	global.GO = METHOD({
	
		run : function(uri) {
			//OPTIONAL: uri
	
			location.href = HREF(uri);
		}
	});
});
