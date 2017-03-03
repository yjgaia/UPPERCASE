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

	let func = () => {
		REVERSE_EACH(arguments, (value, i) => {
			console.log('arguments each - ' + i + ': ' + value);
			sum += value;
		});
	};

	func(3, 2, 1);

	check(sum === 12);
});
