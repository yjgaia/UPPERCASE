/*
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, (origin) => {

	global.NODE_CONFIG = COMBINE([{
		isSingleCoreMode : false
		// maxUploadFileMB
		// isNotToModelInitialize
	}, origin]);
});
