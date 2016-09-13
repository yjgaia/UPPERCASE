/**
 * Td class
 */
global.TD = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'td'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.rowspan
		//OPTIONAL: params.colspan

		var
		// rowspan
		rowspan,

		// colspan
		colspan;

		// init params.
		if (params !== undefined) {
			rowspan = params.rowspan;
			colspan = params.colspan;
		}

		if (rowspan !== undefined) {
			inner.setAttr({
				name : 'rowspan',
				value : rowspan
			});
		}

		if (colspan !== undefined) {
			inner.setAttr({
				name : 'colspan',
				value : colspan
			});
		}
	}
});
