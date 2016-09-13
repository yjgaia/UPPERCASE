UADMIN.Layout = CLASS(function(cls) {
	'use strict';

	var
	// toolbar
	toolbar,
	
	// content
	content,
	
	// get toolbar.
	getToolbar,
	
	// get content.
	getContent;

	cls.getToolbar = getToolbar = function() {
		return toolbar;
	};
	
	cls.getContent = getContent = function() {
		return content;
	};

	return {

		preset : function() {
			return VIEW;
		},

		init : function(inner, self) {

			var
			// menu layout
			menuLayout = Yogurt.MenuLayout({
				
				toolbar : toolbar = Yogurt.Toolbar({

					// left
					left : Yogurt.ToolbarButton({
						style : {
							onDisplayResize : function(width, height) {
	
								if (width > Yogurt.MenuLayout.getHideMenuWinWidth()) {
									return {
										display : 'none'
									};
								} else {
									return {
										display : 'block'
									};
								}
							}
						},
						img : IMG({
							src : '/BOX/Yogurt/R/menu.png'
						}),
						on : {
							tap : function(e) {
								menuLayout.toggleLeftMenu();
							}
						}
					}),
	
					// title
					title : 'UADMIN'
				}),
				
				leftMenu : DIV({
					c : RUN(function() {
						
						var
						// c
						c = [UUI.BUTTON_H({
							style : {
								padding : 15,
								borderBottom : '1px solid #666'
							},
							title : 'Home',
							on : {
								tap : function() {
									UADMIN.GO('');
								}
							}
						})];
						
						EACH(UADMIN.MODEL_NAME_MAP, function(modelNames, boxName) {
							EACH(modelNames, function(modelName) {
								
								c.push(UUI.BUTTON_H({
									style : {
										padding : 15,
										borderBottom : '1px solid #666'
									},
									title : boxName + ' / ' + modelName + ' Model',
									on : {
										tap : function() {
											UADMIN.GO(boxName + '/' + modelName);
										}
									}
								}));
							});
						});
						
						c.push(UUI.BUTTON_H({
							style : {
								padding : 15,
								borderBottom : '1px solid #666'
							},
							title : 'SHARED_STORE',
							href : '/__SHARED_STORE_STORAGES',
							target : '_blank'
						}));
						
						c.push(UUI.BUTTON_H({
							style : {
								padding : 15,
								borderBottom : '1px solid #666'
							},
							title : 'SHARED_DB',
							href : '/__SHARED_DB_STORAGES',
							target : '_blank'
						}));
						
						c.push(UUI.BUTTON_H({
							style : {
								padding : 15
							},
							title : 'Logout',
							on : {
								tap : function() {
									GET('__LOGOUT', function() {
										location.reload();
									});
								}
							}
						}));
						
						return c;
					})
				}),
				
				c : [content = DIV()]
				
			}).appendTo(BODY);
			
			inner.on('close', function() {
				
				menuLayout.remove();
				
				content = undefined;
			});
		}
	};
});
 