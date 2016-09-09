OVERRIDE(SCROLL_LEFT, function(origin) {
	'use strict';

	/**
	 * get scroll left. (fix)
	 */
	global.SCROLL_LEFT = METHOD({

		run : function() {

			var
			// doc
			doc = document.documentElement,

			// body
			body = document.body;

			if (doc !== undefined && doc.scrollLeft !== undefined && doc.scrollLeft > 0) {
				return doc.scrollLeft;
			} else if (body !== undefined && body.scrollLeft !== undefined && body.scrollLeft > 0) {
				return body.scrollLeft;
			}

			return 0;
		}
	});
});
