FOR_BOX(function(box) {
	'use strict';

	/**
	 * go another view on new window.
	 */
	box.GO_NEW_WIN = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO_NEW_WIN((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});
