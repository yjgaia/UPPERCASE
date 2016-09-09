TEST('CHECK_IS_BLANK', function(ok) {
	'use strict';

	/**
	 * IE6 ~ IE8 need Flash Player.
	 */

	var
	// img
	img,

	// test div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c :

		// img
		img = IMG({
			src : '/EXAMPLES/test.png'
		})
	}).appendTo(BODY);

	// check is blank pixel 10 x 10.
	CHECK_IS_BLANK_PIXEL({
		img : img,
		left : 10,
		top : 10
	}, function(result) {

		ok(result === true);

		div.remove();
	});
});
