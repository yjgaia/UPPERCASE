TEST('BR', function(ok) {
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

		// paragraph
		P({
			c : ['Hi!', BR(), 'This is', BR(), BR(), BR(), 'paragraph.']
		})
	}).appendTo(BODY);

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
