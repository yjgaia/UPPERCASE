TEST('CONTEXT', function(ok) {
	'use strict';

	/**
	 * IE6 ~ IE8 need Flash Player.
	 */

	var
	// canvas
	canvas,

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

		// canvas
		canvas = CANVAS({
			width : 300,
			height : 200,
			style : {
				border : '1px solid #999'
			}
		})
	}).appendTo(BODY);

	// load image.
	EVENT({
		node : IMG({
			src : '/LOGO.png'
		}),
		name : 'load'
	}, function(e, img) {

		// when loaded image, draw image to canvas.
		canvas.getContext().drawImg({
			img : img,
			left : 20,
			top : 10,
			clipLeft : 60,
			clipTop : 10,
			clipWidth : 150,
			clipHeight : 50,
			width : 200,
			height : 120
		});
	});

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
