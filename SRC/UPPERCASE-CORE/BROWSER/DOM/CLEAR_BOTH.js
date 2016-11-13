/**
 * clear : 'both' 스타일이 지정된 div를 생성합니다.
 */
global.CLEAR_BOTH = METHOD({

	run : function() {
		'use strict';

		return DIV({
			style : {
				clear : 'both'
			}
		});
	}
});
