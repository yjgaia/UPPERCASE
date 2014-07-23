/**
 * Fix codes for UPPERCASE.IO-TRANSPORT.
 */
RUN(function() {'use strict';

	var
	// fix scripts folder path
	fixScriptsFolderPath,

	// current script
	currentScript,

	// script els
	scriptEls,

	// load fix script.
	loadFixScript;

	currentScript = document.currentScript;

	if (currentScript === undefined) {
		scriptEls = document.getElementsByTagName('script');
		currentScript = scriptEls[scriptEls.length - 1];
	}

	fixScriptsFolderPath = currentScript.getAttribute('src');
	fixScriptsFolderPath = fixScriptsFolderPath.substring(0, fixScriptsFolderPath.indexOf('/FIX.js'));

	loadFixScript = function(name) {
		LOAD(fixScriptsFolderPath + '/' + name + '.js');
	};

	/**
	 * fix CONNECT.
	 */

	// fix CONNECT_TO_WEB_SOCKET_SERVER.
	//if (global.WebSocket === undefined) {
	loadFixScript('CONNECT/CONNECT_TO_WEB_SOCKET_SERVER');
	//}
});
