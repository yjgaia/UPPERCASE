TEST('KEYFRAMES', function(ok) {
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

		// keyframes
		// bounce bounce!
		keyframes : KEYFRAMES({
			from : {
				marginLeft : 0,
				marginTop : 0
			},
			'50%' : {
				marginLeft : 100,
				marginTop : 100
			},
			to : {
				marginLeft : 0,
				marginTop : 0
			}
		}),

		duration : 3

	}, function() {

		console.log('done!');

		// remove div.
		animatingDiv.remove();
	});
});
