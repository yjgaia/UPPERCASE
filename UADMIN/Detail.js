UADMIN.Detail = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';
		
		var
		// wrapper
		wrapper = DIV({
			style : {
				backgroundColor : '#fff'
			}
		}).appendTo(UADMIN.Layout.getContent());

		inner.on('paramsChange', function(params) {
			
			var
			// box name
			boxName = params.boxName,
			
			// model name
			modelName = params.modelName,
			
			// id
			id = params.id;
			
			wrapper.empty();
			
			GET({
				uri : '__/' + boxName + '/' + modelName + '/get',
				data : id
			}, function(resultStr) {
				
				var
				// result
				result = PARSE_STR(resultStr);
				
				UADMIN.Layout.getToolbar().setTitle(result.savedData.id);
				
				wrapper.append(P({
					style : {
						whiteSpace : 'pre',
						padding : 20,
						color : '#000'
					},
					c : RUN(function() {
						
						var
						// children
						c = [];
						
						EACH(result.savedData, function(value, name) {
							
							if (name !== 'id') {
							
								c.push(DIV({
									c : [SPAN({
										style : {
											fontWeight : 'bold'
										},
										c : name
									}), ' : ', JSON.stringify(value, TO_DELETE, 4)]
								}));
							}
						});
						
						return c;
					})
				}));
			});
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
