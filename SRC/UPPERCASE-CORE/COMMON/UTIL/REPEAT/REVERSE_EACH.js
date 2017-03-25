/*
 * 데이터나 배열, 문자열의 각 요소를 역순으로 대입하여 주어진 함수를 실행합니다.
 */
global.REVERSE_EACH = METHOD({

	run : (arrayOrString, func) => {
		//OPTIONAL: arrayOrString
		//REQUIRED: func
		
		if (arrayOrString === undefined) {
			return false;
		}

		// when arrayOrString is func
		else if (func === undefined) {

			func = arrayOrString;
			arrayOrString = undefined;

			return (arrayOrString) => {
				return REVERSE_EACH(arrayOrString, func);
			};
		}

		// when arrayOrString is array or string
		else {

			let length = arrayOrString.length;

			for (let i = length - 1; i >= 0; i -= 1) {

				if (func(arrayOrString[i], i) === false) {
					return false;
				}
				
				// when shrink
				if (arrayOrString.length < length) {
					i += length - arrayOrString.length;
				}
			}
		}

		return true;
	}
});
