TEST('FILE_ALL', function(ok) {
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
		c : 'Mouseover!'
	}).appendTo(BODY);

	// tap event
	EVENT({
		node : div,
		name : 'tap'
	}, function(e, div) {

		console.log('tapped!');

		// remove div.
		div.remove();
	});

	// mouseover event
	EVENT({
		node : div,
		name : 'mouseover'
	}, function(e) {

		// fire tap event.
		EVENT.fireAll({
			node : div,
			name : 'tap'
		});
	});
});
