/*
 * 운영체제의 언어 설정 코드에 해당하는 문자열을 반환합니다.
 * 
 * 만약 알 수 없는 언어 설정 코드라면, 첫 문자열을 반환합니다.
 */
OVERRIDE(MSG, (origin) => {
	
	global.MSG = METHOD((m) => {
		
		const OSLocale = require('os-locale');
		
		let osLang;
		
		OSLocale().then((_osLang) => {
			osLang = _osLang;
		});
		
		let msgData = {};
		
		let addData = m.addData = (data) => {
			EXTEND({
				origin : msgData,
				extend : data
			});
		};
		
		let loadCSV = m.loadCSV = (url, callback) => {
			//REQUIRED: url
			//REQUIRED: callback
			
			if (CHECK_IS_ARRAY(url) === true) {
				
				NEXT(url, [
				(url, next) => {
					loadCSV(url, next);
				},
				
				() => {
					return callback;
				}]);
			}
			
			else {
				
				GET(url, (content) => {
					
					let data = {};
					
					let langs;
					EACH(__PAPA.parse(content).data, (texts, i) => {
						
						// 첫번째 줄은 언어 설정
						if (i === 0) {
							langs = texts;
						}
						
						else {
							let subData = {};
							EACH(texts, (text, j) => {
								if (j > 0) {
									subData[langs[j]] = text.replace(/\\n/, '\n');
								}
							});
							data[texts[0]] = subData;
						}
					});
					
					addData(data);
					
					callback();
				});
			}
		};
		
		return {
		
			run : (keyOrMsgs) => {
				//REQUIRED: keyOrMsgs
				
				let key;
				let msgs;
				
				if (CHECK_IS_DATA(keyOrMsgs) !== true) {
					key = keyOrMsgs;
				} else {
					msgs = keyOrMsgs;
				}
				
				if (key !== undefined) {
					msgs = msgData[key];
				}
		
				let msg;
				
				if (osLang !== undefined) {
					msg = msgs[osLang];
					
					if (msg === undefined) {
						
						let lang;
						let locale;
						
						if (osLang.length == 2) {
							lang = osLang.toLowerCase();
						} else {
							lang = osLang.substring(0, 2).toLowerCase();
							locale = osLang.substring(3).toLowerCase();
						}
						
						msg = msgs[lang];
						
						if (msg !== undefined) {
							
							if (CHECK_IS_DATA(msg) === true) {
								if (msg[locale] !== undefined) {
									msg = msg[locale];
								} else {
									// get first msg.
									EACH(msg, (_msg) => {
										msg = _msg;
										return false;
									});
								}
							}
						}
					}
				}
				
				if (msg === undefined) {
					
					// get first msg.
					EACH(msgs, (_msg) => {
						msg = _msg;
						return false;
					});
				}
				
				if (msg !== undefined && CHECK_IS_DATA(msg) === true) {
					
					// get first msg.
					EACH(msg, (_msg) => {
						msg = _msg;
						return false;
					});
				}
		
				return msg;
			}
		};
	});
});