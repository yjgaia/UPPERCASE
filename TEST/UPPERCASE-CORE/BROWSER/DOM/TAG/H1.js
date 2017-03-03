TEST('H1', (check) => {

	let div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		}
	}).appendTo(BODY);

	H1({
		style : {
			fontSize : 20
		},
		c : 'H1 Header'
	}).appendTo(div);

	H2({
		style : {
			fontSize : 18
		},
		c : 'H2 Header'
	}).appendTo(div);

	H3({
		style : {
			fontSize : 16
		},
		c : 'H3 Header'
	}).appendTo(div);

	H4({
		style : {
			fontSize : 14
		},
		c : 'H4 Header'
	}).appendTo(div);

	H5({
		style : {
			fontSize : 12
		},
		c : 'H5 Header'
	}).appendTo(div);

	H6({
		style : {
			fontSize : 10
		},
		c : 'H6 Header'
	}).appendTo(div);
});
