TEST('STRINGIFY', function(check) {
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

	check(dataStr === '{"name":"Yong Jae Sim","age":27,"country":"Korea","now":' + now.getTime() + ',"regex":"/test/g","__D":["now"],"__R":["regex"]}');
});
