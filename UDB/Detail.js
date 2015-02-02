UDB.Detail = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';
		
		var
		// wrapper
		wrapper = DIV().appendTo(UDB.Layout.getContent());

		inner.on('paramsChange', function(params) {
			
			var
			// model name
			modelName = params.modelName;
			
			wrapper.append(modelName);
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
