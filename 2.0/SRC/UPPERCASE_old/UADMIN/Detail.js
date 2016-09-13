UADMIN.Detail = CLASS({

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
		wrapper = DIV().appendTo(UADMIN.Layout.getContent());

		inner.on('paramsChange', function(params) {
			
			var
			// box name
			boxName = params.boxName,
			
			// model name
			modelName = params.modelName,
			
			// id
			id = params.id;
			
			if (loadingPanel === undefined) {
				loadingPanel = UADMIN.LoadingPanel();
			}
			
			wrapper.empty();
			
			wrapper.append(UUI.BUTTON({
				style : {
					padding : 10,
					flt : 'left'
				},
				title : 'UPDATE DATA',
				on : {
					tap : function() {
						UADMIN.GO(boxName + '/' + modelName + '/' + id + '/f/update');
					}
				}
			}));
			
			wrapper.append(UUI.BUTTON({
				style : {
					padding : 10,
					flt : 'right'
				},
				title : 'REMOVE DATA',
				on : {
					tap : function() {
						if (confirm('REALLY?') === true) {
							
							GET({
								uri : '__/' + boxName + '/' + modelName + '/remove',
								data : id
							}, function(resultStr) {
								
								var
								// result
								result = PARSE_STR(resultStr);
								
								if (result.originData !== undefined) {
									UADMIN.GO(boxName + '/' + modelName);
								}
							});
						}
					}
				}
			}));
			
			wrapper.append(CLEAR_BOTH());
			
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
						backgroundColor : '#fff',
						whiteSpace : 'pre',
						padding : 20,
						color : '#000'
					},
					c : RUN(function() {
						
						var
						// children
						c = [DIV({
							c : [SPAN({
								style : {
									fontWeight : 'bold'
								},
								c : 'id'
							}), ' : ', result.savedData.id]
						})];
						
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
				
				if (loadingPanel !== undefined) {
					loadingPanel.remove();
					loadingPanel = undefined;
				}
			});
		});

		inner.on('close', function() {
			if (loadingPanel !== undefined) {
				loadingPanel.remove();
			}
			wrapper.remove();
		});
	}
});
