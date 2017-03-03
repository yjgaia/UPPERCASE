TEST('EACH', (check) => {

	let value = 1;
	
	let data = {
		a : 1,
		b : 2,
		c : 3
	};
	
	let array = [1, 2, 3];
	
	let sum = 0;

	EACH(value, (value, i) => {
		console.log('value each - ' + i + ': ' + value);
		sum += value;
	});

	check(sum === 0);

	EACH(data, (value, name) => {
		console.log('data each - ' + name + ': ' + value);
		sum += value;
	});

	check(sum === 6);

	EACH(array, (value, i) => {
		console.log('array each - ' + i + ': ' + value);
		sum += value;
	});

	check(sum === 12);

	let func = () => {
		EACH(arguments, (value, i) => {
			console.log('arguments each - ' + i + ': ' + value);
			sum += value;
		});
	};

	func(3, 2, 1);

	check(sum === 18);
});
