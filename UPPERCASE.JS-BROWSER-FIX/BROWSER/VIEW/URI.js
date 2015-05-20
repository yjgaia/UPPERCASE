/**
 * get now page's URI.
 */
global.URI = METHOD({

	run : function() {
		'use strict';
		
		return location.hash.substring(3);
	}
});
