/*
 * URI가 주어진 포맷에 맞는지 확인하는 URI_MATCHER 클래스
 * 
 * 포맷에 파라미터 구간을 지정할 수 있어 URI로부터 파라미터 값을 가져올 수 있습니다.
 */
global.URI_MATCHER = CLASS({

	init : (inner, self, format) => {
		//REQUIRED: format

		let Check = CLASS({

			init : (inner, self, uri) => {
				//REQUIRED: uri

				let uriParts = uri.split('/');
				
				let isMatched;
				let uriParams = {};

				let find = (format) => {

					let formatParts = format.split('/');

					return EACH(uriParts, (uriPart, i) => {

						let formatPart = formatParts[i];

						if (formatPart === '**') {
							isMatched = true;
							return false;
						}

						if (formatPart === undefined) {
							return false;
						}

						// find params.
						if (uriPart !== '' && formatPart.charAt(0) === '{' && formatPart.charAt(formatPart.length - 1) === '}') {
							uriParams[formatPart.substring(1, formatPart.length - 1)] = uriPart;
						} else if (formatPart !== '*' && formatPart !== uriPart) {
							return false;
						}

						if (i === uriParts.length - 1 && i < formatParts.length - 1 && formatParts[formatParts.length - 1] !== '') {
							return false;
						}

					}) === true || isMatched === true;
				};

				if (CHECK_IS_ARRAY(format) === true) {
					isMatched = EACH(format, (format) => {
						return find(format) !== true;
					}) !== true;
				} else {
					isMatched = find(format);
				}

				let checkIsMatched = self.checkIsMatched = () => {
					return isMatched;
				};

				let getURIParams = self.getURIParams = () => {
					return uriParams;
				};
			}
		});
		
		let check = self.check = (uri) => {
			return Check(uri);
		};
	}
});
