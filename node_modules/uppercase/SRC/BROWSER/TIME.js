/*
 * 웹 브라우저의 시간과 서버 시간의 차이를 계산하여,
 * 서버로부터 넘어온 시간을 웹 브라우저 시간대의 시간으로 변경합니다.
 */
global.TIME = METHOD((m) => {

	let diff = 0;

	let setDiff = m.setDiff = (_diff) => {
		diff = _diff;
	};

	return {

		run: (date) => {
			//REQUIRED: date

			return new Date(date.getTime() + diff);
		}
	};
});
