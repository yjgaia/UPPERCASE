UDB.Layout = CLASS(function(cls) {
	'use strict';

	var
	// content
	content,
	
	// get content.
	getContent;

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
				
				toolbar : Yogurt.Toolbar({

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
					title : 'UDB'
				}),
				
				leftMenu : DIV({
					c : RUN(function() {
						
						var
						// c
						c = [UUI.BUTTON_H({
							style : {
								padding : 15,
								borderBottom : '1px solid #666',
								fontSize : 15
							},
							title : 'Home',
							on : {
								tap : function() {
									UDB.GO('');
								}
							}
						})];
						
						EACH(UDB.MODEL_NAME_MAP, function(modelNames, boxName) {
							EACH(modelNames, function(modelName) {
								
								c.push(UUI.BUTTON_H({
									style : {
										padding : 15,
										borderBottom : '1px solid #666',
										fontSize : 15
									},
									title : boxName + ' / ' + modelName + ' Model',
									on : {
										tap : function() {
											UDB.GO(boxName + '/' + modelName);
										}
									}
								}));
							});
						});
						
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
 