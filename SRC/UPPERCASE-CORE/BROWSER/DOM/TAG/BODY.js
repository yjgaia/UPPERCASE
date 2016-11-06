/**
 * HTML body 태그와 대응되는 객체
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
