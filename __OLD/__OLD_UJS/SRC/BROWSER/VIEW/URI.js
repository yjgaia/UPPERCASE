/**
 * get now page's URI.
 */
global.URI = METHOD({

	run : function() {
		'use strict';
		
		return decodeURIComponent(location.pathname.substring(1));
	}
});
