Sample.Home = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// div
		div = DIV({
			c : 'Hello, UPPERCASE!'
		}).appendTo(BODY);
		
		inner.on('close', function() {
			div.remove();
		});
	}
});
