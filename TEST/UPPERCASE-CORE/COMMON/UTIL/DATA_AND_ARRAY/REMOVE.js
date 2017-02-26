TEST('REMOVE', (check) => {

	let data = {
		a : 1,
		b : 2,
		c : 3
	};
	
	let array = [3, 2, 1];

	REMOVE({
		data : data,
		name : 'b'
	});

	check(CHECK_ARE_SAME([data, {
		a : 1,
		c : 3
	}]) === true);

	REMOVE({
		array : array,
		key : 1
	});

	check(CHECK_ARE_SAME([array, [3, 1]]) === true);

	REMOVE({
		data : data,
		value : 1
	});

	check(CHECK_ARE_SAME([data, {
		c : 3
	}]) === true);

	REMOVE({
		array : array,
		value : 1
	});

	check(CHECK_ARE_SAME([array, [3]]) === true);
});
