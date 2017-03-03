TEST('RANDOM', (check) => {

	// random number between 1 ~ 3.
	console.log(RANDOM({
		min : 1,
		max : 3
	}));

	// random number between 0 ~ 3.
	console.log(RANDOM({
		max : 3
	}));

	// random number between 0 ~ 2.
	console.log(RANDOM({
		limit : 3
	}));

	// random number between 2 ~ 4.
	console.log(RANDOM({
		min : 2,
		limit : 5
	}));
});
