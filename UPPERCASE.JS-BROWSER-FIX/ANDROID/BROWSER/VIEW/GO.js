OVERRIDE(GO, function(origin) {
	'use strict';

	/**
	 * go another view.
	 */
	global.GO = METHOD({
	
		run : function(uri) {
			//REQUIRED: uri
	
			location.href = HREF(uri);
		}
	});
});
