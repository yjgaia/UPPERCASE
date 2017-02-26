TEST('LOOP', (check) => {

	let div = DIV({
		style : {
			position : 'fixed',
			left : 100,
			top : 100,
			width : 100,
			backgroundColor : 'red'
		}
	}).appendTo(BODY);

	let height = 0;

	let loop = LOOP(100, {

		start : () => {
			// when start one cycle.
		},

		interval : () => {
			div.addStyle({
				height : height += 1
			});
		},

		end : () => {
			// when end one cycle.
		}
	});

	DELAY(3, () => {

		loop.remove();

		div.remove();
	});
});
