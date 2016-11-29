/**
 * URI로부터 주소를 생성하여 반환합니다.
 */
global.HREF = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		return '/' + uri;
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.HREF = METHOD({

		run : function(uri) {
			//OPTIONAL: uri

			return HREF((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});
