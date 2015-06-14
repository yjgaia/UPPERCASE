OVERRIDE(INFO, function(origin) {
	'use strict';

	/**
	 * Browser information object (fix for Android)
	 */
	global.INFO = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			var
			// get lang.
			getLang,

			// check is HD display.
			checkIsHDDisplay,
			
			// check is exists tap delay.
			checkIsExistsTapDelay;

			self.getLang = getLang = function() {

				var
				// language
				lang = STORE('__INFO').get('lang'),

				// match
				match;

				if (lang === undefined) {

					if (navigator.userAgent !== undefined) {
						match = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i);
						if (match !== null) {
							lang = match[1];
						}
					}

					if (lang === undefined) {
						lang = navigator.language;
					}

					if (lang.length > 2) {
						lang = lang.substring(0, 2);
					}

					lang = lang.toLowerCase();
				}

				return lang;
			};

			// android not support HD display force.
			// because many android devices are low end machine.
			self.checkIsHDDisplay = checkIsHDDisplay = function() {
				return false;
			};
			
			// android chrome above 32 version, not exists tap delay.
			// android stuck browser? whatever...
			self.checkIsExistsTapDelay = checkIsExistsTapDelay = function() {
	
				var
				// browser info
				browserInfo = self.getBrowserInfo();
	
				if (browserInfo.name === 'Chrome' && INTEGER(browserInfo.version) < 32) {
					return true;
				}
				
				return false;
			};
		}
	});
});
