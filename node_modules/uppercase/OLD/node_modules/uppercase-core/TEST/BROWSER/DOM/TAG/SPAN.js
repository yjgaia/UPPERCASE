TEST('SPAN', (check) => {

	let div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c :

		// test span
		SPAN({
			style : {
				backgroundColor : 'blue'
			},
			c : 'This is test span.'
		})
	}).appendTo(BODY);
});
