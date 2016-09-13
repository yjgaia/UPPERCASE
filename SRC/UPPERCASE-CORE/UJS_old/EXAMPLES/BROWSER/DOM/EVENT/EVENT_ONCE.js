TEST('EVENT_ONCE', function(ok) {
	'use strict';

	var
	// div
	div = DIV({
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
	}, function(e, div) {

		console.log('tap:', e.getLeft(), e.getTop());

		// remove div after 1 second.
		DELAY(1, function() {
			div.remove();
		});
	});

	// touchstart event
	EVENT_ONCE({
		node : div,
		name : 'touchstart'
	}, function(e) {
		console.log('touchstart:', e.getLeft(), e.getTop());
	});

	// touchmove event
	EVENT_ONCE({
		node : div,
		name : 'touchmove'
	}, function(e) {

		console.log('touchmove:', e.getLeft(), e.getTop());

		// stop bubbling and browser default behavior.
		e.stop();
	});

	// touchend event
	EVENT_ONCE({
		node : div,
		name : 'touchend'
	}, function(e) {
		console.log('touchend:', e.getLeft(), e.getTop());
	});

	// mouseover event
	EVENT_ONCE({
		node : div,
		name : 'mouseover'
	}, function(e) {
		console.log('mouseover:', e.getLeft(), e.getTop());
	});

	// mouseout event
	EVENT_ONCE({
		node : div,
		name : 'mouseout'
	}, function(e) {
		console.log('mouseout:', e.getLeft(), e.getTop());
	});
});
