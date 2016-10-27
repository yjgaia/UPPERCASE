TEST('INFO', function(ok) {
	'use strict';

	var
	// now lang
	nowLang = INFO.getLang();

	// get browser language.
	console.log(nowLang);

	// change browser language.
	//INFO.changeLang('ko');
	
	// check is touch mode.
	console.log(INFO.checkIsTouchMode());

	// get browser info.
	console.log(INFO.getBrowserInfo());
});
