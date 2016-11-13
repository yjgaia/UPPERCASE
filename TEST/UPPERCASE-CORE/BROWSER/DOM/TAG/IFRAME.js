TEST('IFRAME', function(ok) {
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

		// iframe
		IFRAME({
			style : {
			width : 560,
				height : 315
			},
			src : 'https://www.youtube.com/embed/0E00Zuayv9Q'
		})
	}).appendTo(BODY);

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
