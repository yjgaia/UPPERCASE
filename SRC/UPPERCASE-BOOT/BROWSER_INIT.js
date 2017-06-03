RUN(() => {
	
	let isConnecting = false;
	
	FOR_BOX((box) => {
		if (box.OVERRIDE !== undefined) {
			box.OVERRIDE();
		}
	});

	// init objects.
	INIT_OBJECTS();

	FOR_BOX((box) => {
		if (box.MAIN !== undefined) {
			box.MAIN();
		}
	});
	
	if (BROWSER_CONFIG.isNotToConnectServer !== true) {
		CONNECT_TO_UPPERCASE_SERVER();
	}
});
