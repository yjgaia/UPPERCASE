FOR_BOX(function(box) {
	'use strict';

	/**
	 * go another view.
	 */
	box.GO = METHOD({

		run : function(uri) {
			//OPTIONAL: uri

			GO((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});
