// load UPPERCASE.JS-BROWSER-FIX.
LOAD('/UPPERCASE.IO/UPPERCASE.JS-BROWSER-FIX/FIX.js');

// load UPPERCASE.IO-TRANSPORT-FIX.
LOAD('/UPPERCASE.IO/FIX.js');

global.onload = function() {'use strict';

	INIT_OBJECTS();

	FOR_BOX(function(box) {
		if (box.MAIN !== undefined) {
			box.MAIN();
		}
	});

	GET('__WEB_SOCKET_SERVER_HOST', function(host) {

		CONNECT_TO_ROOM_SERVER({
			host : host === '' ? undefined : host,
			port : CONFIG.webSocketServerPort,
			fixServerPort : CONFIG.webSocketFixServerPort
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
};
