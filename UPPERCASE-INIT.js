RUN(() => {

	FOR_BOX((box) => {
		if (box.OVERRIDE !== undefined) {
			box.OVERRIDE();
		}
	});

	INIT_OBJECTS();

	FOR_BOX((box) => {
		if (box.MAIN !== undefined) {
			box.MAIN();
		}
	});
});
