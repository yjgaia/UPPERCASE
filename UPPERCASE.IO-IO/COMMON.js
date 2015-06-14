/*

Welcome to UPPERCASE.IO! (http://uppercase.io)

*/

/**
 * Configuration
 */
OVERRIDE(CONFIG, function(origin) {
	'use strict';

	global.CONFIG = COMBINE([{
		
		defaultBoxName : 'UPPERCASE.IO',
		
		title : 'UPPERCASE.IO PROJECT',
		
		baseBackgroundColor : '#000',
		baseColor : '#fff'
		
		// maxThumbWidth
		// or
		// maxThumbHeight

	}, origin]);
});
