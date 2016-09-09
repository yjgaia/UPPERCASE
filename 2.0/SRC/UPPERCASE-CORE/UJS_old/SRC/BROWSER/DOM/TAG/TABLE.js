/**
 * Table class
 */
global.TABLE = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'table'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.style

		var
		// style
		style;

		// init params.
		if (params !== undefined) {
			style = params.style;
		}
	}
});
