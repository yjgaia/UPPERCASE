/**
 * 새 창에서 URI에 해당하는 뷰를 띄웁니다.
 */
global.GO_NEW_WIN = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		global.open(HREF(uri));
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.GO_NEW_WIN = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO_NEW_WIN((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});
