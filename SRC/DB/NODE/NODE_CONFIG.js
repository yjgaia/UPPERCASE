/**
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, function(origin) {

	global.NODE_CONFIG = NODE_CONFIG = COMBINE_DATA({
		origin : origin,
		extend : {

			// db log mode
			isDBLogMode : false,

			// init max data count = 1000
			maxDataCount : 1000
		}
	});
});
