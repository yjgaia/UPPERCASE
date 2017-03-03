TEST('CPU_USAGES', (check) => {

	INTERVAL(1, RAR(() => {
		console.log(CPU_USAGES());
	}));
});
