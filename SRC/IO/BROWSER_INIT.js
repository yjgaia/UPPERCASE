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

			var
			// reload.
			reload = RAR(function() {

				GET('__CHECK_ALIVE', {
					error : function() {

						// retry.
						DELAY(1, function() {
							reload();
						});
					},
					success : function() {
						location.reload();
					}
				});
			});
		});
	});
});
