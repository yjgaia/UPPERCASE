TEST('INTERVAL', function(ok) {
	'use strict';

	var
	// count
	count = 0,

	// interval
	interval = INTERVAL(3, function(interval) {

		count += 1;

		console.log('interval per 3 seconds, count:', count);
	});

	DELAY(10, function() {
		interval.remove();
	});
});
