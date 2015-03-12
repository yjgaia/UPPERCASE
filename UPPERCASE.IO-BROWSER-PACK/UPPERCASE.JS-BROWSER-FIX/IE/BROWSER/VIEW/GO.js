OVERRIDE(GO, function(origin) {
	'use strict';

	/**
	 * go another view.
	 */
	global.GO = METHOD({
	
		run : function(uri) {
			//REQUIRED: uri
			
			var
			// href
			href = HREF(uri);
	
			if (location.href !== href) {
				location.href = href;
			}
		}
	});
});
