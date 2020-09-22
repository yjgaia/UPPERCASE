/*
 * 브라우저 창에 표시되는 문서의 제목을 가져오거나 변경합니다.
 */
global.TITLE = METHOD({

	run : (title) => {
		//OPTIONAL: title

		if (title === undefined) {
			return document.title;
		} else {
			document.title = title;
		}
	}
});
