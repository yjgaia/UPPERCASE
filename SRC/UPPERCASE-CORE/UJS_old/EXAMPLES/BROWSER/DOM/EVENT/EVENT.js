TEST('EVENT', function(ok) {
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
			padding : 10,
			display : 'none'
		},
		c : SPAN({
			c : 'Tap(click) or Touch this!',
			on : {
				show : function() {
					console.log('child showed!');
				}
			}
		})
	});

	// remove event
	EVENT({
		node : div,
		name : 'attach'
	}, function(e) {
		console.log('attached!');
	});

	// show event
	EVENT({
		node : div,
		name : 'show'
	}, function(e) {
		console.log('showed!');
	});

	div.appendTo(BODY);
	div.show();

	// tap event
	EVENT({
		node : div,
		name : 'tap'
	}, function(e, div) {

		console.log('tap:', e.getLeft(), e.getTop());

		EVENT.removeAll({
			node : div,
			name : 'touchmove'
		});

		// remove div after 1 second.
		DELAY(1, function() {
			div.remove();
		});
	});

	// touchstart event
	EVENT({
		node : div,
		name : 'touchstart'
	}, function(e) {
		console.log('touchstart:', e.getLeft(), e.getTop());
	});

	// touchmove event
	EVENT({
		node : div,
		name : 'touchmove'
	}, function(e) {

		console.log('touchmove:', e.getLeft(), e.getTop());

		// stop bubbling and browser default behavior.
		e.stop();
	});

	// touchend event
	EVENT({
		node : div,
		name : 'touchend'
	}, function(e) {
		console.log('touchend:', e.getLeft(), e.getTop());
	});

	// mouseover event
	EVENT({
		node : div,
		name : 'mouseover'
	}, function(e) {
		console.log('mouseover:', e.getLeft(), e.getTop());
	});

	// mouseout event
	EVENT({
		node : div,
		name : 'mouseout'
	}, function(e) {
		console.log('mouseout:', e.getLeft(), e.getTop());
	});

	// mouseout event
	EVENT({
		node : div,
		name : 'mouseout'
	}, function(e) {
		console.log('mouseout:', e.getLeft(), e.getTop());
	});

	// remove event
	EVENT({
		node : div,
		name : 'remove'
	}, function(e) {
		console.log('removed!');
	});
});
