TEST('STRINGIFY', function(ok) {
	'use strict';

	var
	// now
	now = new Date(),

	// data
	data = {
		name : 'Yong Jae Sim',
		age : 27,
		country : 'Korea',
		now : now,
		regex : /test/g
	},

	// data str
	dataStr = STRINGIFY(data);

	ok(dataStr === '{"name":"Yong Jae Sim","age":27,"country":"Korea","now":' + now.getTime() + ',"regex":"/test/g","__DATE_ATTR_NAMES":["now"],"__REGEX_ATTR_NAMES":["regex"]}');
});
