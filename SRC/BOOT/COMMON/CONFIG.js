/**
 * Configuration
 */
OVERRIDE(CONFIG, function(origin) {

	global.CONFIG = CONFIG = COMBINE_DATA({
		origin : origin,
		extend : {
			defaultBoxName : 'UPPERCASE.IO',
			defaultTitle : 'UPPERCASE.IO PROJECT'
		}
	});
});
