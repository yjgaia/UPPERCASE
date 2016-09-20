/**
 * 데이터나 배열, 값을 JSON 문자열로 변환합니다.
 */
global.STRINGIFY = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		return JSON.stringify(CHECK_IS_DATA(data) === true ? PACK_DATA(data) : data);
	}
});
