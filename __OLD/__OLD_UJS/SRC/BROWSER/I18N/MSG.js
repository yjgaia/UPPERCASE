/**
 * get internationalization message.
 */
global.MSG = METHOD({

	run : function(msgs) {
		'use strict';
		//REQUIRED: msgs

		var
		// msg
		msg = msgs[INFO.getLang()];

		if (msg === undefined) {

			// get first msg.
			EACH(msgs, function(_msg) {
				msg = _msg;
				return false;
			});
		}

		return msg;
	}
});

