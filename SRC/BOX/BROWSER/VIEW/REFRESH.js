FOR_BOX(function(box) {
	'use strict';

	/**
	 * refresh view.
	 */
	box.REFRESH = METHOD({

		run : function(uri) {
			//OPTIONAL: uri
			
			REFRESH((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});
