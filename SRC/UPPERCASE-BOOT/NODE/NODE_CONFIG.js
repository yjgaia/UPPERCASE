/*
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, (origin) => {

	global.NODE_CONFIG = COMBINE([{
		isUsingHTMLSnapshot : false,
		isNotUsingCPUClustering : false
	}, origin]);
});
