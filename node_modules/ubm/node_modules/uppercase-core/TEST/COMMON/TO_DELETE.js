TEST('TO_DELETE', (check) => {

	let data = {
		a : 1,
		b : 2,
		c : 3
	};

	// b will be deleted.
	data.b = TO_DELETE;

	// delete b.
	delete data.b;

	check(CHECK_ARE_SAME([data, {
		a : 1,
		c : 3
	}]));
});
