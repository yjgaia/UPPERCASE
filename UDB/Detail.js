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
			// box name
			boxName = params.boxName,
			
			// model name
			modelName = params.modelName;
			
			wrapper.append(boxName + ' / ' + modelName);
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
