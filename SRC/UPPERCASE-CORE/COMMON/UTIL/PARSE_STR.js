/**
 * JSON 문자열을 원래 데이터나 배열, 값으로 변환합니다.
 */
global.PARSE_STR = METHOD({

	run : function(dataStr) {
		'use strict';
		//REQUIRED: dataStr

		var
		// data
		data,
		
		// array
		array;

		try {

			data = JSON.parse(dataStr);
			
			if (CHECK_IS_DATA(data) === true) {
				return UNPACK_DATA(data);
			}
			
			else if (CHECK_IS_ARRAY(data) === true) {
				
				array = [];
				
				EACH(data, function(data) {
					array.push(UNPACK_DATA(data));
				});
				
				return array;
			}
			
			else {
				return data;
			}

		} catch(e) {

			// when error, return undefined.
			return undefined;
		}
	}
});
