UADMIN.SHARED_DB = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// laoding panel
		loadingPanel,
		
		// wrapper
		wrapper = DIV({
			style : {
				backgroundColor : '#fff',
				color : '#000',
				padding : 10
			}
		}).appendTo(UADMIN.Layout.getContent());
		
		UADMIN.Layout.getToolbar().setTitle('SHARED_DB');
		
		loadingPanel = UADMIN.LoadingPanel();
		
		GET('__ALL_SHARED_DB_STORAGES', function(resultStr) {
		
			var
			// result
			result = PARSE_STR(resultStr);
			
			EACH(result, function(storages, workerId) {
				wrapper.append(DIV({
					c : [H3({
						c : workerId
					}), DOM({
						tag : 'pre',
						c : JSON.stringify(storages, undefined, '\t')
					})]
				}));
			});
			
			if (loadingPanel !== undefined) {
				loadingPanel.remove();
				loadingPanel = undefined;
			}
		});

		inner.on('close', function() {
			if (loadingPanel !== undefined) {
				loadingPanel.remove();
			}
			wrapper.remove();
		});
	}
});
