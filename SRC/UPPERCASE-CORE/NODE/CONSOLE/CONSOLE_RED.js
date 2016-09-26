/*
 * 콘솔에 표시할 텍스트를 빨간색으로 설정합니다.
 */
global.CONSOLE_RED = METHOD({

	run : function(text) {
		'use strict';
		//REQUIRED: text

		return '[31m' + text + '[0m';
	}
});
