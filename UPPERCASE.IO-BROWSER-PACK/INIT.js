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

	CONNECT_TO_IO_SERVER(function(on) {

		on('__DISCONNECTED', function() {

			var
			// reload interval
			reloadInterval = INTERVAL(1, RAR(function() {

				GET({
					port : CONFIG.webServerPort,
					uri : '__CHECK_ALIVE'
				}, function() {
					reloadInterval.remove();
					location.reload();
				});
			}));
		});
	});
	
	EVENT('beforeunload', function() {
		if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') {
			return BROWSER_CONFIG.beforeUnloadMessage;
		}
	});
});
