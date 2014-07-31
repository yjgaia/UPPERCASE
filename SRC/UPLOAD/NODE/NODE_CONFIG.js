/**
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, function(origin) {

	global.NODE_CONFIG = NODE_CONFIG = COMBINE([origin, {

		// init max upload file size is 10mb.
		maxUploadFileMB : 10
	}]);
});
