/**
 * Fix codes for UPPERCASE.IO-TRANSPORT.
 */
RUN(function() {'use strict';

	var
	// transport fix scripts folder path
	transportFixScriptsFolderPath = BROWSER_CONFIG.transportFixScriptsFolderPath,

	// current script
	currentScript,

	// script els
	scriptEls,

	// load fix script.
	loadFixScript;

	if (transportFixScriptsFolderPath === undefined) {

		currentScript = document.currentScript;

		if (currentScript === undefined) {
			scriptEls = document.getElementsByTagName('script');
			currentScript = scriptEls[scriptEls.length - 1];
		}

		transportFixScriptsFolderPath = currentScript.getAttribute('src');
		transportFixScriptsFolderPath = transportFixScriptsFolderPath.substring(0, transportFixScriptsFolderPath.indexOf('/FIX.js'));

		BROWSER_CONFIG.transportFixScriptsFolderPath = transportFixScriptsFolderPath;
	}

	loadFixScript = function(name) {
		LOAD(transportFixScriptsFolderPath + '/' + name + '.js');
	};

	/**
	 * fix CONNECT.
	 */

	// fix CONNECT_TO_WEB_SOCKET_SERVER.
	//if (global.WebSocket === undefined) {
	loadFixScript('CONNECT/CONNECT_TO_WEB_SOCKET_SERVER');
	//}
});
