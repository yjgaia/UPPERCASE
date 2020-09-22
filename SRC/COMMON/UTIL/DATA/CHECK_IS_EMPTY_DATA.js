/*
 * 데이터가 아무런 값이 없는 빈 데이터({})인지 확인합니다.
 */
global.CHECK_IS_EMPTY_DATA = METHOD({

	run: (data) => {
		//REQUIRED: data

		return CHECK_ARE_SAME([data, {}]);
	}
});
