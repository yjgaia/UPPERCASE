TEST('ADD_STYLE', (check) => {

	let dom = DOM({
		tag : 'div',
		c : 'This is test dom.'
	}).appendTo(BODY);

	ADD_STYLE({
		node : dom,
		style : {

			// style
			backgroundColor : '#00ff00',
			padding : 20,
			margin : 0,
			width : 200,
			height : 200,

			// background image
			backgroundImage : 'UPPERCASE-CORE/image.png',

			// position fixed (if not support fixed browser, simulate fixed.)
			position : 'fixed',
			right : 40,
			top : 40,

			// on display resize
			onDisplayResize : (width, height) => {

				// log on display resize.
				console.log(width, height);
			}
		}
	});

	dom.append(P({
		style : {

			// float to right.
			flt : 'right',

			// hand cursor
			cursor : 'pointer'
		},
		c : 'Float right.'
	}));
});
