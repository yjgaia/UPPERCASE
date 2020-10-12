TEST('EVENT_ONCE', (check) => {

	let div = DIV({
		style : {
			position : 'fixed',
			left : 50,
			top : 50,
			width : 100,
			height : 100,
			backgroundColor : 'red',
			padding : 10
		},
		c : 'Tap(click) or Touch this!'
	}).appendTo(BODY);

	// tap event
	EVENT_ONCE({
		node : div,
		name : 'tap'
	}, (e, div) => {
		console.log('tap:', e.getLeft(), e.getTop());
	});

	// touchstart event
	EVENT_ONCE({
		node : div,
		name : 'touchstart'
	}, (e) => {
		console.log('touchstart:', e.getLeft(), e.getTop());
	});

	// touchmove event
	EVENT_ONCE({
		node : div,
		name : 'touchmove'
	}, (e) => {

		console.log('touchmove:', e.getLeft(), e.getTop());

		// stop bubbling and browser default behavior.
		e.stop();
	});

	// touchend event
	EVENT_ONCE({
		node : div,
		name : 'touchend'
	}, (e) => {
		console.log('touchend:', e.getLeft(), e.getTop());
	});

	// mouseover event
	EVENT_ONCE({
		node : div,
		name : 'mouseover'
	}, (e) => {
		console.log('mouseover:', e.getLeft(), e.getTop());
	});

	// mouseout event
	EVENT_ONCE({
		node : div,
		name : 'mouseout'
	}, (e) => {
		console.log('mouseout:', e.getLeft(), e.getTop());
	});
});
