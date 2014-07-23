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

	CONNECT_TO_ROOM_SERVER({
		port : CONFIG.webSocketServerPort,
		fixServerPort : CONFIG.webSocketFixServerPort
	});
};
