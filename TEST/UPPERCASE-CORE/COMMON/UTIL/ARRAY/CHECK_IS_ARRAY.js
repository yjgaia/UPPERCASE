TEST('CHECK_IS_ARRAY', (check) => {

	let value = 1;
	
	let data = {
		a : 1,
		b : 2,
		c : 3
	};

	let array = [1, 2, 3];

	check(CHECK_IS_ARRAY(value) === false);
	check(CHECK_IS_ARRAY(data) === false);
	check(CHECK_IS_ARRAY(array) === true);
});
