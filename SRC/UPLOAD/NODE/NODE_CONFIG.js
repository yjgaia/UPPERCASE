/**
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, function(origin) {

	global.NODE_CONFIG = NODE_CONFIG = COMBINE_DATA({
		origin : origin,
		extend : {

			// init max upload file size is 10mb.
			maxUploadFileMB : 10
		}
	});
});
