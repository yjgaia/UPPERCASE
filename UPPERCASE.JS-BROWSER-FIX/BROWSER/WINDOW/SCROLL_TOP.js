OVERRIDE(SCROLL_TOP, function(origin) {
	'use strict';

	/**
	 * get scroll top. (fix)
	 */
	global.SCROLL_TOP = METHOD({

		run : function() {

			var
			// doc
			doc = document.documentElement,

			// body
			body = document.body;

			if (doc !== undefined && doc.scrollTop !== undefined && doc.scrollTop > 0) {
				return doc.scrollTop;
			} else if (body !== undefined && body.scrollTop !== undefined && body.scrollTop > 0) {
				return body.scrollTop;
			}

			return 0;
		}
	});
});
