TEST('A', (check) => {

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

		// link
		A({
			href : 'http://www.btncafe.com',
			target : '_blank',
			c : 'http://www.btncafe.com'
		})
	}).appendTo(BODY);
});
