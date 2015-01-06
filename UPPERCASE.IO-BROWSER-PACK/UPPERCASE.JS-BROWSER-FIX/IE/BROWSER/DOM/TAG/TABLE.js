OVERRIDE(TABLE, function(origin) {
	'use strict';

	/**
	 * Table class (fix for IE<=7)
	 */
	global.TABLE = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			var
			// tbody
			tbody = DOM({
				tag : 'tbody'
			});

			self.getWrapperEl().appendChild(tbody.getEl());

			inner.setContentDom(tbody);
		}
	});
});
