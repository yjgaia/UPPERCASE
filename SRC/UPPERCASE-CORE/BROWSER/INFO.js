/*
 * 웹 브라우저 정보를 담고 있는 객체
 */
global.INFO = OBJECT({

	init : (inner, self) => {

		let isTouchMode = global.ontouchstart !== undefined;
		let isTouching;

		let getLang = self.getLang = () => {

			let lang = STORE('__INFO').get('lang');

			if (lang === undefined) {
				lang = navigator.language.toLowerCase();
			}

			return lang;
		};

		let changeLang = self.changeLang = (lang) => {
			//REQUIRED: lang

			STORE('__INFO').save({
				name : 'lang',
				value : lang
			});

			location.reload();
		};

		let checkIsTouchMode = self.checkIsTouchMode = () => {
			return isTouchMode;
		};

		let getBrowserInfo = self.getBrowserInfo = () => {
			// using bowser. (https://github.com/ded/bowser)
			return {
				name : bowser.name,
				version : REAL(bowser.version)
			};
		};
		
		EVENT_LOW('mousemove', () => {
			if (isTouching !== true) {
				isTouchMode = false;
			}
		});
		
		EVENT_LOW('touchstart', () => {
			isTouchMode = true;
			isTouching = true;
		});
		
		EVENT_LOW('touchend', () => {
			DELAY(() => {
				isTouching = false;
			});
		});
	}
});
