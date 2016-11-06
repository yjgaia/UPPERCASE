/**
 * HTML br 태그와 대응되는 클래스
 */
global.BR = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'br'
		};
	}
});
