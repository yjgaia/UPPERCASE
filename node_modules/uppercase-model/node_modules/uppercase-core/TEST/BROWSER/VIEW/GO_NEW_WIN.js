TEST('GO_NEW_WIN', (check) => {

	let div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c : A({
			style : {
				textDecoration : 'underline'
			},
			c : 'open test view on new window.',
			on : {
				tap : () => {
					TestBox.GO_NEW_WIN('test');
				}
			}
		})
	}).appendTo(BODY);
});
