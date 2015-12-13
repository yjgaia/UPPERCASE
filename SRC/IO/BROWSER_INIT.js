// load UJS-BROWSER-FIX.
if (BROWSER_CONFIG.fixScriptsFolderPath !== undefined) {
	LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/FIX.js');
}

// load UPPERCASE-TRANSPORT FIX.
if (BROWSER_CONFIG.fixTransportScriptsFolderPath !== undefined) {
	LOAD(BROWSER_CONFIG.fixTransportScriptsFolderPath + '/FIX.js');
}

READY(function() {
	'use strict';
	
	var
	// is connecting
	isConnecting = false,
	
	// connect.
	connect;
	
	FOR_BOX(function(box) {
		if (box.OVERRIDE !== undefined) {
			box.OVERRIDE();
		}
	});

	// init objects.
	INIT_OBJECTS();
	
	SYNC_TIME();

	FOR_BOX(function(box) {
		if (box.MAIN !== undefined) {
			box.MAIN();
		}
	});

	connect = RAR(function() {
		
		if (isConnecting !== true) {
			isConnecting = true;
			
			CONNECT_TO_IO_SERVER(function(on) {
				
				FOR_BOX(function(box) {
					if (box.CONNECTED !== undefined) {
						box.CONNECTED();
					}
				});
			
				on('__DISCONNECTED', function() {
					
					var
					// reload interval
					reloadInterval;
					
					FOR_BOX(function(box) {
						if (box.DISCONNECTED !== undefined) {
							box.DISCONNECTED();
						}
					});
					
					isConnecting = false;
					
					reloadInterval = INTERVAL(1, RAR(function() {
		
						GET({
							port : CONFIG.webServerPort,
							uri : '__VERSION'
						}, function(version) {
							
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
