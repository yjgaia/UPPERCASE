/**
 * 데이터나 배열의 특정 값을 찾아, 데이터인 경우 그 값에 해당하는 이름을, 배열인 경우 그 값에 해당하는 키(index)를 반환합니다.
 */
global.FIND = METHOD({

	run : function(dataOrArrayOrParams, filter) {
		'use strict';
		//REQUIRED: dataOrArrayOrParams
		//OPTIONAL: dataOrArrayOrParams.data
		//OPTIONAL: dataOrArrayOrParams.array
		//REQUIRED: dataOrArrayOrParams.value	찾을 값
		//OPTIONAL: filter

		var
		// data
		data,

		// array
		array,

		// value
		value,

		// ret
		ret;

		if (filter !== undefined) {

			if (CHECK_IS_DATA(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, name) {

					// value passed filter.
					if (filter(value) === true) {
						ret = value;
						return false;
					}
				});
			}

			else if (CHECK_IS_ARRAY(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, key) {

					// value passed filter.
					if (filter(value) === true) {
						ret = value;
						return false;
					}
				});
			}
		}

		else {

			// init params.
			data = dataOrArrayOrParams.data;
			array = dataOrArrayOrParams.array;
			value = dataOrArrayOrParams.value;

			if (data !== undefined) {

				EACH(data, function(_value, name) {
					if (_value === value) {
						ret = name;
						return false;
					}
				});
			}

			if (array !== undefined) {

				EACH(array, function(_value, key) {
					if (_value === value) {
						ret = key;
						return false;
					}
				});
			}
		}

		return ret;
	}
});
