/**
 * Configuration
 */
OVERRIDE(CONFIG, function(origin) {

	global.CONFIG = CONFIG = COMBINE_DATA({
		origin : origin,
		extend : {

			defaultBoxName : 'UPPERCASE.IO',
			defaultTitle : 'UPPERCASE.IO PROJECT',

			webServerPort : 8888,

			socketServerPort : 8889,

			webSocketServerPort : 8810,
			webSocketFixServerPort : 8811
		}
	});
});
