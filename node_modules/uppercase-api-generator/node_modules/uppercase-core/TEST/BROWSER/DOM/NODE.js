TEST('NODE', (check) => {

	let ImageAndText = CLASS({

		preset : () => {
			return NODE;
		},

		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.img
			//REQUIRED: params.text

			let img = params.img;
			let text = params.text;
			
			let div = DIV({
				style : {
					backgroundImage : 'UPPERCASE-CORE/image.png',
					position : 'fixed',
					left : 40,
					top : 40
				},
				c : [img, text]
			});
			
			inner.setDom(div);
		}
	}),

	// node
	iat = ImageAndText({
		img : IMG({
			src : 'UPPERCASE-CORE/image.png'
		}),
		text : 'Hello, UJS!'
	}).appendTo(BODY),
	
	// div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			width : 50,
			height : 50,
			overflow : 'scroll'
		},
		c : 'TTTTTTTTTTTTTT\nTTTTTTTTTTTTTT\nTTTTTTTTTTTTTT'
	}).appendTo(BODY);
	
	div.scrollTo({
		left : 10,
		top : 10
	});
	
	console.log(div.getScrollLeft());
	console.log(div.getScrollTop());
	console.log(div.getScrollWidth());
	console.log(div.getScrollHeight());
});
