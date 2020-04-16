TEST('DOM', (check) => {

	let dom = DOM({

		// tag name
		tag : 'div',

		// css style
		style : {
			color : 'red',
			position : 'fixed',
			left : 40,
			top : 40
		},

		// chidren doms
		c : 'test',

		// events
		on : {

			// mouse click or mobile touch
			tap : () => {
				console.log('tapped new dom!');
			}
		}
	}),

	// before dom
	beforeDom,

	// after dom
	afterDom,

	// blink interval
	blinkInterval;

	// append child dom.
	dom.append(DOM({
		tag : 'p',
		c : 'This is appended child.'
	}));

	// prepend child dom.
	dom.prepend(DOM({
		tag : 'p',
		c : 'This is prepended child.'
	}));

	// add attach handler.
	dom.on('attach', () => {
		console.log('I\'m comming!');
	});

	// attach dom.
	dom.appendTo(BODY);

	// before dom.
	dom.before( beforeDom = DOM({
		tag : 'p',
		c : 'This is before dom.'
	}));

	// after dom.
	dom.after( afterDom = DOM({
		tag : 'p',
		c : 'This is after dom.'
	}));

	// add style.
	dom.addStyle({
		border : '5px solid blue'
	});

	// get style.
	check(dom.getStyle('color') === 'red');

	// get size.
	console.log(dom.getWidth(), dom.getHeight());

	// get position.
	console.log(dom.getLeft(), dom.getTop());

	// blink dom.
	blinkInterval = INTERVAL(1, () => {

		if (dom.checkIsShowing() === true) {
			dom.hide();
		} else {
			dom.show();
		}
	});

	// add remove handler.
	dom.on('remove', () => {

		console.log('Bye!');

		beforeDom.remove();
		afterDom.remove();

		blinkInterval.remove();
	});
});
