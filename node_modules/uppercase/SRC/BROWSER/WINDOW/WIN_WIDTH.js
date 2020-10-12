/*
 * 브라우저 창의 가로 길이를 픽셀 단위로 반환합니다.
 */
global.WIN_WIDTH = METHOD({

	run: () => {

		return document.documentElement.clientWidth;
	}
});
