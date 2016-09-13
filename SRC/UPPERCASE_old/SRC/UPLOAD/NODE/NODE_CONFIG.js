/**
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, function(origin) {

	global.NODE_CONFIG = COMBINE([{

		// init max upload file size is 10mb.
		maxUploadFileMB : 10
		
	}, origin]);
});
