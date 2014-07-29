FOR_BOX(function(box) {'use strict';

	/**
	 * Get final resource's real path.
	 */
	box.RF = METHOD({

		run : function(path) {
			//REQUIRED: path

			return global.location.protocol + '//' + global.location.hostname + ':' + CONFIG.uploadServerPort + '/' + box.boxName + '/' + path;
		}
	});
});
