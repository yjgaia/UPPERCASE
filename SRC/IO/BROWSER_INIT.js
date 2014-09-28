// load UPPERCASE.JS-BROWSER-FIX.
LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/FIX.js');

// load UPPERCASE.IO-TRANSPORT FIX.
LOAD(BROWSER_CONFIG.fixTransportScriptsFolderPath + '/FIX.js');

READY(function() {
	'use strict';

	INIT_OBJECTS();

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
					host : BROWSER_CONFIG.host,
					port : BROWSER_CONFIG.port,
					uri : '__CHECK_ALIVE'
				}, function() {
					location.reload();
				});
			}));
		});
	});
});
