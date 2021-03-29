TEST('DIV', (check) => {

	let div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c : 'This is test div.'
	}).appendTo(BODY);
});
