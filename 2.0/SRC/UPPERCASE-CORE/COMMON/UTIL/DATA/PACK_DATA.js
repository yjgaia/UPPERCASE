/**
 * 주어진 데이터의 값들 중 Date형은 정수형태로, RegExp형은 문자열 형태로 변환한 데이터를 반환합니다.
 */
global.PACK_DATA = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		var
		// result
		result = COPY(data),

		// date property names
		dateNames = [],
		
		// regex property names
		regexNames = [];

		EACH(result, function(value, name) {

			if (value instanceof Date === true) {

				// change to timestamp integer.
				result[name] = INTEGER(value.getTime());
				dateNames.push(name);
			}
			
			else if (value instanceof RegExp === true) {

				// change to string.
				result[name] = value.toString();
				regexNames.push(name);
			}

			else if (CHECK_IS_DATA(value) === true) {
				result[name] = PACK_DATA(value);
			}

			else if (CHECK_IS_ARRAY(value) === true) {

				EACH(value, function(v, i) {

					if (CHECK_IS_DATA(v) === true) {
						value[i] = PACK_DATA(v);
					}
				});
			}
		});

		result.__DATE_NAMES = dateNames;
		result.__REGEX_NAMES = regexNames;

		return result;
	}
});
