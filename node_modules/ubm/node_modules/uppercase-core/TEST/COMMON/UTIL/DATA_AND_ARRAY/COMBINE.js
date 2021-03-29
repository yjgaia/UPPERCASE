TEST('COMBINE', (check) => {

	let data1 = {
		a : 1,
		b : 2,
		c : 3
	};
	
	let data2 = COMBINE([data1]);
	
	let data3 = COMBINE([data1, {
		d : 4
	}]);
	
	let array1 = [1, 2, 3];
	
	let array2 = COMBINE([array1]);
	
	let array3 = COMBINE([array1, [5, 6]]);

	data2.b = 4;

	check(CHECK_ARE_SAME([data2, {
		a : 1,
		b : 4,
		c : 3
	}]) === true);

	check(CHECK_ARE_SAME([data3, {
		a : 1,
		b : 2,
		c : 3,
		d : 4
	}]) === true);

	array2[1] = 4;

	check(CHECK_ARE_SAME([array2, [1, 4, 3]]) === true);

	check(CHECK_ARE_SAME([array3, [1, 2, 3, 5, 6]]) === true);
});
