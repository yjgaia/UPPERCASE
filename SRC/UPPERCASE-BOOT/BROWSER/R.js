FOR_BOX((box) => {

	/*
	 * get resource's real path with version.
	 */
	box.R = METHOD((m) => {
		
		let basePath;
		
		let setBasePath = m.setBasePath = (_basePath) => {
			basePath = _basePath;
		};
		
		return {

			run : (path, callback) => {
				//REQUIRED: path
				//OPTIONAL: callback
	
				let uri = box.boxName + '/R/' + path;
	
				if (CONFIG.version !== undefined) {
					uri += '?version=' + CONFIG.version;
				}
					
				if (basePath !== undefined) {
					uri = basePath + '/' + uri;
				}
				
				if (location.protocol !== 'file:') {
					uri = '/' + uri;
				}
	
				if (callback !== undefined) {
					GET(uri, callback);
				}
	
				return uri;
			}
		};
	});
});
