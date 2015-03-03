/**
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, function(origin) {

	global.NODE_CONFIG = COMBINE([{
		isUsingHTMLSnapshot : false
	}, origin]);
});
