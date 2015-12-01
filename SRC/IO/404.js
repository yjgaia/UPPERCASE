// load UJS-BROWSER-FIX.
if (BROWSER_CONFIG.fixScriptsFolderPath !== undefined) {
	LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/FIX.js');
}

READY(function() {
	'use strict';

	// init objects.
	INIT_OBJECTS();
	
	var
	// title
	title = MSG({
		en : 'Resource not found',
		ko : '리소스를 찾을 수 없습니다.'
	});
	
	TITLE(title);
	
	DIV({
		c : title
	}).appendTo(BODY);
});
