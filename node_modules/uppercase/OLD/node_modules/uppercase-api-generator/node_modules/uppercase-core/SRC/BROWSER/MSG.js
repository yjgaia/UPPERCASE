/*
 * INFO의 웹 애플리케이션 언어 설정 코드에 해당하는 문자열을 반환합니다.
 * 
 * 만약 알 수 없는 언어 설정 코드라면, 영어가 있는 경우에는 영어를, 아니라면 첫번째 문자열을 반환합니다.
 */
OVERRIDE(MSG, (origin) => {
	
	global.MSG = METHOD((m) => {
		
		let msgData = {};
		
		let addData = m.addData = (data) => {
			//REQUIRED: data
			
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
								if (j > 0 && text !== '') {
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
				
				if (msgs === undefined) {
					SHOW_ERROR('MSG', key + '에 해당하는 문자열을 찾을 수 없습니다.');
				}
				
				let msg = msgs[INFO.getLang()];
				
				if (msg === undefined) {
					
					let lang;
					let locale;
					
					if (INFO.getLang().length == 2) {
						lang = INFO.getLang().toLowerCase();
					} else {
						lang = INFO.getLang().substring(0, 2).toLowerCase();
						locale = INFO.getLang().substring(3).toLowerCase();
					}
					
					msg = msgs[lang];
					
					if (msg !== undefined) {
						
						if (CHECK_IS_DATA(msg) === true) {
							if (msg[locale] !== undefined) {
								msg = msg[locale];
							} else {
								
								// 못 찾은 경우 첫번째 문자열을 반환
								EACH(msg, (_msg) => {
									msg = _msg;
									return false;
								});
							}
						}
					}
				}
				
				if (msg === undefined) {
					
					// 영어가 있는 경우 영어를, 아닌 경우 첫번째 문자열을 반환
					if (msgs.en !== undefined) {
						msg = msgs.en;
					} else {
						EACH(msgs, (_msg) => {
							msg = _msg;
							return false;
						});
					}
				}
				
				if (msg !== undefined && CHECK_IS_DATA(msg) === true) {
					
					// 못 찾은 경우 첫번째 문자열을 반환
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
