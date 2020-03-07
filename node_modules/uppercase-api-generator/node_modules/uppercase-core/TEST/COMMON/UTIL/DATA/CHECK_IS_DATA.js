TEST('CHECK_IS_DATA', (check) => {

	let value = 1;
	
	let data = {
		a : 1,
		b : 2,
		c : 3
	};
	
	let array = [1, 2, 3];

	check(CHECK_IS_DATA(value) === false);
	check(CHECK_IS_DATA(data) === true);
	check(CHECK_IS_DATA(array) === false);
});
