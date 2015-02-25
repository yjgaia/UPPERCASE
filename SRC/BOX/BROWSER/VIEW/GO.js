FOR_BOX(function(box) {
	'use strict';

	/**
	 * go another view.
	 */
	box.GO = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});
