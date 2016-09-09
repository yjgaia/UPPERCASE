TEST('JSON', function(ok) {
	'use strict';

	var
	// data
	data = {
		a : 1,
		b : 2,
		c : 3
	},

	// data2 string
	data2Str = '{"d":4,"e":5,"f":6}',

	// data2
	data2;

	ok(JSON.stringify(data) === '{"a":1,"b":2,"c":3}');

	data2 = JSON.parse(data2Str);

	ok(data2.f === 6);
});
