/*
 * 운영체제의 언어 설정 코드에 해당하는 문자열을 반환합니다.
 * 
 * 만약 알 수 없는 언어 설정 코드라면, 첫 문자열을 반환합니다.
 */
global.MSG = METHOD((m) => {
	
	const OSLocale = require('os-locale');
	
	let lang;
	
	OSLocale().then(locale => {
		lang = locale.toLowerCase();
	});
	
	return {
	
		run : (msgs) => {
			//REQUIRED: msgs
	
			let msg;
	
			if (lang !== undefined) {
				msg = msgs[lang];
				
				if (msg === undefined) {
					msg = msgs[lang.substring(0, 2)];
				}
			}
			
			if (msg === undefined) {
				
				// get first msg.
				EACH(msgs, (_msg) => {
					msg = _msg;
					return false;
				});
			}
	
			return msg;
		}
	};
});
