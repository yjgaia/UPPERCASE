TEST('MEMORY_USAGE', (check) => {

	INTERVAL(1, RAR(() => {
		console.log(MEMORY_USAGE());
	}));
});
