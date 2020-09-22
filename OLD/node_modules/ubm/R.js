FOR_BOX((box) => {

	/*
	 * fullpack용 R override
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
	
				let dataURI = __R[uri];
				
				if (dataURI !== undefined) {
					uri = dataURI;
				}
				
				else {
					
					if (CONFIG.version !== undefined) {
						uri += '?version=' + CONFIG.version;
					}
						
					if (basePath !== undefined) {
						uri = basePath + '/' + uri;
					}
					
					if (location.protocol === 'file:') {
						if (box.boxName !== CONFIG.defaultBoxName) {
							uri = 'BOX/' + uri;
						}
					} else {
						uri = '/' + uri;
					}
				}
				
				if (callback !== undefined) {
					GET(uri, callback);
				}
	
				return uri;
			}
		};
	});
});
