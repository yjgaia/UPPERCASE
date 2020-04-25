/*
 * 데이터나 배열, 문자열의 각 요소를 역순으로 대입하여 주어진 함수를 실행합니다.
 */
global.REVERSE_EACH = METHOD({

	run : (dataOrArrayOrString, func) => {
		//OPTIONAL: dataOrArrayOrString
		//REQUIRED: func
		
		if (dataOrArrayOrString === undefined) {
			return false;
		}

		// when dataOrArrayOrString is data
		else if (CHECK_IS_DATA(dataOrArrayOrString) === true) {
			
			let reverseNames = [];

			for (let name in dataOrArrayOrString) {
				reverseNames.push(name);
			}
			
			let length = reverseNames.length;

			for (let i = length - 1; i >= 0; i -= 1) {
				let name = reverseNames[i];
				
				if (dataOrArrayOrString.hasOwnProperty === undefined || dataOrArrayOrString.hasOwnProperty(name) === true) {
					if (func(dataOrArrayOrString[name], name) === false) {
						return false;
					}
				}
			}
		}

		// when dataOrArrayOrString is func
		else if (func === undefined) {

			func = dataOrArrayOrString;
			dataOrArrayOrString = undefined;

			return (dataOrArrayOrString) => {
				return REVERSE_EACH(dataOrArrayOrString, func);
			};
		}

		// when dataOrArrayOrString is array or string
		else {

			let length = dataOrArrayOrString.length;

			for (let i = length - 1; i >= 0; i -= 1) {

				if (func(dataOrArrayOrString[i], i) === false) {
					return false;
				}
				
				// when shrink
				if (dataOrArrayOrString.length < length) {
					i += length - dataOrArrayOrString.length;
				}
			}
		}

		return true;
	}
});
