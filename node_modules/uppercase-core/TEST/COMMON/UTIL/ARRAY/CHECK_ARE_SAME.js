TEST('CHECK_ARE_SAME', (check) => {

	let data1 = {
		a : 1,
		b : 2,
		c : [1, 2, 3]
	};
	
	let data2 = {
		a : 1,
		b : 2,
		c : [1, 2, 3]
	};
	
	let array1 = [1, 2, 3, 4, {
		a : 1,
		b : 2
	}, [5, 6]];
	
	let array2 = [1, 2, 3, 4, {
		a : 1,
		b : 2
	}, [5, 6]];

	check(CHECK_ARE_SAME([data1, data2]) === true);

	data2.a = 0;

	check(CHECK_ARE_SAME([data1, data2]) === false);

	check(CHECK_ARE_SAME([array1, array2]) === true);

	array2[0] = 0;

	check(CHECK_ARE_SAME([array1, array2]) === false);
});
