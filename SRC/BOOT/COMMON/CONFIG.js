/**
 * Configuration
 */
OVERRIDE(CONFIG, function(origin) {

	global.CONFIG = CONFIG = COMBINE([{
		defaultBoxName : 'UPPERCASE.IO',
		defaultTitle : 'UPPERCASE.IO PROJECT'
	}, origin]);
});
