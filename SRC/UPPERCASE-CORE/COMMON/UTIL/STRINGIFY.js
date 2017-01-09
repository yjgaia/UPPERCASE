/**
 * 데이터나 배열, 값을 JSON 문자열로 변환합니다.
 */
global.STRINGIFY = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data
		
		var
		// array
		array;
		
		if (CHECK_IS_DATA(data) === true) {
			return JSON.stringify(PACK_DATA(data));
		}
		
		else if (CHECK_IS_ARRAY(data) === true) {
			
			array = [];
			
			EACH(data, function(data) {
				array.push(PACK_DATA(data));
			});
			
			return JSON.stringify(array);
		}
		
		else {
			return JSON.stringify(data);
		}
	}
});
