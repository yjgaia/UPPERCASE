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
			// wrapper
			wrapper = Yogurt.MenuLayout({
				
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
						
						EACH(UDB.MODEL_NAMES, function(modelName) {
							c.push(UUI.BUTTON_H({
								style : {
									padding : 15,
									borderBottom : '1px solid #666',
									fontSize : 15
								},
								title : modelName + ' Model',
								on : {
									tap : function() {
										UDB.GO(modelName);
									}
								}
							}));
						});
						
						return c;
					})
				}),
				
				c : [content = DIV()]
				
			}).appendTo(BODY);
			
			inner.on('close', function() {
				
				wrapper.remove();
				
				content = undefined;
			});
		}
	};
});
 