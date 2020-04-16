TEST('E', (check) => {

	let input;
	let div = DIV({
		style : {
			position : 'fixed',
			left : 50,
			top : 50,
			width : 100,
			height : 100,
			backgroundColor : 'red'
		},
		c : ['Tap(click) or Touch this!', input = INPUT()]
	}).appendTo(BODY);

	// tap event
	EVENT({
		node : div,
		name : 'tap'
	}, (e) => {

		// get event position.
		console.log('tap:', e.getLeft(), e.getTop());

		div.remove();
	});

	// tap event (stop bubbling.)
	EVENT({
		node : input,
		name : 'tap'
	}, (e) => {

		// stop bubbling.
		e.stopBubbling();
	});

	// keydown event 1
	EVENT({
		node : input,
		name : 'keydown'
	}, (e) => {

		// stop browser default behavior.
		e.stopDefault();
	});

	// keydown event 2
	EVENT({
		node : input,
		name : 'keydown'
	}, (e) => {

		// e.stop() = e.stopBubbling() + e.stopDefault()
		e.stop();
	});

	// keydown event 3
	EVENT({
		node : input,
		name : 'keydown'
	}, (e) => {

		// get key code.
		console.log('Key Code:', e.getKeyCode());
	});
}); 