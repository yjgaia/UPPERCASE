TEST('CALENDAR', (check) => {

	let cal = CALENDAR(new Date());

	console.log(cal.getYear());
	console.log(cal.getMonth());
	console.log(cal.getDate());

	// 0 is sunday.
	console.log(cal.getDay());

	console.log(cal.getHour());
	console.log(cal.getMinute());
	console.log(cal.getSecond());
});
