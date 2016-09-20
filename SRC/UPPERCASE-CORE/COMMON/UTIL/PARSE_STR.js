/**
 * JSON 문자열을 원래 데이터나 배열, 값으로 변환합니다.
 */
global.PARSE_STR = METHOD({

	run : function(dataStr) {
		'use strict';
		//REQUIRED: dataStr

		var
		// data
		data;

		try {

			data = JSON.parse(dataStr);

			return CHECK_IS_DATA(data) === true ? UNPACK_DATA(data) : data;

		} catch(e) {

			// when error, return undefined.
			return undefined;
		}
	}
});
