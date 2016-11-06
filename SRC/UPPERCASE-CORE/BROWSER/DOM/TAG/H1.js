/**
 * HTML h1 태그와 대응되는 클래스
 */
global.H1 = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'h1'
		};
	}
});
