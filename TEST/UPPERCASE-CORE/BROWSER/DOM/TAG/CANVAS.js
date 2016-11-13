TEST('CANVAS', function(ok) {
	'use strict';
	
	var
	// canvas
	canvas,

	// context
	context,

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

	context = canvas.getContext('2d');

	// draw circle.
	context.strokeStyle = '#ffffff';
	context.beginPath();
	context.arc(95, 50, 40, 0, 2 * Math.PI, true);
	context.stroke();

	// draw line.
	context.beginPath();
	context.moveTo(100, 140);
	context.lineTo(250, 20);
	context.lineWidth = 10;
	context.strokeStyle = '#00ff00';
	context.stroke();

	// remove div after 3 seconds.
	DELAY(3, function() {
		div.remove();
	});
});
