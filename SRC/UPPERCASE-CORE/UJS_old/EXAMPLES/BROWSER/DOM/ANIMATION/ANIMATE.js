TEST('ANIMATE', function(ok) {
	'use strict';

	var
	// animating div
	animatingDiv = DIV({
		style : {
			position : 'fixed',
			left : 50,
			top : 50,
			width : 100,
			height : 100,
			backgroundColor : 'red',
			padding : 10
		},
		c : 'Animating div.'
	}).appendTo(BODY);

	// animate.
	ANIMATE({
		node : animatingDiv,
		keyframes : KEYFRAMES({
			from : {
				transform : 'rotate(0deg)'
			},
			to : {
				transform : 'rotate(360deg)'
			}
		}),
		duration : 3,
		timingFunction : 'linear'

	}, function() {

		console.log('done!');

		// remove div.
		animatingDiv.remove();
	});
});
