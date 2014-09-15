FOR_BOX(function(box) {
	'use strict';

	/**
	 * refresh view.
	 */
	box.REFRESH = METHOD({

		run : function(uri) {
			//OPTIONAL: uri

			EVENT_ONCE({
				name : 'hashchange'
			}, function() {
				box.GO(uri);
			});

			location.href = '#__REFRESING';
		}
	});
});
