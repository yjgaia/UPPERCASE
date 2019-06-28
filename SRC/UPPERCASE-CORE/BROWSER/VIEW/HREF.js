/*
 * URI로부터 주소를 생성하여 반환합니다.
 */
global.HREF = METHOD({

	run : (uri) => {
		//REQUIRED: uri

		// when protocol is 'file:' or extension, use hashbang.
		if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
			return '#!/' + uri;
		} else {
			return '/' + uri;
		}
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
