TEST('UL', function(ok) {
	'use strict';

	var
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

		// list
		UL({
			style : {
				listStyle : 'circle'
			},
			c : [LI({
				c : 'Seoul'
			}), LI({
				c : 'Busan'
			}), LI({
				c : 'Jeju'
			})]
		})
	}).appendTo(BODY);

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
