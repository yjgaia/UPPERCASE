TEST('SPAN', function(ok) {
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

		// test span
		SPAN({
			style : {
				backgroundColor : 'blue'
			},
			c : 'This is test span.'
		})
	}).appendTo(BODY);

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
