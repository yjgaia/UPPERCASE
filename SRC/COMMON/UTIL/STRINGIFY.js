/*
 * 데이터나 배열, 값을 JSON 문자열로 변환합니다.
 */
global.STRINGIFY = METHOD({

	run: (data) => {
		//REQUIRED: data

		if (CHECK_IS_DATA(data) === true) {
			return JSON.stringify(PACK_DATA(data));
		}

		else if (CHECK_IS_ARRAY(data) === true) {

			let f = (array) => {

				let newArray = [];

				EACH(array, (data) => {
					if (CHECK_IS_DATA(data) === true) {
						newArray.push(PACK_DATA(data));
					} else if (CHECK_IS_ARRAY(data) === true) {
						newArray.push(f(data));
					} else {
						newArray.push(data);
					}
				});

				return newArray;
			};

			return JSON.stringify(f(data));
		}

		else {
			return JSON.stringify(data);
		}
	}
});
