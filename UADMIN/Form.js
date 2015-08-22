UADMIN.Form = CLASS({

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
				padding : 20,
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
			id = params.id,
			
			// form
			form;
			
			wrapper.empty();
			
			if (id === undefined) {
				UADMIN.Layout.getToolbar().setTitle('New ' + modelName + ' Data');
			} else {
				UADMIN.Layout.getToolbar().setTitle('Update ' + modelName + ' Data');
			}
			
			GET('__/' + boxName + '/' + modelName + (id === undefined ? '/__GET_CREATE_VALID_DATA_SET' : '/__GET_UPDATE_VALID_DATA_SET'), function(validDataSetStr) {
				
				var
				// valid data set
				validDataSet,
				
				// error msgs
				errorMsgs;
				
				if (validDataSetStr === '') {
					
					if (id === undefined) {
						alert('CANNOT CREATE');
						history.back();
					} else {
						alert('CANNOT UPDATE');
						history.back();
					}
					
				} else {
					
					validDataSet = PARSE_STR(validDataSetStr);
					errorMsgs = {};
					
					EACH(validDataSet, function(validData, name) {
						errorMsgs[name] = {};
						EACH(validData, function(validParams, type) {
							errorMsgs[name][type] = type + ': ' + JSON.stringify(validParams);
						});
					});
				
					wrapper.append(form = UUI.VALID_FORM({
						errorMsgs : errorMsgs,
						errorMsgStyle : {
							padding : '5px 10px',
							backgroundColor : '#D83F25',
							color : '#fff'
						},
						on : {
							submit : function() {
								
								var
								// data
								data = form.getData();
								
								if (id !== undefined) {
									data.id = id;
								}
								
								GET({
									uri : '__/' + boxName + '/' + modelName + (id === undefined ? '/create' : '/update'),
									data : data
								}, function(resultStr) {
						
									var
									// result
									result = PARSE_STR(resultStr);
									
									if (result.validErrors !== undefined) {
										form.showErrors(result.validErrors);
									} else if (result.savedData !== undefined) {
										UADMIN.GO(boxName + '/' + modelName + '/' + result.savedData.id);
									}
								});
							}
						}
					}));
					
					EACH(validDataSet, function(validData, name) {
						
						var
						// select
						select;
						
						if (validData.bool === true) {
							
							form.append(UUI.FULL_CHECKBOX({
								style : {
									marginTop : 10,
									color : '#000'
								},
								name : name,
								label : name
							}));
							
						} else if (validData.one !== undefined) {
							
							form.append(select = UUI.FULL_SELECT({
								style : {
									marginTop : 10,
									border : '1px solid #ccc'
								},
								name : name
							}));
							
							if (validData.notEmpty !== true) {
								select.addOption(OPTION({
									c : 'undefined'
								}));
							}
							
							EACH(validData.one, function(value) {
								select.addOption(OPTION({
									value : value
								}));
							});
							
						} else {
						
							form.append(UUI.FULL_TEXTAREA({
								style : {
									marginTop : 10,
									border : '1px solid #ccc'
								},
								name : name,
								placeholder : name
							}));
						}
					});
					
					if (id !== undefined) {
					
						GET({
							uri : '__/' + boxName + '/' + modelName + '/get',
							data : id
						}, function(resultStr) {
							
							var
							// result
							result = PARSE_STR(resultStr);
							
							form.setData(result.savedData);
						});
					}
					
					form.append(UUI.FULL_SUBMIT({
						style : {
							marginTop : 10
						},
						title : name
					}));
				}
			});
		});
		
		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
