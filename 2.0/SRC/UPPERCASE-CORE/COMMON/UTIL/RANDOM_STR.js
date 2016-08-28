/**
 * 임의의 문자열을 생성합니다.
 */
global.RANDOM_STR = METHOD({

	run : function(length) {
		'use strict';
		//REQUIRED: length

		var
		// random string
		randomStr = '',

		// characters
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

		// i
		i;

		REPEAT(length, function() {

			// add random character to random string.
			randomStr += characters.charAt(RANDOM({
				limit : characters.length
			}));
		});

		return randomStr;
	}
});
