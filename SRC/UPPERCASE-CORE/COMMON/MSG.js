/*
 * BROWSER, NODE 에서 확장해서 사용해야 합니다.
 */
global.MSG = METHOD({

	run : (msgs) => {
		//REQUIRED: msgs

		let msg;
		
		// get first msg.
		EACH(msgs, (_msg) => {
			msg = _msg;
			return false;
		});

		return msg;
	}
});
