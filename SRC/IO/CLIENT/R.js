FOR_BOX(function(box) {
	'use strict';

	/**
	 * get resource's real path with version.
	 */
	box.R = METHOD(function(m) {
		
		var
		// base path
		basePath,
		
		// set base path.
		setBasePath;
		
		m.setBasePath = setBasePath = function(_basePath) {
			basePath = _basePath;
		};
		
		return {

			run : function(path, callback) {
				//REQUIRED: path
				//OPTIONAL: callback
	
				var
				// uri
				uri = box.boxName + '/R/' + path;
	
				if (CONFIG.version !== undefined) {
					uri += '?version=' + CONFIG.version;
				}
				
				if (location.protocol !== 'file:') {
					
					if (basePath !== undefined) {
						uri = basePath + '/' + uri;
					}
					
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
