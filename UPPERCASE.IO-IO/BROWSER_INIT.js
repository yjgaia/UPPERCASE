/*

Welcome to UPPERCASE.IO! (http://uppercase.io)

*/

// load UPPERCASE.JS-BROWSER-FIX.
if (BROWSER_CONFIG.fixScriptsFolderPath !== undefined) {
	LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/FIX.js');
}

// load UPPERCASE.IO-TRANSPORT FIX.
if (BROWSER_CONFIG.fixTransportScriptsFolderPath !== undefined) {
	LOAD(BROWSER_CONFIG.fixTransportScriptsFolderPath + '/FIX.js');
}

READY(function() {
	'use strict';
	
	var
	// connect count
	connectCount = 0,
	
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
			
		connectCount += 1;
		
		CONNECT_TO_IO_SERVER(function(on) {
			
			var
			// now connect count
			nowConnectCount = connectCount;
	
			on('__DISCONNECTED', function() {
	
				var
				// reload interval
				reloadInterval = INTERVAL(1, RAR(function() {
	
					GET({
						port : CONFIG.webServerPort,
						uri : '__VERSION'
					}, function(version) {
						
						if (reloadInterval !== undefined) {
							reloadInterval.remove();
							reloadInterval = undefined;
							
							// if versions are same, 
							if (CONFIG.version === version && connectCount === nowConnectCount) {
								REFRESH();
								connect();
							}
							
							// if versions are not same, reload page.
							else {
								location.reload();
							}
						}
					});
				}));
			});
		});
	});
	
	EVENT('beforeunload', function() {
		if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') {
			return BROWSER_CONFIG.beforeUnloadMessage;
		}
	});
});
