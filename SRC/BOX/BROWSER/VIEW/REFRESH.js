FOR_BOX(function(box) {'use strict';

	/**
	 * Go another view.
	 */
	box.REFRESH = METHOD({

		run : function(uri) {
			//OPTIONAL: uri

			var
			// hashchange event
			hashchangeEvent = EVENT({
				name : 'hashchange'
			}, function() {

				box.GO(uri);

				hashchangeEvent.remove();
			});

			location.href = '#__REFRESING';
		}
	});
});
