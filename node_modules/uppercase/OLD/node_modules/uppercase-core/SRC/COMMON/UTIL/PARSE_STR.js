/*
 * JSON 문자열을 원래 데이터나 배열, 값으로 변환합니다.
 */
global.PARSE_STR = METHOD({

	run : (dataStr) => {
		//REQUIRED: dataStr
		
		try {

			let data = JSON.parse(dataStr);
			
			if (CHECK_IS_DATA(data) === true) {
				return UNPACK_DATA(data);
			}
			
			else if (CHECK_IS_ARRAY(data) === true) {
				
				let array = [];
				
				EACH(data, (data) => {
					
					if (CHECK_IS_DATA(data) === true) {
						array.push(UNPACK_DATA(data));
					}
					
					else if (CHECK_IS_ARRAY(data) === true) {
						
						EACH(data, (v, i) => {
		
							if (CHECK_IS_DATA(v) === true) {
								data[i] = UNPACK_DATA(v);
							}
						});
						
						array.push(data);
					}
					
					else {
						array.push(data);
					}
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
