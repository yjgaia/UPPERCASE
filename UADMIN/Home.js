UADMIN.Home = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// wrapper
		wrapper = DIV().appendTo(UADMIN.Layout.getContent());
		
		UADMIN.Layout.getToolbar().setTitle('UADMIN');
		
		EACH(UADMIN.MODEL_NAME_MAP, function(modelNames, boxName) {
			
			var
			// box wrapper
			boxWrapper = DIV({
				c : H2({
					style : {
						marginTop : 10,
						marginLeft : 10,
						fontWeight : 'bold'
					},
					c : boxName + ' BOX'
				})
			}).appendTo(wrapper);
			
			EACH(modelNames, function(modelName) {
				
				var
				// list
				list;
				
				DIV({
					style : {
						flt : 'left',
						border : '1px solid #666',
						backgroundColor : '#fff',
						color : '#000',
						marginTop : 10,
						marginLeft : 10
					},
					c : [H3({
						style : {
							padding : 10,
							backgroundColor : '#ccc',
							fontWeight : 'bold',
							cursor : 'pointer'
						},
						c : modelName + ' Model',
						on : {
							tap : function() {
								UADMIN.GO(boxName + '/' + modelName);
							}
						}
					}), list = UUI.LIST()]
				}).appendTo(boxWrapper);
				
				GET({
					uri : '__/' + boxName + '/' + modelName + '/find',
					data : {
						count : 5
					}
				}, function(resultStr) {
				
					var
					// result
					result = PARSE_STR(resultStr);
					
					EACH(result.savedDataSet, function(savedData) {
						
						list.addItem({
							key : savedData.id,
							item : LI({
								style : {
									borderTop : '1px solid #999',
									padding : 10,
									cursor : 'pointer'
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
			
			boxWrapper.append(CLEAR_BOTH());
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
