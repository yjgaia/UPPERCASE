/*
 * 데이터 내 값들의 개수를 반환합니다.
 */
global.COUNT_PROPERTIES = METHOD({

	run: (data) => {
		//OPTIONAL: data

		let count = 0;

		EACH(data, () => {
			count += 1;
		});

		return count;
	}
});
