FOR_BOX(function(box) {'use strict';

	/**
	 * Get href.
	 */
	box.HREF = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			return HREF((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});
