/*
 * 콘솔에 표시할 텍스트를 초록색으로 설정합니다.
 */
global.CONSOLE_GREEN = METHOD({

	run : function(text) {
		'use strict';
		//REQUIRED: text

		return '[32m' + text + '[0m';
	}
});
