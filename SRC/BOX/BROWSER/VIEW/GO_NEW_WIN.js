FOR_BOX(function(box) {'use strict';

	/**
	 * Go another view on new window.
	 */
	box.GO_NEW_WIN = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			global.open(box.HREF(uri));
		}
	});
});
