FOR_BOX(function(box) {'use strict';

	/**
	 * Go another view.
	 */
	box.GO = METHOD({

		run : function(uri) {
			//OPTIONAL: uri

			location.href = box.HREF(uri);
		}
	});
});
