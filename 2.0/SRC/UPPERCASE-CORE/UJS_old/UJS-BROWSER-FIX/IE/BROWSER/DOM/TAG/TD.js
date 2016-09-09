OVERRIDE(TD, function(origin) {
	'use strict';

	/**
	 * Td class (fix for IE)
	 */
	global.TD = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			ADD_STYLE({
				node : self,
				style : {
					verticalAlign : 'middle'
				}
			});
		}
	});
});
