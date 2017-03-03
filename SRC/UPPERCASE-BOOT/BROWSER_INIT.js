RUN(() => {
	
	let isConnecting = false;
	
	FOR_BOX((box) => {
		if (box.OVERRIDE !== undefined) {
			box.OVERRIDE();
		}
	});

	// init objects.
	INIT_OBJECTS();
	
	SYNC_TIME();

	FOR_BOX((box) => {
		if (box.MAIN !== undefined) {
			box.MAIN();
		}
	});

	let connect = RAR(() => {
		
		if (isConnecting !== true) {
			isConnecting = true;
			
			CONNECT_TO_UPPERCASE_SERVER((on) => {
				
				FOR_BOX((box) => {
					if (box.CONNECTED !== undefined) {
						box.CONNECTED();
					}
				});
			
				on('__DISCONNECTED', () => {
					
					FOR_BOX((box) => {
						if (box.DISCONNECTED !== undefined) {
							box.DISCONNECTED();
						}
					});
					
					isConnecting = false;
					
					let reloadInterval = INTERVAL(1, RAR(() => {
		
						GET({
							port : CONFIG.webServerPort,
							uri : '__VERSION'
						}, (version) => {
							
							if (reloadInterval !== undefined) {
								reloadInterval.remove();
								reloadInterval = undefined;
								
								if ((document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT')
								|| BROWSER_CONFIG.beforeUnloadMessage === undefined
								|| confirm(BROWSER_CONFIG.beforeUnloadMessage) === true) {
									
									if (BROWSER_CONFIG.reconnect === undefined || BROWSER_CONFIG.reconnect(CONFIG.version === version, connect) !== false) {
										
										// if versions are same, REFRESH.
										if (CONFIG.version === version) {
											REFRESH();
											connect();
										}
										
										// if versions are not same, reload page.
										else {
											location.reload();
										}
									}
								}
							}
						});
					}));
				});
			});
		}
	});
});
