TEST('ANIMATE', (check) => {

	let animatingDiv = DIV({
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
	}).appendTo(BODY),
	
	// animating div2
	animatingDiv2 = DIV({
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
		keyframes : {
			from : {
				transform : 'rotate(0deg)'
			},
			to : {
				transform : 'rotate(360deg)'
			}
		},
		duration : 3,
		timingFunction : 'linear'

	}, () => {

		console.log('done!');

		// remove div.
		animatingDiv.remove();
	});
	
	// animate.
	ANIMATE({
		node : animatingDiv2,

		// keyframes
		// bounce bounce!
		keyframes : {
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
		},

		duration : 3

	}, () => {

		console.log('done!');

		// remove div2.
		animatingDiv2.remove();
	});
});
