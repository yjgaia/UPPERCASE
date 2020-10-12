TEST('RUN', (check) => {

	let result = RUN(() => {

		console.log('just run!');

		return 1;
	});

	check(result === 1);
});
