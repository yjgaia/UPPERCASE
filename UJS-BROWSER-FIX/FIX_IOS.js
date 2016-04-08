/**
 * Fix for iOS Safari.
 */
RUN(function() {
	'use strict';

	var
	// load fix script.
	loadFixScript = function(name) {
		LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/IOS/' + name + '.js');
	};

	global.IOS = {};
	
	// get iOS version.
	IOS.version = REAL((navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)[1]);

	/**
	 * fix BROWSER/DOM.
	 */

	// fix INPUT.
	loadFixScript('BROWSER/DOM/TAG/INPUT');
	
	// fix TEXTAREA.
	loadFixScript('BROWSER/DOM/TAG/TEXTAREA');
});
