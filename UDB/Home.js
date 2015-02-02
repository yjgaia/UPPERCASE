UDB.Home = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// wrapper
		wrapper = DIV({
			c : 'test'
		}).appendTo(UDB.Layout.getContent());

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
