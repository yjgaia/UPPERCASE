TEST('EXPORT_IMG_DATA', function(ok) {
	'use strict';

	/**
	 * IE6 ~ IE8 need Flash Player.
	 */

	var
	// img
	img,

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

		// img
		img = IMG({
			src : '/EXAMPLES/test.png'
		})
	}).appendTo(BODY);

	// export img data.
	EXPORT_IMG_DATA(img, function(imgData) {
		console.log(imgData);
	});

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
