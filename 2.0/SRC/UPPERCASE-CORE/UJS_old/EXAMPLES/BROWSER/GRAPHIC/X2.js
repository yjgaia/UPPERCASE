TEST('X2', function(ok) {
	'use strict';

	var
	// X2 img
	x2Img = IMG({
		style : {
			border : '5px solid #999',
			position : 'fixed',
			left : 40,
			top : 40
		},
		src : '/EXAMPLES/BROWSER/GRAPHIC/text.png'
	}).appendTo(BODY),

	// background X2 div
	backgroundX2Div = DIV({
		style : {
			border : '5px solid #999',
			position : 'fixed',
			left : 360,
			top : 40,
			width : 400,
			height : 400,

			// background image
			backgroundImage : '/EXAMPLES/BROWSER/GRAPHIC/text.png'
		}
	}).appendTo(BODY),

	// just img
	img = IMG({
		style : {
			border : '5px solid #999',
			position : 'fixed',
			left : 40,
			top : 270
		},
		src : '/EXAMPLES/BROWSER/GRAPHIC/text.jpg'
	}).appendTo(BODY);

	// remove img and div after 3 seconds.
	DELAY(3, function() {
		x2Img.remove();
		backgroundX2Div.remove();
		img.remove();
	});
});
