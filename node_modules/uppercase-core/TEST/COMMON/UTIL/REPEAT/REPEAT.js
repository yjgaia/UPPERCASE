TEST('REPEAT', (check) => {

	let count = 0;

	REPEAT(10, (i) => {

		check(i === count);

		count += 1;
	});

	count = 5;

	REPEAT({
		start : 5,
		end : 10
	}, (i) => {

		check(i === count);

		count += 1;
	});

	count = 1;

	REPEAT({
		start : 1,
		limit : 5
	}, (i) => {

		TEST('REPEAT', (check) => {
			check(i === count);
		});

		count += 1;
	});

	count = 3;

	REPEAT({
		start : 3,
		end : 1
	}, (i) => {

		check(i === count);

		count -= 1;
	});
});
