/**
 * 쿠키 문자열을 데이터로 변환합니다.
 */
global.PARSE_COOKIE_STR = METHOD({

	run : function(cookieStr) {
		'use strict';
		//OPTIONAL: cookieStr

		var
		// splits
		splits,

		// data
		data = {};

		if (cookieStr !== undefined) {

			splits = cookieStr.split(';');

			EACH(splits, function(cookie) {

				var
				// parts
				parts = cookie.split('=');

				data[parts[0].trim()] = decodeURIComponent(parts[1]);
			});
		}

		return data;
	}
});
