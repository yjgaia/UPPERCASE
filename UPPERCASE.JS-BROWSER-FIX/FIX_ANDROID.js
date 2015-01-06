/**
 * Fix for Android Browser.
 */
RUN(function() {
	'use strict';

	var
	// load fix script.
	loadFixScript = function(name) {
		LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/ANDROID/' + name + '.js');
	};

	global.ANDROID = {};

	// get Android version.
	/Android\s([0-9\.]*)/.exec(navigator.userAgent);
	ANDROID.version = REAL(RegExp.$1);

	/**
	 * fix BROWSER.
	 */

	// fix INFO.
	loadFixScript('BROWSER/INFO');

	/**
	 * fix BROWSER/DOM.
	 */

	// fix ADD_STYLE.
	if (ANDROID.version < 3) {
		loadFixScript('BROWSER/DOM/STYLE/ADD_STYLE');
	}
});
