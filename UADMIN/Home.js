UADMIN.Home = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// get system info interval
		getSystemInfoInterval,
		
		// laoding panel
		loadingPanel,
		
		// cpu panel
		cpuPanel,
		
		// memory panel
		memoryPanel,
		
		// pid panel
		pidPanel,
		
		// wrapper
		wrapper = DIV({
			c : [
			// system info panel
			DIV({
				style : {
					margin : 10,
					backgroundColor : '#fff',
					color : '#000',
					border : '1px solid #666'
				},
				c : [H3({
					style : {
						padding : 10,
						backgroundColor : '#ccc',
						fontWeight : 'bold'
					},
					c : 'SYSTEM INFO'
				}), DIV({
					style : {
						padding : 10,
						backgroundColor : '#fff',
						color : '#000',
						borderTop : '1px solid #666'
					},
					c : [TABLE({
						c : [cpuPanel = DIV(), memoryPanel = DIV({
							style : {
								marginTop : 10
							}
						}), pidPanel = DIV({
							style : {
								marginTop : 10
							}
						})]
					})]
				})]
			})]
		}).appendTo(UADMIN.Layout.getContent());
		
		UADMIN.Layout.getToolbar().setTitle('UADMIN');
		
		EACH(UADMIN.MODEL_NAME_MAP, function(modelNames, boxName) {
			
			var
			// box wrapper
			boxWrapper = DIV({
				style : {
					paddingRight : 10,
					paddingBottom : 10
				},
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
				
				if (loadingPanel !== undefined) {
					loadingPanel = UADMIN.LoadingPanel();
				}
				
				DIV({
					style : {
						width : 235,
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
					
					if (loadingPanel !== undefined) {
						loadingPanel.remove();
						loadingPanel = undefined;
					}
				});
			});
			
			boxWrapper.append(CLEAR_BOTH());
		});
		
		getSystemInfoInterval = INTERVAL(1, RAR(function() {
			
			GET('__SYSTEM_INFO', function(systemInfoStr) {
				
				var
				// system info
				systemInfo = PARSE_STR(systemInfoStr);
				
				cpuPanel.empty();
				EACH(systemInfo.cpus, function(cpuUsage, i) {
					cpuPanel.append('CPU #' + (i + 1) + ': ' + cpuUsage.toFixed(1) + '%\n');
				});
				
				memoryPanel.empty();
				memoryPanel.append('MEMORY: ' + systemInfo.memory.toFixed(1) + '%');
				
				pidPanel.empty();
				pidPanel.append('NOW WORKER ' + systemInfo.workerId + '\'s PID: ' + systemInfo.pid);
			});
		}));

		inner.on('close', function() {
			getSystemInfoInterval.remove();
			if (loadingPanel !== undefined) {
				loadingPanel.remove();
			}
			wrapper.remove();
		});
	}
});
