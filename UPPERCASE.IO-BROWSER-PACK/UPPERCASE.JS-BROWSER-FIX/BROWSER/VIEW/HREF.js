OVERRIDE(HREF, function(origin) {
	'use strict';

	/**
	 * get href.
	 */
	global.HREF = METHOD({
	
		run : function(uri) {
			//OPTIONAL: uri

			return '#!/' + (uri === undefined ? '' : uri);
		}
	});
});
