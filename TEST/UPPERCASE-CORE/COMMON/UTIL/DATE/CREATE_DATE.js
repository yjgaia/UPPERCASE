TEST('CREATE_DATE', (check) => {

	let date = CREATE_DATE({
		year : 2016,
		month : 11,
		date : 29,
		hour : 18,
		minute : 8,
		second : 30
	});
	
	let cal = CALENDAR(date);

	check(cal.getYear() === 2016);
	check(cal.getMonth() === 11);
	check(cal.getDate() === 29);
	check(cal.getHour() === 18);
	check(cal.getMinute() === 8);
	check(cal.getSecond() === 30);
});
