TEST('MEMORY_USAGE', (check) => {

	INTERVAL(1, RAR(() => {
		MEMORY_USAGE(console.log)
	}));
});
