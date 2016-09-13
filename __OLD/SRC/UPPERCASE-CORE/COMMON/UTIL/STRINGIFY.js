/**
 * 데이터나 배열, 값을 JSON 문자열로 변환합니다.
 */
global.STRINGIFY = METHOD({

	run : function(value) {
		'use strict';
		//REQUIRED: value

		return JSON.stringify(CHECK_IS_DATA(value) === true ? PACK_DATA(value) : value);
	}
});
