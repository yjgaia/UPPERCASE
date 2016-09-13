UADMIN.List = CLASS({

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
			
			// page
			page = params.page,
			
			// filter
			filter = params.filter === undefined ? {} : PARSE_STR(params.filter.replace(/@!/g, '/')),
			
			// list
			list,
			
			// page numbers
			pageNumbers,
			
			// search form
			searchForm;
			
			if (loadingPanel !== undefined) {
				loadingPanel = UADMIN.LoadingPanel();
			}
			
			if (page === undefined) {
				page = 1;
			}
			
			wrapper.empty();
			
			wrapper.append(UUI.BUTTON({
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
			
			wrapper.append(list = UUI.LIST({
				style : {
					backgroundColor : '#fff'
				}
			}));
			
			wrapper.append(pageNumbers = DIV({
				style : {
					flt : 'left'
				}
			}));
			wrapper.append(searchForm = FORM({
				style : {
					flt : 'right',
					width : 300,
					padding : 10
				},
				c : [UUI.FULL_INPUT({
					style : {
						border : '1px solid #ccc'
					},
					name : 'id',
					placeholder : 'id'
				})],
				on : {
					submit : function(e, form) {
						UADMIN.GO(boxName + '/' + modelName + '/p/1/' + STRINGIFY(form.getData()).replace(/\//g, '@!'));
					}
				}
			}));
			wrapper.append(CLEAR_BOTH());
			
			UADMIN.Layout.getToolbar().setTitle(modelName + ' Model');
			
			GET({
				uri : '__/' + boxName + '/' + modelName + '/find',
				data : {
					filter : filter,
					count : 10,
					start : (page - 1) * 10
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
				
				if (loadingPanel !== undefined) {
					loadingPanel.remove();
					loadingPanel = undefined;
				}
			});
			
			GET({
				uri : '__/' + boxName + '/' + modelName + '/count'
			}, function(resultStr) {
				
				var
				// result
				result = PARSE_STR(resultStr),
				
				// count
				count = result.count,
				
				// last page
				lastPage = Math.ceil(count / 10),
				
				// first page
				firstPage = Math.ceil(page / 10);
				
				if (firstPage < lastPage) {
				
					REPEAT({
						start : firstPage,
						end : firstPage + 9 > lastPage ? lastPage : firstPage + 9
					}, function(i) {
						pageNumbers.append(A({
							style : {
								flt : 'left',
								padding : 10,
								paddingRight : 5
							},
							c : i,
							on : {
								tap : function() {
									UADMIN.GO(boxName + '/' + modelName + '/p/' + i + '/' + STRINGIFY(filter).replace(/\//g, '@!'));
								}
							}
						}));
					});
				}
				
				pageNumbers.append(CLEAR_BOTH());
			});
			
			GET('__/' + boxName + '/' + modelName + '/__GET_VALID_DATA_SET', function(validDataSetStr) {
				
				var
				// valid data set
				validDataSet,
				
				// select time.
				selectTime = function(e, input) {
					
					var
					// selected cal
					selectedCal = CALENDAR(input.getValue() === '' ? new Date() : new Date(input.getValue())),
					
					// modal
					modal = UUI.MODAL({
						xImg : IMG({
							src : '/BOX/UUI/R/x.png'
						}),
						style : {
							width : 280
						},
						c : FORM({
							c : [Yogurt.Calendar({
								year : selectedCal.getYear(),
								month : selectedCal.getMonth(),
								date : selectedCal.getDate(),
								leftArrowImg : IMG({
									src : '/BOX/Yogurt/R/cal/left.png'
								}),
								rightArrowImg : IMG({
									src : '/BOX/Yogurt/R/cal/right.png'
								})
							}, function(cal) {
								selectedCal = cal;
							}), UUI.FULL_INPUT({
								name : 'hour',
								placeholder : 'HOUR',
								value : input.getValue() === '' ? undefined : selectedCal.getHour()
							}), UUI.FULL_INPUT({
								name : 'minute',
								placeholder : 'MINUTE',
								value : input.getValue() === '' ? undefined : selectedCal.getMinute()
							}), UUI.FULL_SUBMIT({
								value : 'SELECT'
							})],
							on : {
								submit : function(e, form) {
									
									var
									// data
									data = form.getData();
									
									if (selectedCal !== undefined) {
										
										input.setValue(CREATE_DATE({
											year : selectedCal.getYear(),
											month : selectedCal.getMonth(),
											date : selectedCal.getDate(),
											hour : data.hour,
											minute : data.minute
										}));
										
										modal.close();
									}
								}
							}
						})
					});
				};
				
				if (validDataSetStr !== '') {
					
					validDataSet = PARSE_STR(validDataSetStr);
					
					EACH(validDataSet, function(validData, name) {
						
						var
						// select
						select;
						
						if (name !== 'id') {
							
							if (validData.bool === true) {
								
								searchForm.append(UUI.FULL_CHECKBOX({
									style : {
										marginTop : 10
									},
									name : name,
									label : name
								}));
								
							} else if (validData.integer === true || validData.real === true) {
								
								searchForm.append(UUI.FULL_INPUT({
									style : {
										marginTop : 10,
										border : '1px solid #ccc'
									},
									name : name + '$start',
									placeholder : name + ' START'
								}));
								
								searchForm.append(UUI.FULL_INPUT({
									style : {
										border : '1px solid #ccc',
										borderTop : 'none'
									},
									name : name + '$end',
									placeholder : name + ' END'
								}));
								
							} else if (validData.date === true) {
								
								searchForm.append(UUI.FULL_INPUT({
									style : {
										marginTop : 10,
										border : '1px solid #ccc'
									},
									name : name + '$start',
									placeholder : name + ' START',
									on : {
										tap : selectTime
									}
								}));
								
								searchForm.append(UUI.FULL_INPUT({
									style : {
										border : '1px solid #ccc',
										borderTop : 'none'
									},
									name : name + '$end',
									placeholder : name + ' END',
									on : {
										tap : selectTime
									}
								}));
								
							} else if (validData.one !== undefined) {
								
								searchForm.append(select = UUI.FULL_SELECT({
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
							
								searchForm.append(UUI.FULL_INPUT({
									style : {
										marginTop : 10,
										border : '1px solid #ccc'
									},
									name : name,
									placeholder : name
								}));
							}
						}
					});
					
					searchForm.append(UUI.FULL_INPUT({
						style : {
							marginTop : 10,
							border : '1px solid #ccc'
						},
						name : 'createTime$start',
						placeholder : 'createTime START',
						on : {
							tap : selectTime
						}
					}));
					
					searchForm.append(UUI.FULL_INPUT({
						style : {
							border : '1px solid #ccc',
							borderTop : 'none'
						},
						name : 'createTime$end',
						placeholder : 'createTime END',
						on : {
							tap : selectTime
						}
					}));
					
					searchForm.append(UUI.FULL_INPUT({
						style : {
							marginTop : 10,
							border : '1px solid #ccc'
						},
						name : 'lastUpdateTime$start',
						placeholder : 'lastUpdateTime START',
						on : {
							tap : selectTime
						}
					}));
					
					searchForm.append(UUI.FULL_INPUT({
						style : {
							border : '1px solid #ccc',
							borderTop : 'none'
						},
						name : 'lastUpdateTime$end',
						placeholder : 'lastUpdateTime END',
						on : {
							tap : selectTime
						}
					}));
				}
				
				searchForm.append(UUI.FULL_SUBMIT({
					style : {
						marginTop : 10,
						fontWeight : 'bold',
						backgroundColor : '#ccc'
					},
					title : name,
					value : 'SEARCH'
				}));
				
				searchForm.setData(filter);
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
