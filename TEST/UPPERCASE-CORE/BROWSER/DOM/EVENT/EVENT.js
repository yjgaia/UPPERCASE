TEST('EVENT', (check) => {

	let div = DIV({
		style : {
			position : 'fixed',
			left : 50,
			top : 50,
			width : 100,
			height : 100,
			backgroundColor : 'red',
			padding : 10,
			display : 'none'
		},
		c : SPAN({
			c : 'Tap(click) or Touch this!',
			on : {
				show : () => {
					console.log('child showed!');
				}
			}
		})
	});

	// remove event
	EVENT({
		node : div,
		name : 'attach'
	}, (e) => {
		console.log('attached!');
	});

	// show event
	EVENT({
		node : div,
		name : 'show'
	}, (e) => {
		console.log('showed!');
	});

	div.appendTo(BODY);
	div.show();

	// tap event
	EVENT({
		node : div,
		name : 'tap'
	}, (e, div) => {

		console.log('tap:', e.getLeft(), e.getTop());

		EVENT.removeAll({
			node : div,
			name : 'touchmove'
		});
	});

	// touchstart event
	EVENT({
		node : div,
		name : 'touchstart'
	}, (e) => {
		console.log('touchstart:', e.getLeft(), e.getTop());
	});

	// touchmove event
	EVENT({
		node : div,
		name : 'touchmove'
	}, (e) => {

		console.log('touchmove:', e.getLeft(), e.getTop());

		// stop bubbling and browser default behavior.
		e.stop();
	});

	// touchend event
	EVENT({
		node : div,
		name : 'touchend'
	}, (e) => {
		console.log('touchend:', e.getLeft(), e.getTop());
	});

	// mouseover event
	EVENT({
		node : div,
		name : 'mouseover'
	}, (e) => {
		console.log('mouseover:', e.getLeft(), e.getTop());
	});

	// mouseout event
	EVENT({
		node : div,
		name : 'mouseout'
	}, (e) => {
		console.log('mouseout:', e.getLeft(), e.getTop());
	});

	// mouseout event
	EVENT({
		node : div,
		name : 'mouseout'
	}, (e) => {
		console.log('mouseout:', e.getLeft(), e.getTop());
	});

	// remove event
	EVENT({
		node : div,
		name : 'remove'
	}, (e) => {
		console.log('removed!');
	});
});
