TEST('UL', (check) => {

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

		// list
		UL({
			style : {
				listStyle : 'circle'
			},
			c : [LI({
				c : 'Seoul'
			}), LI({
				c : 'Busan'
			}), LI({
				c : 'Jeju'
			})]
		})
	}).appendTo(BODY);
});
