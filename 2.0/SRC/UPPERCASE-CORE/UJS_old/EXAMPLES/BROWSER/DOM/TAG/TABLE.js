TEST('TABLE', function(ok) {
	'use strict';

	var
	// th style
	thStyle = {
		padding : 5,
		border : '1px solid #999',
		fontWeight : 'bold'
	},

	// td style
	tdStyle = {
		padding : 5,
		border : '1px solid #999'
	},

	// test div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c :

		// table
		TABLE({
			style : {
				backgroundColor : '#fff',
				color : '#000'
			},
			c : [TR({
				c : [TH({
					style : thStyle,
					c : 'Name'
				}), TD({
					style : tdStyle,
					c : 'SYJ'
				})]
			}), TR({
				c : [TH({
					style : thStyle,
					c : 'Gender'
				}), TD({
					style : tdStyle,
					c : 'Man'
				})]
			}), TR({
				c : [TH({
					style : thStyle,
					c : 'Age'
				}), TD({
					style : tdStyle,
					c : 27
				})]
			})]
		})
	}).appendTo(BODY);

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
