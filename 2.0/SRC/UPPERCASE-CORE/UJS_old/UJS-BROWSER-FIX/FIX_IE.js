/**
 * Fix for Internet Explorer.
 */
RUN(function() {
	'use strict';

	var
	// load fix script.
	loadFixScript = function(name) {
		LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/IE/' + name + '.js');
	};

	global.IE = {};

	// IE <= 10
	if (navigator.appName === 'Microsoft Internet Explorer') {

		// get IE version.
		/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent);

		IE.version = INTEGER(RegExp.$1);
	}

	// IE >= 11
	else if (navigator.appName === 'Netscape') {

		// get IE version.
		/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent);

		IE.version = INTEGER(RegExp.$1);
	}

	// fix get selection.
	if (global.getSelection === undefined) {
		global.getSelection = function() {
			return {
				removeAllRanges : function() {
					document.selection.empty();
				}
			};
		};
	}

	// fix stack overflow bug at CHECK_ARE_SAME, PACK_DATA, UNPACK_DATA, CHECK_IS_IN, COPY, COMBINE, NEXT, NODE.
	if (IE.version <= 8) {
		
		loadFixScript('COMMON/UTIL/ARRAY/CHECK_ARE_SAME');
		
		loadFixScript('COMMON/UTIL/DATA/PACK_DATA');
		loadFixScript('COMMON/UTIL/DATA/UNPACK_DATA');
		
		loadFixScript('COMMON/UTIL/DATA_AND_ARRAY/CHECK_IS_IN');
		loadFixScript('COMMON/UTIL/DATA_AND_ARRAY/COPY');
		loadFixScript('COMMON/UTIL/DATA_AND_ARRAY/COMBINE');
		
		loadFixScript('COMMON/UTIL/NEXT');
		
		loadFixScript('BROWSER/DOM/NODE');
	}

	/**
	 * fix BROWSER.
	 */

	// fix INFO.
	loadFixScript('BROWSER/INFO');

	/**
	 * fix BROWSER/DOM.
	 */

	// fix png.
	if (IE.version <= 6) {
		loadFixScript('BROWSER/LIB/FIX_IE_PNG');
		loadFixScript('BROWSER/LIB/FIX_IE_PNG_BG');
	}

	// fix ADD_STYLE.
	loadFixScript('BROWSER/DOM/STYLE/ADD_STYLE');

	// fix ANIMATION.
	if (IE.version <= 9) {
		loadFixScript('BROWSER/DOM/ANIMATION/ANIMATE');
		loadFixScript('BROWSER/DOM/ANIMATION/KEYFRAME');
	}

	// fix E.
	loadFixScript('BROWSER/DOM/EVENT/E');

	// fix EVENT_LOW.
	loadFixScript('BROWSER/DOM/EVENT/EVENT_LOW');

	// fix IMG.
	if (IE.version <= 10) {
		loadFixScript('BROWSER/DOM/TAG/IMG');
	}

	// fix TABLE.
	if (IE.version <= 7) {
		loadFixScript('BROWSER/DOM/TAG/TABLE');
	}

	// fix TD.
	if (IE.version <= 8) {
		loadFixScript('BROWSER/DOM/TAG/TD');
	}

	// fix TEXTAREA.
	if (IE.version <= 5.5) {
		loadFixScript('BROWSER/DOM/TAG/TEXTAREA');
	}

	// fix IFRAME.
	if (IE.version <= 7) {
		loadFixScript('BROWSER/DOM/TAG/IFRAME');
	}

	// fix FORM.
	if (IE.version <= 7) {
		loadFixScript('BROWSER/DOM/TAG/FORM');
	}

	// fix REQUEST.
	if (IE.version <= 9) {
		loadFixScript('BROWSER/REQUEST/REQUEST');
	}

	// load flash canvas and fix CANVAS.
	if (RUN(function() {

		var
		// canvas
		canvas = document.createElement('canvas');

		return canvas.getContext === undefined || canvas.getContext('2d') === undefined;

	}) === true) {

		global.FlashCanvasOptions = {
			swfPath : BROWSER_CONFIG.fixScriptsFolderPath + '/IE/BROWSER/LIB/' + (BROWSER_CONFIG.isUsingFlashCanvasPro === true ? 'flashcanvaspro' : 'flashcanvas') + '/'
		};

		loadFixScript('BROWSER/LIB/' + (BROWSER_CONFIG.isUsingFlashCanvasPro === true ? 'flashcanvaspro' : 'flashcanvas') + '/flashcanvas');

		// fix CANVAS.
		loadFixScript('BROWSER/DOM/TAG/CANVAS');

		// fix EXPORT_IMG_DATA.
		loadFixScript('BROWSER/GRAPHIC/EXPORT_IMG_DATA');
	}

	// fix CLEAR_BOTH.
	if (IE.version <= 7) {
		loadFixScript('BROWSER/DOM/CLEAR_BOTH');
	}

	/**
	 * fix BROWSER/GRAPHIC.
	 */

	// fix EXPORT_IMG_TYPE.
	if (IE.version <= 10) {
		loadFixScript('BROWSER/GRAPHIC/EXPORT_IMG_TYPE');
	}

	/**
	 * fix BROWSER/VIEW.
	 */

	// fix REFRESH.
	if (IE.version <= 8) {
		loadFixScript('BROWSER/VIEW/REFRESH');
	}
});
