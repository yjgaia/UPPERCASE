FOR_BOX(function(box) {
	'use strict';

	/**
	 * get resource's real path with version.
	 */
	box.R = METHOD({

		run : function(path, callback) {
			//REQUIRED: path
			//OPTIONAL: callback

			var
			// uri
			uri = box.boxName + '/' + path + '?version=' + CONFIG.version;

			if (callback !== undefined) {
				GET(uri, callback);
			}

			return '/' + uri;
		}
	});
});
