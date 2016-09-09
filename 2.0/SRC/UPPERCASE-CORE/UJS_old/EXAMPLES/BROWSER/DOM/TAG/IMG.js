TEST('IMG', function(ok) {
	'use strict';

	var
	// img
	img = IMG({
		style : {
			width : 300,
			position : 'fixed',
			left : 40,
			top : 40
		},
		src : '/EXAMPLES/test.png'
	}).appendTo(BODY);

	// remove img after 3 seconds.
	DELAY(3, function() {
		img.remove();
	});
});
