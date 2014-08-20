/**
 * Fix codes for UPPERCASE.IO-TRANSPORT.
 */
RUN(function() {
	'use strict';

	var
	// fix scripts folder path
	fixScriptsFolderPath = BROWSER_CONFIG.fixTransportScriptsFolderPath,

	// load fix script.
	loadFixScript;

	loadFixScript = function(name) {
		LOAD(fixScriptsFolderPath + '/' + name + '.js');
	};

	/**
	 * fix CONNECT.
	 */

	// fix CONNECT_TO_WEB_SOCKET_SERVER.
	if (global.WebSocket === undefined) {
		loadFixScript('CONNECT/CONNECT_TO_WEB_SOCKET_SERVER');
	}
});
