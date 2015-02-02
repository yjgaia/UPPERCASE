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

	INIT_OBJECTS();
	
	SYNC_TIME();

	FOR_BOX(function(box) {
		if (box.MAIN !== undefined) {
			box.MAIN();
		}
	});

	CONNECT_TO_IO_SERVER(function(on) {

		on('__DISCONNECTED', function() {

			// retry.
			INTERVAL(1, RAR(function() {

				GET({
					port : CONFIG.webServerPort,
					uri : '__CHECK_ALIVE'
				}, function() {
					location.reload();
				});
			}));
		});
	});
});
