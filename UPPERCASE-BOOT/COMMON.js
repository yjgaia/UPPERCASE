/*

Welcome to UPPERCASE-BOOT! (http://uppercase.io)

*/

/**
 * Configuration
 */
OVERRIDE(CONFIG, function(origin) {
	'use strict';

	global.CONFIG = COMBINE([{
		
		defaultBoxName : 'UPPERCASE',
		
		title : 'UPPERCASE PROJECT',
		
		baseBackgroundColor : '#000',
		baseColor : '#fff',
		
		// maxThumbWidth
		// or
		// maxThumbHeight
		
		isMobileFullScreen : false,
		isUsingHTMLSnapshot : false
		
	}, origin]);
});
