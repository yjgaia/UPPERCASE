/*
 * 새 창에서 URI에 해당하는 뷰를 띄웁니다.
 */
global.GO_NEW_WIN = METHOD({

	run: (uri) => {
		//REQUIRED: uri

		global.open(HREF(uri));
	}
});

FOR_BOX((box) => {

	box.GO_NEW_WIN = METHOD({

		run: (uri) => {
			//REQUIRED: uri

			GO_NEW_WIN((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});
