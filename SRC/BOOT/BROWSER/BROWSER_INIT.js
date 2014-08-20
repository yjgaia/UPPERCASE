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

	GET({
		uri : '__WEB_SOCKET_SERVER_HOST',
		paramStr : 'defaultHost=' + global.location.hostname
	}, function(host) {

		CONNECT_TO_ROOM_SERVER({
			host : host === '' ? undefined : host,
			port : CONFIG.webServerPort,
			fixServerPort : CONFIG.webServerPort,
			fixRequestURI : '__WEB_SOCKET_FIX'
		}, function(on) {

			on('__DISCONNECTED', function() {

				var
				// reload.
				reload = RAR(function() {

					GET('', {
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
});
