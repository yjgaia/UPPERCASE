UDB.List = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';
		
		var
		// list
		list,
		
		// wrapper
		wrapper = DIV({
			c : list = UUI.LIST({
				style : {
					backgroundColor : '#fff'
				}
			})
		}).appendTo(UDB.Layout.getContent());

		inner.on('paramsChange', function(params) {
			
			var
			// box name
			boxName = params.boxName,
			
			// model name
			modelName = params.modelName;
			
			list.removeAllItems();
			
			UDB.Layout.getToolbar().setTitle(modelName + ' Model');
			
			GET({
				uri : '__/' + boxName + '/' + modelName + '/find',
				data : {
					count : 10
				}
			}, function(savedDataSetStr) {
				
				var
				// saved data set
				savedDataSet = PARSE_STR(savedDataSetStr);
				
				EACH(savedDataSet, function(savedData) {
					
					list.addItem({
						key : savedData.id,
						item : LI({
							style : {
								borderTop : '1px solid #999',
								padding : 10,
								cursor : 'pointer',
								color : '#000'
							},
							c : savedData.id,
							on : {
								tap : function() {
									UDB.GO(boxName + '/' + modelName + '/' + savedData.id);
								}
							}
						})
					});
				});
			});
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
