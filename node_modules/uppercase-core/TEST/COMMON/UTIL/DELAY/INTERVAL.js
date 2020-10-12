TEST('INTERVAL', (check) => {

	let count = 0;

	let interval = INTERVAL(3, (interval) => {

		count += 1;

		console.log('interval per 3 seconds, count:', count);
	});

	DELAY(10, () => {
		interval.remove();
	});
});
