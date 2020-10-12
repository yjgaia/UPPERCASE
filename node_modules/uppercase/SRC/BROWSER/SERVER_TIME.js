/*
 * TIME과 반대 역할을 합니다.
 * 웹 브라우저에서 생성된 시간을 서버 시간대의 시간으로 변경합니다.
 */
global.SERVER_TIME = METHOD((m) => {

	let diff = 0;

	let setDiff = m.setDiff = (_diff) => {
		diff = _diff;
	};

	return {

		run: (date) => {
			//REQUIRED: date

			return new Date(date.getTime() - diff);
		}
	};
});
