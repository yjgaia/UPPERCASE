TEST('REVERSE_EACH', (check) => {

	let value = 1;
	
	let array = [1, 2, 3];
	
	let sum = 0;

	REVERSE_EACH(value, (value, i) => {
		console.log('value each - ' + i + ': ' + value);
		sum += value;
	});

	check(sum === 0);

	REVERSE_EACH(array, (value, i) => {
		console.log('array each - ' + i + ': ' + value);
		sum += value;
	});

	check(sum === 6);
});
