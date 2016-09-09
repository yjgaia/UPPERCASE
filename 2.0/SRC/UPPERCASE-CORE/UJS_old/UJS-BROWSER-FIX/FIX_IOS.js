/**
 * Fix for iOS Safari.
 */
RUN(function() {
	'use strict';

	var
	// version splits
	versionSplits = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
	
	// load fix script.
	loadFixScript = function(name) {
		LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/IOS/' + name + '.js');
	};

	global.IOS = {};
	
	// get iOS version.
	IOS.version = REAL(versionSplits[1] + '.' + versionSplits[2]);

	/**
	 * fix BROWSER.
	 */

	// fix INFO.
	if (IOS.version < 9.3) {
		loadFixScript('BROWSER/INFO');
	}
	
	/**
	 * fix BROWSER/DOM.
	 */

	// fix INPUT.
	loadFixScript('BROWSER/DOM/TAG/INPUT');
	
	// fix TEXTAREA.
	loadFixScript('BROWSER/DOM/TAG/TEXTAREA');
});
