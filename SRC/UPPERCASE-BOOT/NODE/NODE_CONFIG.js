/*
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, (origin) => {

	global.NODE_CONFIG = COMBINE([{
		isNotUsingCPUClustering : false
	}, origin]);
});
