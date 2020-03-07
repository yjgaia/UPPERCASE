/*
 * BROWSER, NODE 에서 확장해서 사용해야 합니다.
 */
global.MSG = METHOD((m) => {
	
	let msgData = {};
	
	let addData = m.addData = (data) => {
		EXTEND({
			origin : msgData,
			extend : data
		});
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
			
			// get first msg.
			EACH(msgs, (_msg) => {
				msg = _msg;
				return false;
			});
			
			if (msg !== undefined && CHECK_IS_DATA(msg) === true) {
				
				// get first msg.
				EACH(msg, (_msg) => {
					msg = _msg;
					return false;
				});
			}
	
			return msg;
		}
	}
});
