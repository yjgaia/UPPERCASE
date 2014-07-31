/**
 * Configuration
 */
OVERRIDE(CONFIG, function(origin) {

	global.CONFIG = CONFIG = COMBINE([origin, {
		defaultBoxName : 'UPPERCASE.IO',
		defaultTitle : 'UPPERCASE.IO PROJECT'
	}]);
});
