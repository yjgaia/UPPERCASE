FOR_BOX(function(box) {'use strict';

	/**
	 * Get resource's real path.
	 */
	box.R = METHOD({

		run : function(path, callback) {
			//REQUIRED: path
			//OPTIONAL: callback

			var
			// uri
			uri = box.boxName + '/' + path + '?' + CONFIG.version;

			if (callback !== undefined) {
				GET(uri, callback);
			}

			return '/' + uri;
		}
	});
});
