/*
 * Date형 값을 생성합니다.
 */
global.CREATE_DATE = METHOD({

	run : (params) => {
		//REQUIRED: params
		//OPTIONAL: params.year		년
		//OPTIONAL: params.month	월
		//OPTIONAL: params.date		일
		//OPTIONAL: params.hour		시
		//OPTIONAL: params.minute	분
		//OPTIONAL: params.second	초
		
		let year = params.year;
		let month = params.month;
		let date = params.date;
		let hour = params.hour;
		let minute = params.minute;
		let second = params.second;
		
		let nowCal = CALENDAR(new Date());
		
		if (year === undefined) {
			year = nowCal.getYear();
		}
		
		if (month === undefined) {
			month = date === undefined ? 0 : nowCal.getMonth();
		}
		
		if (date === undefined) {
			date = hour === undefined ? 0 : nowCal.getDate();
		}
		
		if (hour === undefined) {
			hour = minute === undefined ? 0 : nowCal.getHour();
		}
		
		if (minute === undefined) {
			minute = second === undefined ? 0 : nowCal.getMinute();
		}
		
		if (second === undefined) {
			second = 0;
		}

		return new Date(year, month - 1, date, hour, minute, second);
	}
});
