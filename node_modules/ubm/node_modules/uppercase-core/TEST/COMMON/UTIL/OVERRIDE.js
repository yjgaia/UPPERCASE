TEST('OVERRIDE', (check) => {

	let func = () => {
		console.log('a');
	};

	OVERRIDE(func, (origin) => {

		func = () => {
			origin();
			console.log('b');
		};
	});

	func();
});
