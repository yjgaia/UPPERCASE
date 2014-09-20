/**
 * Configuration
 */
OVERRIDE(CONFIG, function(origin) {
	'use strict';

	global.CONFIG = CONFIG = COMBINE([{
		defaultBoxName : 'UPPERCASE.IO',
		title : 'UPPERCASE.IO PROJECT',
		description : 'UPPERCASE.IO PROJECT'
	}, origin]);
});
