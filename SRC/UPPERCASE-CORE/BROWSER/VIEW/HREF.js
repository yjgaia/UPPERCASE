/*
 * URI로부터 주소를 생성하여 반환합니다.
 */
global.HREF = METHOD({

	run : (uri) => {
		//REQUIRED: uri

		return '/' + uri;
	}
});

FOR_BOX((box) => {

	box.HREF = METHOD({

		run : (uri) => {
			//OPTIONAL: uri

			return HREF((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});
