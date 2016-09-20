TEST('COUNT_PROPERTIES', function(check) {
	'use strict';

	var
	// data
	data = {
		a : 1,
		b : 2,
		c : 3
	};
	
	check(COUNT_PROPERTIES(data) === 3);
});
