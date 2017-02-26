TEST('CANVAS', (check) => {
	
	let canvas;
	let div = DIV({
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
	
	/*let context = canvas.getContext('2d');

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
	context.stroke();*/
	
	let gl = canvas.getContext('webgl');
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
});
