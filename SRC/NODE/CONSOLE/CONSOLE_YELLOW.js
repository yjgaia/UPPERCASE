/*
 * 콘솔에 표시할 텍스트를 노란색으로 설정합니다.
 */
global.CONSOLE_YELLOW = METHOD({

	run: (text) => {
		//REQUIRED: text

		return '[33m' + text + '[0m';
	}
});
