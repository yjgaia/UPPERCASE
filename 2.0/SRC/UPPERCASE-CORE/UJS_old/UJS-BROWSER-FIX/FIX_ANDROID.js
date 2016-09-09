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

	// when Android version is less than 4.2, use hashbang.
	if (ANDROID.version < 4.2) {
		
		// fix HREF.
		loadFixScript('../BROWSER/VIEW/HREF');
		
		// fix GO.
		loadFixScript('../BROWSER/VIEW/GO');
		
		// fix URI.
		loadFixScript('../BROWSER/VIEW/URI');
		
		// fix MATCH_VIEW.
		loadFixScript('BROWSER/VIEW/MATCH_VIEW');
		
		// fix REFRESH.
		loadFixScript('../BROWSER/VIEW/REFRESH');
	}

	/**
	 * fix BROWSER/DOM.
	 */

	// fix ADD_STYLE.
	if (ANDROID.version < 3) {
		loadFixScript('BROWSER/DOM/STYLE/ADD_STYLE');
	}
});
