TEST('COUNT_PROPERTIES', function(ok) {
	'use strict';

	var
	// data
	data = {
		a : 1,
		b : 2,
		c : 3
	};
	
	ok(COUNT_PROPERTIES(data) === 3);
});
