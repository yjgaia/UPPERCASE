TEST('COUNT_PROPERTIES', (check) => {

	let data = {
		a : 1,
		b : 2,
		c : 3
	};
	
	check(COUNT_PROPERTIES(data) === 3);
});
