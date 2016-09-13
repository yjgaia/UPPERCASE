TEST('E', function(ok) {
	'use strict';

	var
	// input
	input,

	// div
	div = DIV({
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
	}, function(e) {

		// get event position.
		console.log('tap:', e.getLeft(), e.getTop());

		div.remove();
	});

	// tap event (stop bubbling.)
	EVENT({
		node : input,
		name : 'tap'
	}, function(e) {

		// stop bubbling.
		e.stopBubbling();
	});

	// keydown event 1
	EVENT({
		node : input,
		name : 'keydown'
	}, function(e) {

		// stop browser default behavior.
		e.stopDefault();
	});

	// keydown event 2
	EVENT({
		node : input,
		name : 'keydown'
	}, function(e) {

		// e.stop() = e.stopBubbling() + e.stopDefault()
		e.stop();
	});

	// keydown event 3
	EVENT({
		node : input,
		name : 'keydown'
	}, function(e) {

		// get key code.
		console.log('Key Code:', e.getKeyCode());
	});
}); 