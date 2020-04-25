TEST('INFO', (check) => {

	let nowLang = INFO.getLang();

	// get browser language.
	console.log(nowLang);
	
	// check is touch device.
	console.log(INFO.checkIsTouchDevice());

	// get browser info.
	console.log(INFO.getOSName());
	console.log(INFO.getBrowserName());
	console.log(INFO.getBrowserVersion());
});
