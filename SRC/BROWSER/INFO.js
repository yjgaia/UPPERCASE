/*
 * 웹 브라우저 정보를 담고 있는 객체
 */
global.INFO = OBJECT({

	init: (inner, self) => {

		let isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

		if (isTouchDevice === undefined) {
			isTouchDevice = false;
		}

		let bowserParser = bowser.getParser(window.navigator.userAgent);

		let getLang = self.getLang = () => {

			let lang = STORE('__INFO').get('lang');

			if (lang === undefined) {
				lang = navigator.language;
			}

			if (lang.indexOf('-') !== -1 && lang !== 'zh-TW' && lang !== 'zh-CN') {
				lang = lang.substring(0, lang.indexOf('-'));
			}

			return lang;
		};

		let setLang = self.setLang = (lang) => {
			//REQUIRED: lang

			STORE('__INFO').save({
				name: 'lang',
				value: lang
			});
		};

		let changeLang = self.changeLang = (lang) => {
			//REQUIRED: lang

			setLang(lang);

			REFRESH();
		};

		let checkIsTouchDevice = self.checkIsTouchDevice = () => {
			return isTouchDevice;
		};

		let getOSName = self.getOSName = () => {
			return bowserParser.getOSName();
		};

		let getBrowserName = self.getBrowserName = () => {
			return bowserParser.getBrowserName();
		};

		let getBrowserVersion = self.getBrowserVersion = () => {
			return REAL(bowserParser.getBrowserVersion());
		};
	}
});