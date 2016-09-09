/**
 * Body class
 */
global.BODY = OBJECT({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'body'
		};
	}
});
