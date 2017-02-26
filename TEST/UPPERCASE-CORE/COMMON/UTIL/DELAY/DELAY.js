TEST('DELAY', (check) => {

	DELAY(() => {
		console.log('just delay!');
	});

	DELAY(2, () => {
		console.log('delay 2 seconds!');
	});

	let delay = DELAY(3, (delay) => {
		console.log('delay 3 seconds!');
	});

	DELAY(2, () => {
		delay.remove();
	});
});
