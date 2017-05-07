/*
 * INFO의 웹 애플리케이션 언어 설정 코드에 해당하는 문자열을 반환합니다.
 * 
 * 만약 알 수 없는 언어 설정 코드라면, 첫 문자열을 반환합니다.
 */
global.MSG = METHOD({

	run : (msgs) => {
		//REQUIRED: msgs

		let msg = msgs[INFO.getLang()];

		if (msg === undefined) {
			
			msg = msgs[INFO.getLang().substring(0, 2)];
			
			if (msg === undefined) {
				
				// get first msg.
				EACH(msgs, (_msg) => {
					msg = _msg;
					return false;
				});
			}
		}

		return msg;
	}
});
