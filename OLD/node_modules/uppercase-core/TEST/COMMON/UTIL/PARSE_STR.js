TEST('PARSE_STR', (check) => {

	let data = {
		name : 'Yong Jae Sim',
		age : 27,
		country : 'Korea',
		now : new Date()
	};

	let dataStr = STRINGIFY(data);

	let parsedData = PARSE_STR(dataStr);

	check(CHECK_ARE_SAME([data, parsedData]) === true);
});
