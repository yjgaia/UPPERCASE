/**
 * Optgroup class
 */
global.OPTGROUP = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'optgroup'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.label

		var
		// label
		label = params.label;

		inner.setAttr({
			name : 'label',
			value : label
		});
	}
});
