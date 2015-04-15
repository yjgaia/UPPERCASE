UADMIN.List = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';
		
		var
		// wrapper
		wrapper = DIV().appendTo(UADMIN.Layout.getContent());

		inner.on('paramsChange', function(params) {
			
			var
			// box name
			boxName = params.boxName,
			
			// model name
			modelName = params.modelName,
			
			// list
			list;
			
			wrapper.empty();
			wrapper.append(list = UUI.LIST({
				style : {
					backgroundColor : '#fff'
				}
			}));
			
			UADMIN.Layout.getToolbar().setTitle(modelName + ' Model');
			
			GET({
				uri : '__/' + boxName + '/' + modelName + '/find',
				data : {
					count : 10
				}
			}, function(resultStr) {
				
				var
				// result
				result = PARSE_STR(resultStr);
				
				wrapper.prepend(UUI.BUTTON({
					style : {
						padding : '10px 0'
					},
					title : 'NEW DATA',
					on : {
						tap : function() {
							UADMIN.GO(boxName + '/' + modelName + '/f/new');
						}
					}
				}));
				
				EACH(result.savedDataSet, function(savedData) {
					
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
									UADMIN.GO(boxName + '/' + modelName + '/' + savedData.id);
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
