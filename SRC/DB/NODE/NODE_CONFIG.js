OVERRIDE(NODE_CONFIG, function(origin) {
	
	/**
	 * Node-side Configuration
	 */
	global.NODE_CONFIG = COMBINE([{

		// db log mode
		isDBLogMode : false,

		// init max data count = 1000
		maxDataCount : 1000
		
	}, origin]);
});
