/*
 * 웹 브라우저 정보를 담고 있는 객체
 */
global.INFO = OBJECT({

	init : (inner, self) => {

		let isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

		let getLang = self.getLang = () => {

			let lang = STORE('__INFO').get('lang');

			if (lang === undefined) {
				lang = navigator.language.toLowerCase();
			}

			return lang;
		};

		let setLang = self.setLang = (lang) => {
			//REQUIRED: lang

			STORE('__INFO').save({
				name : 'lang',
				value : lang
			});
		};

		let changeLang = self.changeLang = (lang) => {
			//REQUIRED: lang

			setLang(lang);

			location.reload();
		};

		let checkIsTouchDevice = self.checkIsTouchDevice = () => {
			return isTouchDevice;
		};

		let getBrowserInfo = self.getBrowserInfo = () => {
			// using bowser. (https://github.com/ded/bowser)
			return {
				name : bowser.name,
				version : REAL(bowser.version)
			};
		};
	}
});
