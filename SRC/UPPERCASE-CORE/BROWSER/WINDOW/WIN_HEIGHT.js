/**
 * 브라우저 창의 세로 길이를 픽셀 단위로 반환합니다.
 */
global.WIN_HEIGHT = METHOD({

	run : function() {
		'use strict';

		return document.documentElement.clientHeight;
	}
});
