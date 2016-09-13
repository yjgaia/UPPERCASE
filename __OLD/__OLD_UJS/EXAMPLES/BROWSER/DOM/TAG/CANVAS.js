TEST('CANVAS', function(ok) {
	'use strict';

	/**
	 * IE6 ~ IE8 need Flash Player.
	 */

	var
	// canvas
	canvas,

	// context (this is not UJS's CONTEXT, but native HTML5 canvas context.)
	ctx,

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
		c : canvas = CANVAS({
			width : 300,
			height : 200,
			style : {
				border : '1px solid #999'
			}
		})
	}).appendTo(BODY);

	ctx = canvas.getEl().getContext('2d');

	// draw circle.
	ctx.strokeStyle = '#ffffff';
	ctx.beginPath();
	ctx.arc(95, 50, 40, 0, 2 * Math.PI, true);
	ctx.stroke();

	// draw line.
	ctx.beginPath();
	ctx.moveTo(100, 140);
	ctx.lineTo(250, 20);
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#00ff00';
	ctx.stroke();

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
