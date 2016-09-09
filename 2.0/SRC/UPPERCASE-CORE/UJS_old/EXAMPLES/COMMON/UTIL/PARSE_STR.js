TEST('PARSE_STR', function(ok) {
	'use strict';

	var
	// data
	data,

	// data str
	dataStr,

	// parsed data
	parsedData;

	data = {
		name : 'Yong Jae Sim',
		age : 27,
		country : 'Korea',
		now : new Date()
	};

	dataStr = STRINGIFY(data);

	parsedData = PARSE_STR(dataStr);

	ok(CHECK_ARE_SAME([data, parsedData]) === true);
});
