/**
 * Fix codes for old browsers.
 */
RUN(function() {
	'use strict';

	var
	// fix scripts folder path
	fixScriptsFolderPath = BROWSER_CONFIG.fixScriptsFolderPath,

	// load fix script.
	loadFixScript;

	loadFixScript = function(name) {
		LOAD(fixScriptsFolderPath + '/' + name + '.js');
	};

	// fix String.trim.
	if ( typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}

	// fix for Date.now.
	if (Date.now === undefined) {
		Date.now = function() {
			return new Date().getTime();
		};
	}

	// fix JSON.
	if (global.JSON === undefined) {
		loadFixScript('JSON');
	}

	// fix console.log.
	if (global.console === undefined || console.log === undefined || console.log.apply === undefined) {
		loadFixScript('console.log');
	}

	/**
	 * fix BROWSER.
	 */

	// fix STORE.
	if (global.localStorage === undefined) {
		loadFixScript('BROWSER/STORE');
	}

	/**
	 * fix BROWSER/WINDOW.
	 */

	if (global.pageYOffset === undefined) {
		loadFixScript('BROWSER/WINDOW/SCROLL_TOP');
	}

	if (global.pageXOffset === undefined) {
		loadFixScript('BROWSER/WINDOW/SCROLL_LEFT');
	}

	/**
	 * fix BROWSER/DOM.
	 */

	// fix EVENT_LOW. (for hashchange event)
	if (global.onhashchange === undefined) {
		loadFixScript('BROWSER/DOM/EVENT/EVENT_LOW');
	}

	// fix RGBA.
	if (DIV({
		style : {
			color : 'rgba(88, 88, 88, 0.88)'
		}
	}).getStyle('color') === undefined) {
		loadFixScript('BROWSER/DOM/STYLE/RGBA');
	}

	// fix INPUT.
	if (document.createElement('input').placeholder === undefined) {
		loadFixScript('BROWSER/DOM/TAG/INPUT');
	}

	/**
	 * fix BROWSER/SOUND.
	 */

	// destroy SOUND.
	if (global.Audio === undefined) {
		loadFixScript('BROWSER/SOUND');
	}
	
	/**
	 * fix BROWSER/VIEW.
	 */

	// when protocol is 'file:', use hashbang.
	if (history.pushState === undefined || location.protocol === 'file:') {
		
		// fix HREF.
		loadFixScript('BROWSER/VIEW/HREF');
		
		// fix GO.
		loadFixScript('BROWSER/VIEW/GO');
		
		// fix URI.
		loadFixScript('BROWSER/VIEW/URI');
		
		// fix MATCH_VIEW.
		loadFixScript('BROWSER/VIEW/MATCH_VIEW');
		
		// fix REFRESH.
		loadFixScript('BROWSER/VIEW/REFRESH');
	}

	/**
	 * fix specific browsers.
	 */

	// fix for Internet Explorer.
	if (navigator.appName === 'Microsoft Internet Explorer' || (navigator.appName === 'Netscape' && /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) !== TO_DELETE)) {
		loadFixScript('FIX_IE');
	}

	// fix for Android Browser.
	if (navigator.userAgent !== undefined && navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
		loadFixScript('FIX_ANDROID');
	}
	
	// fix for iOS.
	if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) === true) {
		loadFixScript('FIX_IOS');
	}
});
